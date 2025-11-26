import { Project } from '../types/projects'

const ProjectComponent = ({ project } : {project: Project}) => {
    return <article key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}>
        {project.featured && <span className="featured-badge">Featured</span>}

        <h2 className="project-title">{project.title}</h2>
        <p className="project-description">{project.description}</p>

        <div className="project-technologies">
            {project.technologies.map(tech => (
                <span key={tech} className="tech-tag">{tech}</span>
            ))}
        </div>

        <div className="project-links">
            {project.github && (
                <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                    <span>View on GitHub →</span>
                </a>
            )}
            {project.demo && (
                <a href={project.demo} className="project-link demo-link" target="_blank" rel="noopener noreferrer">
                    <span>Live Demo →</span>
                </a>
            )}
        </div>
    </article>
}

export default ProjectComponent