import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

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

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    // Open Modal Animation
    useEffect(() => {
        if (selectedProject && modalRef.current && overlayRef.current) {
            gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
            gsap.fromTo(modalRef.current, 
                { opacity: 0, scale: 0.9 }, 
                { opacity: 1, scale: 1, duration: 0.25, ease: "power4.out" }
            );
        }
    }, [selectedProject]);

    const closeModal = () => {
        if (modalRef.current && overlayRef.current) {
            gsap.to([overlayRef.current, modalRef.current], {
                opacity: 0,
                duration: 0.1,
                onComplete: () => setSelectedProject(null)
            });
        } else {
            setSelectedProject(null);
        }
    };

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

            {/* Project List */}
            <div className="max-w-[95%] mx-auto flex flex-col gap-6">
                {projects.map((p) => (
                    <div
                        key={p.id}
                        onClick={() => setSelectedProject(p)}
                        className="group flex flex-col md:flex-row justify-between items-start md:items-center py-8 px-6 md:py-12 md:px-12 border border-black bg-[#D1D1D1] cursor-pointer transition-all duration-150 ease-linear hover:-translate-y-[6px] hover:-translate-x-[6px] hover:shadow-[6px_6px_0px_0px_#000000] hover:bg-black hover:text-[#D1D1D1]"
                    >
                        <div className="flex flex-col">
                            <span className="font-mono text-xs font-bold mb-4 opacity-70 group-hover:text-[#D1D1D1] transition-colors">
                                [ ID: {p.id} ]
                            </span>
                            <h3
                                className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-black group-hover:text-[#D1D1D1] transition-colors"
                                style={{ fontFamily: 'Inter Tight, sans-serif' }}
                            >
                                {p.title}
                            </h3>
                        </div>
                        
                        <div className="mt-8 md:mt-0 font-mono text-xs md:text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-[#D1D1D1]">
                            [ CLICK TO EXPAND ]
                        </div>
                    </div>
                ))}
            </div>

            {/* OS Modal Popup */}
            {selectedProject && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-auto">
                    {/* Backdrop */}
                    <div 
                        ref={overlayRef}
                        onClick={closeModal}
                        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
                    ></div>
                    
                    {/* Modal Window */}
                    <div 
                        ref={modalRef}
                        className="relative w-full max-w-3xl bg-[#D1D1D1] border-2 border-black shadow-[12px_12px_0px_0px_#000000] flex flex-col font-mono text-black"
                    >
                        {/* Window Header */}
                        <div className="flex justify-between items-center border-b border-black p-3 bg-[#D1D1D1]">
                            <span className="text-xs font-bold tracking-widest uppercase">
                                {selectedProject.title}
                            </span>
                            <button 
                                onClick={closeModal}
                                className="text-xs font-bold hover:opacity-50 transition-opacity"
                            >
                                [ X ]
                            </button>
                        </div>
                        
                        {/* Content Area */}
                        <div className="p-6 md:p-10 flex flex-col gap-8">
                            <p className="text-sm md:text-base leading-relaxed tracking-tight whitespace-pre-wrap">
                                {selectedProject.description}
                            </p>
                            
                            <div className="text-xs md:text-sm font-bold uppercase opacity-80">
                                [ TECH: {selectedProject.tech.join(" // ")} ]
                            </div>
                            
                            {selectedProject.github !== "#" && (
                                <a 
                                    href={selectedProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-center py-4 mt-4 border-2 border-black font-bold text-sm uppercase tracking-widest hover:bg-black hover:text-[#D1D1D1] transition-colors"
                                >
                                    // ACCESS_SOURCE (GITHUB)
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
