import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <NavLink to="/" end>Home</NavLink>
        </div>
        <ul className="nav-links">
          <li><NavLink to="/blog">Blog</NavLink></li>
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><NavLink to="/experience">Experience</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
