import './Projects.css';
import { useProjects } from '../contexts/ProjectsContext';
import ProjectComponent from '../components/ProjectComponent';

function Projects() {
    const { projects, loading } = useProjects();

    if (loading) return <p>Loading...</p>

    return (
        <div className="projects">
            <div className="container">
                <header className="projects-header">
                    <h1 className="page-title">Projects</h1>
                    <p className="page-description">
                        A collection of projects I've worked on, from open-source contributions to personal experiments
                    </p>
                </header>

                <div className="projects-grid">
                    {[...projects].sort((a, b) => {
                        if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
                        if (a.order === -1 && b.order !== -1) return 1;
                        if (b.order === -1 && a.order !== -1) return -1;
                        return a.order - b.order;
                    }).map(project =>
                        <ProjectComponent project={project}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Projects;
