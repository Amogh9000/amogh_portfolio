import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);

    // Initial attachment
    const attachListeners = () => {
      const targets = document.querySelectorAll('a, button, .project-row, .nav-item, [role="button"]');
      targets.forEach((target) => {
        target.addEventListener('mouseenter', handleHoverStart);
        target.addEventListener('mouseleave', handleHoverEnd);
      });
      return targets;
    };

    let targets = attachListeners();

    // Re-attach listeners on DOM changes (important for dynamic content)
    const observer = new MutationObserver(() => {
      // Remove old listeners to avoid duplicates
      targets.forEach((target) => {
        target.removeEventListener('mouseenter', handleHoverStart);
        target.removeEventListener('mouseleave', handleHoverEnd);
      });
      targets = attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
      targets.forEach((target) => {
        target.removeEventListener('mouseenter', handleHoverStart);
        target.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 border border-black rounded-full pointer-events-none z-[9999] flex items-center justify-center font-bold"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        borderRadius: isHovering ? "0%" : "50%", // Changes from circle to square on hover
        backgroundColor: isHovering ? "rgba(0,0,0,0.1)" : "transparent",
        borderColor: isHovering ? "rgba(0,0,0,0.8)" : "black"
      }}
    >
      {/* The "Crosshair" center dot */}
      <div className="w-1 h-1 bg-black rounded-full" />
    </motion.div>
  );
};

export default CustomCursor;
