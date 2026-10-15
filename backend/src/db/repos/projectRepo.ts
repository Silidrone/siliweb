import { db } from '../'
import { projects } from '../schema'
import { eq, notInArray, sql } from 'drizzle-orm';

export interface PinnedRepo {
    owner: string
    name: string
    github: string
    description: string
    language: string | null
    topics: string[]
    homepage: string
}

export const projectRepo = {
    getAll: () => {
        return db.select().from(projects);
    },
    // Makes the featured set mirror the GitHub pins, in pin order. Rows that already exist keep
    // their hand-written description and tags; repos pinned for the first time are inserted
    // with what GitHub knows about them.
    syncPinned: (pinned: PinnedRepo[]) => {
        return db.transaction(async tx => {
            const existing = await tx.select().from(projects);
            const byUrl = new Map(existing.map(p => [p.github.toLowerCase(), p]));
            const keptIds: number[] = [];

            for (const [i, repo] of pinned.entries()) {
                const row = byUrl.get(repo.github.toLowerCase());
                if (row) {
                    await tx.update(projects)
                        .set({ featured: true, order: i + 1 })
                        .where(eq(projects.id, row.id));
                    keptIds.push(row.id);
                    continue;
                }

                const technologies = [repo.language, ...repo.topics].filter((t): t is string => !!t);
                const [inserted] = await tx.insert(projects)
                    .values({
                        title: repo.name,
                        description: repo.description,
                        technologies,
                        github: repo.github,
                        demo: repo.homepage,
                        featured: true,
                        order: i + 1,
                    })
                    .onConflictDoUpdate({
                        target: projects.title,
                        set: {
                            github: sql`excluded.github`,
                            featured: true,
                            order: i + 1,
                        },
                    })
                    .returning({ id: projects.id });
                keptIds.push(inserted.id);
            }

            await tx.update(projects)
                .set({ featured: false })
                .where(keptIds.length ? notInArray(projects.id, keptIds) : sql`true`);
        });
    }
}
