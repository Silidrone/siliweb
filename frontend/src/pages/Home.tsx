import ProjectComponent from '../components/ProjectComponent';
import { useProjects } from '../contexts/ProjectsContext';
import './Home.css';
import SocialLinks from '../components/SocialLinks';

function Home() {
    const { projects, loading } = useProjects()

    if (loading) return <p>Loading...</p>

    const featuredProjects = projects.filter(project => project.featured)

    return (
        <div className="home">
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title">
                        Hi, I'm <span className="highlight">Muhamed (aka Silidrone)</span>
                    </h1>
                    <p className="hero-subtitle">
                        Software Engineer & Science Enthusiast
                    </p>
                    <p className="hero-description">
                        I build cool stuff.
                    </p>
                    <SocialLinks/>
                </div>
            </section>

            <section className="video-intro">
                <div className="container">
                    <div className="video-wrapper">
                        <div className="video-container">
                            <iframe
                                title="Introduction Video"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about">
                <div className="container">
                    <h2 className="section-title">About Me</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <p>

                                I have 5+ YoE architecting production systems: from serverless data pipelines processing billions of records to leading multi-million euro EU-funded projects.
                                <br />
                                <br />
                                I specialize in full-stack development, cloud infrastructure, and ML/AI implementation for startups and SaaS companies.
                                <br />
                                <br />

                                In my free time, I build whatever interests me: AI agents, embedded IoT systems, video games... Currently deep into reinforcement learning research.

                                <br />
                                <br />

                                I like to share my journey and knowledge through YouTube videos, blogs, streams and social media.
                                <br />
                                <br />
                                Want to work together, need help with a project, or just want to connect? Feel free to contact me at <a href="mailto:silidrone@gmail.com" className="email-link">silidrone@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="featured-posts">
                <div className="container">
                    <h2 className="section-title">Featured Projects</h2>
                    <div className="posts-grid">
                        {featuredProjects.map(project =>
                            <ProjectComponent project={project} />
                        )}
                    </div>
                    <div className="view-all-container">
                        <a href="/projects" className="view-all-btn">View All Projects →</a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
