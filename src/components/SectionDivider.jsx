import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionDivider = ({ text = "EXPLORE • CREATE • INNOVATE • ", direction = "left" }) => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const moveDistance = direction === "left" ? "-20%" : "20%";

        gsap.to(marquee, {
            x: moveDistance,
            ease: "none",
            scrollTrigger: {
                trigger: marquee.parentNode,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [direction]);

    return (
        <div className="relative z-20 py-12 overflow-hidden bg-black flex flex-col items-center justify-center border-t border-b border-white/20">
            <div className="relative w-full overflow-hidden whitespace-nowrap">
                <div
                    ref={marqueeRef}
                    className="inline-block text-[4rem] md:text-[8rem] font-bold leading-none text-white/75 tracking-tighter whitespace-nowrap uppercase"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                >
                    {text} {text} {text} {text}
                </div>
            </div>
        </div>
    );
};

export default SectionDivider;
