import { useEffect, useLayoutEffect, useRef } from 'react'

/* ── constants ── */
const REVEAL_S  = 1.3
const ED_HOLD_S = 1.8
const ED_FADE_S = 0.35
const TICKS     = 11
const INSET     = 6

/* ── helpers ── */
const edClamp     = (x) => (x < 0 ? 0 : x > 1 ? 1 : x)
const edSeg       = (x, a, b) => edClamp((x - a) / Math.max(1e-6, b - a))
const edOutCubic  = (x) => 1 - Math.pow(1 - x, 3)
const edInOutQuart= (x) => x < 0.5 ? 8*x*x*x*x : 1 - Math.pow(-2*x+2,4)/2

function edRand(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function edLoadCurve(seed, loadS) {
  const r = edRand(seed)
  const k = Math.min(1, loadS / 4.4)
  const chunks = []
  let total = 0
  for (let i = 0; i < 7; i++) {
    const size = 0.4 + r() * 1.2
    chunks.push({ size, start: r() * 0.78 * loadS, len: (0.25 + r() * 0.9) * k })
    total += size
  }
  chunks.push({ size: total * 0.12, start: loadS - 0.45 * k, len: 0.45 * k })
  total *= 1.12
  return (t) => {
    if (t >= loadS) return 1
    let p = 0
    for (const c of chunks) {
      const x = Math.min(1, Math.max(0, (t - c.start) / Math.max(1e-3, c.len)))
      p += c.size * x * x * (3 - 2 * x)
    }
    return Math.min(0.999, p / total)
  }
}

function edRealLoad() {
  if (typeof document === 'undefined') return 1
  if (document.readyState === 'complete') return 1
  const imgs = document.images
  let done = 0
  for (let i = 0; i < imgs.length; i++) if (imgs[i].complete) done++
  const frac  = imgs.length ? done / imgs.length : 1
  const fonts = document.fonts && document.fonts.status === 'loaded' ? 1 : 0
  return Math.min(0.95, 0.15 + 0.6 * frac + 0.2 * fonts)
}

const useEdLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

function useEditorialLoader(rootRef, sceneRef, optsRef) {
  useEdLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = root.offsetWidth, h = root.offsetHeight
    let t = 0, progress = 0, revealAt = -1, finished = false
    let loadS = 1, curve = edLoadCurve(7, 1)

    const draw = (dt) => {
      const revealS = reduced ? 0.4 : sceneRef.current.revealS
      const reveal  = revealAt < 0 ? 0 : edClamp((t - revealAt) / revealS)
      const phase   = revealAt < 0 ? 'loading' : reveal < 1 ? 'reveal' : 'page'
      try { sceneRef.current.frame({ t, dt, progress, reveal, phase, w, h }) }
      catch(e) { console.error(e) }
    }

    const restart = () => {
      loadS    = reduced ? 0.6 : Math.max(0.5, optsRef.current.minTime)
      curve    = edLoadCurve(7, loadS)
      t        = 0; progress = 0; revealAt = -1
      sceneRef.current.reset?.()
    }
    restart(); draw(0)

    const ro = new ResizeObserver(() => {
      w = root.offsetWidth; h = root.offsetHeight
      if (!finished) draw(0)
    })
    ro.observe(root)

    let raf = 0, last = -1
    const tick = (now) => {
      const dt = last < 0 ? 0 : Math.min(0.05, (now - last) / 1000)
      last = now; t += dt

      const revealS = reduced ? 0.4 : sceneRef.current.revealS
      if (revealAt < 0) {
        const target = Math.min(curve(t), edRealLoad())
        progress = target >= 1 ? 1 : Math.min(target, progress + dt * 1.5)
        if (progress >= 1 && t >= loadS) revealAt = t
      }
      draw(dt)

      if (revealAt >= 0 && t - revealAt >= revealS) {
        finished = true
        root.style.transition = `opacity ${ED_FADE_S}s ease`
        root.style.opacity    = '0'
        root.style.pointerEvents = 'none'
        window.setTimeout(() => { root.style.visibility = 'hidden' }, ED_FADE_S * 1000)
        optsRef.current.onComplete?.()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])
}

/* ── Loader component ── */
export default function Loader({ minTime = 4, background = '#050e05', textColor = '#4ade80', onComplete }) {
  const rootRef   = useRef(null)
  const topRef    = useRef(null)
  const bottomRef = useRef(null)
  const scaleRef  = useRef(null)
  const ruleRef   = useRef(null)
  const countRef  = useRef(null)
  const numRef    = useRef(null)
  const tickRefs  = useRef([])

  const optsRef = useRef({ minTime, onComplete })
  optsRef.current = { minTime, onComplete }

  const sceneRef = useRef({
    revealS: REVEAL_S,
    frame() {},
  })

  sceneRef.current = {
    revealS: REVEAL_S,
    frame({ t, progress, reveal }) {
      const scale = scaleRef.current
      if (scale) scale.style.opacity = String(edOutCubic(edSeg(t, 0.05, 0.7)) * (1 - edSeg(reveal, 0, 0.18)))

      const rule = ruleRef.current
      if (rule) rule.style.transform = `scaleX(${progress})`

      const count = countRef.current
      if (count) count.style.transform = `translateX(calc(${progress*(100-2*INSET)}cqw - ${progress*100}%))`

      const num = numRef.current
      const digits = String(Math.round(progress * 100))
      if (num && num.textContent !== digits) num.textContent = digits

      for (let k = 0; k < TICKS; k++) {
        const tick = tickRefs.current[k]
        if (tick) tick.style.opacity = String(0.25 + 0.75 * edSeg(progress, k/(TICKS-1)-0.02, k/(TICKS-1)))
      }

      const part   = edInOutQuart(edSeg(reveal, 0.1, 1))
      const top    = topRef.current
      if (top)    top.style.transform    = `translateY(${-100 * part}%)`
      const bottom = bottomRef.current
      if (bottom) bottom.style.transform = `translateY(${100 * part}%)`
    },
  }

  useEditorialLoader(rootRef, sceneRef, optsRef)

  const small = {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    fontSize: 'max(10px, 1.3cqh)',
    letterSpacing: '0.06em',
    fontVariantNumeric: 'tabular-nums',
  }
  const line = {
    position: 'absolute',
    left: `${INSET}cqw`, right: `${INSET}cqw`,
    top: '50%', height: 1,
    background: textColor,
  }

  return (
    <div
      ref={rootRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        width: '100%', height: '100%',
        minWidth: 0, minHeight: 0,        /* remove 1200×800 minimum */
        overflow: 'hidden',
        containerType: 'size',
        isolation: 'isolate',
      }}
    >
      {/* curtain halves */}
      <div ref={topRef}    style={{ position:'absolute', left:0, right:0, top:0,    height:'calc(50% + 1px)', background }} />
      <div ref={bottomRef} style={{ position:'absolute', left:0, right:0, top:'50%', bottom:0,                 background }} />

      {/* progress UI */}
      <div ref={scaleRef} aria-hidden="true"
        style={{ position:'absolute', inset:0, color:textColor, opacity:0 }}>

        {/* baseline rule (faint) */}
        <div style={{ ...line, opacity: 0.18 }} />
        {/* progress bar */}
        <div ref={ruleRef} style={{ ...line, transformOrigin:'0 50%', transform:'scaleX(0)' }} />

        {/* tick marks */}
        {Array.from({ length: TICKS }, (_, k) => (
          <div key={k} ref={el => { tickRefs.current[k] = el }}
            style={{
              position:'absolute',
              top:'calc(50% + 0.9cqh)',
              left:`${INSET + (k*(100-2*INSET))/(TICKS-1)}cqw`,
              transform:'translateX(-50%)',
              display:'flex', flexDirection:'column', alignItems:'center',
              opacity: 0.25,
              ...small,
            }}>
            <div style={{ width:1, height: k%5===0 ? '1.8cqh' : '0.9cqh', background:textColor }} />
            <div style={{ marginTop:'0.9cqh' }}>{k*10}</div>
          </div>
        ))}

        {/* percentage counter */}
        <div ref={countRef}
          style={{
            position:'absolute',
            left:`${INSET}cqw`,
            bottom:'calc(50% + 1.8cqh)',
            display:'flex', alignItems:'flex-start',
            whiteSpace:'nowrap',
            fontFamily:'"Instrument Serif","Times New Roman",Times,serif',
            fontWeight: 400,
            fontSize: 'min(14cqh, 18vw)',
            fontVariantNumeric:'tabular-nums',
            color: textColor,
          }}>
          <span ref={numRef}>0</span>
          <span style={{ fontSize:'0.3em', fontStyle:'italic', marginTop:'0.2em', marginLeft:'0.08em' }}>%</span>
        </div>

      </div>
    </div>
  )
}
