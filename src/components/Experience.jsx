import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const roadmapData = [
    {
        id: "samsung",
        company: "SAMSUNG R&D INSTITUTE INDIA - BANGALORE",
        role: "RESEARCH AND DEVELOPMENT INTERN",
        period: "JAN 2025 - PRESENT",
        metrics: [
            { label: "ENGINE", value: "YAMNet // CNN14" },
            { label: "INPUT", value: "LOG-MEL SPECTROGRAMS" },
            { label: "TASK", value: "AUDIO_EVENT_DETECTION" },
            { label: "STATUS", value: "ACTIVE" }
        ],
        desc: "Building a deep learning-based audio event detection system for kitchen activity recognition using YAMNet and transfer learning and evaluating model robustness under real-world noise via feature extraction and Log-Mel spectrogram analysis."
    },
    {
        id: "edunet",
        company: "EDUNET FOUNDATION",
        role: "AI/ML INTERN",
        period: "JUN 2025 - JUL 2025",
        metrics: [
            { label: "DATASET", value: "48K_RECORDS" },
            { label: "PIPELINE", value: "SMOTE" },
            { label: "MODEL", value: "GRADIENT_BOOSTING" },
            { label: "ACCURACY", value: "86%" }
        ],
        desc: "Worked on large-scale dataset preprocessing and model optimization for healthcare applications. Applied SMOTE to balance class distributions. Fine-tuned Gradient Boosting models achieving 86% accuracy. Implemented Responsible AI practices to ensure model fairness."
    }
];

const Experience = () => {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the vertical brutalist timeline line from top to bottom on scroll
            gsap.fromTo(lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    transformOrigin: "top center",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 0.5
                    }
                }
            );

            // Stagger reveal the brutalist cards as they enter the screen
            gsap.fromTo('.brutalist-experience-card',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        once: true
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative w-full min-h-screen bg-[#D1D1D1] py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10 selection:bg-black selection:text-white"
        >
            {/* Minimalist Brutalist Section Title */}
            <div className="w-full max-w-6xl mx-auto mb-20">
                <h2 className="font-[900] text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-[-0.05em] text-black uppercase">
                    EXPERIENCE
                </h2>
                <span className="font-mono text-xs md:text-sm font-bold text-black/40 tracking-wider block mt-2">
                    / THE INTERACTIVE TIMELINE
                </span>
            </div>

            {/* Layout Wrapper with the Left Timeline Anchor Line */}
            <div className="relative w-full max-w-5xl mx-auto pl-8 md:pl-16">

                {/* Core Vertical Timeline Track Line */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/10">
                    <div
                        ref={lineRef}
                        className="w-full h-full bg-black origin-top"
                    />
                </div>

                {/* Vertical Stack of Cards */}
                <div className="space-y-16 w-full">
                    {roadmapData.map((item) => (
                        <div
                            key={item.id}
                            className="brutalist-experience-card relative w-full flex flex-col"
                        >
                            {/* Horizontal Connecting Node Link from Line to Card */}
                            <div className="absolute -left-[32px] md:-left-[64px] top-8 w-4 md:w-8 h-[2px] bg-black" />

                            {/* Little Node Square Box on the Timeline Track */}
                            <div className="absolute -left-[37px] md:-left-[69px] top-[29px] w-2 h-2 bg-black rotate-45" />

                            {/* Main Structural Premium Brutalist Card */}
                            <div className="w-full bg-[#E5E5E5] border-[2px] border-black p-6 md:p-8 lg:p-10 shadow-[8px_8px_0px_#000000] relative">

                                {/* Aesthetic Corner Anchors */}
                                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-black pointer-events-none" />
                                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 bg-black pointer-events-none" />

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                                    {/* Main Role Details Header Block */}
                                    <div className="lg:col-span-2 space-y-4">
                                        <div className="space-y-1.5 border-b border-black/20 pb-4">
                                            <span className="font-mono text-xs font-bold tracking-wider text-black/40 block">
                                                // {item.period}
                                            </span>
                                            <h3 className="font-[900] text-xl md:text-2xl lg:text-3xl tracking-tight text-black leading-tight uppercase">
                                                {item.role}
                                            </h3>
                                            <p className="font-mono text-xs md:text-sm font-bold tracking-tight text-black/60 uppercase">
                                                {item.company}
                                            </p>
                                        </div>

                                        {/* Description Content */}
                                        <p className="font-mono text-sm md:text-base leading-relaxed text-black/90 font-medium">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {/* Engineering System Metrics Block Panel */}
                                    <div className="lg:col-span-1 flex flex-col justify-start space-y-3 pt-2 lg:pt-0 lg:pl-6 lg:border-l border-black/10">
                                        <span className="font-mono text-[10px] font-bold tracking-widest text-black/30 block mb-1">
                                            // SYSTEM_PARAMS
                                        </span>
                                        {item.metrics.map((metric, idx) => (
                                            <div
                                                key={idx}
                                                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between lg:flex-col lg:items-start font-mono text-xs border border-black/10 p-2 bg-black/[0.02]"
                                            >
                                                <span className="font-bold text-black/40 uppercase tracking-tight text-[10px]">
                                                    [ {metric.label} ]
                                                </span>
                                                <span className="font-bold text-black uppercase tracking-tight mt-0.5 sm:mt-0 lg:mt-0.5">
                                                    {metric.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Experience;