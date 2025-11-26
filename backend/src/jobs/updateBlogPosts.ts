import 'dotenv/config';
import cron from 'node-cron';
import Parser from 'rss-parser';
import readingTime from 'reading-time';
import winston from 'winston';
import { blogPostRepo } from '../db/repos';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) =>
            `[${timestamp}] ${level.toUpperCase()}: ${message}`
        )
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/updateBlogPosts.log' })
    ]
});

const parser = new Parser();
const MEDIUM_USERNAME = 'silidrone';

function extractDescription(htmlContent: string): string {
    const pMatch = htmlContent.match(/<p[^>]*>(.*?)<\/p>/);
    if (!pMatch) return '';

    const text = pMatch[1].replace(/<[^>]*>/g, '').trim();  // strip inner tags

    if (text.length <= 200) return text;
    return text.slice(0, 200).trim() + '...';
}


async function main() {
    logger.info('Fetching Medium posts...');

    const feed = await parser.parseURL(`https://medium.com/feed/@${MEDIUM_USERNAME}`);
    logger.info(`Successfully fetched ${feed.items.length} posts!`);

    logger.info('Performing necessary transformations to save to DB...');
    const transformedFeed = feed.items.map((post: any) => {
        const htmlContent = post['content:encoded'];
        const text = htmlContent.replace(/<[^>]*>/g, '');
        const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/);
        const imageUrl = imgMatch ? imgMatch[1] : null;
        const { minutes } = readingTime(text);
        const readTime = Math.ceil(minutes);

        return {
            title: post.title,
            date: post.isoDate,
            description: extractDescription(htmlContent),
            content: htmlContent,
            categories: post.categories,
            read_time: readTime,
            post_url: post.link,
            image_url: imageUrl
        }
    })

    logger.info('Updating DB with the new articles...');
    await blogPostRepo.createOrUpdateMany(transformedFeed);
    logger.info('updateBlogPosts job finished successfully.');
}

// Run on startup
main().catch(err => logger.error(err.message));

// Run daily at midnight
cron.schedule('0 0 * * *', () => {
    main().catch(err => logger.error(err.message));
});

logger.info('Scheduler started. Waiting for next run at midnight...');
