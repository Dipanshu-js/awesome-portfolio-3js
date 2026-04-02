import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let animFrameId;

    const onMouseMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = `${dotX}px`;
        dotRef.current.style.top = `${dotY}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      animFrameId = requestAnimationFrame(animate);
    };

    const onMouseOver = (e) => {
      const tag = e.target.tagName.toLowerCase();
      const isInteractive = ["a", "button", "input", "textarea", "select"].includes(tag)
        || e.target.closest("a, button, [role='button']");
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          width: isHovering ? "12px" : "8px",
          height: isHovering ? "12px" : "8px",
          borderRadius: "50%",
          background: isHovering
            ? "linear-gradient(135deg, #915eff, #00bfff)"
            : "#915eff",
          boxShadow: isHovering
            ? "0 0 16px #915eff, 0 0 32px rgba(145,94,255,0.6)"
            : "0 0 10px #915eff, 0 0 20px rgba(145,94,255,0.4)",
          transition: "width 0.2s, height 0.2s, box-shadow 0.2s",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
          width: isHovering ? "50px" : "36px",
          height: isHovering ? "50px" : "36px",
          borderRadius: "50%",
          border: isHovering
            ? "2px solid rgba(145,94,255,0.8)"
            : "1.5px solid rgba(145,94,255,0.4)",
          boxShadow: isHovering ? "0 0 12px rgba(145,94,255,0.3)" : "none",
          transition: "width 0.3s, height 0.3s, border 0.2s, box-shadow 0.2s",
        }}
      />
    </>
  );
};

export default CustomCursor;
