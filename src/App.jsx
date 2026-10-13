import { SylvaLivingWorldScene } from '@designcodeio/threeui'
import '@designcodeio/threeui/style.css'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={theme === 'light' ? 'light-theme' : ''}>

      {/* ── Hairline loader — covers page until minTime + assets ready ── */}
      {!loaded && (
        <Loader
          minTime={3.5}
          background="#050e05"
          textColor="#4ade80"
          onComplete={() => setLoaded(true)}
        />
      )}

      {/* ── Live Sylva moss-root background ── */}
      <div className="scene-bg" style={{ pointerEvents: 'auto' }}>
        <SylvaLivingWorldScene variant="living-green" />
      </div>
      <div className="scene-overlay" />

      {/* ── Page content ── */}
      <div className="page">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
