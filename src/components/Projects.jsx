import { useState } from 'react'

const projects = [
  {
    title: 'Wisdawn',
    edition: '01 / 2024',
    sub: 'React Platform',
    desc: 'A modern web platform built with React to present content and services in a polished, user-friendly experience.',
    img: '/wisdawn.png',
    screenshots: ['/wisdawn.png', '/jeevalife.png', '/local guid.png', '/retro.png'],
    tags: ['React', 'Tailwind CSS', 'Firebase', 'React Router'],
    features: ['Clean & responsive UI', 'Authentication & user profile', 'Community & resources', 'Performance optimised'],
    live: 'https://www.wisdawn.in/',
    repo: 'https://github.com/rstdax/Wisdawn-React-New',
    cover: '#1d4ed8', accent: '#93c5fd', symbol: 'fa-layer-group',
  },
  {
    title: 'Jeeva Life',
    edition: '02 / 2024',
    sub: 'Firebase App',
    desc: 'A lifestyle-focused web project showcasing a clean interface and smooth digital experience for users.',
    img: '/jeevalife.png',
    screenshots: ['/jeevalife.png', '/wisdawn.png', '/retro.png', '/local guid.png'],
    tags: ['Firebase', 'React', 'Frontend', 'Auth'],
    features: ['Realtime data sync', 'User authentication', 'Responsive design', 'Cloud hosting'],
    live: 'https://jeevalife-f393a.web.app/',
    repo: 'https://github.com/rstdax/jeevalife-rst',
    cover: '#15803d', accent: '#86efac', symbol: 'fa-leaf',
  },
  {
    title: 'The Local Guide',
    edition: '03 / 2024',
    sub: 'Discovery App',
    desc: 'A comprehensive local guide application that helps users discover local businesses, attractions, and services.',
    img: '/local guid.png',
    screenshots: ['/local guid.png', '/wisdawn.png', '/jeevalife.png', '/retro.png'],
    tags: ['HTML', 'CSS', 'JavaScript', 'Maps API'],
    features: ['Local business listings', 'Search & filter', 'Interactive map', 'Mobile friendly'],
    live: 'https://shubhanbora.github.io/The-Local-Guide/',
    repo: 'https://github.com/shubhanbora/The-Local-Guide',
    cover: '#92400e', accent: '#fcd34d', symbol: 'fa-map-marked-alt',
  },
  {
    title: 'Retro Snake AI',
    edition: '04 / 2024',
    sub: 'Game',
    desc: 'A classic retro-style Snake game enhanced with AI pathfinding algorithms and pixel art graphics.',
    img: '/retro.png',
    screenshots: ['/retro.png', '/wisdawn.png', '/jeevalife.png', '/local guid.png'],
    tags: ['JavaScript', 'Canvas', 'AI', 'Pixel Art'],
    features: ['AI pathfinding', 'Pixel art graphics', 'Score tracking', 'Multiple difficulty levels'],
    live: 'https://shubhanbora.github.io/retro-snake-ai/',
    repo: 'https://github.com/shubhanbora/retro-snake-ai',
    cover: '#5b21b6', accent: '#c4b5fd', symbol: 'fa-robot',
  },
]

export default function Projects() {
  const [active, setActive]         = useState(0)
  const [activeShot, setActiveShot] = useState(0)
  const [showDetail, setShowDetail] = useState(true)

  const p    = projects[active]
  const prev = () => { setActive((active - 1 + projects.length) % projects.length); setActiveShot(0) }
  const next = () => { setActive((active + 1) % projects.length); setActiveShot(0) }

  return (
    <section id="projects" className="section proj-section">
      <div className="container">
        <div className="section-header">
          <h2>My Projects</h2>
          <p>Websites and applications I've built</p>
        </div>
      </div>

      {/* ── Book shelf row ── */}
      <div className="proj-shelf-stage">

        {/* Left arrow */}
        <button className="proj-shelf-arrow proj-shelf-arrow--l" onClick={prev} aria-label="Previous">
          <i className="fas fa-chevron-left" />
        </button>

        {/* Books */}
        <div className="proj-books-row">
          {projects.map((pr, i) => {
            const off   = i - active
            const abs   = Math.abs(off)
            const sign  = Math.sign(off)
            const tx    = sign * abs * 12
            const roty  = sign * Math.min(abs * 14, 38)
            const scale = 1 - abs * 0.08
            const bri   = 1 - abs * 0.22
            return (
              <button
                key={pr.title}
                className={`proj-book ${i === active ? 'proj-book--active' : ''}`}
                style={{
                  '--cover': pr.cover, '--accent': pr.accent,
                  transform: `translateX(${tx}px) rotateY(${roty}deg) scale(${scale})`,
                  filter: `brightness(${bri})`,
                  zIndex: abs === 0 ? 10 : 10 - abs,
                }}
                onClick={() => { setActive(i); setActiveShot(0); setShowDetail(true) }}
                aria-label={pr.title}
              >
                <span className="book-ed">{pr.edition}</span>
                <div className="book-art">
                  <div className="book-art-circle" />
                  <div className="book-art-ring" />
                  <i className={`fas ${pr.symbol} book-art-icon`} />
                </div>
                <div className="book-footer">
                  <span className="book-title">{pr.title}</span>
                  <span className="book-sub">{pr.sub}</span>
                </div>
                <div className="book-spine" />
              </button>
            )
          })}
        </div>

        {/* Wooden shelf */}
        <div className="proj-shelf-board" />

        {/* Right arrow */}
        <button className="proj-shelf-arrow proj-shelf-arrow--r" onClick={next} aria-label="Next">
          <i className="fas fa-chevron-right" />
        </button>

      </div>

      {/* ── Detail panel ── */}
      {showDetail && (
        <div className="container">
          <div className="proj-detail-panel glass" style={{ borderColor: `${p.cover}44` }}>

            {/* Close */}
            <button className="proj-detail-close" onClick={() => setShowDetail(false)} aria-label="Close">
              <i className="fas fa-times" />
            </button>

            {/* LEFT: thumbnail strip + main screenshot */}
            <div className="proj-detail-left">

              {/* Thumbnail strip */}
              <div className="proj-thumbs">
                {p.screenshots.slice(0, 4).map((s, i) => (
                  <button
                    key={i}
                    className={`proj-thumb ${i === activeShot ? 'proj-thumb--active' : ''}`}
                    style={i === activeShot ? { borderColor: p.accent } : {}}
                    onClick={() => setActiveShot(i)}
                  >
                    <img src={s} alt={`Screenshot ${i + 1}`} />
                  </button>
                ))}
                {p.screenshots.length > 4 && (
                  <div className="proj-thumb-more">+ {p.screenshots.length - 4} More Screenshots</div>
                )}
              </div>

              {/* Main screenshot */}
              <div className="proj-main-shot">
                <img src={p.screenshots[activeShot]} alt={p.title} />
              </div>

            </div>

            {/* RIGHT: info */}
            <div className="proj-detail-right">

              <p className="proj-detail-ed" style={{ color: p.accent }}>
                {p.edition} — {p.sub.toUpperCase()}
              </p>
              <h3 className="proj-detail-title">{p.title}</h3>
              <p className="proj-detail-desc">{p.desc}</p>

              {/* Tags */}
              <div className="project-tech" style={{ marginBottom: '1.2rem' }}>
                {p.tags.map(t => (
                  <span key={t} className="tech-tag"
                    style={{ borderColor: `${p.accent}55`, color: p.accent }}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="proj-features-links">
                {/* Key Features */}
                <div className="proj-features">
                  <p className="proj-feat-title" style={{ color: p.accent }}>
                    <i className="fas fa-check-circle" style={{ marginRight: '.4rem' }} />
                    Key Features
                  </p>
                  <ul>
                    {p.features.map(f => (
                      <li key={f}>
                        <i className="fas fa-check" style={{ color: p.accent, marginRight: '.5rem', fontSize: '.7rem' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="proj-links-col">
                  <p className="proj-feat-title" style={{ color: p.accent }}>
                    <i className="fas fa-link" style={{ marginRight: '.4rem' }} />
                    Links
                  </p>
                  <a href={p.live} target="_blank" rel="noreferrer"
                    className="proj-link-btn proj-link-btn--primary"
                    style={{ background: p.cover, boxShadow: `0 0 18px ${p.cover}55` }}>
                    <i className="fas fa-external-link-alt" />
                    Live Demo
                  </a>
                  <a href={p.repo} target="_blank" rel="noreferrer"
                    className="proj-link-btn proj-link-btn--secondary">
                    <i className="fab fa-github" />
                    GitHub
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Dots */}
          <div className="proj-dots">
            {projects.map((pr, i) => (
              <button key={i}
                className={`film-dot ${i === active ? 'film-dot--on' : ''}`}
                style={i === active ? { background: pr.accent } : {}}
                onClick={() => { setActive(i); setActiveShot(0); setShowDetail(true) }}
                aria-label={pr.title}
              />
            ))}
          </div>
        </div>
      )}

    </section>
  )
}
