import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdditiveBlending } from "three";
import { Tilt } from "react-tilt";
import { motion, useAnimation, useInView } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn } from "../utils/motion";

// All tech icons available
import {
  reactjs, nextjs, typescript, redux, tailwind, javascript, html, css,
  nodejs, express, mongodb, redis, firebase, aws, docker, python,
  openai, langchain, git, figma, vercel, postman, jest,
} from "../assets";

/* ── Tag name → icon mapping ── */
const TAG_ICONS = {
  "react":      reactjs,
  "next.js":    nextjs,
  "typescript": typescript,
  "redux":      redux,
  "tailwind":   tailwind,
  "javascript": javascript,
  "html5":      html,
  "css3":       css,
  "node.js":    nodejs,
  "express.js": express,
  "mongodb":    mongodb,
  "redis":      redis,
  "firebase":   firebase,
  "aws":        aws,
  "aws iot":    aws,
  "docker":     docker,
  "python":     python,
  "fastapi":    python,
  "openai":     openai,
  "langchain":  langchain,
  "langgraph":  langchain,
  "chromadb":   mongodb,
  "git":        git,
  "figma":      figma,
  "vercel":     vercel,
  "postman":    postman,
  "jest":       jest,
  "ai/ml":      openai,
  "video api":  vercel,
  "websocket":  nodejs,
  "mqtt":       aws,
  "mern":       nodejs,
};

/* ── Per-project card visual theme ── */
const CARD_THEMES = {
  viralcut: {
    gradient: "linear-gradient(135deg, #0d0221 0%, #1a0a3a 50%, #0a1628 100%)",
    accent: "#915eff",
    accent2: "#00bfff",
    emoji: "✂️",
    label: "ViralCut",
  },
  documind: {
    gradient: "linear-gradient(135deg, #020d1a 0%, #0a1f3a 50%, #0d1a2e 100%)",
    accent: "#00bfff",
    accent2: "#915eff",
    emoji: "🧠",
    label: "DocuMind AI",
  },
  iot: {
    gradient: "linear-gradient(135deg, #001520 0%, #002a3a 50%, #001828 100%)",
    accent: "#00bfff",
    accent2: "#00ff88",
    emoji: "📡",
    label: "IoT Dashboard",
  },
  exam: {
    gradient: "linear-gradient(135deg, #0a180a 0%, #0f2a1a 50%, #081422 100%)",
    accent: "#00ff88",
    accent2: "#ffcc00",
    emoji: "📝",
    label: "ExamPro",
  },
  agent: {
    gradient: "linear-gradient(135deg, #1a0d00 0%, #2a1500 50%, #0d0d1a 100%)",
    accent: "#ff6b35",
    accent2: "#915eff",
    emoji: "🤖",
    label: "AI Agents",
  },
};

/* ── Per-project Three.js scenes — advanced PBR + glow ───────────────────── */

function ViralCutScene() {
  const knot = useRef();
  const vortex = useRef();
  const vortexPts = useMemo(() => {
    const arr = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const t = (i / 500) * Math.PI * 2 * 8;
      const r = 0.4 + (i / 500) * 2.2;
      arr[i*3]   = Math.cos(t) * r * (0.85 + Math.random() * 0.3);
      arr[i*3+1] = (i / 500 - 0.5) * 3.5;
      arr[i*3+2] = Math.sin(t) * r * (0.85 + Math.random() * 0.3);
    }
    return arr;
  }, []);
  useFrame((_, dt) => {
    if (knot.current) { knot.current.rotation.x += dt*0.22; knot.current.rotation.y += dt*0.38; }
    if (vortex.current) { vortex.current.rotation.y += dt*0.15; }
  });
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[0,0,3]} intensity={6} color="#915eff" />
      <pointLight position={[2,-2,1]} intensity={3} color="#00bfff" />
      <mesh ref={knot}>
        <torusKnotGeometry args={[0.75, 0.22, 128, 12]} />
        <meshStandardMaterial color="#7b3fff" emissive="#5500dd" emissiveIntensity={1.2} metalness={0.8} roughness={0.15} />
      </mesh>
      <points ref={vortex}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={500} array={vortexPts} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#00bfff" size={0.022} sizeAttenuation transparent opacity={0.75} depthWrite={false} blending={AdditiveBlending} />
      </points>
    </>
  );
}

function DocuMindScene() {
  const coreRef = useRef();
  const ring1 = useRef(), ring2 = useRef(), ring3 = useRef();
  const streamPts = useMemo(() => {
    const arr = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const a = (i / 200) * Math.PI * 2;
      const r = 1.5 + (Math.random() - 0.5) * 0.15;
      arr[i*3]   = Math.cos(a) * r;
      arr[i*3+1] = (Math.random() - 0.5) * 0.3;
      arr[i*3+2] = Math.sin(a) * r;
    }
    return arr;
  }, []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) coreRef.current.scale.setScalar(1 + Math.sin(t*2)*0.06);
    if (ring1.current) { ring1.current.rotation.x += 0.008; ring1.current.rotation.y += 0.005; }
    if (ring2.current) { ring2.current.rotation.y += 0.01; ring2.current.rotation.z += 0.004; }
    if (ring3.current) { ring3.current.rotation.x -= 0.006; ring3.current.rotation.z += 0.009; }
  });
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[0,0,3]} intensity={6} color="#00bfff" />
      <pointLight position={[-2,2,1]} intensity={2} color="#915eff" />
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#006aaa" emissive="#0088cc" emissiveIntensity={2} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh ref={ring1}>
        <torusGeometry args={[1.4, 0.018, 6, 80]} />
        <meshBasicMaterial color="#00bfff" transparent opacity={0.7} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI/3, 0, 0]}>
        <torusGeometry args={[1.7, 0.013, 6, 80]} />
        <meshBasicMaterial color="#915eff" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring3} rotation={[0, Math.PI/4, Math.PI/2]}>
        <torusGeometry args={[1.9, 0.01, 6, 80]} />
        <meshBasicMaterial color="#00bfff" transparent opacity={0.35} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={200} array={streamPts} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#00ddff" size={0.025} sizeAttenuation transparent opacity={0.9} depthWrite={false} blending={AdditiveBlending} />
      </points>
    </>
  );
}

function IotScene() {
  const grp = useRef();
  const lineRef = useRef();
  const { nodePos, linePts } = useMemo(() => {
    const nodePos = [
      [0, 0, 0],
      [1.25, 0.4, 0.2], [-1.1, 0.5, 0.4],
      [0.3, 1.2, -0.3], [0.1, -1.2, 0.3],
      [-0.4, 0.1, 1.3], [0.5, 0.1, -1.25],
    ];
    const linePts = new Float32Array(6 * 6);
    for (let i = 1; i <= 6; i++) {
      const o = (i-1)*6;
      linePts[o]   = 0; linePts[o+1] = 0; linePts[o+2] = 0;
      linePts[o+3] = nodePos[i][0]; linePts[o+4] = nodePos[i][1]; linePts[o+5] = nodePos[i][2];
    }
    return { nodePos, linePts };
  }, []);
  useFrame((state, dt) => {
    if (grp.current) grp.current.rotation.y += dt*0.4;
    if (lineRef.current) lineRef.current.material.opacity = 0.35 + Math.sin(state.clock.elapsedTime*3)*0.25;
  });
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[2,2,2]} intensity={6} color="#00ff88" />
      <pointLight position={[-2,0,2]} intensity={2} color="#00bfff" />
      <group ref={grp}>
        {nodePos.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[i===0 ? 0.22 : 0.1, 12, 12]} />
            <meshStandardMaterial color={i===0?"#00ff88":"#00bfff"} emissive={i===0?"#00cc66":"#0088bb"} emissiveIntensity={i===0?1.8:1} metalness={0.5} roughness={0.3} />
          </mesh>
        ))}
        <lineSegments ref={lineRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={12} array={linePts} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial color="#00ff88" transparent opacity={0.5} />
        </lineSegments>
      </group>
    </>
  );
}

function ExamScene() {
  const crystal = useRef(), wireRef = useRef(), ring = useRef();
  const sparkPts = useMemo(() => {
    const arr = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      const r = 1.8 + Math.random() * 0.6;
      const a = Math.random() * Math.PI * 2;
      const b = Math.random() * Math.PI;
      arr[i*3]   = r * Math.sin(b) * Math.cos(a);
      arr[i*3+1] = r * Math.sin(b) * Math.sin(a);
      arr[i*3+2] = r * Math.cos(b);
    }
    return arr;
  }, []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (crystal.current) { crystal.current.rotation.x = t*0.35; crystal.current.rotation.y = t*0.5; }
    if (wireRef.current) { wireRef.current.rotation.x = t*0.35; wireRef.current.rotation.y = t*0.5; }
    if (ring.current) ring.current.rotation.y = t*0.65;
  });
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[2,2,2]} intensity={6} color="#00ff88" />
      <pointLight position={[-1,-2,1]} intensity={2} color="#ffcc00" />
      <mesh ref={crystal}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#00cc44" emissive="#00aa33" emissiveIntensity={1.4} metalness={0.7} roughness={0.1} />
      </mesh>
      <mesh ref={wireRef} scale={1.12}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#ffcc00" emissive="#cc9900" emissiveIntensity={0.5} metalness={0.5} roughness={0.3} wireframe />
      </mesh>
      <group ref={ring}>
        {[...Array(10)].map((_, i) => {
          const a = (i/10)*Math.PI*2;
          return (
            <mesh key={i} position={[Math.cos(a)*1.6, Math.sin(a*0.5)*0.3, Math.sin(a)*1.6]}>
              <sphereGeometry args={[0.07, 6, 6]} />
              <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1.5} />
            </mesh>
          );
        })}
      </group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={150} array={sparkPts} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#aaff55" size={0.02} sizeAttenuation transparent opacity={0.8} depthWrite={false} blending={AdditiveBlending} />
      </points>
    </>
  );
}

function AgentScene() {
  const netRef = useRef();
  const { nodes, linePts, lineCount } = useMemo(() => {
    const layers = [
      [[-1.5,-0.6,0],[-1.5,0,0],[-1.5,0.6,0]],
      [[0,-0.9,0],[0,-0.3,0],[0,0.3,0],[0,0.9,0]],
      [[1.5,-0.6,0],[1.5,0,0],[1.5,0.6,0]],
    ];
    const nodes = layers.flat();
    const pairs = [];
    for (let l = 0; l < layers.length - 1; l++)
      for (const a of layers[l])
        for (const b of layers[l+1])
          pairs.push(a, b);
    const linePts = new Float32Array(pairs.length * 3);
    pairs.forEach(([x,y,z], i) => { linePts[i*3]=x; linePts[i*3+1]=y; linePts[i*3+2]=z; });
    return { nodes, linePts, lineCount: pairs.length };
  }, []);
  const pulsePts = useMemo(() => {
    const arr = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      arr[i*3]   = (Math.random()-0.5)*5;
      arr[i*3+1] = (Math.random()-0.5)*3;
      arr[i*3+2] = (Math.random()-0.5)*2;
    }
    return arr;
  }, []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (netRef.current) {
      netRef.current.rotation.y = Math.sin(t*0.4)*0.7;
      netRef.current.rotation.x = Math.sin(t*0.3)*0.2;
    }
  });
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[2,2,2]} intensity={6} color="#ff6b35" />
      <pointLight position={[-2,0,2]} intensity={3} color="#915eff" />
      <group ref={netRef}>
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshStandardMaterial
              color={i<3?"#ff6b35":i<7?"#ff9955":"#915eff"}
              emissive={i<3?"#cc4400":i<7?"#cc5500":"#6600cc"}
              emissiveIntensity={1.4}
              metalness={0.5} roughness={0.3}
            />
          </mesh>
        ))}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={lineCount} array={linePts} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial color="#ff6b35" transparent opacity={0.22} />
        </lineSegments>
      </group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={200} array={pulsePts} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#ff8855" size={0.018} sizeAttenuation transparent opacity={0.6} depthWrite={false} blending={AdditiveBlending} />
      </points>
    </>
  );
}

const SCENE_MAP = {
  viralcut: ViralCutScene,
  documind: DocuMindScene,
  iot:      IotScene,
  exam:     ExamScene,
  agent:    AgentScene,
};

/* ── Card visual: Three.js 3D scene per project ── */
const CardVisual = ({ themeKey }) => {
  const theme = CARD_THEMES[themeKey] || CARD_THEMES.viralcut;
  const Scene = SCENE_MAP[themeKey] || ViralCutScene;

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: theme.gradient }}>
      {/* Three.js canvas — transparent bg so gradient shows through */}
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${theme.accent}, ${theme.accent2 ?? theme.accent}, transparent)`,
        opacity: 0.85,
      }} />
    </div>
  );
};

/* ── Project Card ── */
const ProjectCard = ({ name, description, tags, themeKey, source_code_link, live_project_link, animate }) => (
  <motion.div variants={animate} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
    <Tilt
      options={{ max: 12, scale: 1.02, speed: 450 }}
      className="relative rounded-2xl overflow-hidden sm:w-[360px] w-full group"
      style={{
        background: "rgba(21,16,48,0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(145,94,255,0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(145,94,255,0.5)";
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.5), 0 0 30px rgba(145,94,255,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(145,94,255,0.15)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
      }}
    >
      {/* Shine sweep on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)",
          transition: "opacity 0.4s",
          zIndex: 10,
        }}
      />

      {/* Card visual (200px image area) */}
      <div className="relative w-full h-[200px] overflow-hidden">
        <CardVisual themeKey={themeKey} />

        {/* Fade to card body */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(21,16,48,0.95) 100%)" }}
        />

        {/* GitHub button */}
        {source_code_link && (
          <div className="absolute top-3 right-3">
            <motion.div
              onClick={() => window.open(source_code_link, "_blank")}
              className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              style={{
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(145,94,255,0.4)",
              }}
              whileHover={{ scale: 1.12, boxShadow: "0 0 16px rgba(145,94,255,0.7)" }}
              whileTap={{ scale: 0.9 }}
            >
              <img src={github} alt="source" className="w-5 h-5 object-contain" style={{ filter: "invert(1)" }} />
            </motion.div>
          </div>
        )}

        {/* In-progress badge */}
        {!live_project_link && !source_code_link && (
          <div className="absolute top-3 left-3">
            <span style={{
              fontSize: 11, fontWeight: 600,
              padding: "3px 10px", borderRadius: 99,
              background: "rgba(145,94,255,0.18)",
              border: "1px solid rgba(145,94,255,0.45)",
              color: "#c4a3ff",
              backdropFilter: "blur(8px)",
            }}>
              🔨 In Progress
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="text-white font-bold text-[20px] leading-tight">{name}</h3>
        <p className="mt-2 text-secondary text-[13px] leading-relaxed">{description}</p>

        {/* Tech stack chips — icon + name */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag, i) => {
            const icon = TAG_ICONS[tag.name.toLowerCase()];
            return (
              <div
                key={i}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                {icon && (
                  <img
                    src={icon}
                    alt={tag.name}
                    style={{ width: 13, height: 13, objectFit: "contain", flexShrink: 0 }}
                    draggable={false}
                  />
                )}
                <span className={`text-[11px] font-semibold leading-none ${tag.color}`}>
                  {tag.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Live button */}
        {live_project_link && (
          <a href={live_project_link} target="_blank" rel="noopener noreferrer">
            <motion.button
              className="mt-4 w-full py-2.5 rounded-xl text-white text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, rgba(145,94,255,0.28), rgba(0,191,255,0.28))",
                border: "1px solid rgba(145,94,255,0.4)",
              }}
              whileHover={{
                background: "linear-gradient(135deg, rgba(145,94,255,0.5), rgba(0,191,255,0.5))",
                boxShadow: "0 0 22px rgba(145,94,255,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              View Live →
            </motion.button>
          </a>
        )}
      </div>
    </Tilt>
  </motion.div>
);

/* ── Section ── */
const Works = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) mainControls.start("visible");
  }, [isInView, mainControls]);

  return (
    <section ref={ref}>
      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
      >
        <h3 className={`${styles.sectionSubText} text-center`}>Innovative Creations</h3>
      </motion.div>
      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
      >
        <h3 className={`${styles.sectionHeadText} text-center`}>Projects.</h3>
      </motion.div>

      <div className="mt-12 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            animate={fadeIn("up", "spring", index * 0.25, 0.75)}
            {...project}
          />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Works, "projects");
