import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

// Project Data
const projects = [
    {
        id: "01",
        title: "PULSE",
        category: "HEALTHCARE_AI",
        github: "https://github.com/Amogh9000/pulse_v2"
    },
    {
        id: "02",
        title: "PAPERLENS",
        category: "COMPUTER_VISION",
        github: "https://github.com/Amogh9000/PaperLens"
    },
    {
        id: "03",
        title: "CREDIFI",
        category: "FINTECH_WEB3",
        github: "https://github.com/Amogh9000/CrediFi"
    }
];

const ProjectRow = ({ project, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`group border-t border-black transition-colors duration-100 ease-linear cursor-default 
                ${isActive ? "bg-black text-white" : "bg-[#D1D1D1] hover:bg-black hover:text-white"}`}
        >
            <div className="flex flex-col items-start py-8 px-6 md:py-12 md:px-12 md:flex-row md:items-center md:justify-between">

                {/* LEFT: Number + Title */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-16 w-full md:w-auto">
                    {/* ID */}
                    <span className={`font-mono text-xs md:text-sm font-bold opacity-60 transition-colors duration-100 mb-2 md:mb-0
                        ${isActive ? "text-white opacity-100" : "group-hover:text-white group-hover:opacity-100"}`}>
                        ( {project.id} )
                    </span>

                    {/* Title */}
                    <h3
                        className={`text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase transition-colors duration-100
                            ${isActive ? "text-white" : "group-hover:text-white"}`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        {project.title}
                    </h3>

                    {/* Mobile Links (Stacked below title) */}
                    <div className="flex flex-col gap-4 mt-8 md:hidden font-mono text-sm font-bold tracking-widest w-full">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`min-h-[44px] flex items-center border-b border-white/20 pb-2
                                ${isActive ? "text-white opacity-100" : "text-black opacity-60"}`}
                            // Prevent row toggle when clicking link
                            onClick={(e) => e.stopPropagation()}
                        >
                            [ GITHUB ]
                        </a>
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`min-h-[44px] flex items-center border-b border-white/20 pb-2
                                ${isActive ? "text-white opacity-100" : "text-black opacity-60"}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            [ LIVE_SITE ]
                        </a>
                    </div>
                </div>

                {/* RIGHT: Desktop Links */}
                <div className="hidden md:flex items-center gap-8 mt-4 md:mt-0 font-mono text-[10px] font-bold tracking-widest">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4 decoration-1 decoration-white opacity-60 hover:opacity-100 group-hover:text-white transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        [ GITHUB ]
                    </a>
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4 decoration-1 decoration-white opacity-60 hover:opacity-100 group-hover:text-white transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        [ LIVE_SITE ]
                    </a>
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const [activeProjectId, setActiveProjectId] = useState(null);

    const handleProjectClick = (id) => {
        // Toggle active state on click (mainly for mobile)
        if (activeProjectId === id) {
            setActiveProjectId(null);
        } else {
            setActiveProjectId(id);
        }
    };

    return (
        <section
            id="projects"
            className="w-full bg-[#D1D1D1] pt-32 pb-0 relative cursor-default border-t border-black"
        >
            {/* Header: Selected Works */}
            <div className="max-w-[90%] mx-auto mb-16 flex justify-between items-end border-b border-black pb-4">
                <h2 className="text-black text-sm font-mono tracking-widest uppercase">
                    // Selected_Works
                </h2>
                <span className="text-black text-xs font-mono">
                    ( 03 )
                </span>
            </div>

            {/* List */}
            <div className="w-full">
                {projects.map((p) => (
                    <ProjectRow
                        key={p.id}
                        project={p}
                        isActive={activeProjectId === p.id}
                        onClick={() => handleProjectClick(p.id)}
                    />
                ))}
            </div>

            {/* Footer: Status Available (Reused Header Style) */}
            <div className="max-w-[90%] mx-auto mt-25 mb-16 flex justify-between items-end border-b border-black pb-4">
                <h2 className="text-black text-sm font-mono tracking-widest uppercase">
                    // Status : Available_For_Hire
                </h2>
                <span className="text-black text-xs font-mono">
                    ( 2026 )
                </span>
            </div>
        </section>
    );
};

export default Projects;
