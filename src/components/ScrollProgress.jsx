import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const smoothProgress = useSpring(progress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: smoothProgress.get() + "%",
        background: "linear-gradient(90deg, #915eff, #00bfff, #ff6b9d)",
        zIndex: 99999,
        transformOrigin: "left",
        boxShadow: "0 0 10px #915eff, 0 0 20px rgba(145,94,255,0.5)",
      }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.1 }}
    />
  );
};

export default ScrollProgress;
