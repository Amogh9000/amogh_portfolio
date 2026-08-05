import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const roadmapData = [
    {
        id: "samsung",
        nodeId: "NODE_01",
        company: "SAMSUNG R&D INSTITUTE INDIA",
        location: "BANGALORE",
        role: "RESEARCH INTERN — SAMSUNG PRISM",
        period: "JAN 2026 — JUL 2026",
        status: "COMPLETED",
        metrics: [
            { label: "PIPELINE",    value: "KD: TRANSFORMER → CNN" },
            { label: "COMPRESSION", value: "INT8 QUANTIZATION — 2.8MB" },
            { label: "SPEEDUP",     value: "2× INFERENCE BOOST" },
            { label: "INFRA",       value: "PYTORCH // MODAL // CLOUD" },
        ],
        desc: "Engineered an edge-deployed audio classification system using knowledge distillation (transformer teacher → lightweight CNN student) for real-time acoustic event detection. Applied static INT8 quantization to cut model footprint by ~85% (to 2.8 MB) and boost inference speed by over 2×. Built cloud training and validation infrastructure using PyTorch, Modal, and custom benchmarking interfaces.",
        tags: ["EDGE_AI", "KNOWLEDGE_DISTILLATION", "MODEL_COMPRESSION", "PYTORCH"],
    },
    {
        id: "edunet",
        nodeId: "NODE_02",
        company: "EDUNET FOUNDATION",
        location: "REMOTE",
        role: "AI/ML INTERN",
        period: "JUN 2025 — JUL 2025",
        status: "COMPLETED",
        metrics: [
            { label: "DATASET",  value: "48K_RECORDS" },
            { label: "PIPELINE", value: "SMOTE" },
            { label: "MODEL",    value: "GRADIENT_BOOSTING" },
            { label: "ACCURACY", value: "86%" },
        ],
        desc: "Worked on large-scale dataset preprocessing and model optimisation for healthcare applications. Applied SMOTE to balance class distributions. Fine-tuned Gradient Boosting models achieving 86% accuracy. Implemented Responsible AI practices to ensure model fairness.",
        tags: ["HEALTHCARE_AI", "ML_OPS", "RESPONSIBLE_AI", "XGBOOST"],
    },
];

/* ─────────────────────────────────────────────────────────────
   Smooth S-curve connector.
   Viewbox is 100 wide × 70 tall.
   Left card's right edge sits at x≈46, right card's left edge at x≈54.
   fromRight=true  → flowing from right card down to left card.
   fromRight=false → flowing from left card down to right card.
─────────────────────────────────────────────────────────────── */
const CurveConnector = ({ fromRight }) => {
    // Cubic bezier S-curve: start and end anchor on the spine centre-ish,
    // control points pull it smoothly to each side.
    const d = fromRight
        ? 'M 54,0 C 54,35 46,35 46,70'   // right → left
        : 'M 46,0 C 46,35 54,35 54,70';  // left  → right

    return (
        <div className="w-full hidden md:block" style={{ height: '70px' }}>
            <svg viewBox="0 0 100 70" className="w-full h-full" preserveAspectRatio="none">
                {/* faint ghost track */}
                <path d={d} fill="none" stroke="#000" strokeWidth="0.4" opacity="0.15" />

                {/* animated draw-in foreground */}
                <path
                    className="curve-path"
                    d={d}
                    fill="none"
                    stroke="#000"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                />

                {/* travelling dot */}
                <circle r="1.4" fill="#000">
                    <animateMotion dur={fromRight ? '2.4s' : '2s'} repeatCount="indefinite" path={d} />
                </circle>

                {/* endpoint nubs */}
                <circle cx={fromRight ? 54 : 46} cy="0"  r="1.8" fill="#000" opacity="0.35" />
                <circle cx={fromRight ? 46 : 54} cy="70" r="1.8" fill="#000" opacity="0.35" />
            </svg>
        </div>
    );
};

/* ─── Status pill — clean black/grey, ✓ tick for completed ─── */
const StatusPill = ({ status }) => {
    const isCompleted = status === 'COMPLETED';
    return (
        <span className={`flex-shrink-0 flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-widest border px-2.5 py-1 uppercase ${
            isCompleted
                ? 'border-black/30 text-black/40 bg-black/[0.04]'
                : 'border-black text-black bg-black/[0.08]'
        }`}>
            {isCompleted ? '✓ ' : '● '}{status}
        </span>
    );
};

/* ─── Compact always-visible card header ─── */
const CardHeader = ({ item, isOpen, onToggle }) => (
    <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 group hover:bg-black/[0.025] transition-colors"
    >
        <div className="min-w-0 flex-1">
            <span className="font-mono text-[10px] font-bold tracking-widest text-black/35 block mb-0.5">
                // {item.period}
            </span>
            <h3 className="font-[900] text-base md:text-xl tracking-tight text-black uppercase leading-tight">
                {item.role}
            </h3>
            <p className="font-mono text-[10px] font-bold tracking-tight text-black/50 uppercase mt-0.5">
                {item.company} — {item.location}
            </p>
        </div>

        <StatusPill status={item.status} />

        <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex-shrink-0 font-mono text-sm text-black/30 group-hover:text-black/60 transition-colors"
        >
            ↓
        </motion.span>
    </button>
);

/* ─── Full expandable node card ─── */
const ExperienceNode = ({ item, side, isOpen, onToggle }) => (
    <div className="exp-node-card w-full md:w-[calc(50%-2rem)] flex-shrink-0">

        {/* Above-card badge */}
        <div className={`flex items-center gap-3 mb-3 ${side === 'right' ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center gap-2 bg-black px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                <span className="font-mono text-[10px] font-bold text-white tracking-widest">{item.nodeId}</span>
            </div>
        </div>

        {/* Card */}
        <div className={`bg-[#E5E5E5] border-[2px] border-black relative transition-all duration-300 ${
            isOpen ? 'shadow-[8px_8px_0px_#000]' : 'shadow-[4px_4px_0px_rgba(0,0,0,0.35)] hover:shadow-[6px_6px_0px_#000]'
        }`}>
            <div className="absolute top-2 right-2 w-2 h-2 bg-black pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-black pointer-events-none" />

            {/* Summary header */}
            <div className="border-b border-black/10">
                <CardHeader item={item} isOpen={isOpen} onToggle={onToggle} />
            </div>

            {/* Animated detail panel */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.36, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="p-5 md:p-7 grid grid-cols-1 lg:grid-cols-5 gap-6 border-b border-black/10">
                            <p className="font-mono text-sm leading-relaxed text-black/80 lg:col-span-3">
                                {item.desc}
                            </p>
                            <div className="lg:col-span-2 space-y-2 lg:border-l border-black/10 lg:pl-6">
                                <span className="font-mono text-[9px] font-bold tracking-widest text-black/30 block">
                                    // SYSTEM_PARAMS
                                </span>
                                {item.metrics.map((metric, idx) => (
                                    <div key={idx} className="flex flex-col font-mono text-xs border border-black/10 p-2 bg-black/[0.03]">
                                        <span className="text-black/40 uppercase tracking-tight text-[9px] font-bold">
                                            [ {metric.label} ]
                                        </span>
                                        <span className="font-bold text-black uppercase tracking-tight text-[11px] mt-0.5">
                                            {metric.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="px-5 md:px-7 py-4 flex flex-wrap items-center gap-2">
                            {item.tags.map((tag) => (
                                <span key={tag} className="font-mono text-[9px] font-bold tracking-widest text-black/40 border border-black/20 px-2 py-1 uppercase">
                                    {tag}
                                </span>
                            ))}
                            <button
                                onClick={onToggle}
                                className="ml-auto font-mono text-[9px] font-bold tracking-widest text-black/30 uppercase hover:text-black transition-colors border border-black/20 px-2 py-1"
                            >
                                COLLAPSE ↑
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
);

/* ─── Main Section ─── */
const Experience = () => {
    const sectionRef = useRef(null);
    const [openId, setOpenId] = useState(null);
    const toggle = (id) => setOpenId(prev => prev === id ? null : id);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Slide cards in
            gsap.utils.toArray('.exp-node-card').forEach((card, i) => {
                const isRight = i % 2 === 1;
                gsap.fromTo(card,
                    { opacity: 0, x: isRight ? 50 : -50 },
                    { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out',
                      scrollTrigger: { trigger: card, start: 'top 80%', once: true } }
                );
            });

            // Draw curves on scroll
            gsap.utils.toArray('.curve-path').forEach((path) => {
                const length = path.getTotalLength?.() || 200;
                gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
                gsap.to(path, {
                    strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut',
                    scrollTrigger: { trigger: path, start: 'top 90%', once: true }
                });
            });

            // Spine nodes
            gsap.fromTo('.spine-node',
                { scale: 0 },
                { scale: 1, stagger: 0.2, duration: 0.4, ease: 'back.out(2)',
                  scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true } }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative w-full min-h-screen bg-[#D1D1D1] py-24 px-4 md:px-8 lg:px-16 overflow-hidden z-10 selection:bg-black selection:text-white"
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            />

            {/* Header */}
            <div className="w-full max-w-6xl mx-auto mb-16 flex items-end justify-between">
                <div>
                    <p className="font-mono text-[10px] font-bold tracking-[0.4em] text-black/30 uppercase mb-2">
                        // CAREER_GRAPH.RENDER()
                    </p>
                    <h2 className="font-[900] text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-[-0.05em] text-black uppercase">
                        EXPERIENCE
                    </h2>
                </div>
                <p className="hidden md:block font-mono text-[10px] text-black/30 pb-2 tracking-widest">
                    CLICK_NODE TO_EXPAND
                </p>
            </div>

            {/* Graph */}
            <div className="w-full max-w-6xl mx-auto relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10 hidden md:block -translate-x-1/2" />

                {roadmapData.map((item, i) => {
                    const isRight = i % 2 === 1;
                    const isOpen  = openId === item.id;

                    return (
                        <div key={item.id}>
                            <div className={`relative flex items-start gap-0 md:gap-8 ${isRight ? 'flex-row-reverse' : 'flex-row'} mb-1`}>

                                <ExperienceNode
                                    item={item}
                                    side={isRight ? 'right' : 'left'}
                                    isOpen={isOpen}
                                    onToggle={() => toggle(item.id)}
                                />

                                {/* Spine diamond */}
                                <div className="hidden md:flex flex-col items-center justify-start pt-8 flex-shrink-0 w-16 relative z-10">
                                    <div
                                        className="spine-node w-4 h-4 bg-black rotate-45 relative"
                                        style={{ boxShadow: '0 0 0 3px #D1D1D1, 0 0 0 5px #000' }}
                                    />
                                    <span className="font-mono text-[8px] text-black/25 tracking-widest mt-3 rotate-90 whitespace-nowrap">
                                        {i + 1} / {roadmapData.length}
                                    </span>
                                </div>

                                <div className="hidden md:block w-[calc(50%-2rem)] flex-shrink-0" />
                            </div>

                            {/* Smooth curve connector */}
                            {i < roadmapData.length - 1 && (
                                <CurveConnector fromRight={isRight} />
                            )}
                        </div>
                    );
                })}

                {/* End marker */}
                <div className="mt-10 flex flex-col items-center gap-3">
                    <div className="w-[1px] h-10 bg-black/20 hidden md:block" />
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-16 md:w-32 bg-black/20" />
                        <div className="bg-black text-white font-mono text-[10px] font-bold tracking-widest px-4 py-2 uppercase">
                            END_OF_GRAPH // v2026
                        </div>
                        <div className="h-[1px] w-16 md:w-32 bg-black/20" />
                    </div>
                    <p className="font-mono text-[10px] text-black/30 tracking-widest mt-1">
                        [ MORE_NODES_INCOMING ]
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Experience;