"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import { resume, profilepic } from "../assets";

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.5, 0.75)}
    className="w-full xs:w-[250px]"
  >
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="w-full p-[1px] rounded-[20px] shadow-card"
      style={{
        background: "linear-gradient(135deg, #915eff, #00bfff, #ff6b9d)",
      }}
    >
      <div
        className="rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col relative overflow-hidden"
        style={{
          background: "rgba(21,16,48,0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <motion.img
          src={icon}
          alt={title}
          className="w-16 h-16 object-contain"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(145,94,255,0.1) 0%, transparent 70%)",
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  </motion.div>
);

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) mainControls.start("visible");
  }, [isInView, mainControls]);

  return (
    <div ref={sectionRef} className="pt-[60px] md:pt-0 overflow-hidden">
      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <p className={styles.sectionSubText}>Introduction</p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <div className="mt-10 flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Profile section */}
        <motion.div
          variants={fadeIn("right", "spring", 0.5, 0.75)}
          className="w-full md:w-1/3 flex flex-col items-center"
        >
          {/* Animated ring around profile pic */}
          <div className="relative" style={{ width: "260px", height: "260px" }}>
            {/* Outer rotating gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: "-4px",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, #915eff, #00bfff, #ff6b9d, #915eff)",
                zIndex: 0,
              }}
            />
            {/* Inner mask to create ring effect */}
            <div
              style={{
                position: "absolute",
                inset: "2px",
                borderRadius: "50%",
                background: "#050816",
                zIndex: 1,
              }}
            />
            {/* Second slower ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: "6px",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 90deg, transparent 70%, rgba(145,94,255,0.6) 85%, transparent 100%)",
                zIndex: 2,
              }}
            />
            {/* Glow pulse */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: "-12px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(145,94,255,0.25) 0%, transparent 70%)",
                zIndex: 0,
                filter: "blur(8px)",
              }}
            />
            {/* Profile image */}
            <div
              style={{
                position: "absolute",
                inset: "8px",
                borderRadius: "50%",
                overflow: "hidden",
                zIndex: 3,
              }}
            >
              <img
                src={profilepic}
                alt="Dipanshu Singh"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "50% 15%",
                }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <motion.button
              className="px-6 py-3 font-semibold text-white text-sm rounded-xl transition-all"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                boxShadow:
                  "0 4px 20px rgba(79,70,229,0.4), 0 2px 0 rgba(0,0,0,0.5)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 24px rgba(79,70,229,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(resume, "_blank")}
            >
              Resume
            </motion.button>

            <motion.button
              className="px-6 py-3 font-semibold text-white text-sm rounded-xl transition-all"
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                boxShadow:
                  "0 4px 20px rgba(37,99,235,0.4), 0 2px 0 rgba(0,0,0,0.5)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 24px rgba(37,99,235,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/dipanshu-singh/",
                  "_blank",
                )
              }
            >
              LinkedIn
            </motion.button>

            <motion.button
              className="px-6 py-3 font-semibold text-white text-sm rounded-xl transition-all"
              style={{
                background: "linear-gradient(135deg, #374151, #1f2937)",
                boxShadow:
                  "0 4px 20px rgba(55,65,81,0.5), 0 2px 0 rgba(0,0,0,0.5)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 24px rgba(55,65,81,0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open("https://github.com/Dipanshu-js", "_blank")
              }
            >
              GitHub
            </motion.button>
          </div>
        </motion.div>

        {/* Bio text */}
        <motion.div
          variants={fadeIn("left", "spring", 0.5, 0.75)}
          className="w-full md:w-2/3"
        >
          <motion.ul
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-3xl space-y-5 list-none"
          >
            {[
              {
                icon: "👨‍💻",
                text: "I'm a React and Full-Stack developer with 4+ years of experience — most of that building real-time IoT dashboards and multi-tenant analytics on AWS, recently moving into AI apps with LangChain and OpenAI.",
              },
              {
                icon: "🎓",
                text: "Pursuing MCA at Indira Gandhi National Open University. Completed B.Tech in Computer Science from Noida Institute of Engineering & Technology.",
              },
              {
                icon: "⚡",
                text: "Built real-time systems handling 100+ devices over AWS IoT Core WebSockets with sub-200ms latency. Cut UI re-renders from 600/min to 18/min through smart memoization and MQTT throttling.",
              },
              {
                icon: "🤖",
                text: "Now building LLM-powered apps — RAG pipelines, document Q&A chatbots with ChromaDB, and AI-assisted features using OpenAI API and LangChain.",
              },
              {
                icon: "💡",
                text: "I care a lot about performance and clean state management, and I like owning features end to end.",
              },
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                variants={fadeIn("up", "spring", 0.1 + index * 0.1, 0.75)}
              >
                <span className="mr-4 text-2xl flex-shrink-0">{item.icon}</span>
                <span>{item.text}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
