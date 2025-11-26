import { db } from '../'
import { blogPosts } from '../schema'
import { sql } from 'drizzle-orm';

export const blogPostRepo = {
    getAll: () => {
        return db.select().from(blogPosts);
    },
    createOrUpdateMany: (data: (typeof blogPosts.$inferInsert)[]) => {
        return db
            .insert(blogPosts)
            .values(data)
            .onConflictDoUpdate({
                target: blogPosts.title,  // unique column
                set: {
                    date: sql`excluded.date`,
                    categories: sql`excluded.categories`,
                    description: sql`excluded.description`,
                    content: sql`excluded.content`,
                    read_time: sql`excluded.read_time`,
                    post_url: sql`excluded.post_url`,
                    image_url: sql`excluded.image_url`,
                },
            })
            .returning();
    }
}