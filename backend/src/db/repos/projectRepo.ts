import { db } from '../'
import { projects } from '../schema'

export const projectRepo = {
    getAll: () => {
        return db.select().from(projects);
    }
}
