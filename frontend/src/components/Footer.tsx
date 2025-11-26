import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Muhamed Cicak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
