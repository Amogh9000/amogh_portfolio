import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1.5 seconds to reach 100.
    // Let's update every 15ms. That's 100 updates.
    // 15ms * 100 = 1500ms
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Once at 100%, wait 200ms, then trigger out animation
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex flex-col justify-center items-center pointer-events-auto"
          style={{ backgroundColor: '#D1D1D1' }}
        >
          <div
            className="text-[12vw] md:text-[8rem] text-black leading-none tracking-tighter"
            style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 900 }}
          >
            [ {progress.toString().padStart(2, '0')}% ]
          </div>
          <div
            className="absolute bottom-6 left-6 text-xs text-black/60"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            // INITIATING_SYSTEM
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
