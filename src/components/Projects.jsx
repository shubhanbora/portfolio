import { useState, useRef } from 'react'

const projects = [
  {
    title: 'Wisdawn',
    edition: '01',
    sub: 'React Platform',
    desc: 'A modern web platform built with React to present content and services in a polished, user-friendly experience.',
    img: '/wisdawn.png',
    tags: ['React', 'Web App', 'UI/UX'],
    live: 'https://www.wisdawn.in/',
    repo: 'https://github.com/rstdax/Wisdawn-React-New',
    cover: '#1d4ed8',          // book cover bg
    accent: '#93c5fd',         // light accent on cover
    symbol: 'fa-layer-group',  // decorative icon
  },
  {
    title: 'Jeeva Life',
    edition: '02',
    sub: 'Firebase App',
    desc: 'A lifestyle-focused web project showcasing a clean interface and smooth digital experience for users.',
    img: '/jeevalife.png',
    tags: ['Firebase', 'React', 'Frontend'],
    live: 'https://jeevalife-f393a.web.app/',
    repo: 'https://github.com/rstdax/jeevalife-rst',
    cover: '#15803d',
    accent: '#86efac',
    symbol: 'fa-leaf',
  },
  {
    title: 'The Local Guide',
    edition: '03',
    sub: 'Discovery App',
    desc: 'A comprehensive local guide that helps users discover local businesses, attractions, and services.',
    img: '/local guid.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://shubhanbora.github.io/The-Local-Guide/',
    repo: 'https://github.com/shubhanbora/The-Local-Guide',
    cover: '#92400e',
    accent: '#fcd34d',
    symbol: 'fa-map-marked-alt',
  },
  {
    title: 'Retro Snake AI',
    edition: '04',
    sub: 'AI Game',
    desc: 'A classic retro-style Snake game enhanced with AI pathfinding algorithms and pixel art graphics.',
    img: '/retro.png',
    tags: ['JavaScript', 'Canvas', 'AI'],
    live: 'https://shubhanbora.github.io/retro-snake-ai/',
    repo: 'https://github.com/shubhanbora/retro-snake-ai',
    cover: '#5b21b6',
    accent: '#c4b5fd',
    symbol: 'fa-robot',
  },
]

export default function Projects() {
  const [active, setActive] = useState(0)
  const p = projects[active]

  return (
    <section id="projects" className="section proj-section">
      <div className="container">
        <div className="section-header">
          <h2>My Projects</h2>
          <p>Websites and applications I've built</p>
        </div>
      </div>

      {/* ── Shelf stage ── */}
      <div className="proj-shelf-stage">

        {/* Books row */}
        <div className="proj-books-row">
          {projects.map((pr, i) => {
            const offset = i - active
            const abs = Math.abs(offset)
            const sign = Math.sign(offset)
            // 3D perspective per book
            const tx   = sign * abs * 12   // slight lateral shift for non-active
            const roty = sign * (abs === 0 ? 0 : Math.min(abs * 14, 38))
            const scale = abs === 0 ? 1 : 1 - abs * 0.08
            const brightness = abs === 0 ? 1 : 1 - abs * 0.22

            return (
              <button
                key={pr.title}
                className={`proj-book ${i === active ? 'proj-book--active' : ''}`}
                style={{
                  '--cover': pr.cover,
                  '--accent': pr.accent,
                  transform: `translateX(${tx}px) rotateY(${roty}deg) scale(${scale})`,
                  filter: `brightness(${brightness})`,
                  zIndex: abs === 0 ? 10 : 10 - abs,
                }}
                onClick={() => setActive(i)}
                aria-label={pr.title}
              >
                {/* edition badge */}
                <span className="book-ed">{pr.edition} / 2024</span>

                {/* geometric decoration */}
                <div className="book-art">
                  <div className="book-art-circle" />
                  <div className="book-art-ring" />
                  <i className={`fas ${pr.symbol} book-art-icon`} />
                </div>

                {/* bottom title strip */}
                <div className="book-footer">
                  <span className="book-title">{pr.title}</span>
                  <span className="book-sub">{pr.sub}</span>
                </div>

                {/* left spine shadow */}
                <div className="book-spine" />
              </button>
            )
          })}
        </div>

        {/* Wooden shelf */}
        <div className="proj-shelf-board" />

      </div>

      {/* ── Detail panel ── */}
      <div className="container">
        <div className="proj-detail glass" style={{ borderColor: `${p.cover}66` }}>

          {/* screenshot */}
          <div className="proj-detail-img" style={{ borderColor: `${p.cover}44` }}>
            <img src={p.img} alt={p.title} />
          </div>

          {/* info */}
          <div className="proj-detail-info">
            <p className="proj-detail-ed" style={{ color: p.accent }}>
              {p.edition} / 2024 — {p.sub}
            </p>
            <h3 className="proj-detail-title">{p.title}</h3>
            <p className="proj-detail-desc">{p.desc}</p>

            <div className="project-tech">
              {p.tags.map(t => (
                <span key={t} className="tech-tag"
                  style={{ borderColor: `${p.accent}55`, color: p.accent }}>
                  {t}
                </span>
              ))}
            </div>

            <div className="proj-detail-links">
              <a href={p.live} target="_blank" rel="noreferrer"
                className="btn btn-primary"
                style={{ background: p.cover, color: '#fff', boxShadow: `0 0 22px ${p.cover}66` }}>
                <i className="fas fa-external-link-alt" style={{ marginRight: '.5rem' }} />
                Live Demo
              </a>
              <a href={p.repo} target="_blank" rel="noreferrer"
                className="btn btn-secondary"
                style={{ borderColor: p.accent, color: p.accent }}>
                <i className="fab fa-github" style={{ marginRight: '.5rem' }} />
                GitHub
              </a>
            </div>
          </div>

        </div>

        {/* dot nav */}
        <div className="proj-dots">
          {projects.map((pr, i) => (
            <button key={i}
              className={`film-dot ${i === active ? 'film-dot--on' : ''}`}
              style={i === active ? { background: pr.accent } : {}}
              onClick={() => setActive(i)}
              aria-label={pr.title}
            />
          ))}
        </div>
      </div>

    </section>
  )
}
