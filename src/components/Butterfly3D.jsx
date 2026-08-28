import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

/* ── helpers ── */
const rand  = (a, b) => Math.random() * (b - a) + a
const randS = (s)    => rand(-s, s)

/* Generate a random screen-space waypoint in world coords */
function randomWP(camera) {
  const vFov = (camera.fov * Math.PI) / 180
  const hH   = Math.tan(vFov / 2) * camera.position.z * 0.88
  const hW   = hH * camera.aspect * 0.88
  return new THREE.Vector3(randS(hW), rand(-hH * 0.55, hH * 0.82), randS(0.6))
}

/* Catmull-Rom spline point */
function catmull(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t
  const cr = (a, b, c, d) =>
    0.5 * ((-a + 3*b - 3*c + d)*t3 + (2*a - 5*b + 4*c - d)*t2 + (-a + c)*t + 2*b)
  return new THREE.Vector3(
    cr(p0.x, p1.x, p2.x, p3.x),
    cr(p0.y, p1.y, p2.y, p3.y),
    cr(p0.z, p1.z, p2.z, p3.z),
  )
}

export default function Butterfly3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    /* ── renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    /* ── camera ── */
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 500)
    camera.position.z = 5

    /* ── scene ── */
    const scene = new THREE.Scene()

    const ambLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambLight)

    const sunLight = new THREE.DirectionalLight(0xfff8e8, 2.2)
    sunLight.position.set(3, 6, 4)
    scene.add(sunLight)

    const rimLight = new THREE.DirectionalLight(0xa3e635, 0.6)
    rimLight.position.set(-4, -2, 2)
    scene.add(rimLight)

    /* ── flight path ── */
    const RING = 8   // waypoint ring buffer size
    const wps  = Array.from({ length: RING }, () => randomWP(camera))
    let wpIdx  = 0   // current segment start
    let segT   = 0   // progress 0-1 along current segment
    const SEG_SECS = 2.0   // seconds per segment

    const getP4 = () => {
      const n = RING
      return [
        wps[((wpIdx - 1) % n + n) % n],
        wps[wpIdx % n],
        wps[(wpIdx + 1) % n],
        wps[(wpIdx + 2) % n],
      ]
    }

    const nextSeg = () => {
      wpIdx = (wpIdx + 1) % RING
      wps[(wpIdx + 3) % RING] = randomWP(camera)  // push fresh WP
      segT = 0
    }

    /* ── model state ── */
    let model      = null
    let mixer      = null
    let wingMeshes = []

    /* ── textures ── */
    const tl = new THREE.TextureLoader()
    const TX = {
      body:  tl.load('/butterfly/textures/BUTTBODY.jpeg'),
      face:  tl.load('/butterfly/textures/BUTTFACE.jpeg'),
      wingF: tl.load('/butterfly/textures/BUTTWIFR.jpeg'),
      wingB: tl.load('/butterfly/textures/BUTTWIBA.jpeg'),
      eyes:  tl.load('/butterfly/textures/EYES.jpeg'),
    }

    /* ── FBX loader ── */
    const fbxLoader = new FBXLoader()
    fbxLoader.load(
      '/butterfly/source/BUTTERFLY.fbx',
      (fbx) => {
        /* auto-scale */
        const box = new THREE.Box3().setFromObject(fbx)
        const sz  = box.getSize(new THREE.Vector3())
        const sc  = 1.3 / Math.max(sz.x, sz.y, sz.z)
        fbx.scale.setScalar(sc)
        fbx.position.sub(box.getCenter(new THREE.Vector3()).multiplyScalar(sc))

        /* apply textures */
        fbx.traverse((c) => {
          if (!c.isMesh) return
          const nm = (c.name || '').toLowerCase()
          let tx = TX.body
          if (nm.includes('wing') && nm.includes('front')) tx = TX.wingF
          else if (nm.includes('wing') && nm.includes('back')) tx = TX.wingB
          else if (nm.includes('wing')) tx = TX.wingF
          else if (nm.includes('face')) tx = TX.face
          else if (nm.includes('eye'))  tx = TX.eyes

          c.material = new THREE.MeshStandardMaterial({
            map: tx, side: THREE.DoubleSide,
            roughness: 0.5, metalness: 0.05,
            transparent: true, alphaTest: 0.05,
          })
          if (nm.includes('wing')) wingMeshes.push(c)
        })

        /* embedded animation */
        if (fbx.animations && fbx.animations.length > 0) {
          mixer = new THREE.AnimationMixer(fbx)
          fbx.animations.forEach(clip => mixer.clipAction(clip).play())
        }

        model = fbx
        model.position.copy(wps[0])
        scene.add(model)
      },
      undefined,
      (err) => {
        console.warn('FBX failed, using fallback:', err)
        model = makeFallback()
        model.position.copy(wps[0])
        scene.add(model)
      }
    )

    /* ── orientation helpers ── */
    const UP      = new THREE.Vector3(0, 1, 0)
    const prevPos = new THREE.Vector3()
    const qNow    = new THREE.Quaternion()
    const qGoal   = new THREE.Quaternion()
    const mBasis  = new THREE.Matrix4()
    let flapPhase = 0

    /* ── animation loop ── */
    let t = 0, last = 0

    const loop = (now) => {
      const raf = requestAnimationFrame(loop)
      const dt  = Math.min((now - last) / 1000, 0.05)
      last = now
      t   += dt

      if (mixer) mixer.update(dt)

      if (model) {
        /* advance spline */
        segT += dt / SEG_SECS
        if (segT >= 1) nextSeg()
        const tClamp = Math.min(segT, 1)

        const [p0, p1, p2, p3] = getP4()
        const pos      = catmull(p0, p1, p2, p3, tClamp)
        const posAhead = catmull(p0, p1, p2, p3, Math.min(tClamp + 0.025, 1))

        /* smooth position */
        model.position.lerp(pos, Math.min(dt * 7, 1))

        /* orientation: face travel direction */
        const dir = posAhead.clone().sub(pos)
        if (dir.lengthSq() > 1e-6) {
          dir.normalize()
          const right = new THREE.Vector3().crossVectors(dir, UP)
          if (right.lengthSq() < 1e-6) right.set(1, 0, 0)
          right.normalize()
          const newUp = new THREE.Vector3().crossVectors(right, dir)
          mBasis.makeBasis(right, newUp, dir.clone().negate())
          qGoal.setFromRotationMatrix(mBasis)

          /* bank into turns */
          const lateral = right.dot(new THREE.Vector3().subVectors(posAhead, pos).normalize())
          const bankQ   = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), lateral * 0.9)
          qGoal.multiply(bankQ)

          qNow.slerp(qGoal, Math.min(dt * 5, 1))
          model.quaternion.copy(qNow)
        }

        /* micro body wobble */
        const pitchWobble = Math.sin(t * 2.1) * 0.04
        const rollWobble  = Math.sin(t * 3.3) * 0.03
        model.rotateX(pitchWobble * dt * 8)
        model.rotateZ(rollWobble  * dt * 8)

        /* wing flap */
        const speed    = pos.distanceTo(prevPos) / (dt + 0.0001)
        const flapRate = Math.max(6, Math.min(12, 6 + speed * 1.5))
        flapPhase += dt * flapRate
        const flapAng  = (Math.sin(flapPhase) * 0.5 + 0.5) * (Math.PI * 0.46)

        if (!mixer && wingMeshes.length > 0) {
          wingMeshes.forEach((m, i) => {
            m.rotation.y = i % 2 === 0 ? flapAng : -flapAng
          })
        }

        prevPos.copy(pos)
      }

      renderer.render(scene, camera)
      return raf
    }
    const rafId = loop(0)

    /* ── resize ── */
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      for (let i = 0; i < wps.length; i++) wps[i] = randomWP(camera)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        pointerEvents: 'none', width: '100%', height: '100%',
      }}
    />
  )
}

/* ── Procedural fallback ── */
function makeFallback() {
  const g  = new THREE.Group()
  const OC = new THREE.Color('#f97316')
  const IC = new THREE.Color('#b45309')

  const wing = (s) => {
    const sh = new THREE.Shape()
    sh.moveTo(0, 0)
    sh.bezierCurveTo(s*.15,.5, s*.9,.85, s*1.05,.25)
    sh.bezierCurveTo(s*.95,-.1, s*.55,0, s*.55,-.45)
    sh.bezierCurveTo(s*.5,-.7, s*.15,-.6, 0, 0)
    const geo = new THREE.ShapeGeometry(sh, 12)
    const pos = geo.attributes.position
    const col = new Float32Array(pos.count * 3)
    for (let i = 0; i < pos.count; i++) {
      const d = Math.hypot(pos.getX(i), pos.getY(i))
      const c = OC.clone().lerp(IC, 1 - Math.min(d / 1.1, 1))
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
      vertexColors: true, side: THREE.DoubleSide, transparent: true, opacity: 0.92,
    }))
    m.name = s > 0 ? 'wing_right' : 'wing_left'
    return m
  }

  const lw = wing(-1); lw.position.x = -0.02; g.add(lw)
  const rw = wing( 1); rw.position.x =  0.02; g.add(rw)
  g.add(new THREE.Mesh(
    new THREE.CapsuleGeometry(0.06, 0.7, 4, 8),
    new THREE.MeshStandardMaterial({ color: '#1c0a00' })
  ))
  return g
}
