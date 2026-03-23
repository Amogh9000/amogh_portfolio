import React, { useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkPointer = (e) => {
      const target = e.target;
      const isClickable = target.closest('a, button, [role="button"], input, .interactive, .skill-item');
      setIsPointer(!!isClickable);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", checkPointer);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", checkPointer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  // Antigravity Fail-safe: Disable on touch devices to prevent ghost marks
  if (typeof window !== 'undefined' && ('ontouchstart' in window)) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
          style={{
            x: mouseX,
            y: mouseY,
            // Offset so the TOP CIRCLE of the hand is the anchor point
            translateX: isPointer ? "-50%" : "0%",
            translateY: isPointer ? "-20%" : "0%",
            color: "white",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            animate={{
              scale: isClicked ? 0.85 : 1,
              rotate: isClicked ? -5 : 0 // Slight tilt on click for feedback
            }}
          >
            {isPointer ? (
              /* EXACT TAP_HAND FROM IMAGE_59666D.PNG */
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* The Target Circle at the tip */}
                <circle cx="12" cy="5" r="3" />
                {/* The Pointing Finger */}
                <path d="M12 8v4" />
                {/* The Simplified Hand Base */}
                <path d="M9 12h6v5a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-5z" />
                {/* Wrist line */}
                <path d="M10 22h4" strokeOpacity="0.3" />
              </svg>
            ) : (
              /* SYSTEM_ARROW */
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.5 2v18.5l4.5-4.5h8.5l-13-14z" />
                <path d="M5.5 2v18.5l4.5-4.5h8.5l-13-14z" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;