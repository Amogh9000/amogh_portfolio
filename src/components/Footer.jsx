import React from 'react';

const navLinks = [
    { label: "ABOUT", id: "about" },
    { label: "SKILLS", id: "skills" },
    { label: "EXPERIENCE", id: "experience" },
    { label: "PROJECTS", id: "projects" },
];

const externalLinks = [
    { label: "GITHUB", href: "https://github.com/Amogh9000" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/amogh-m-866323355" },
];

const Footer = () => {
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer id="contact" className="relative w-full min-h-[75vh] bg-black text-white flex flex-col justify-between selection:bg-[#D1D1D1] selection:text-black overflow-hidden">

            {/* ── MIDDLE: Massive Full-Bleed Action Callout ── */}
            <div className="w-full border-b border-white/[0.06]">
                <a
                    href="mailto:amoghm4507@gmail.com"
                    className="group/cta block w-full px-6 md:px-12 lg:px-24 py-12 md:py-20 bg-black hover:bg-white transition-colors duration-300 cursor-pointer"
                >
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex flex-col gap-3">
                            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white group-hover/cta:text-black transition-colors duration-300 uppercase">
                                // INITIATE_CONTACT_SEQUENCE
                            </span>
                            <h3
                                className="text-[7vw] font-[900] uppercase leading-[0.85] tracking-[-0.04em] text-white group-hover/cta:text-black transition-colors duration-300"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                LET'S COLLABORATE
                            </h3>
                        </div>

                        {/* Arrow indicator — materializes on hover */}
                        <div className="flex items-center gap-4 opacity-0 group-hover/cta:opacity-100 transition-all duration-300 translate-x-[-20px] group-hover/cta:translate-x-0">
                            <span className="font-mono text-xs font-bold text-black tracking-wider uppercase hidden md:inline">
                                SEND_MESSAGE
                            </span>
                            <span className="text-5xl md:text-6xl font-black text-black leading-none">→</span>
                        </div>
                    </div>
                </a>
            </div>


            {/* ── MAIN: Link Columns Grid ── */}
            <div className="w-full px-6 md:px-12 lg:px-24 pt-16 pb-16 md:pb-20 flex-1 flex items-center">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">

                    {/* Col 1: Site Navigation */}
                    <div className="flex flex-col gap-5">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-2">
                            // SITE_MAP
                        </span>
                        {navLinks.map((link, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToSection(link.id)}
                                className="group/ft font-mono text-sm font-bold uppercase tracking-wider text-white hover:text-black hover:bg-white px-3 py-2 -mx-3 transition-all duration-200 w-fit text-left"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Col 2: External Links */}
                    <div className="flex flex-col gap-5">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-2">
                            // EXTERNAL_SOURCES
                        </span>
                        {externalLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/ft font-mono text-sm font-bold uppercase tracking-wider text-white hover:text-black hover:bg-white px-3 py-2 -mx-3 transition-all duration-200 w-fit flex items-center gap-2"
                            >
                                {link.label}
                                <span className="opacity-0 group-hover/ft:opacity-100 transition-opacity duration-200 text-xs">
                                    ↗
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Col 3: Scroll To Top */}
                    <div className="flex flex-col gap-5">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-2">
                            // NAVIGATION
                        </span>
                        <button
                            onClick={scrollToTop}
                            className="group/top font-mono text-sm font-bold uppercase tracking-wider text-white hover:text-black hover:bg-white px-3 py-2 -mx-3 transition-all duration-200 w-fit flex items-center gap-3"
                        >
                            <span className="text-lg transition-transform duration-200 group-hover/top:-translate-y-1">↑</span>
                            BACK_TO_TOP
                        </button>
                    </div>
                </div>
            </div>

            {/* ── BOTTOM BAR ── */}
            <div className="w-full px-6 md:px-12 lg:px-24 py-5 border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                        © 2026 AMOGH M. — ALL RIGHTS RESERVED
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                        [ SYSTEM_STATUS: OPERATIONAL ]
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                        DESIGNED & ENGINEERED IN BANGALORE, IN
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
