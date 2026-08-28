export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo"><a href="#home">Shubhan.dev</a></div>
            <p className="footer-bio">
              BCA student passionate about web development and creating innovative solutions.
            </p>
            <div className="footer-social">
              {[
                ['fab fa-linkedin',  'https://www.linkedin.com/in/shubhan-bora-023062395', 'LinkedIn'],
                ['fab fa-github',    'https://github.com/shubhanbora',                     'GitHub'],
                ['fab fa-youtube',   'https://www.youtube.com/@Endofearth2',               'YouTube'],
                ['fab fa-instagram', 'https://instagram.com/shubhanborah',                 'Instagram'],
                ['fas fa-envelope',  'mailto:shubhan121b@gmail.com',                       'Email'],
              ].map(([icon, href, label]) => (
                <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'}
                   rel="noreferrer" className="social-icon" aria-label={label}>
                  <i className={icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {['home','about','skills','projects','gallery','contact'].map(id => (
                <li key={id}>
                  <a href={`#${id}`}
                     onClick={e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Education</h4>
            <p>Anandaram Dhekial Phookan College</p>
            <p>Assam, India</p>
            <p>shubhan121b@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Shubhan Bora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
