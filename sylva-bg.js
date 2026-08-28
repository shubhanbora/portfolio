/**
 * Sylva Living World — Living Green
 * Procedural Three.js r149 background scene
 * Moss roots · pollen drift · pointer parallax · scan-light entrance
 */
(function () {
  'use strict';

  // ─── skip on reduced-motion ──────────────────────────────────────────────
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── canvas setup ────────────────────────────────────────────────────────
  const canvas = document.createElement('canvas');
  canvas.id = 'sylva-canvas';
  Object.assign(canvas.style, {
    position: 'fixed', top: 0, left: 0,
    width: '100%', height: '100%',
    zIndex: '-1', pointerEvents: 'none',
    display: 'block',
  });
  document.body.prepend(canvas);

  // ─── Three.js bootstrap (CDN r149) ───────────────────────────────────────
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r149/three.min.js';
  script.onload = init;
  document.head.appendChild(script);

  // ─── pointer state ───────────────────────────────────────────────────────
  const pointer = { x: 0, y: 0, nx: 0, ny: 0 }; // normalised –1..1
  window.addEventListener('mousemove', e => {
    pointer.nx = (e.clientX / window.innerWidth)  * 2 - 1;
    pointer.ny = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });
  window.addEventListener('touchmove', e => {
    const t = e.touches[0];
    pointer.nx = (t.clientX / window.innerWidth)  * 2 - 1;
    pointer.ny = (t.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  // ─── main ─────────────────────────────────────────────────────────────────
  function init() {
    const THREE = window.THREE;
    const W = window.innerWidth, H = window.innerHeight;

    // renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x0a120a);
    renderer.shadowMap.enabled = false;

    // scene + camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0d1a0d, 0.055);

    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 120);
    camera.position.set(0, 2.2, 7);
    camera.lookAt(0, 0.5, 0);

    // ── Textures (CanvasTexture — no binary assets) ───────────────────────

    /** Moss / ground texture */
    function makeMossTexture(size) {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const ctx = c.getContext('2d');
      // base deep green
      ctx.fillStyle = '#0d1a0a';
      ctx.fillRect(0, 0, size, size);
      // mossy patches
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * size, y = Math.random() * size;
        const r = Math.random() * 5 + 1;
        const g = Math.floor(50 + Math.random() * 80);
        const gr = Math.floor(20 + Math.random() * 40);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${gr},${g},${gr})`;
        ctx.fill();
      }
      // fine grain
      for (let i = 0; i < 12000; i++) {
        const x = Math.random() * size, y = Math.random() * size;
        const v = Math.floor(Math.random() * 30 + 10);
        ctx.fillStyle = `rgba(${v*2},${v*3},${v*2},0.35)`;
        ctx.fillRect(x, y, 1, 1);
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(6, 6);
      return tex;
    }

    /** Bark / root texture */
    function makeRootTexture(size) {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#0c150a';
      ctx.fillRect(0, 0, size, size);
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * size;
        ctx.strokeStyle = `rgba(${20+Math.random()*30},${40+Math.random()*50},${10+Math.random()*20},0.6)`;
        ctx.lineWidth = Math.random() * 3 + 0.5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        for (let y = 0; y < size; y += 8) {
          ctx.lineTo(x + (Math.random() - 0.5) * 12, y);
        }
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(1, 3);
      return tex;
    }

    /** Leaf / fern alpha texture */
    function makeLeafTexture(size) {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, size, size);
      const mid = size / 2;
      // stem
      ctx.strokeStyle = '#1a3a10';
      ctx.lineWidth = size * 0.04;
      ctx.beginPath();
      ctx.moveTo(mid, size * 0.95);
      ctx.quadraticCurveTo(mid + size * 0.1, size * 0.5, mid - size * 0.05, size * 0.05);
      ctx.stroke();
      // leaflets
      for (let i = 0; i < 7; i++) {
        const t = (i + 1) / 8;
        const cx = mid + Math.sin(t * Math.PI) * size * 0.08;
        const cy = size * (0.9 - t * 0.82);
        const side = i % 2 === 0 ? 1 : -1;
        ctx.fillStyle = `rgba(30,80,15,${0.6 + t * 0.3})`;
        ctx.beginPath();
        ctx.ellipse(cx + side * size * 0.18, cy, size * 0.18, size * 0.06, side * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      const tex = new THREE.CanvasTexture(c);
      return tex;
    }

    /** Pollen / spore particle texture */
    function makePollenTexture(size) {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const ctx = c.getContext('2d');
      const r = size / 2;
      const grd = ctx.createRadialGradient(r, r, 0, r, r, r);
      grd.addColorStop(0,   'rgba(180,255,120,1)');
      grd.addColorStop(0.4, 'rgba(120,200,60,0.7)');
      grd.addColorStop(1,   'rgba(60,140,20,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(c);
      return tex;
    }

    // ── Ground plane ─────────────────────────────────────────────────────
    const groundGeo = new THREE.PlaneGeometry(30, 30, 40, 40);
    // slight undulation
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i), z = posAttr.getZ(i);
      posAttr.setY(i, Math.sin(x * 0.8) * 0.12 + Math.cos(z * 0.6) * 0.08);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      map: makeMossTexture(512),
      color: 0x1a3a10,
      roughness: 0.95,
      metalness: 0.0,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // ── Moss root trunks ──────────────────────────────────────────────────
    const rootTex = makeRootTexture(256);
    const rootMat = new THREE.MeshStandardMaterial({
      map: rootTex, color: 0x1a2e10, roughness: 1.0, metalness: 0.0,
    });

    function makeRoot(x, z, h, rx, rz) {
      const geo = new THREE.CylinderGeometry(
        0.08 + Math.random() * 0.12,
        0.18 + Math.random() * 0.22,
        h, 6, 4, false
      );
      // taper pos
      const pa = geo.attributes.position;
      for (let i = 0; i < pa.count; i++) {
        pa.setX(i, pa.getX(i) + (Math.random() - 0.5) * 0.04);
        pa.setZ(i, pa.getZ(i) + (Math.random() - 0.5) * 0.04);
      }
      geo.computeVertexNormals();
      const mesh = new THREE.Mesh(geo, rootMat);
      mesh.position.set(x, h / 2, z);
      mesh.rotation.x = rx;
      mesh.rotation.z = rz;
      return mesh;
    }

    const rootData = [
      [-3.2, -1.5, 4.2, 0.08, -0.15], [ 3.0, -1.8, 3.8, 0.05,  0.18],
      [-1.5, -3.0, 2.8, 0.12, -0.08], [ 1.8, -2.5, 3.2, 0.06,  0.12],
      [-4.0, -0.5, 5.0, 0.04, -0.22], [ 4.2, -1.0, 4.5, 0.07,  0.20],
      [ 0.5, -4.0, 2.2, 0.18, -0.05], [-2.0,  1.0, 6.0, 0.03, -0.28],
      [ 2.5,  0.8, 5.5, 0.05,  0.25], [-0.8, -2.8, 3.0, 0.10,  0.06],
    ];
    rootData.forEach(([x, z, h, rx, rz]) => scene.add(makeRoot(x, z, h, rx, rz)));

    // ── Fern / leaf planes ────────────────────────────────────────────────
    const leafTex = makeLeafTexture(128);
    const leafMat = new THREE.MeshStandardMaterial({
      map: leafTex, alphaMap: leafTex,
      transparent: true, side: THREE.DoubleSide,
      color: 0x2a6a10, roughness: 0.9, metalness: 0,
      alphaTest: 0.05,
    });
    const fernGroup = new THREE.Group();

    for (let i = 0; i < 28; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist  = 1.5 + Math.random() * 5.5;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const h = 0.4 + Math.random() * 0.8;
      const geo = new THREE.PlaneGeometry(h * 0.55, h);
      const mesh = new THREE.Mesh(geo, leafMat);
      mesh.position.set(x, h * 0.5, z);
      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.rotation.x = -0.1 + Math.random() * 0.3;
      mesh.userData.swaySpeed  = 0.4 + Math.random() * 0.6;
      mesh.userData.swayOffset = Math.random() * Math.PI * 2;
      mesh.userData.swayAmp    = 0.04 + Math.random() * 0.06;
      fernGroup.add(mesh);
    }
    scene.add(fernGroup);

    // ── Pale flowers ──────────────────────────────────────────────────────
    const flowerMat = new THREE.MeshStandardMaterial({
      color: 0xddf5cc, emissive: 0x223a18, emissiveIntensity: 0.3,
      roughness: 0.6, transparent: true, opacity: 0.88,
    });
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist  = 0.8 + Math.random() * 4.5;
      const geo   = new THREE.CircleGeometry(0.04 + Math.random() * 0.06, 6);
      const mesh  = new THREE.Mesh(geo, flowerMat);
      mesh.position.set(
        Math.cos(angle) * dist,
        0.02 + Math.random() * 0.35,
        Math.sin(angle) * dist
      );
      mesh.rotation.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.4;
      scene.add(mesh);
    }

    // ── Pollen particle system ────────────────────────────────────────────
    const POLLEN_COUNT = 280;
    const pollenPositions = new Float32Array(POLLEN_COUNT * 3);
    const pollenVelocities = [];
    for (let i = 0; i < POLLEN_COUNT; i++) {
      pollenPositions[i * 3]     = (Math.random() - 0.5) * 14;
      pollenPositions[i * 3 + 1] = Math.random() * 5 + 0.1;
      pollenPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      pollenVelocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.001 + 0.0005,
        z: (Math.random() - 0.5) * 0.003,
      });
    }
    const pollenGeo = new THREE.BufferGeometry();
    pollenGeo.setAttribute('position', new THREE.BufferAttribute(pollenPositions, 3));
    const pollenMat = new THREE.PointsMaterial({
      map: makePollenTexture(32),
      size: 0.10,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      sizeAttenuation: true,
      color: 0xaaffaa,
      blending: THREE.AdditiveBlending,
    });
    const pollen = new THREE.Points(pollenGeo, pollenMat);
    scene.add(pollen);

    // ── Lighting ──────────────────────────────────────────────────────────
    // Warm ambient from above (filtered through canopy)
    const ambient = new THREE.AmbientLight(0x1a3a10, 0.6);
    scene.add(ambient);

    // Primary canopy beam — soft cool green shaft
    const dirLight = new THREE.DirectionalLight(0x88ffaa, 1.2);
    dirLight.position.set(3, 10, 4);
    scene.add(dirLight);

    // Rim / fill — warmer side
    const fillLight = new THREE.DirectionalLight(0xaaff88, 0.5);
    fillLight.position.set(-5, 4, -3);
    scene.add(fillLight);

    // Ground bounce
    const groundLight = new THREE.PointLight(0x2a6a10, 0.8, 12);
    groundLight.position.set(0, 0.3, 0);
    scene.add(groundLight);

    // ── Scan light (entrance animation) ──────────────────────────────────
    const scanLight = new THREE.SpotLight(0xccffcc, 0, 20, Math.PI * 0.18, 0.4, 1.8);
    scanLight.position.set(0, 12, 0);
    scanLight.target.position.set(0, 0, 0);
    scene.add(scanLight);
    scene.add(scanLight.target);

    // ── Scan line mesh (moving light band on ground) ───────────────────
    const scanGeo = new THREE.PlaneGeometry(20, 0.4);
    const scanMat = new THREE.MeshBasicMaterial({
      color: 0x88ffaa, transparent: true, opacity: 0.0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const scanMesh = new THREE.Mesh(scanGeo, scanMat);
    scanMesh.rotation.x = -Math.PI / 2;
    scanMesh.position.y = 0.01;
    scene.add(scanMesh);

    // ── Background distant trees (billboards) ────────────────────────────
    const treeMat = new THREE.MeshStandardMaterial({
      color: 0x0d2010, roughness: 1, metalness: 0,
      transparent: true, opacity: 0.85,
    });
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const r = 9 + Math.random() * 3;
      const h = 3 + Math.random() * 5;
      const geo = new THREE.ConeGeometry(0.6 + Math.random() * 0.6, h, 6);
      const mesh = new THREE.Mesh(geo, treeMat);
      mesh.position.set(Math.cos(angle) * r, h / 2 - 0.3, Math.sin(angle) * r);
      mesh.rotation.y = Math.random() * Math.PI;
      scene.add(mesh);
    }

    // ── Entrance animation state ──────────────────────────────────────────
    let elapsed = 0;
    const SCAN_DURATION = 2.2;
    const FADE_IN       = 1.8;

    // ── Resize handler ────────────────────────────────────────────────────
    window.addEventListener('resize', () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    // ── Visibility pause ─────────────────────────────────────────────────
    let visible = true;
    document.addEventListener('visibilitychange', () => {
      visible = !document.hidden;
    });

    // ── Animation loop ────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let baseRotY = 0;

    function tick() {
      if (!visible) { requestAnimationFrame(tick); return; }

      const delta = clock.getDelta();
      elapsed += delta;
      const t = clock.elapsedTime;

      // smooth pointer lerp
      pointer.x += (pointer.nx - pointer.x) * 0.04;
      pointer.y += (pointer.ny - pointer.y) * 0.04;

      // ── camera parallax ──
      camera.position.x = pointer.x * 0.35;
      camera.position.y = 2.2 - pointer.y * 0.18;
      camera.lookAt(0, 0.5, 0);

      // ── very slow world rotation ──
      if (!reducedMotion) baseRotY += delta * 0.012;
      scene.rotation.y = baseRotY + pointer.x * 0.06;

      // ── fern sway ──
      if (!reducedMotion) {
        fernGroup.children.forEach(f => {
          f.rotation.z = Math.sin(t * f.userData.swaySpeed + f.userData.swayOffset)
                         * f.userData.swayAmp;
        });
      }

      // ── pollen drift ──
      if (!reducedMotion) {
        const pos = pollenGeo.attributes.position.array;
        for (let i = 0; i < POLLEN_COUNT; i++) {
          const v = pollenVelocities[i];
          pos[i * 3]     += v.x + pointer.x * 0.0008;
          pos[i * 3 + 1] += v.y;
          pos[i * 3 + 2] += v.z;
          // wrap
          if (pos[i * 3 + 1] > 5.5) pos[i * 3 + 1] = 0.05;
          if (Math.abs(pos[i * 3])     > 7) pos[i * 3]     *= -0.95;
          if (Math.abs(pos[i * 3 + 2]) > 7) pos[i * 3 + 2] *= -0.95;
        }
        pollenGeo.attributes.position.needsUpdate = true;
      }

      // ── scan light entrance ──
      if (elapsed < SCAN_DURATION + 0.5) {
        const progress = Math.min(elapsed / SCAN_DURATION, 1);
        // scan band sweeps Z axis
        scanMesh.position.z = 8 - progress * 16;
        scanMat.opacity = progress < 0.5
          ? progress * 2 * 0.25
          : (1 - (progress - 0.5) * 2) * 0.25;
        scanLight.intensity = Math.sin(progress * Math.PI) * 2.5;
        scanLight.position.z = scanMesh.position.z;
      } else {
        scanMat.opacity = 0;
        scanLight.intensity = 0;
      }

      // ── overall scene fade in ──
      if (elapsed < FADE_IN) {
        const f = elapsed / FADE_IN;
        renderer.domElement.style.opacity = f;
      } else {
        renderer.domElement.style.opacity = 1;
      }

      // ── groundLight gentle pulse ──
      groundLight.intensity = 0.6 + Math.sin(t * 0.7) * 0.2;

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }

    // start with opacity 0 for fade-in
    renderer.domElement.style.opacity = 0;
    renderer.domElement.style.transition = 'opacity 0.1s';
    tick();
  }
})();
