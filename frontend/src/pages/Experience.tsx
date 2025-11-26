import './Experience.css';

function Experience() {
  const renderAchievement = (achievement: string, links?: Array<{ text: string; url: string }>) => {
    if (!links || links.length === 0) {
      return achievement;
    }

    let result: any[] = [achievement];

    links.forEach(({ text, url }) => {
      const newResult: any[] = [];
      result.forEach((part) => {
        if (typeof part === 'string') {
          const segments = part.split(text);
          segments.forEach((segment, idx) => {
            newResult.push(segment);
            if (idx < segments.length - 1) {
              newResult.push(
                <a key={`${text}-${idx}`} href={url} target="_blank" rel="noopener noreferrer">
                  {text}
                </a>
              );
            }
          });
        } else {
          newResult.push(part);
        }
      });
      result = newResult;
    });

    return <>{result}</>;
  };

  const experiences = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'IRESI',
      companyLink: 'https://iresi.eu',
      period: 'Aug. 2024 - Present',
      description: 'Working on large-scale EU funded projects with researchers.',
      achievements: [
        'BoostMySkills – Architected and delivered an LMS/CMS platform as part of a €2.5 million EU-funded project RES4CITY, serving tens of thousands of students across multiple institutions, with distributed databases, automated deployment pipelines, and comprehensive backup systems',
        'RENEW – Built a real-time IoT data platform processing continuous sensor streams from smart home devices, implementing time-series analytics and state management for environmental monitoring'
      ],
      links: [
        { text: 'BoostMySkills', url: 'https://boostmyskills.eu' },
        { text: 'a €2.5 million EU-funded project RES4CITY', url: 'https://res4city.eu' },
        { text: 'RENEW', url: 'https://www.sfi.ie/challenges/energy-innovation/renew/' },
        { text: 'a real-time IoT data platform', url: 'https://renewenergy.io' }
      ],
      technologies: ['Django', 'React', 'MySQL', 'Redis', 'FastAPI', 'PostgreSQL', 'AWS', 'EMQX', 'Docker']
    },
    {
      id: 2,
      title: 'Technical Lead',
      company: 'UrbanData',
      companyLink: 'https://urbandata.biz',
      period: 'Feb. 2024 - Present',
      description: 'Leading technical development and client solutions, working directly with the CEO on business development.',
      achievements: [
        'Architected and implemented a cloud-native infrastructure processing hundreds of GBs of data daily for user segmentation and targeted advertising',
        'Successfully onboarded a prominent DSP client through technical presentations and solution design',
        'Represented the company at industry conferences, conducting technical demos and engaging with prospective clients',
        'Developed GDPR-compliant mobile SDKs with comprehensive testing across device matrices',
        'Built geospatial analysis systems for household segmentation, lifestyle clustering, and foot traffic modeling at scale'
      ],
      technologies: ['AWS', 'PySpark', 'EMR', 'S3', 'Python', 'CDK', 'Geospatial Analysis']
    },
    {
      id: 3,
      title: 'Software Engineer',
      company: 'Codeise Ltd.',
      period: 'Aug. 2021 - Aug. 2024',
      description: 'Built award-winning platforms and multi-tenant systems for energy and EV charging sectors.',
      achievements: [
        'I-NERGY (ADIOS) – Developed an award-winning AI platform for energy grid anomaly detection, securing 1st place among 126 international submissions with advanced machine learning models',
        'RenonBill – Created a data modeling platform processing multi-regional energy consumption data with integrated risk analysis and forecasting',
        'ViziDrive – Rescued a struggling multi-tenant EV charging platform by optimizing SQL queries and frontend rendering, refactoring critical code paths, fixing payment system bugs, and implementing new features across all microservices'
      ],
      links: [
        { text: 'I-NERGY (ADIOS)', url: 'https://i-nergy.eu/' },
        { text: 'securing 1st place among 126 international submissions', url: 'https://i-nergy.eu/open-calls-winning-projects' },
        { text: 'RenonBill', url: 'https://renonbill.eu' },
        { text: 'data modeling platform', url: 'https://renonbill.ikimio.com/' },
        { text: 'ViziDrive', url: 'https://www.vizidrive.eu/' }
      ],
      technologies: ['FastAPI', 'PyTorch', 'React', 'Django', 'PostgreSQL', 'Node.js', 'AWS', 'OCPP', 'SQS', 'Lambda']
    },
    {
      id: 4,
      title: 'Software Engineer',
      company: 'Edge Case Solutions d.o.o',
      companyLink: 'https://edgecasesolutions.com',
      period: 'Sep. 2020 - Jul. 2021',
      description: 'Developed Rezzrv, a progressive web application for appointment management deployed across Slovenian municipalities, featuring email and SMS notifications, advanced analytics, and export capabilities compatible with their legacy system.',
      achievements: [],
      technologies: ['Laravel', 'React', 'JavaScript', 'Docker', 'MySQL', 'PWA', 'Twillio API']
    }
  ];

  const skills = {
    'AI & Data': ['PyTorch', 'PySpark', 'Pandas', 'NumPy', 'Machine Learning', 'Reinforcement Learning'],
    'Backend': ['Python', 'FastAPI', 'Django', 'Node.js', 'PHP', 'Laravel'],
    'Frontend': ['React', 'TypeScript', 'JavaScript'],
    'Databases': ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'DynamoDB'],
    'Cloud & DevOps': ['AWS', 'Docker', 'CI/CD', 'Infrastructure as Code'],
    'Other': ['IoT', 'MQTT', 'EMQX', 'Microservices', 'TDD', 'Git', 'Linux', 'C++', 'Open edX']
  };

  return (
    <div className="experience">
      <div className="container">
        <header className="experience-header">
          <h1 className="page-title">Experience</h1>
          <p className="page-description">
            My professional journey and technical expertise
          </p>
        </header>

        <section className="timeline-section">
          <div className="timeline">
            {experiences.map((exp, _) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="experience-header-info">
                    <h3 className="experience-title">{exp.title}</h3>
                    <span className="experience-period">{exp.period}</span>
                  </div>
                  <div className="experience-company">
                    {exp.companyLink ? (
                      <a href={exp.companyLink} target="_blank" rel="noopener noreferrer" className="company-name">{exp.company}</a>
                    ) : (
                      <span className="company-name">{exp.company}</span>
                    )}
                  </div>
                  <p className="experience-description">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="experience-achievements">
                      <h4>Key Achievements:</h4>
                      <ul>
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx}>{renderAchievement(achievement, exp.links)}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="experience-technologies">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="skill-category">
                <h3 className="skill-category-title">{category}</h3>
                <div className="skill-tags">
                  {skillList.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Experience;
