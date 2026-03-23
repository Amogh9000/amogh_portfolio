import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Project Data
const projects = [
    {
        id: "01",
        title: "GridSentinel",
        category: "AI_SYSTEMS",
        description: "An edge-AI anomaly detection system for urban power grids. Uses explainable ML and GIS context to identify failures before they escalate.",
        tech: ["Python", "Machine Learning", "Edge-AI", "GIS"],
        github: "https://github.com/Amogh9000/GridSentinel"
    },
    {
        id: "02",
        title: "PULSE",
        category: "HEALTHCARE_AI",
        description: "A multi-agent hospital operations cockpit. Automates resource optimization and provides real-time department-level risk analysis using LLMs and Digital Twin simulations.",
        tech: ["LLMs", "FastAPI", "Groq", "Facebook Prophet"],
        github: "https://github.com/Amogh9000/pulse_v2"
    },
    {
        id: "03",
        title: "PAPERLENS",
        category: "COMPUTER_VISION",
        description: "A computer vision system for analyzing and understanding research papers.",
        tech: ["Python", "Computer Vision", "Machine Learning"],
        github: "https://github.com/Amogh9000/PaperLens"
    },
    {
        id: "04",
        title: "CREDIFI",
        category: "FINTECH_WEB3",
        description: "A fintech web3 system for analyzing and understanding research papers.",
        tech: ["Streamlit", "Python", "Web3.py", "Solidity"],
        github: "https://github.com/Amogh9000/CrediFi"
    }
];

// Typewriter Component
const TypewriterMonitor = ({ project }) => {
    const [displayedText, setDisplayedText] = useState("");

    const fullText = project
        ? `> INITIATING DIAGNOSTIC...
> TARGET: ${project.id} // ${project.title}

[ DESCRIPTION ]
${project.description}

[ TECH_STACK ]
${project.tech.map(t => `> ${t.toUpperCase()}`).join("\n")}

[ STATUS ]
> SYSTEM ONLINE
> AWAITING INPUT...`
        : `> NO TARGET SELECTED
> AWAITING HOVER INPUT...
> SYSTEM ONLINE`;

    useEffect(() => {
        setDisplayedText(fullText); // Show instantly
    }, [fullText]);

    return (
        <div className="font-mono text-sm md:text-base text-black whitespace-pre-wrap leading-relaxed tracking-tight">
            {displayedText}
            <span className="animate-pulse font-black opacity-80">_</span>
        </div>
    );
};

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(projects[0]);

    return (
        <section
            id="projects"
            className="w-full bg-[#D1D1D1] pt-32 pb-32 relative border-t border-black cursor-default"
        >
            {/* Header */}
            <div className="max-w-[95%] mx-auto mb-16 flex justify-between items-end border-b border-black pb-4 px-2">
                <h2 className="text-black text-xs md:text-sm font-mono tracking-widest uppercase font-bold">
                    // Selected_Works
                </h2>
                <span className="text-black text-xs md:text-sm font-mono font-bold">
                    ( 04 )
                </span>
            </div>

            {/* Split Screen Container */}
            <div className="max-w-[95%] mx-auto flex flex-col md:flex-row border-t border-black">

                {/* Left Side: 60% Project List */}
                <div className="w-full md:w-[60%] flex flex-col md:border-r md:border-black">
                    {projects.map((p) => (
                        <div
                            key={p.id}
                            onMouseEnter={() => setHoveredProject(p)}
                            // On mobile, just select active on tap
                            onClick={() => setHoveredProject(p)}
                            className={`project-row group border-b border-black flex flex-col py-8 px-6 md:py-12 md:px-12 transition-colors duration-150 ease-linear cursor-crosshair
                                ${hoveredProject?.id === p.id ? "bg-black text-[#D1D1D1]" : "bg-[#D1D1D1] hover:bg-black hover:text-[#D1D1D1]"}
                            `}
                        >
                            <span className={`font-mono text-xs font-bold mb-4 opacity-70 
                                ${hoveredProject?.id === p.id ? "text-[#D1D1D1]" : "text-black group-hover:text-[#D1D1D1]"}`}
                            >
                                [ ID: {p.id} ]
                            </span>

                            <h3
                                className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.8] tracking-tighter"
                                style={{ fontFamily: 'Inter Tight, sans-serif' }}
                            >
                                {p.title}
                            </h3>

                            {/* Mobile Links */}
                            <div className={`mt-8 flex gap-6 md:hidden font-mono text-xs font-bold tracking-widest
                                ${hoveredProject?.id === p.id ? "text-[#D1D1D1]" : "text-black group-hover:text-[#D1D1D1]"}`}
                            >
                                {p.github !== "#" && (
                                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 border border-current px-3 py-1">
                                        [ GITHUB ]
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side: 40% Sticky Monitor */}
                <div className="w-full md:w-[40%] bg-[#D1D1D1] p-6 md:p-10 relative border-b md:border-b-0 border-black">
                    <div className="sticky top-32 w-full min-h-[400px] border border-black p-6 bg-[#D1D1D1] shadow-[8px_8px_0px_#000000]">
                        {/* Monitor Header */}
                        <div className="border-b border-black pb-2 mb-4 flex justify-between items-center opacity-60">
                            <span className="font-mono text-xs font-bold tracking-widest uppercase text-black">
                                // SYSTEM_MONITOR
                            </span>
                            <span className="font-mono text-xs font-bold tracking-widest text-black">
                                v2.0
                            </span>
                        </div>

                        {/* Terminal Screen inside Monitor */}
                        <div className="min-h-[300px]">
                            <TypewriterMonitor project={hoveredProject} />
                        </div>

                        {/* Desktop Links at bottom of monitor */}
                        {hoveredProject && hoveredProject.github !== "#" && (
                            <div className="hidden md:flex mt-8 border-t border-black pt-4">
                                <motion.a
                                    href={hoveredProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{
                                        boxShadow: "4px 4px 0px #000000",
                                        borderColor: "#000000"
                                    }}
                                    whileTap={{
                                        x: 4,
                                        y: 4,
                                        boxShadow: "0px 0px 0px #000000"
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                        tap: { duration: 0.05 }
                                    }}
                                    className="font-mono text-xs font-bold text-black border border-transparent bg-transparent px-4 py-2 uppercase tracking-widest block w-fit"
                                >
                                    [ DECRYPT_SOURCE_CODE (GITHUB) ]
                                </motion.a>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Projects;
