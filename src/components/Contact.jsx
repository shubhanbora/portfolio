const contacts = [
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    display: 'shubhan121b@gmail.com',
    href: 'mailto:shubhan121b@gmail.com?subject=Hello%20Shubhan%20-%20Portfolio%20Inquiry',
  },
  {
    icon: 'fab fa-instagram',
    label: 'Instagram',
    display: '@shubhanborah',
    href: 'https://instagram.com/shubhanborah',
  },
  {
    icon: 'fab fa-linkedin',
    label: 'LinkedIn',
    display: 'shubhan-bora-023062395',
    href: 'https://www.linkedin.com/in/shubhan-bora-023062395',
  },
  {
    icon: 'fab fa-youtube',
    label: 'YouTube',
    display: '@Endofearth2',
    href: 'https://www.youtube.com/@Endofearth2',
  },
  {
    icon: 'fab fa-github',
    label: 'GitHub',
    display: 'github.com/shubhanbora',
    href: 'https://github.com/shubhanbora',
  },
  {
    icon: 'fas fa-map-marker-alt',
    label: 'Location',
    display: 'Assam, Nagaon, Rupahi Gatanga — 782125',
    href: null,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Contact Me</h2>
          <p>Send me a message or connect with me</p>
        </div>
        <div className="contact-grid">
          {contacts.map(c => (
            <div key={c.label} className="contact-item glass">
              <div className="contact-icon">
                <i className={c.icon} />
              </div>
              <h3>{c.label}</h3>
              <p>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">
                    {c.display}
                  </a>
                ) : c.display}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
