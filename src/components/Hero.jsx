export default function Hero() {
  return (
    <section id="home" className="hero section" style={{ position: 'relative' }}>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-name">Shubhan Bora</h1>
            <h2 className="hero-title">BCA Student and Aspiring Developer</h2>
            <p className="hero-description">
              Passionate about technology and programming, I'm on a journey to master
              web development and create innovative solutions that make a difference.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary"
                 onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
                Contact Me
              </a>
              <a href="#about" className="btn btn-secondary"
                 onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}>
                About Me
              </a>
            </div>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/shubhan-bora-023062395" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                <i className="fab fa-linkedin" />
              </a>
              <a href="https://www.youtube.com/@Endofearth2" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube">
                <i className="fab fa-youtube" />
              </a>
              <a href="mailto:shubhan121b@gmail.com" className="social-icon" aria-label="Email">
                <i className="fas fa-envelope" />
              </a>
              <a href="https://github.com/shubhanbora" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                <i className="fab fa-github" />
              </a>
              <a href="https://instagram.com/shubhanborah" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-container">
              <img src="/profile.webp" alt="Shubhan Bora" />
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow"><i className="fas fa-chevron-down" /></div>
      </div>
    </section>
  )
}
