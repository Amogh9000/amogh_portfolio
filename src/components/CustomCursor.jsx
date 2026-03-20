import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isActive, setIsActive] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 500 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("portfolio-node-active", () => setIsActive(true));
    window.addEventListener("portfolio-node-inactive", () => setIsActive(false));

    return () => {
      window.removeEventListener("mousemove", moveMouse);
    };
  }, []);

  return (
    <motion.div
      // Hidden on mobile to prevent the "dead cursor" look
      className="fixed top-0 left-0 w-5 h-5 bg-black rounded-none pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        scale: isActive ? 2.2 : 1,
        rotate: isActive ? 45 : 0
      }}
    />
  );
};

export default CustomCursor;
