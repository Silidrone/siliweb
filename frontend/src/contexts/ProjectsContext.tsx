import { useContext, createContext, ReactNode } from "react"
import { useQuery, gql } from '@apollo/client'
import { Project, GetProjectsData } from '../types/projects'

interface ProjectsContextType {
    projects: Project[]
    loading: boolean
    error: Error | null
    refetch: () => void
}

const ProjectsContext = createContext<ProjectsContextType | null>(null)

const GET_PROJECTS = gql`
    query GetProjects {
        projects {
        id
        title
        description
        technologies
        github
        featured
        demo
        order
        }
    }
`

function ProjectsProvider({ children }: { children: ReactNode }) {
    const { loading, error, data, refetch } = useQuery<GetProjectsData>(GET_PROJECTS)
    return (
        <ProjectsContext.Provider value={{
            projects: data?.projects ?? [],
            loading,
            error: error ?? null,
            refetch
        }}>
            {children}
        </ProjectsContext.Provider>
    )
}

function useProjects() {
    const context = useContext(ProjectsContext)
    if (!context) throw new Error('useProjects must be used within ProjectsProvider')

    return context
}


export type { Project }
export { useProjects, ProjectsProvider }