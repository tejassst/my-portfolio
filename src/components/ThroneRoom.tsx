'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import "@fontsource/unifrakturcook/700.css";
import "@fontsource/pirata-one";
import "@fontsource/cinzel"
import { motion } from "framer-motion";

// All project content lives here. Index i maps to prism Artifact_i.
// Add/edit entries freely; a prism is only clickable if it has an entry.
type Project = {
  kind?: 'about' | 'project';
  title: string;
  description: string;
  image: string;
  live?: string;
  code?: string;
  // Project-shard extras
  tagline?: string; // one-line subtitle under the title
  highlights?: string[]; // bulleted key points
  stack?: string[]; // tech tags
  // About-shard extras
  role?: string;
  skills?: { category: string; items: string[] }[];
  socials?: { label: string; href: string; icon: string }[];
};

const PROJECTS: Project[] = [
  {
    kind: 'about',
    title: 'About Me',
    description: `Hi, I'm Tejas Tyagi, a Computer Science student at the University of Maryland, Baltimore County, pursuing a concentration in Artificial Intelligence with a minor in Entrepreneurship & Innovation.

I enjoy building software that combines strong engineering with AI to solve practical, real-world problems.

My technical toolkit includes Python, C++, JavaScript, and TypeScript, with experience building applications using React.js, React Native, FastAPI,and Tailwind CSS. I also work with databases and authentication systems including PostgreSQL, MongoDB, Supabase, NeonDB, and Auth0.

Outside of development, I love Linux and currently use Arch Linux. I enjoy customizing and optimizing my system, experimenting with new tools, and constantly finding ways to improve my workflow.

I'm always looking to learn, build, and work on interesting problems. Let's connect and make something great together!`,    image: '/Me.jpeg',
    role: 'Full-Stack & AI Developer · UMBC',
    skills: [
      { category: 'Languages', items: ['Python', 'C++', 'JavaScript', 'TypeScript', 'SQL'] },
      { category: 'Frameworks & Libraries', items: ['React.js', 'React Native', 'Three.js', 'FastAPI', 'TailwindCSS'] },
      { category: 'Databases & Auth', items: ['MongoDB', 'PostgreSQL', 'Supabase', 'Auth0', 'NeonDB'] },
      { category: 'Tools & Platforms', items: ['Git', 'Linux', 'VS Code', 'PyCharm', 'Vim', 'Expo'] },
    ],
  },
  {
    title: 'ZenAir',
    tagline: 'Smart Breathing Device (Hardware + Mobile + Backend)',
    description: `A handheld smart breathing device that helps people manage stress and replace habits like smoking through guided rhythmic breathing, haptic feedback, and real-time biometric sensing. I designed and built the full system end to end: firmware, mobile app, and backend.`,
    highlights: [
      'ESP32 firmware in C++ reads an air-pressure sensor and a MAX30102 pulse-oximeter to detect inhale and exhale plus heart-rate variability.',
      'Drives a haptic motor for breathing rhythm guidance and streams live session data over Bluetooth Low Energy.',
      'React Native (Expo) app pairs over BLE with Firebase auth, secure on-device storage, and animated Rive breathing UIs.',
      'FastAPI backend with SQLAlchemy and PostgreSQL persists sessions and powers personalized recommendations.',
    ],
    stack: ['ESP32 / C++', 'BLE', 'React Native', 'Expo', 'Firebase', 'FastAPI', 'PostgreSQL'],
    image: '/zenair.png',
  },
  {
    title: 'Face Recognition Mobile App',
    tagline: 'Real-Time Mobile Face ID',
    description: `A cross-platform mobile app for real-time face recognition, built as a student researcher at UMBC's Future Sensing and Interaction Lab.`,
    highlights: [
      'Achieves 98.4% recognition accuracy using the Facenet512 deep learning model.',
      'Multi-detector fallback system (MTCNN, SSD, OpenCV) keeps detection robust across conditions.',
      'AI recognition via DeepFace and TensorFlow matches faces against a database of enrolled users.',
      'Secure RESTful APIs power face recognition, enrollment, and database management.',
    ],
    stack: ['React Native', 'FastAPI', 'DeepFace', 'TensorFlow', 'Python'],
    image: '/project-2/project-1/fr1.jpeg',
    code: 'https://github.com/tejassst/face-recognizer',
  },
  {
    title: 'RushiGo',
    tagline: 'AI Deadline & Notification Tracker',
    description: `A full-stack web app that helps students track academic deadlines and sends automated reminders through the Gmail API.`,
    highlights: [
      'AI document parsing with Google Gemini extracts due dates and assignment details from uploaded syllabi.',
      'Automated, time-windowed email reminders via the Gmail API keep students ahead of deadlines.',
      'Supabase securely stores user data, deadlines, and notifications.',
      'Secure RESTful APIs handle authentication, deadline management, and notifications.',
    ],
    stack: ['React.js', 'FastAPI', 'Google Gemini', 'Supabase', 'Gmail API'],
    image: '/project-2/rushigo1.png',
    live: 'https://rushigo.tsapps.tech',
    code: 'https://github.com/tejassst/RushiGo',
  },
  {
    title: 'Gest-Action',
    tagline: 'Hands-Free Desktop Control via Gesture Recognition',
    description: `A real-time computer-vision system that recognizes hand gestures from a webcam and maps them to OS-level actions on Linux (Hyprland window manager), enabling hands-free control of the desktop.`,
    highlights: [
      'MediaPipe detects and normalizes 21 hand landmarks per frame from a live webcam feed.',
      'A KNN classifier trained on collected landmark data identifies gestures, with confidence-based filtering for reliable predictions.',
      'History-based confirmation only fires a gesture once it is held steady, preventing false triggers.',
      'Recognized gestures map to Hyprland commands via hyprctl for real hands-free window control.',
      'A dedicated gesture-worker thread keeps camera capture and inference responsive at low latency.',
    ],
    stack: ['Python', 'OpenCV', 'MediaPipe', 'scikit-learn', 'NumPy', 'Hyprland'],
    image: '/gest-action.png',
    code: 'https://github.com/tejassst/gest-action',
  },
  {
    title: 'StressCheck',
    tagline: 'Stress Detection from Wearable Biosignals',
    description: `A machine-learning pipeline that detects physiological stress from wrist-worn wearable sensor data, built and evaluated on the WESAD affect-detection dataset.`,
    highlights: [
      'Segments wrist signals (BVP, EDA, temperature, accelerometer) from 15 subjects into 30-second windows.',
      'Engineers statistical features (mean, std, min, max) per signal plus per-axis accelerometer features.',
      'Trains and compares Logistic Regression (79%) and Random Forest (96.8% accuracy) for baseline-vs-stress classification.',
      'Adds a subject-independent evaluation (disjoint train and test subjects) to measure real-world generalization.',
    ],
    stack: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'WESAD'],
    image: '/stresscheck.png',
    code: 'https://github.com/tejassst/StressSense',
  },
  {
    title: 'My Bucks',
    tagline: 'Personal Finance Tracker',
    description: `A responsive personal-finance dashboard with real-time balance updates and dynamic color-coding.`,
    highlights: [
      'Optimized state management improved load times by roughly 30%.',
      'Full CRUD transaction management: add, view, delete, sort, and track transactions with timestamps.',
      'Node.js and Express.js backend with CORS middleware for cross-origin requests.',
      'MongoDB with Mongoose for data modeling and validation.',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose'],
    image: '/project-3/image.png',
    live: 'https://mybucks.ttforge.me',
    code: 'https://github.com/tejassst/my-bucks',
  },
  // Prism 7 has no entry, so it stays non-clickable. Add another project
  // object here (with a screenshot in /public) to light up the last prism.
];

// Floating dust motes for the atmosphere layer. Values are derived from the
// index (not Math.random) so server and client render identically — no
// hydration mismatch.
const MOTES = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 7) % 100, // spread across the width
  size: 2 + (i % 3), // 2–4px
  duration: 16 + (i % 7) * 3, // 16–34s slow drift
  delay: -(i * 2.3), // negative: stagger so they're mid-flight on load
  drift: (i % 2 ? 1 : -1) * (12 + (i % 5) * 7), // sideways sway, px
  opacity: 0.18 + (i % 4) * 0.08, // 0.18–0.42
}));

export const ThroneRoom: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  // Which project's modal is open (null = closed). This is React state so the
  // UI re-renders; the ref mirrors it so the imperative three.js click handler
  // (set up once) can read the current value without going stale.
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [glowing, setGlowing] = useState(true);
  // Loader overlay covers the black void while the GLB streams in.
  const [loading, setLoading] = useState(true);

  // Glowing effect for the padding
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowing(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);


  const activeRef = useRef<number | null>(null);
  const openProject = (i: number) => {
    activeRef.current = i;
    setActiveProject(i);
  };
  const closeProject = () => {
    activeRef.current = null;
    setActiveProject(null);
  };
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const mainCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // --- Selective bloom: ONLY the shards bloom, not the torch flames. Objects
    // tagged onto BLOOM_LAYER are rendered (with everything else blacked out) into
    // a bloom pass; that glow is then added back over the normally-lit scene.
    const BLOOM_LAYER = 1;
    const bloomLayer = new THREE.Layers();
    bloomLayer.set(BLOOM_LAYER);
    const darkMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const savedMaterials = new Map<string, THREE.Material | THREE.Material[]>();

    const size = new THREE.Vector2(window.innerWidth, window.innerHeight);
    const bloomPass = new UnrealBloomPass(size, 0.5, 0.5, 0.0);
    bloomPass.strength = 0.4; // shard glow spread
    bloomPass.radius = 0.3;
    bloomPass.threshold = 0.0; // scene is already blacked out, so no threshold needed

    // Pass 1: render only the bloom-layer objects and blur them.
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.addPass(new RenderPass(scene, mainCamera));
    bloomComposer.addPass(bloomPass);

    // Pass 2: render the full scene, then add the bloom texture on top.
    const mixPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
        },
        vertexShader:
          'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
        fragmentShader:
          'uniform sampler2D baseTexture; uniform sampler2D bloomTexture; varying vec2 vUv; void main(){ gl_FragColor = texture2D(baseTexture, vUv) + texture2D(bloomTexture, vUv); }',
      }),
      'baseTexture',
    );
    mixPass.needsSwap = true;

    const finalComposer = new EffectComposer(renderer);
    finalComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    finalComposer.setSize(window.innerWidth, window.innerHeight);
    finalComposer.addPass(new RenderPass(scene, mainCamera));
    finalComposer.addPass(mixPass);
    finalComposer.addPass(new OutputPass());

    // Black out everything that isn't on the bloom layer, then restore it.
    const darkenNonBloomed = (obj: THREE.Object3D) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh && !bloomLayer.test(mesh.layers)) {
        savedMaterials.set(mesh.uuid, mesh.material);
        mesh.material = darkMaterial;
      }
    };
    const restoreMaterial = (obj: THREE.Object3D) => {
      const mesh = obj as THREE.Mesh;
      const saved = savedMaterials.get(mesh.uuid);
      if (saved) {
        mesh.material = saved;
        savedMaterials.delete(mesh.uuid);
      }
    };

    let blenderCamera: THREE.PerspectiveCamera | undefined;
    let scrollMixer: THREE.AnimationMixer | undefined;
    let clockMixer: THREE.AnimationMixer | undefined;
    let camActions: THREE.AnimationAction[] = [];
    const timer = new THREE.Timer();

    // --- Picking (click/hover) setup ---
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(); // mouse in normalized device coords
    const clickable: THREE.Object3D[] = []; // prisms, filled in once GLB loads
    let hoveredNode: THREE.Object3D | null = null;
    // Torch point lights, with their steady base intensity + a random phase so
    // each sconce flickers independently.
    const torches: { light: THREE.PointLight; base: number; phase: number }[] = [];
    // Flame emissive materials, so the visible flames flicker too (not just the
    // light they cast).
    const flameMats: { mat: THREE.MeshStandardMaterial; base: number }[] = [];
    const HOVER_FLARE = 2.0; // hover multiplies a shard's built-in emissive glow

    // Flare (or reset) a shard's own emissive glow relative to its baseline.
    const setFlare = (node: THREE.Object3D | null, on: boolean) => {
      const mats = node?.userData.glowMats as THREE.MeshStandardMaterial[] | undefined;
      mats?.forEach((m) => {
        m.emissiveIntensity = (m.userData.baseEmissive as number) * (on ? HOVER_FLARE : 1);
      });
    };

    // Walk up from a hit mesh to the tagged prism node (the ray hits a child mesh).
    const projectNodeOf = (obj: THREE.Object3D | null): THREE.Object3D | null => {
      let o: THREE.Object3D | null = obj;
      while (o) {
        if (o.userData.projectIndex !== undefined) return o;
        o = o.parent;
      }
      return null;
    };

    // Convert a screen click to a ray and return the prism under it, if any.
    const pickAt = (clientX: number, clientY: number): THREE.Object3D | null => {
      pointer.x = (clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, mainCamera);
      const hits = raycaster.intersectObjects(clickable, true);
      return hits.length ? projectNodeOf(hits[0].object) : null;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return; // hover is mouse-only; touch taps to open
      if (activeRef.current !== null) return; // modal open: ignore
      const node = pickAt(e.clientX, e.clientY);
      if (node === hoveredNode) return; // nothing changed
      // reset the previously hovered prism to its base size + glow
      if (hoveredNode) {
        hoveredNode.scale.copy(hoveredNode.userData.baseScale);
        setFlare(hoveredNode, false);
      }
      hoveredNode = node;
      if (node) {
        node.scale.copy(node.userData.baseScale).multiplyScalar(1.25);
        setFlare(node, true);
      }
      document.body.style.cursor = node ? 'pointer' : '';
    };

    const onClick = (e: MouseEvent) => {
      if (activeRef.current !== null) return; // modal open: ignore
      const node = pickAt(e.clientX, e.clientY);
      if (node) openProject(node.userData.projectIndex as number);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProject();
    };

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      '/portfolio.glb?v=6',
      (gltf) => {
      scene.add(gltf.scene);

      const cam = gltf.scene.getObjectByName('Camera');
      if (cam instanceof THREE.PerspectiveCamera) {
        blenderCamera = cam;
      }
      // Light both walls from the torches themselves: warm + brighten every
      // TorchLight so the glow radiates from each sconce. Also tone down the
      // single off-center "Light" fill so the room isn't lopsided.
      const worldPos = new THREE.Vector3();
      gltf.scene.traverse((o) => {
        const light = o as THREE.Light;
        if (!light.isLight) return;
        if (o instanceof THREE.PointLight && o.name.startsWith('TorchLight')) {
          o.getWorldPosition(worldPos);
          // The camera faces the +x wall, so it appears on the viewer's LEFT
          // (the -x wall is on their right). Verified with a color diagnostic.
          const onViewerLeft = worldPos.x > 0;
          o.color.set(0xffb040); // warm yellow flame
          o.decay = 1.0; // near-linear falloff so pools overlap between sconces
          o.intensity = onViewerLeft ? 26 : 10; // brighter left, dimmer right
          torches.push({ light: o, base: o.intensity, phase: Math.random() * Math.PI * 2 });
        } else if (o.name === 'Light') {
          light.intensity *= 0.1; // all but remove the lopsided fill
        } else {
          light.intensity *= 0.6; // dim the rest (pedestal spots, throne, sun)
        }
      });
      // Collect the flame emissive material(s) so the flames themselves flicker.
      gltf.scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          const std = m as THREE.MeshStandardMaterial;
          if (std?.name === 'FlameEmissive' && !flameMats.some((f) => f.mat === std)) {
            flameMats.push({ mat: std, base: std.emissiveIntensity });
          }
        });
      });

      // Faint warm base so gaps between torches never go pure black.
      scene.add(new THREE.AmbientLight(0x2a1c0a, 0.12));

      const DROP = 0.5; // tune, reload, repeat
      for (let i = 0; i < 8; i++) {
        const node = gltf.scene.getObjectByName(`Artifact_${i}`);
        if (!node) continue;
        const offset = new THREE.Group();
        offset.position.y = -DROP; // Y-up: negative = down
        node.parent!.add(offset); // group sit where prism's parent is
        offset.add(node); // move prism under group, keep its local transform

        // Tag every shard onto the bloom layer so its emissive glows — and only
        // the shards do (the torch flames are deliberately left out).
        node.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) child.layers.enable(BLOOM_LAYER);
        });

        // Make this prism clickable only if it has project content.
        if (PROJECTS[i]) {
          node.userData.projectIndex = i; // tag: how we recover which prism was hit
          node.userData.baseScale = node.scale.clone(); // remember size for hover

          // These shards already ship with per-color emissive materials
          // (ArtifactMat_i, emissiveStrength 4) — bloom picks that up. Don't
          // override the look; just remember each material's base intensity so
          // hover can flare it, and stash them on the node.
          const glowMats: THREE.MeshStandardMaterial[] = [];
          node.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (!mesh.isMesh) return;
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((m) => {
              const std = m as THREE.MeshStandardMaterial;
              std.userData.baseEmissive = std.emissiveIntensity;
              glowMats.push(std);
            });
          });
          node.userData.glowMats = glowMats;

          clickable.push(node);
        }
      }
      if (gltf.animations.length > 0) {
        scrollMixer = new THREE.AnimationMixer(gltf.scene);
        clockMixer = new THREE.AnimationMixer(gltf.scene);

        gltf.animations.forEach((clip) => {
          if (clip.name === 'Camera' || clip.name === 'CameraTarget') {
            const action = scrollMixer!.clipAction(clip);
            action.paused = true;
            action.play();
            camActions.push(action);
          } else {
            const action = clockMixer!.clipAction(clip);
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.play();
          }
        });
      }
      setLoading(false); // hall is dressed: lift the loader veil
      },
      undefined,
      (error) => {
        console.error('[ThroneRoom] GLB failed to load:', error);
        setLoading(false); // don't trap the visitor behind the veil on failure
      },
    );
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Update animation based on scroll progress (0 to 1)
      if (scrollMixer && camActions.length > 0) {
        const duration = camActions[0].getClip().duration;
        const targetTime = scrollProgress.current * duration;
        camActions.forEach((action) => {
          action.time = targetTime;
          action.timeScale = 0;
        });
        scrollMixer.update(0);
      }
      if (clockMixer) {
        timer.update();
        const delta = timer.getDelta();
        clockMixer?.update(delta);
      }

      if (blenderCamera) {
        blenderCamera.getWorldPosition(mainCamera.position);
        blenderCamera.getWorldQuaternion(mainCamera.quaternion);

        if (mainCamera.fov !== blenderCamera.fov) {
          mainCamera.fov = blenderCamera.fov;
          mainCamera.updateProjectionMatrix();
        }
      }
      // Torch flicker: overlay two out-of-sync sines plus a little jitter on each
      // sconce's base intensity so the flames feel alive without strobing.
      if (torches.length || flameMats.length) {
        const t = performance.now() * 0.001;
        for (const { light, base, phase } of torches) {
          const flicker =
            1 +
            0.14 * Math.sin(t * 11 + phase) +
            0.09 * Math.sin(t * 27 + phase * 1.7) +
            (Math.random() - 0.5) * 0.1;
          light.intensity = base * flicker;
        }
        // The visible flame pulses in step (shared phase 0 keeps it coherent).
        const flameFlicker =
          1 + 0.18 * Math.sin(t * 12) + 0.1 * Math.sin(t * 29) + (Math.random() - 0.5) * 0.12;
        for (const { mat, base } of flameMats) {
          mat.emissiveIntensity = base * flameFlicker;
        }
      }

      // Selective bloom: render the shards-only glow, then the full scene + glow.
      scene.traverse(darkenNonBloomed);
      bloomComposer.render();
      scene.traverse(restoreMaterial);
      finalComposer.render();
    };
    animate();

    // Handle scroll events
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current =
        scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    };
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      mainCamera.aspect = window.innerWidth / window.innerHeight;
      mainCamera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      bloomComposer.setSize(window.innerWidth, window.innerHeight);
      finalComposer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Listen on window (not the canvas): the scrollable content div sits on top
    // of the canvas, but events still bubble up to window, so picking works.
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.cursor = '';
      bloomComposer.dispose();
      finalComposer.dispose();
      darkMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div>
      <div
        ref={containerRef}
        style={{ width: '100vw', height: '100vh', position: 'fixed', top: '0' }}
      />

      {/* Atmosphere: a vignette that darkens the edges of the hall, plus slow
          drifting dust motes. Sits above the canvas, below the content, and
          never intercepts clicks. */}
      <div className="atmosphere" aria-hidden="true">
        <div className="vignette" />
        <div className="dust">
          {MOTES.map((m, i) => (
            <span
              key={i}
              className="mote"
              style={
                {
                  left: `${m.left}%`,
                  width: `${m.size}px`,
                  height: `${m.size}px`,
                  opacity: m.opacity,
                  animationDuration: `${m.duration}s`,
                  animationDelay: `${m.delay}s`,
                  '--drift': `${m.drift}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: 'transparent',
          color: 'white',
        }}
      >
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '2vh'}}>
          <div
            style={{
              backgroundImage: 'url(/banner_scroll.webp)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: 'min(90vw, 650px)',
              aspectRatio: '1342 / 768',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <h1
              style={{
               fontFamily: 'Cinzel',
               fontSize: 'clamp(2rem, 8vw, 70px)',
               fontWeight: 'bold',
               color: '#8B4513',
               margin: 0,
               opacity: glowing ? 1 : 0.65,
               textShadow: glowing
                 ? '0 0 10px #D3AF37, 0 0 25px #D3AF37'
                 : '0 0 5px #D3AF37',
               transition: 'opacity 1.5s ease, text-shadow 1.5s ease',
            }}
            >
            Tejas Tyagi
            </h1>
            <h2 style={{fontWeight: 'bold', fontSize: 'clamp(0.85rem, 2.4vw, 18px)', color: '#8B4513'}}>Full-Stack & Backend Systems Engineer</h2>
          </div>
          <div
            style={{ backgroundImage: "url('/banner_board.webp')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: 'min(92vw, 760px)',
            /* No fixed aspect ratio: the board stretches to hug its text (backgroundSize
               100% 100% makes the frame image follow), so it stays wide without the copy
               overflowing into a tall box. minHeight keeps it from collapsing when short. */
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: '2%',
            /* Percentage padding tracks the board's painted inner panel at every
               size, so the text can't leak past the frame. */
            padding: '6% 7%',
            boxSizing: 'border-box',
            }}
          >
            <h1 style={
               { color: '#FFC901',
                 fontSize: 'clamp(1.6rem, 6vw, 50px)',
                 fontFamily: 'UnifrakturCook',
                 lineHeight: 1.05,
                 margin: 0,
                 padding: 0,
               }}>Welcome, Traveler</h1>
            <p style={
              {
                fontFamily: 'Pirata One',
                fontSize: 'clamp(0.85rem, 2.6vw, 22px)',
                lineHeight: 1.3,
                margin: 0,
                marginTop: '10px',
              }
            }>
              You have found the throne. <br /> 
              Few make it this far. <br />
              Step forward and discover what has been forged in this realm.<br />
              Beware, though!<br />
              For knowledge lies within the shards ahead.<br />
              Click upon them to uncover what they hold.<br />
              Scroll away!
            </p>
          </div>
        </div>
        <div style={{ height: '80vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        </div>
        {/* Empty scroll runway: drives the throne camera pan and gives the hero
            banners room to scroll away. Total scroll length ≈ these heights. */}
        <div style={{ height: '360vh' }} />
        <div style={{height: '360vh',}}/>
         {/* ---------- Footer: the closing seal of the realm ---------- */}
        <footer className="site-footer">
          <div className="footer-rule" />
          <div className="footer-inner">
            <h3 className="footer-crest">Tejas Tyagi</h3>
            <p className="footer-motto">Forging software in the fires of the realm.</p>

            <nav className="footer-socials" aria-label="Social links">
              <a
                className="footer-social"
                href="https://github.com/tejassst"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <span className="footer-social-ring">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.68.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"
                    />
                  </svg>
                </span>
                <span className="footer-social-label">GitHub</span>
              </a>

              <a
                className="footer-social"
                href="https://linkedin.com/in/tejas-tyagi-1281a5223"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <span className="footer-social-ring">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
                    />
                  </svg>
                </span>
                <span className="footer-social-label">LinkedIn</span>
              </a>

              <a
                className="footer-social"
                href="mailto:ttpvt01@gmail.com"
                aria-label="Email"
              >
                <span className="footer-social-ring">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 6.5h18v11H3zM3.5 7l8.5 6 8.5-6"
                    />
                  </svg>
                </span>
                <span className="footer-social-label">Email</span>
              </a>
            </nav>

            <p className="footer-copy">© MMXXVI · Forged by Tejas Tyagi</p>
          </div>
        </footer>
      </div>

      {/* Project scroll: only mounted when a prism is active. Clicking the dim
          backdrop closes it; stopPropagation on the scroll keeps inside-clicks
          from closing it (and from reaching the window picker behind it). */}
      {activeProject !== null && (
        <div className="scroll-backdrop" onClick={closeProject}>
          <div className="scroll" onClick={(e) => e.stopPropagation()}>
            <div className="scroll-rod" />
            <div className="scroll-parchment">
              <button
                className="scroll-close"
                onClick={closeProject}
                aria-label="Close"
              >
                ✕
              </button>
              {PROJECTS[activeProject].kind === 'about' ? (
                <div className="about">
                  <div className="about-portrait-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="about-portrait"
                      src={PROJECTS[activeProject].image}
                      alt={PROJECTS[activeProject].title}
                    />
                  </div>
                  <h2 className="about-name">{PROJECTS[activeProject].title}</h2>
                  {PROJECTS[activeProject].role && (
                    <p className="about-role">{PROJECTS[activeProject].role}</p>
                  )}
                  <div className="scroll-rule" />
                  <div className="about-text">
                    {PROJECTS[activeProject].description
                      .split('\n')
                      .map((p) => p.trim())
                      .filter(Boolean)
                      .map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                  {PROJECTS[activeProject].skills && (
                    <div className="about-skills">
                      {PROJECTS[activeProject].skills!.map((group) => (
                        <div className="about-skill-group" key={group.category}>
                          <h3 className="about-skill-cat">{group.category}</h3>
                          <div className="about-tags">
                            {group.items.map((skill) => (
                              <span className="about-tag" key={skill}>
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {PROJECTS[activeProject].socials && (
                    <div className="about-socials">
                      {PROJECTS[activeProject].socials!.map((s) => (
                        <a
                          className="about-social"
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={s.label}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={s.icon} alt="" />
                          <span>{s.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <h2 className="scroll-title">{PROJECTS[activeProject].title}</h2>
                  {PROJECTS[activeProject].tagline && (
                    <p className="scroll-tagline">{PROJECTS[activeProject].tagline}</p>
                  )}
                  <div className="scroll-rule" />
                  {/* plain <img> keeps this drop-in; swap for next/image later if you like */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="scroll-img"
                    src={PROJECTS[activeProject].image}
                    alt={PROJECTS[activeProject].title}
                  />
                  <div className="scroll-text">
                    {PROJECTS[activeProject].description.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  {PROJECTS[activeProject].highlights && (
                    <ul className="scroll-highlights">
                      {PROJECTS[activeProject].highlights!.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                  {PROJECTS[activeProject].stack && (
                    <div className="scroll-stack">
                      {PROJECTS[activeProject].stack!.map((s) => (
                        <span className="scroll-tag" key={s}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="scroll-actions">
                    {PROJECTS[activeProject].live && (
                      <a
                        className="scroll-btn seal"
                        href={PROJECTS[activeProject].live}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live
                      </a>
                    )}
                    {PROJECTS[activeProject].code && (
                      <a
                        className="scroll-btn ghost"
                        href={PROJECTS[activeProject].code}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Code
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="scroll-rod" />
          </div>
        </div>
      )}

      {/* Loading veil: covers the black void until the hall is dressed. */}
      <div
        className={`realm-loader${loading ? '' : ' realm-loader--gone'}`}
        aria-hidden={!loading}
      >
        <div className="realm-loader-sub">Unsealing the hall…</div>
        <div className="realm-loader-bar">
          <span />
        </div>
      </div>
    </div>
  );
};


