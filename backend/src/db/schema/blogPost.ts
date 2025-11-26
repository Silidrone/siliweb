import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const blogPosts = pgTable('blog_posts', {
    id: serial('id').primaryKey(),
    title: text('title').notNull().unique(),
    date: text('date').notNull(),
    categories: text('categories').array().notNull(),
    description: text('description').notNull(),
    content: text('content').notNull(),
    read_time: integer('read_time').default(-1),
    post_url: text('post_url').notNull(),
    image_url: text('image_url'),
});
