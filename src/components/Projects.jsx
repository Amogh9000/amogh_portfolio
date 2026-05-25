import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

// Project Data expanded with Dashboard Telemetry
const projects = [
    {
        id: "GridSentinel",
        title: "GridSentinel",
        category: "AI_SYSTEMS",
        metricValue: "94.2%",
        metricLabel: "DETECTION ACCURACY",
        subLabel: "GIS_CONTEXT // EXPLAINABLE_ML",
        description: "An edge-AI anomaly detection system for urban power grids. Uses explainable machine learning architectures and GIS context to identify structural and electrical failures before they escalate.",
        tech: ["Python", "Machine Learning", "Edge-AI", "GIS"],
        github: "https://github.com/Amogh9000/GridSentinel",
        params: [
            { key: "CORE_ENGINE", val: "EXPLAINABLE ML (XAI) PIPELINE" },
            { key: "SPATIAL_AWARENESS", val: "GIS GEOSPATIAL VECTOR MAPS" },
            { key: "HARDWARE_TARGET", val: "URBAN GRID EDGE-AI NODES" },
            { key: "TELEMETRY_STATUS", val: "OPERATIONAL // SYSTEM_SAFE" }
        ]
    },
    {
        id: "Pulse",
        title: "PULSE",
        category: "HEALTHCARE_AI",
        metricValue: "CORE",
        metricLabel: "AGENT ORCHESTRATION",
        subLabel: "MULTI_AGENT // DIGITAL_TWIN",
        description: "A high-stakes multi-agent hospital operations cockpit. Automates resource optimization and provides real-time department-level risk analysis using complex LLM swarms and Digital Twin simulations.",
        tech: ["LLMs", "FastAPI", "Groq", "Facebook Prophet"],
        github: "https://github.com/Amogh9000/pulse_v2",
        params: [
            { key: "INTELLIGENCE_LAYER", val: "LLM MULTI-AGENT SWARM" },
            { key: "SIMULATION_ENGINE", val: "DIGITAL TWIN INFRASTRUCTURE" },
            { key: "FORECASTING_MODEL", val: "FACEBOOK PROPHET ENGINE" },
            { key: "COMPUTE_PROVIDER", val: "GROQ HARDWARE ACCELERATION" }
        ]
    },
    {
        id: "PaperLens",
        title: "PAPERLENS",
        category: "COMPUTER_VISION",
        metricValue: "CV-14",
        metricLabel: "VISION PROCESSING",
        subLabel: "DOCUMENT_ANALYSIS // OCR_GRAPH",
        description: "An advanced computer vision processing platform designed for parsing, structuring, and analyzing dense academic papers and technical research documentation automatically.",
        tech: ["Python", "Computer Vision", "Machine Learning"],
        github: "https://github.com/Amogh9000/PaperLens",
        params: [
            { key: "VISION_PIPELINE", val: "OBJECT DETECTION / SEGMENTATION" },
            { key: "ANALYSIS_DEPTH", val: "SEMANTIC SCHOLARLY INFERENCE" },
            { key: "EXTRACTION_RATE", val: "REAL-TIME DOCUMENT VECTORIZATION" },
            { key: "CORE_FRAMEWORKS", val: "PYTHON // OPENCV // PYTORCH" }
        ]
    },
    {
        id: "CrediFi",
        title: "CREDIFI",
        category: "FINTECH_WEB3",
        metricValue: "W3-SEC",
        metricLabel: "FINTECH DECENTRALIZED",
        subLabel: "SMART_CONTRACTS // SOLIDITY",
        description: "A decentralized fintech analytics architecture utilizing Web3 protocol layers and automated smart contract logic to map transaction verification profiles.",
        tech: ["Streamlit", "Python", "Web3.py", "Solidity"],
        github: "https://github.com/Amogh9000/CrediFi",
        params: [
            { key: "LEDGER_INTEGRATION", val: "ETHEREUM COMPATIBLE NETWORK" },
            { key: "CONTRACT_LANGUAGE", val: "SOLIDITY COMPILED BYTECODE" },
            { key: "INTERFACE_LAYER", val: "STREAMLIT PLATFORM WRAPPER" },
            { key: "MIDDLEWARE_RPC", val: "WEB3.PY ROUTING LAYER" }
        ]
    }
];

const Projects = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // High-end parameter slide and pop-in animations when swapping systems
            gsap.fromTo('.project-telemetry-reveal',
                { opacity: 0, scale: 0.98, y: 10 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.04,
                    ease: "power3.out"
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [activeIndex]);

    const activeProject = projects[activeIndex];

    return (
        <section
            id="projects"
            ref={containerRef}
            className="relative w-full min-h-screen bg-[#D1D1D1] pt-24 pb-44 px-6 md:px-12 lg:px-24 border-t border-black overflow-hidden z-10 selection:bg-black selection:text-white"
        >
            {/* Header Area / Selector Bar */}
            <div className="w-full max-w-7xl mx-auto mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <h2 className="font-[900] text-[clamp(2.5rem,5vw,4rem)] leading-[0.9] tracking-[-0.05em] text-black uppercase">
                        SELECTED WORKS
                    </h2>
                    <span className="font-mono text-xs md:text-sm font-bold text-black/40 tracking-wider block mt-2">
                        // ENGINE DEEP DIVE & PARAMETER ANALYSIS
                    </span>
                </div>

                {/* Dashboard Control Switches */}
                <div className="flex flex-wrap items-center gap-2 border-2 border-black p-1 bg-[#E5E5E5] shadow-[4px_4px_0px_#000000]">
                    {projects.map((proj, idx) => (
                        <button
                            key={proj.id}
                            onClick={() => setActiveIndex(idx)}
                            className={`font-mono text-xs font-bold uppercase px-4 py-2 transition-all ${activeIndex === idx
                                ? 'bg-black text-[#D1D1D1]'
                                : 'text-black hover:bg-black/5'
                                }`}
                        >
                            {proj.id}
                        </button>
                    ))}
                </div>
            </div>

            {/* Split Screen Panel Configuration */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* LEFT CONSOLE: Large System Matrix Metrics */}
                <div className="lg:col-span-5 bg-[#E5E5E5] border-[2px] border-black p-8 flex flex-col justify-between shadow-[8px_8px_0px_#000000] relative">
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-black pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-2.5 h-2.5 bg-black pointer-events-none" />

                    <div className="space-y-1">
                        <span className="font-mono text-[10px] font-bold text-black/40 tracking-widest block">
                            // PERFORMANCE_MATRIX
                        </span>
                        <p className="project-telemetry-reveal font-mono text-xs font-bold text-black/70">
                            {activeProject.subLabel}
                        </p>
                    </div>

                    <div className="my-12 text-center lg:text-left">
                        <h3 className="project-telemetry-reveal font-[900] text-[clamp(4rem,9vw,6.5rem)] leading-none tracking-tighter text-black uppercase">
                            {activeProject.metricValue}
                        </h3>
                        <span className="project-telemetry-reveal font-mono text-xs font-bold tracking-widest text-black/60 block mt-2 uppercase">
                            {activeProject.metricLabel}
                        </span>
                    </div>

                    <div className="border-t border-black/20 pt-4 font-mono text-[11px] text-black/50 flex justify-between">
                        <span>SYS_CAT // {activeProject.category}</span>
                        <span>LOG_REF_0{activeProject.id}</span>
                    </div>
                </div>

                {/* RIGHT CONSOLE: Environment Configuration Panel */}
                <div className="lg:col-span-7 bg-[#E5E5E5] border-[2px] border-black p-8 md:p-10 shadow-[8px_8px_0px_#000000] flex flex-col justify-between relative">
                    <div className="absolute top-3 left-3 w-2.5 h-2.5 bg-black pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-2.5 h-2.5 bg-black pointer-events-none" />

                    <div className="space-y-6">
                        {/* System Header Titles */}
                        <div className="space-y-1.5 border-b-2 border-black pb-5">
                            <h3 className="project-telemetry-reveal font-[900] text-2xl md:text-3xl tracking-tight text-black uppercase leading-none">
                                {activeProject.title}
                            </h3>
                            <p className="project-telemetry-reveal font-mono text-xs font-bold tracking-tight text-black/60 uppercase">
                                STACK: {activeProject.tech.join(" // ")}
                            </p>
                        </div>

                        {/* Description Text Frame */}
                        <p className="project-telemetry-reveal font-mono text-sm md:text-base leading-relaxed text-black/80 font-medium">
                            {activeProject.description}
                        </p>
                    </div>

                    {/* Parametric Environment Key Value Strings */}
                    <div className="mt-8 pt-6 border-t border-black/20 space-y-2.5">
                        <span className="font-mono text-[10px] font-bold tracking-widest text-black/30 block mb-2">
                            // RUNTIME_ENVIRONMENT_VARIABLES
                        </span>

                        {activeProject.params.map((p, i) => (
                            <div
                                key={i}
                                className="project-telemetry-reveal flex flex-col sm:flex-row sm:items-center justify-between font-mono text-xs border border-black/10 p-2.5 bg-black/[0.02]"
                            >
                                <span className="font-bold text-black/40 uppercase tracking-tight text-[10px]">
                                    {p.key}
                                </span>
                                <span className="font-bold text-black uppercase tracking-tight mt-0.5 sm:mt-0">
                                    {p.val}
                                </span>
                            </div>
                        ))}

                        {/* GitHub Action Trigger */}
                        {activeProject.github !== "#" && (
                            <a
                                href={activeProject.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-telemetry-reveal w-full block text-center py-3.5 mt-4 border-2 border-black font-mono font-bold text-xs uppercase tracking-widest bg-black text-[#D1D1D1] hover:bg-[#E5E5E5] hover:text-black transition-colors shadow-[4px_4px_0px_#000000] hover:shadow-none translate-y-0 active:translate-y-[2px]"
                            >
                                // ACCESS_SOURCE_CODE (GITHUB)
                            </a>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Projects;