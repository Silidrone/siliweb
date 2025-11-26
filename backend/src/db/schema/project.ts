import { pgTable, serial, text, boolean, integer } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
    id: serial('id').primaryKey(),
    title: text('title').notNull().unique(),
    description: text('description').notNull(),
    technologies: text('technologies').array().notNull(),
    github: text('github').notNull(),
    featured: boolean('featured').notNull(),
    demo: text('demo').notNull(),
    order: integer('order').default(-1),
});

