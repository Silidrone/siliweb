import 'dotenv/config';
import cron from 'node-cron';
import winston from 'winston';
import { projectRepo, PinnedRepo } from '../db/repos';

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
        new winston.transports.File({ filename: 'logs/syncPinnedProjects.log' })
    ]
});

const GITHUB_USERNAME = 'Silidrone';
const HEADERS = { 'User-Agent': 'siliweb-pinned-sync' };

function decodeEntities(s: string): string {
    return s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

// GitHub exposes pinned repos only on the profile page (or the authenticated GraphQL API),
// so read them from the profile HTML. Each pin is an <li class="... pinned-item-list-item ...">.
function parsePinned(html: string): PinnedRepo[] {
    const blocks = html.split(/<li[^>]*class="[^"]*\bpinned-item-list-item\b/).slice(1);

    return blocks.flatMap(block => {
        const link = block.match(/href="\/([^"\/]+)\/([^"\/]+)"[^>]*>\s*<span class="repo"/);
        if (!link) return [];

        const desc = block.match(/<p class="pinned-item-desc[^"]*">([\s\S]*?)<\/p>/);
        const lang = block.match(/itemprop="programmingLanguage">([^<]+)</);

        return [{
            owner: link[1],
            name: link[2],
            github: `https://github.com/${link[1]}/${link[2]}`,
            description: desc ? decodeEntities(desc[1].replace(/<[^>]*>/g, '').trim()) : '',
            language: lang ? lang[1].trim() : null,
            topics: [],
            homepage: '',
        }];
    });
}

// Topics and homepage are not on the profile card; pull them from the REST API, best effort.
async function enrich(repo: PinnedRepo): Promise<PinnedRepo> {
    try {
        const res = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}`, { headers: HEADERS });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: any = await res.json();
        return {
            ...repo,
            description: repo.description || data.description || '',
            topics: Array.isArray(data.topics) ? data.topics : [],
            homepage: data.homepage || '',
        };
    } catch (err: any) {
        logger.warn(`Could not fetch repo details for ${repo.github}: ${err.message}`);
        return repo;
    }
}

async function main() {
    logger.info(`Fetching pinned repos for ${GITHUB_USERNAME}...`);

    const res = await fetch(`https://github.com/${GITHUB_USERNAME}`, { headers: HEADERS });
    if (!res.ok) throw new Error(`Profile fetch failed: HTTP ${res.status}`);

    const pinned = parsePinned(await res.text());
    // An empty result almost certainly means GitHub changed its markup; don't wipe the featured set.
    if (pinned.length === 0) throw new Error('No pinned repos found in profile HTML, leaving projects untouched.');

    logger.info(`Found ${pinned.length} pinned repos: ${pinned.map(p => p.name).join(', ')}`);

    const enriched = [];
    for (const repo of pinned) enriched.push(await enrich(repo));

    await projectRepo.syncPinned(enriched);
    logger.info('syncPinnedProjects job finished successfully.');
}

// Run on startup
main().catch(err => logger.error(err.message));

// Run hourly
cron.schedule('0 * * * *', () => {
    main().catch(err => logger.error(err.message));
});

logger.info('Scheduler started. Syncing pinned projects hourly...');
