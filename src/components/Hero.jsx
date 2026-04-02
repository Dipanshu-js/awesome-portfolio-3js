import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import FloatingShapes from "./canvas/FloatingShapes";
import { useState, useEffect } from "react";

const TypewriterText = ({ texts }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (isTyping) {
        const currentText = texts[currentIndex];
        if (displayText.length < currentText.length) {
          setDisplayText((prev) => currentText.slice(0, prev.length + 1));
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsTyping(true);
            setDisplayText("");
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }, 2000);
        }
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [currentIndex, isTyping, texts, displayText]);

  return (
    <span className="inline-block font-bold" style={{ color: "#915eff" }}>
      {displayText.split("").map((char, index) => (
        <motion.span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.05 }}>
          {char}
        </motion.span>
      ))}
      {isTyping && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block ml-0.5"
          style={{ color: "#00bfff" }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

const WavingHand = () => (
  <img
    src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f44b.png"
    alt="Waving Hand"
    className="wave-emoji"
    style={{ display: "inline-block", marginLeft: "10px", width: "50px", height: "50px" }}
  />
);

const Hero = () => {
  const typedItems = ["React Developer", "Full-Stack Engineer", "AI Engineer", "Problem Solver"];

  return (
    <section className="relative w-full h-screen mx-auto">
      <style>{`
        @keyframes wave {
          0%   { transform: rotate(0deg); }
          10%  { transform: rotate(-10deg); }
          20%  { transform: rotate(12deg); }
          30%  { transform: rotate(-10deg); }
          40%  { transform: rotate(9deg); }
          50%  { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .wave-emoji {
          animation: wave 1.8s ease-in-out infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
        @keyframes hero-glow-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.6;  transform: scale(1.06); }
        }
      `}</style>

      {/* ── Background: floating 3D wireframe shapes ── */}
      <FloatingShapes />

      {/* ── Ambient glow behind hero text ── */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "2%",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(145,94,255,0.2) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "hero-glow-pulse 5s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Hero text ── pointer-events:none so ComputersCanvas beneath gets mouse events ── */}
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
        style={{ zIndex: 2, pointerEvents: "none" }}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div
            className="w-5 h-5 rounded-full bg-[#915EFF]"
            style={{ boxShadow: "0 0 12px #915eff, 0 0 24px rgba(145,94,255,0.5)" }}
          />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <motion.h1
            className={`${styles.heroHeadText} text-white`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Hi, I&apos;m{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #915eff 0%, #00bfff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 20px rgba(145,94,255,0.5))",
              }}
            >
              Dipanshu
            </span>
            <WavingHand />
          </motion.h1>

          {/* Nickname badge */}
          <motion.div
            className="mt-2 mb-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: "rgba(0,191,255,0.08)",
              border: "1px solid rgba(0,191,255,0.25)",
              backdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <span style={{ fontSize: 13 }}>✨</span>
            <span style={{ color: "rgba(170,166,195,0.7)", fontSize: 12, fontWeight: 500 }}>also known as</span>
            <span style={{
              fontSize: 13, fontWeight: 700,
              background: "linear-gradient(90deg, #00bfff, #915eff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Aaansh</span>
            <span style={{ fontSize: 13 }}>✨</span>
          </motion.div>

          <motion.p
            className={`${styles.heroSubText} mt-2 text-white-100`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            I&apos;m a <TypewriterText texts={typedItems} />
          </motion.p>

          <motion.p
            className="mt-3 text-[15px] max-w-md"
            style={{ color: "rgba(170,166,195,0.8)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Building real-time systems, AI applications &amp; beautiful web experiences.
          </motion.p>

          <motion.div
            className="mt-6 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ pointerEvents: "auto" }}
          >
            <a href="#work">
              <button
                className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #915eff, #6d38cc)",
                  boxShadow: "0 4px 24px rgba(145,94,255,0.4)",
                }}
              >
                View Experience
              </button>
            </a>
            <a href="#contact">
              <button
                className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(145,94,255,0.4)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Get In Touch
              </button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── 3D Computer — takes full section height in flow ── */}
      <ComputersCanvas />

      {/* ── Scroll indicator ── */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center" style={{ zIndex: 2, pointerEvents: "auto" }}>
        <a href="#about">
          <div
            className="w-[35px] h-[64px] rounded-3xl border-2 flex justify-center items-start p-2"
            style={{ borderColor: "rgba(145,94,255,0.5)", boxShadow: "0 0 10px rgba(145,94,255,0.2)" }}
          >
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full mb-1"
              style={{ background: "linear-gradient(180deg, #915eff, #00bfff)" }}
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
