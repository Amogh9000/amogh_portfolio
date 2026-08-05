import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const textElement = textRef.current;

        // Simple parallax or reveal effect on scroll
        const tween = gsap.fromTo(textElement,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "top 30%",
                    scrub: 1
                }
            }
        );

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            id="about"
            className="min-h-[80vh] w-full bg-[#D1D1D1] flex flex-col justify-center px-4 md:px-12 py-32 border-b border-black"
        >
            {/* Grid Container */}
            <div className="relative w-full max-w-[95%] mx-auto border-t border-l border-r border-black p-8 md:p-16 min-h-[500px] flex items-center">

                {/* Corner Metadata */}
                <span className="absolute top-4 left-4 text-[10px] font-mono font-bold tracking-widest text-black uppercase">
                    [REF: PHI-01]
                </span>
                <span className="absolute top-4 right-4 text-[10px] font-mono font-bold tracking-widest text-black uppercase">
                    Status: Active
                </span>
                <span className="absolute bottom-4 left-4 text-[10px] font-mono font-bold tracking-widest text-black uppercase">
                    Loc: IN
                </span>
                <span className="absolute bottom-4 right-4 text-[10px] font-mono font-bold tracking-widest text-black uppercase">
                    Mode: Architecture
                </span>

                {/* Massive Typography */}
                <div ref={textRef} className="relative z-10 mix-blend-multiply">
                    <h2
                        className="text-[10vw] md:text-[7rem] lg:text-[9rem] font-black leading-[0.8] tracking-[-0.05em] text-black uppercase text-left break-words"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        I ARCHITECT <br />
                        <span
                            className="text-transparent transition-colors duration-500 hover:text-black cursor-crosshair"
                            style={{ WebkitTextStroke: "1px black" }}
                        >
                            INTELLIGENT
                        </span> <br />
                        <span
                            className="text-transparent transition-colors duration-500 hover:text-black cursor-crosshair"
                            style={{ WebkitTextStroke: "1px black" }}
                        >
                            SYSTEMS
                        </span> <br />
                        THAT SOLVE <br />
                        REAL PROBLEMS.
                    </h2>
                </div>
            </div>

            {/* Bottom Grid Bar for Continuity */}
            <div className="w-full max-w-[95%] mx-auto border border-t-0 border-black grid grid-cols-2">
                <div className="p-4 border-r border-black flex items-center gap-4">
                    <span className="w-4 h-4 bg-black block"></span>
                    <p className="font-mono text-xs uppercase leading-tight max-w-[200px]">
                        Data Scientist by training. <br /> Engineer by practice.
                    </p>
                </div>
                <div className="p-4 flex items-center justify-end">
                    <span className="font-mono text-xs uppercase tracking-widest">
                        Scroll_For_Analysis ↓
                    </span>
                </div>
            </div>

        </section>
    );
};

export default About;
