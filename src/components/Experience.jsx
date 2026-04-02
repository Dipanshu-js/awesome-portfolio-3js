import React, { useState, useCallback, useMemo, useTransition, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";

const ExperienceCard = React.memo(({ experience, isActive, onClick, index }) => {
  return (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.1, 0.5)}
      className="flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden group"
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button"
      tabIndex={0}
      aria-selected={isActive}
      aria-label={`${experience.title} at ${experience.company_name}`}
      style={{
        background: isActive
          ? "linear-gradient(135deg, rgba(29,24,54,0.95) 0%, rgba(42,29,76,0.95) 100%)"
          : "rgba(21,16,48,0.6)",
        backdropFilter: "blur(12px)",
        border: isActive ? "1px solid rgba(145,94,255,0.5)" : "1px solid rgba(255,255,255,0.05)",
        boxShadow: isActive ? "0 0 24px rgba(145,94,255,0.25), inset 0 0 20px rgba(145,94,255,0.05)" : "none",
      }}
    >
      {/* Hover shimmer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "linear-gradient(105deg, transparent 40%, rgba(145,94,255,0.06) 50%, transparent 60%)" }}
      />

      {/* Active left accent bar */}
      {isActive && (
        <motion.div
          layoutId="activeBar"
          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
          style={{ background: "linear-gradient(180deg, #915eff, #00bfff)" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Logo */}
      <div
        className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center mr-4"
        style={{
          backgroundColor: experience.iconBg || "#1a1a2e",
          border: isActive ? "1px solid rgba(145,94,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
          boxShadow: isActive ? "0 0 14px rgba(145,94,255,0.4)" : "none",
          transition: "all 0.3s ease",
          padding: "6px",
        }}
      >
        <img
          src={experience.icon}
          alt={experience.company_name}
          style={{ width: "100%", height: "100%", objectFit: "contain", maxWidth: "40px", maxHeight: "40px" }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-white text-[15px] font-bold leading-tight truncate">{experience.title}</h3>
        <p className="text-secondary text-[12px] mt-0.5 truncate">{experience.company_name}</p>
        <p className="text-[11px] mt-0.5" style={{ color: "#a78bff" }}>{experience.date}</p>
      </div>
    </motion.div>
  );
});

const ExperienceDetails = React.memo(({ experience }) => {
  return (
    <motion.div
      key={experience.company_name}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(21,16,48,0.8)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(145,94,255,0.2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Corner glow accents */}
      <div className="absolute top-0 left-0 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(145,94,255,0.12) 0%, transparent 70%)", transform: "translate(-30%,-30%)" }}
      />
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,191,255,0.08) 0%, transparent 70%)", transform: "translate(30%,30%)" }}
      />

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex items-start gap-5 mb-6">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: experience.iconBg || "#1a1a2e",
              border: "1px solid rgba(145,94,255,0.3)",
              boxShadow: "0 0 20px rgba(145,94,255,0.2)",
              padding: "8px",
            }}
          >
            <img
              src={experience.icon}
              alt={experience.company_name}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div>
            <h3 className="text-white text-[22px] font-bold leading-tight">{experience.title}</h3>
            <p className="text-secondary text-[14px] mt-1">{experience.company_name}</p>
            <span
              className="inline-block mt-2 text-[11px] px-3 py-1 rounded-full font-medium"
              style={{
                background: "linear-gradient(90deg, rgba(145,94,255,0.2), rgba(0,191,255,0.2))",
                border: "1px solid rgba(145,94,255,0.3)",
                color: "#c8b8ff",
              }}
            >
              {experience.date}
            </span>
          </div>
        </div>

        {/* Gradient divider */}
        <div className="w-full h-px mb-6"
          style={{ background: "linear-gradient(90deg, rgba(145,94,255,0.5), transparent)" }}
        />

        {/* Bullet points */}
        <ul className="space-y-3">
          {experience.points.map((point, index) => (
            <motion.li
              key={`point-${index}`}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.07, duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <span
                className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #915eff, #00bfff)", boxShadow: "0 0 6px #915eff" }}
              />
              <p className="text-white-100 text-[14px] leading-relaxed">{point}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
});

const Experience = () => {
  const [activeExperience, setActiveExperience] = useState(0);
  const [isPending, startTransition] = useTransition();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const mainControls = useAnimation();

  const handleExperienceClick = useCallback((index) => {
    startTransition(() => setActiveExperience(index));
  }, []);

  const currentExperience = useMemo(() => experiences[activeExperience], [activeExperience]);

  useEffect(() => {
    if (isInView) mainControls.start("visible");
  }, [isInView, mainControls]);

  return (
    <div ref={sectionRef}>
      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
      >
        <p className={`${styles.sectionSubText} text-center`}>My Professional Journey</p>
      </motion.div>
      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
      >
        <h2 className={`${styles.sectionHeadText} text-center`}>Work Experience</h2>
      </motion.div>

      <div className="mt-20 flex flex-col md:flex-row gap-6">
        <div className="md:w-[38%]">
          <div className="flex flex-col space-y-3">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
                isActive={index === activeExperience}
                onClick={() => handleExperienceClick(index)}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className="md:w-[62%]">
          <AnimatePresence mode="wait" initial={false}>
            {!isPending && (
              <ExperienceDetails key={currentExperience.company_name} experience={currentExperience} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
