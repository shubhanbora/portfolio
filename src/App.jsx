import { SylvaLivingWorldScene } from '@designcodeio/threeui'
import '@designcodeio/threeui/style.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Butterfly3D from './components/Butterfly3D'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={theme === 'light' ? 'light-theme' : ''}>
      {/* ── Live Sylva moss-root background ── */}
      <div className="scene-bg" style={{ pointerEvents: 'auto' }}>
        <SylvaLivingWorldScene variant="living-green" />
      </div>
      <div className="scene-overlay" />

      {/* ── Global scroll-driven butterfly ── */}
      <Butterfly3D />

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
