import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";

const DURATION = 3200;

// ── 3D: Orbiting rings ───────────────────────────────────────────────────────
function OrbitRings() {
  const r1 = useRef(), r2 = useRef(), r3 = useRef(), r4 = useRef();

  useFrame((_, dt) => {
    if (r1.current) { r1.current.rotation.x += dt * 0.38; r1.current.rotation.y += dt * 0.14; }
    if (r2.current) { r2.current.rotation.y += dt * 0.22; r2.current.rotation.z += dt * 0.1; }
    if (r3.current) { r3.current.rotation.z += dt * 0.32; r3.current.rotation.x -= dt * 0.12; }
    if (r4.current) { r4.current.rotation.x -= dt * 0.18; r4.current.rotation.y += dt * 0.28; }
  });

  return (
    <>
      <mesh ref={r1}>
        <torusGeometry args={[2.2, 0.018, 6, 100]} />
        <meshBasicMaterial color="#915eff" transparent opacity={0.75} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.9, 0.013, 6, 100]} />
        <meshBasicMaterial color="#00bfff" transparent opacity={0.6} />
      </mesh>
      <mesh ref={r3} rotation={[0, Math.PI / 4, Math.PI / 2]}>
        <torusGeometry args={[3.5, 0.01, 6, 100]} />
        <meshBasicMaterial color="#ff6b9d" transparent opacity={0.42} />
      </mesh>
      <mesh ref={r4} rotation={[Math.PI / 6, Math.PI / 3, 0]}>
        <torusGeometry args={[1.6, 0.022, 6, 100]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.5} />
      </mesh>
    </>
  );
}

// ── 3D: Central wireframe core ───────────────────────────────────────────────
function WireframeCore() {
  const outer = useRef(), inner = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.x = t * 0.35;
      outer.current.rotation.y = t * 0.55;
      const p = 1 + Math.sin(t * 2.5) * 0.07;
      outer.current.scale.setScalar(p);
    }
    if (inner.current) {
      inner.current.rotation.x = -t * 0.5;
      inner.current.rotation.y = t * 0.42;
    }
  });

  return (
    <>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshBasicMaterial color="#915eff" wireframe transparent opacity={0.6} />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.62]} />
        <meshBasicMaterial color="#00bfff" wireframe transparent opacity={0.8} />
      </mesh>
      {/* Soft glow sphere */}
      <mesh>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial color="#915eff" transparent opacity={0.12} />
      </mesh>
    </>
  );
}

// ── 3D: Particle cloud ───────────────────────────────────────────────────────
function ParticleCloud() {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      const r = 2.0 + Math.random() * 3.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.055;
      ref.current.rotation.x += dt * 0.024;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={1200} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#915eff" size={0.028} sizeAttenuation transparent opacity={0.72} depthWrite={false} />
    </points>
  );
}

// ── 3D Scene ─────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 3]} intensity={2.5} color="#915eff" />
      <pointLight position={[4, 3, 0]} intensity={0.6} color="#00bfff" />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color="#ff6b9d" />
      <ParticleCloud />
      <OrbitRings />
      <WireframeCore />
    </>
  );
}

// ── Main Loader ───────────────────────────────────────────────────────────────
const IntroLoader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [burst, setBurst] = useState(false);
  const rafRef  = useRef(null);
  const startRef = useRef(Date.now());
  const doneRef  = useRef(false);

  const tick = useCallback(() => {
    const elapsed = Date.now() - startRef.current;
    const t = Math.min(elapsed / DURATION, 1);
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    setCount(Math.round(eased * 100));
    if (t < 1) {
      rafRef.current = requestAnimationFrame(tick);
    } else if (!doneRef.current) {
      doneRef.current = true;
      setBurst(true);
      setTimeout(() => onComplete?.(), 700);
    }
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#050816" }}
      exit={{ y: "-100%", transition: { duration: 0.92, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* ── Full-screen 3D canvas ── */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 7.5], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>

      {/* ── Vignette overlay for depth ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,8,22,0.75) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8 select-none" style={{ pointerEvents: "none" }}>

        {/* Name + title */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.95, ease: "easeOut" }}
          className="text-center"
        >
          <h1
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #c4a3ff 0%, #00bfff 50%, #ff6b9d 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dipanshu Singh
          </h1>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 0.6, letterSpacing: "0.22em" }}
            transition={{ delay: 1.05, duration: 0.9 }}
            style={{
              color: "#aaa8c8",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              marginTop: "0.7rem",
            }}
          >
            React · Full-Stack · AI Engineer
          </motion.p>
        </motion.div>

        {/* Progress bar + counter */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.75 }}
          style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 10 }}
        >
          {/* Counter row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ color: "rgba(255,255,255,0.26)", fontSize: "0.66rem", letterSpacing: "0.2em" }}>
              INITIALIZING
            </span>
            <span
              style={{
                fontSize: "2.8rem",
                fontWeight: 800,
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
                background: "linear-gradient(135deg, #915eff, #00bfff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {count}<span style={{ fontSize: "1.3rem" }}>%</span>
            </span>
          </div>

          {/* Track */}
          <div style={{ height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
            <style>{`@keyframes glint-sweep { 0%{transform:translateX(-60px)} 100%{transform:translateX(360px)} }`}</style>
            <div
              style={{
                height: "100%",
                width: `${count}%`,
                transition: "width 0.06s linear",
                background: "linear-gradient(90deg, #915eff, #00bfff, #ff6b9d)",
                borderRadius: 99,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute", top: 0, bottom: 0, width: 55,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
                  animation: "glint-sweep 1.8s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Burst rings on complete ── */}
      {burst && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ width: 140, height: 140, border: "1px solid #915eff" }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 5 + i * 1.8, opacity: 0 }}
              transition={{ duration: 0.72, delay: i * 0.1, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default IntroLoader;
