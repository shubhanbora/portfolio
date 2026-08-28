export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <h2>About Me</h2>
          <p>Dedicated BCA student with a passion for learning and growth</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <h3>My Journey</h3>
            <p>
              I'm currently a 3rd-year BCA student passionate about web development
              and database management. My journey in computer applications has been
              exciting, exploring various technologies and working on real-world
              projects that challenge my skills and creativity.
            </p>
            <div className="info-cards">
              <div className="info-card glass">
                <div className="card-icon">🎓</div>
                <div className="card-content">
                  <h4>BCA Student</h4>
                  <p>Bachelor of Computer Applications</p>
                </div>
              </div>
              <div className="info-card glass">
                <div className="card-icon">📅</div>
                <div className="card-content">
                  <h4>Started August 2024</h4>
                  <p>Regular Offline Course</p>
                </div>
              </div>
              <div className="info-card glass">
                <div className="card-icon">📍</div>
                <div className="card-content">
                  <h4>Assam, India</h4>
                  <p>Nagaon, Rupahi Gatanga — 782125</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-image">
            <div className="college-card glass">
              <img
                src="/College Building of Anandaram Dhekial Phookan College Nagaon_Campus-View.avif"
                alt="Anandaram Dhekial Phookan College"
              />
              <div className="college-overlay">
                <h4>Anandaram Dhekial Phookan College</h4>
                <p>Location: Assam, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
