import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef(null);
  const textContainerRef = useRef(null);

  useEffect(() => {
    // Animate the progress value from 0 to 100
    const progressObj = { value: 0 };
    
    gsap.to(progressObj, {
      value: 100,
      duration: 2.2,
      ease: "power3.inOut",
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      },
      onComplete: () => {
        // Exit animation sequence
        const tl = gsap.timeline();
        
        tl.to(textContainerRef.current, {
          scale: 1.1,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in"
        })
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "expo.inOut"
        }, "-=0.2")
        .set(loaderRef.current, { display: "none" });
      }
    });
  }, []);

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[999] bg-[#0A0A0A] flex flex-col justify-center items-center pointer-events-auto"
    >
      <div ref={textContainerRef} className="relative flex items-end justify-center">
        {/* Outline Background Text */}
        <div 
          className="text-[25vw] md:text-[18rem] font-[900] leading-none tracking-tighter"
          style={{ 
             WebkitTextStroke: '2px rgba(209, 209, 209, 0.2)',
             color: 'transparent',
             fontFamily: '"Inter Tight", sans-serif'
          }}
        >
          {progress.toString().padStart(2, '0')}
        </div>
        
        {/* Solid Foreground Text with Clip Path Fill */}
        <div 
          className="absolute inset-0 flex items-end justify-center text-[25vw] md:text-[18rem] font-[900] leading-none tracking-tighter text-[#D1D1D1]"
          style={{
             clipPath: `inset(${100 - progress}% 0 0 0)`,
             fontFamily: '"Inter Tight", sans-serif'
          }}
        >
          {progress.toString().padStart(2, '0')}
        </div>
        
        <span className="text-2xl md:text-5xl font-bold ml-2 mb-[4vw] md:mb-10 text-[#D1D1D1]">
          %
        </span>
      </div>

      <div className="absolute bottom-8 font-mono text-[10px] md:text-xs font-bold text-[#D1D1D1]/40 uppercase tracking-widest flex justify-between w-full px-12">
        <span>// INITIATING_SYSTEM</span>
        <span>AURA_ENGINE_V1</span>
      </div>
    </div>
  );
};

export default Loader;
