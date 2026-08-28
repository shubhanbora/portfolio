import { useState } from 'react'

const skills = [
  { name: 'Python',          sub: 'Backend & Automation',    icon: 'fab fa-python',          pct: 80, num: '01', bg: 'linear-gradient(160deg,#1a2a4a 0%,#0d1b2e 100%)', accent: '#3776AB' },
  { name: 'Web Dev',         sub: 'HTML · CSS · JavaScript', icon: 'fab fa-html5',            pct: 75, num: '02', bg: 'linear-gradient(160deg,#2a1a0e 0%,#1a0d06 100%)', accent: '#E34F26' },
  { name: 'Firebase',        sub: 'Realtime · Auth · Cloud', icon: 'fas fa-fire',             pct: 70, num: '03', bg: 'linear-gradient(160deg,#2a2200 0%,#1a1500 100%)', accent: '#FFCA28' },
  { name: 'GitHub',          sub: 'Version Control · CI',    icon: 'fab fa-github',           pct: 85, num: '04', bg: 'linear-gradient(160deg,#141414 0%,#0a0a0a 100%)', accent: '#e0e0e0' },
  { name: 'Supabase',        sub: 'Postgres · Auth · API',   icon: 'fas fa-database',         pct: 65, num: '05', bg: 'linear-gradient(160deg,#0a2a1e 0%,#051510 100%)', accent: '#3ECF8E' },
  { name: 'Netlify',         sub: 'Deploy · CDN · CI',       icon: 'fas fa-cloud-upload-alt', pct: 75, num: '06', bg: 'linear-gradient(160deg,#001a1a 0%,#000d0d 100%)', accent: '#00C7B7' },
  { name: 'Vercel',          sub: 'Serverless · Edge',       icon: 'fas fa-bolt',             pct: 70, num: '07', bg: 'linear-gradient(160deg,#1a1a1a 0%,#0d0d0d 100%)', accent: '#ffffff' },
  { name: 'C Programming',   sub: 'Algorithms · Systems',    icon: 'fas fa-code',             pct: 75, num: '08', bg: 'linear-gradient(160deg,#0e1a2a 0%,#060d15 100%)', accent: '#4ade80' },
  { name: 'SQL',             sub: 'Queries · Databases',     icon: 'fas fa-table',            pct: 70, num: '09', bg: 'linear-gradient(160deg,#1a0a2a 0%,#0d0515 100%)', accent: '#a78bfa' },
  { name: 'Hostinger',       sub: 'Hosting · Domains',       icon: 'fas fa-globe',            pct: 65, num: '10', bg: 'linear-gradient(160deg,#1a0a2a 0%,#0d0515 100%)', accent: '#673DE6' },
]

export default function Skills() {
  const [active, setActive] = useState(0)
  const total = skills.length

  const prev = () => setActive((active - 1 + total) % total)
  const next = () => setActive((active + 1) % total)

  // positions: active=0, neighbors ±1,±2,±3 ...
  const getStyle = (i) => {
    let offset = i - active
    // wrap around
    if (offset > total / 2)  offset -= total
    if (offset < -total / 2) offset += total

    const abs = Math.abs(offset)
    const sign = Math.sign(offset)

    if (abs > 4) return { display: 'none' }

    // bigger spread for desktop-sized cards
    const tx   = sign * (abs === 0 ? 0 : 170 + (abs - 1) * 120)  // wider gaps
    const tz   = -(abs * 90)
    const roty = sign * (abs === 0 ? 0 : -(20 + (abs - 1) * 6))
    const scale = abs === 0 ? 1 : abs === 1 ? 0.78 : abs === 2 ? 0.62 : 0.50
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.72 : abs === 2 ? 0.48 : 0.28
    const zIndex = 10 - abs

    return {
      transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${roty}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: 'all .45s cubic-bezier(.4,0,.2,1)',
    }
  }

  const s = skills[active]

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-header">
          <h2>Core Skills</h2>
          <p>Programming, web development, and deployment tools</p>
        </div>
      </div>

      {/* Filmstrip stage */}
      <div className="filmstrip-stage" onClick={(e) => {
        // click left half → prev, right half → next
        const rect = e.currentTarget.getBoundingClientRect()
        if (e.clientX < rect.left + rect.width / 2) prev(); else next()
      }}>
        <div className="filmstrip-rail">
          {skills.map((sk, i) => (
            <div
              key={sk.name}
              className={`film-card ${i === active ? 'film-card--active' : ''}`}
              style={{ ...getStyle(i), background: sk.bg }}
              onClick={(e) => { e.stopPropagation(); setActive(i) }}
            >
              {/* number badge */}
              <div className="fc-num" style={{ borderColor: sk.accent, color: sk.accent }}>{sk.num}</div>

              {/* big icon center */}
              <div className="fc-icon-wrap">
                <i className={sk.icon} style={{ color: sk.accent }} />
              </div>

              {/* bottom info strip */}
              <div className="fc-info">
                <div className="fc-info-name">{sk.name}</div>
                <div className="fc-info-sub">{sk.sub}</div>
                {/* progress bar */}
                <div className="fc-bar-bg">
                  <div className="fc-bar-fill" style={{ width: `${sk.pct}%`, background: sk.accent }} />
                </div>
                <div className="fc-pct" style={{ color: sk.accent }}>{sk.pct}%</div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button className="film-arrow film-arrow--left"  onClick={(e)=>{e.stopPropagation();prev()}} aria-label="Previous">
          <i className="fas fa-chevron-left" />
        </button>
        <button className="film-arrow film-arrow--right" onClick={(e)=>{e.stopPropagation();next()}} aria-label="Next">
          <i className="fas fa-chevron-right" />
        </button>

        {/* Dot indicators */}
        <div className="film-dots">
          {skills.map((_, i) => (
            <button
              key={i}
              className={`film-dot ${i === active ? 'film-dot--on' : ''}`}
              onClick={(e) => { e.stopPropagation(); setActive(i) }}
              style={i === active ? { background: s.accent } : {}}
              aria-label={`Skill ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
