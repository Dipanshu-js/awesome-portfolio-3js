import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

import {
  javascript,
  typescript,
  reactjs,
  nextjs,
  redux,
  tailwind,
  html,
  css,
  nodejs,
  mongodb,
  aws,
  docker,
  python,
  express,
  redis,
  firebase,
  openai,
  langchain,
  git,
  figma,
  vercel,
  postman,
  jest,
} from "../assets";

const frontend = [
  { name: "React.js", icon: reactjs },
  { name: "Next.js", icon: nextjs },
  { name: "TypeScript", icon: typescript },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "JavaScript", icon: javascript },
  { name: "HTML5", icon: html },
  { name: "CSS3", icon: css },
];

const backend = [
  { name: "Node.js", icon: nodejs },
  { name: "Express.js", icon: express },
  { name: "MongoDB", icon: mongodb },
  { name: "Redis", icon: redis },
  { name: "Firebase", icon: firebase },
  { name: "AWS", icon: aws },
  { name: "Docker", icon: docker },
  { name: "Python", icon: python },
];

const aiTools = [
  { name: "OpenAI API", icon: openai },
  { name: "LangChain", icon: langchain },
  { name: "Git", icon: git },
  { name: "Figma", icon: figma },
  { name: "Vercel", icon: vercel },
  { name: "Postman", icon: postman },
  { name: "Jest", icon: jest },
];

/* ── Single hexagon with tooltip ── */
const HexTech = ({ tech, hexagonVariants }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      <motion.div
        className="hexagon"
        variants={hexagonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={tech.icon} alt={tech.name} style={{ userSelect: "none" }} draggable="false" />
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.85 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(20,10,40,0.95)",
              border: "1px solid rgba(145,94,255,0.5)",
              backdropFilter: "blur(12px)",
              borderRadius: "8px",
              padding: "4px 12px",
              whiteSpace: "nowrap",
              color: "#e2d9f3",
              fontSize: "13px",
              fontWeight: 600,
              boxShadow: "0 0 16px rgba(145,94,255,0.35)",
              pointerEvents: "none",
              zIndex: 999,
            }}
          >
            {tech.name}
            {/* Arrow */}
            <span
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid rgba(145,94,255,0.5)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Tech = () => {
  const [rows, setRows] = useState({
    frontend: [],
    backend: [],
    tooling: [],
  });

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2
  });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const calculateRows = (width, techArray) => {
    let dynamicRows = [];
    let startIndex = 0;
    let rowSize = 6;

    if (width < 500) {
      dynamicRows = [
        techArray.slice(0, 3),
        techArray.slice(3, 5),
        techArray.slice(5, 8),
        techArray.slice(8, 10),
      ];
    } else {
      while (startIndex < techArray.length) {
        const endIndex = startIndex + rowSize;
        dynamicRows.push(techArray.slice(startIndex, endIndex));
        startIndex += rowSize;
        rowSize = rowSize === 6 ? 5 : 6;
      }
    }

    return dynamicRows;
  };

  useEffect(() => {
    const calculateRowsForAllCategories = () => {
      const rowsData = {
        frontend: calculateRows(window.innerWidth, frontend),
        backend: calculateRows(window.innerWidth, backend),
        tooling: calculateRows(window.innerWidth, aiTools),
      };
      setRows(rowsData);
    };

    calculateRowsForAllCategories();

    const handleResize = () => {
      calculateRowsForAllCategories();
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hexagonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: Math.random() * 1.5,
        duration: 0.5,
        type: "spring"
      }
    },
    hover: {
      scale: 1.05,
      zIndex: 2,
      transition: { duration: 0.3 }
    }
  };

  const renderCategory = (categoryName, categoryRows) => (
    <motion.div
      key={categoryName}
      className="category-container"
      initial="hidden"
      animate={mainControls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
      }}
    >
      <motion.h2
        className="category-title top"
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        style={{
          fontFamily: "'', cursive",
          fontSize: "26px",
          background: "linear-gradient(90deg, #915EFF, #00BFFF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textFillColor: "transparent",
          filter: "drop-shadow(0 0 10px #915EFF)",
        }}
      >{`<${categoryName}>`}</motion.h2>
      <div className="honeycomb-grid">
        {categoryRows?.map((row, rowIndex) => (
          <div
            key={`${categoryName}-row-${rowIndex}`}
            className={`honeycomb-row ${rowIndex % 2 === 1 ? "staggered-row" : ""}`}
          >
            {row.map((tech) => (
              <HexTech key={tech.name} tech={tech} hexagonVariants={hexagonVariants} />
            ))}
          </div>
        ))}
      </div>
      <motion.h2
        className="category-title bottom"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        style={{
          fontFamily: "'', cursive",
          fontSize: "26px",
          background: "linear-gradient(90deg, #915EFF, #00BFFF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textFillColor: "transparent",
          filter: "drop-shadow(0 0 10px #915EFF)",
        }}
      >{`</${categoryName}>`}</motion.h2>
    </motion.div>
  );

  return (
    <section className="skills" ref={ref}>
      <div className="container">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center`}>Technical Proficiencies</p>
          <h2 className={`${styles.sectionHeadText} text-center`}>Skills.</h2>
        </motion.div>
        {renderCategory("frontend", rows.frontend)}
        {renderCategory("backend", rows.backend)}
        {renderCategory("tooling", rows.tooling)}
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "skills");
