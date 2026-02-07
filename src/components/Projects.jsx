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

const ProjectRow = ({ project }) => {
    return (
        <div className="group border-t border-black transition-colors duration-100 ease-linear cursor-default bg-[#D1D1D1] hover:bg-black hover:text-white">
            <div className="flex flex-col md:flex-row items-center justify-between py-12 px-6 md:px-12">

                {/* LEFT: Number + Title */}
                <div className="flex items-center gap-8 md:gap-16 w-full md:w-auto">
                    <span className="font-mono text-xs md:text-sm font-bold opacity-60 group-hover:text-white group-hover:opacity-100 transition-colors duration-100">
                        ( {project.id} )
                    </span>
                    <h3
                        className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase group-hover:text-white transition-colors duration-100"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        {project.title}
                    </h3>
                </div>

                {/* RIGHT: Direct Links */}
                <div className="hidden md:flex items-center gap-8 mt-4 md:mt-0 font-mono text-[10px] font-bold tracking-widest">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4 decoration-1 decoration-white opacity-60 hover:opacity-100 group-hover:text-white transition-all"
                    >
                        [ GITHUB ]
                    </a>
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4 decoration-1 decoration-white opacity-60 hover:opacity-100 group-hover:text-white transition-all"
                    >
                        [ LIVE_SITE ]
                    </a>
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
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
                    <ProjectRow key={p.id} project={p} />
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
