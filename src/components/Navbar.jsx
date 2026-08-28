import { useState, useEffect } from 'react'

const links = ['Home','About','Skills','Projects','Gallery','Contact']

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header className="navbar" style={scrolled ? { background: 'var(--glass-b)' } : {}}>
      <div className="logo">
        <a href="#home">Shubhan.dev</a>
      </div>

      <nav className={`nav-menu ${open ? 'open' : ''}`}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
             onClick={e => { e.preventDefault(); scrollTo(l) }}>
            {l}
          </a>
        ))}
      </nav>

      <div className="nav-controls">
        <div className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          <i className={`fas fa-${theme === 'dark' ? 'moon' : 'sun'}`} />
        </div>
        <button className="mobile-menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
          <i className={`fas fa-${open ? 'times' : 'bars'}`} />
        </button>
      </div>
    </header>
  )
}
