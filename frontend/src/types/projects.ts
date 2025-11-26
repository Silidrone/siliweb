interface Project {
    id: string
    title: string
    description: string
    technologies: string[]
    github?: string
    featured: boolean
    demo?: string
    order: number
}

interface GetProjectsData {
    projects: Project[]
}

export type { Project, GetProjectsData }