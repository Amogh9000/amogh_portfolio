import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate timeline items on scroll
            gsap.from('.exp-item', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
            });

            // Animate timeline line
            gsap.from(timelineRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
                scaleY: 0,
                transformOrigin: 'top',
                duration: 1.2,
                ease: 'power2.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-6 bg-[#D1D1D1]">
            <div className="max-w-4xl mx-auto">
                {/* Section Title */}
                <h2 className="font-[900] text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] tracking-[-0.05em] text-black mb-20">
                    EXPERIENCE
                </h2>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div
                        ref={timelineRef}
                        className="absolute left-0 top-0 bottom-0 w-[1px] bg-black"
                    />

                    {/* Experience Item 1 - Most Recent */}
                    <div className="exp-item relative pl-12 pb-16 last:pb-0">
                        {/* Timeline Dot */}
                        <div className="absolute left-[-4px] top-2 w-[9px] h-[9px] bg-black" />

                        {/* Content */}
                        <div className="space-y-4">
                            {/* Header */}
                            <div className="space-y-3 mb-6">
                                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                                    <h3 className="font-[900] text-2xl md:text-3xl tracking-[-0.05em] text-black">
                                        RESEARCH AND DEVELOPMENT INTERN
                                    </h3>
                                    <span className="font-[900] text-sm tracking-[-0.02em] text-black/60">
                                        SAMSUNG R&D INSTITUTE INDIA - BANGALORE
                                    </span>
                                </div>
                                <div className="font-[900] text-xs tracking-[-0.02em] text-black/50 uppercase">
                                    JAN 2025 - PRESENT
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-black/80 text-base leading-relaxed max-w-2xl">
                            </p>
                        </div>
                    </div>

                    {/* Experience Item 2 */}
                    <div className="exp-item relative pl-12 pb-16 last:pb-0">
                        {/* Timeline Dot */}
                        <div className="absolute left-[-4px] top-2 w-[9px] h-[9px] bg-black" />

                        {/* Content */}
                        <div className="space-y-4">
                            {/* Header */}
                            <div className="space-y-3 mb-6">
                                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                                    <h3 className="font-[900] text-2xl md:text-3xl tracking-[-0.05em] text-black">
                                        AI/ML INTERN
                                    </h3>
                                    <span className="font-[900] text-sm tracking-[-0.02em] text-black/60">
                                        EDUNET FOUNDATION
                                    </span>
                                </div>
                                <div className="font-[900] text-xs tracking-[-0.02em] text-black/50 uppercase">
                                    JUN 2025 - JUL 2025
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-black/80 text-base leading-relaxed max-w-2xl">
                                Worked on large-scale dataset preprocessing and model optimization for healthcare applications.
                            </p>

                            {/* Achievements */}
                            <ul className="space-y-3 mt-6">
                                <li className="flex items-start gap-3 text-black/80">
                                    <span className="text-black font-bold mt-1">▹</span>
                                    <span>Preprocessed 48K+ dataset entries, applying SMOTE to balance class distribution.</span>
                                </li>
                                <li className="flex items-start gap-3 text-black/80">
                                    <span className="text-black font-bold mt-1">▹</span>
                                    <span>Fine-tuned Gradient Boosting models achieving 86% accuracy.</span>
                                </li>
                                <li className="flex items-start gap-3 text-black/80">
                                    <span className="text-black font-bold mt-1">▹</span>
                                    <span>Implemented Responsible AI practices to ensure model fairness.</span>
                                </li>
                            </ul>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;

