import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "About", id: "about" },
    { name: "EXPERIENCE", id: "experience" },
    { name: "PROJECTS", id: "projects" },
    { name: "SKILLS", id: "skills" },
    { name: "CERTIFICATIONS", id: "certifications" },
    { name: "CONTACT", id: "contact" }
];

const Navbar = () => {
    const [isPastHero, setIsPastHero] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pillRef = useRef(null);

    // Detect when user scrolls past the hero section
    useEffect(() => {
        const heroSection = document.querySelector(".hero-section");
        if (!heroSection) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const pastHero = !entry.isIntersecting;
                setIsPastHero(pastHero);
                // Auto-collapse when scrolling away, auto-restore when back
                if (!pastHero) setIsExpanded(false);
            },
            { threshold: 0.05 }
        );

        observer.observe(heroSection);
        return () => observer.disconnect();
    }, []);

    // Close expanded menu when clicking outside the pill
    useEffect(() => {
        if (!isExpanded) return;
        const handleClickOutside = (e) => {
            if (pillRef.current && !pillRef.current.contains(e.target)) {
                setIsExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isExpanded]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
        setIsExpanded(false);
        setIsMobileOpen(false);
    };

    return (
        <>
            {/* ── Full Navbar (shown at hero level) ── */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: isPastHero ? -100 : 0,
                    opacity: isPastHero ? 0 : 1,
                    pointerEvents: isPastHero ? "none" : "auto"
                }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 md:px-0"
            >
                <div className="bg-[#D1D1D1]/90 backdrop-blur-md border border-black p-1 shadow-[4px_4px_0px_#000000] flex justify-between items-center w-full md:w-auto">
                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-2 px-2">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <motion.button
                                    onClick={() => scrollToSection(item.id)}
                                    whileHover={{ boxShadow: "4px 4px 0px #000000", borderColor: "#000000" }}
                                    whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px #000000" }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className="nav-item block px-4 py-2 font-mono text-sm font-bold text-black border border-transparent uppercase bg-transparent"
                                >
                                    {item.name}
                                </motion.button>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex justify-between w-full items-center px-4 py-2">
                        <span className="font-mono text-sm font-bold text-black uppercase">AMOGH M.</span>
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="font-mono text-sm font-bold text-black uppercase border border-black px-2 py-1 hover:bg-black hover:text-[#D1D1D1] transition-colors"
                        >
                            {isMobileOpen ? "[ CLOSE ]" : "[ MENU ]"}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* ── Collapsed Pill (shown when scrolled past hero) ── */}
            <AnimatePresence>
                {isPastHero && (
                    <motion.div
                        ref={pillRef}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed top-5 left-1/2 z-[60] -translate-x-1/2"
                        style={{ originX: "50%", originY: "50%" }}
                    >
                        {/* Pill toggle button */}
                        <motion.button
                            onClick={() => setIsExpanded(!isExpanded)}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.94 }}
                            className="flex items-center justify-center w-10 h-10 bg-[#D1D1D1] border border-black shadow-[3px_3px_0px_#000000] font-mono font-black text-black text-xs"
                            style={{ borderRadius: "50%" }}
                            title="Navigation"
                        >
                            {isExpanded ? "×" : "≡"}
                        </motion.button>

                        {/* Expanded dropdown from pill */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#D1D1D1] border border-black shadow-[4px_4px_0px_#000000] flex flex-col min-w-[180px]"
                                >
                                    {navItems.map((item, i) => (
                                        <button
                                            key={item.name}
                                            onClick={() => scrollToSection(item.id)}
                                            className="px-6 py-3 font-mono text-xs font-bold text-black uppercase text-left hover:bg-black hover:text-[#D1D1D1] transition-colors border-b border-black/20 last:border-b-0 tracking-widest"
                                        >
                                            <span className="opacity-40 mr-2">{String(i + 1).padStart(2, "0")}</span>
                                            {item.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Fullscreen Menu */}
            <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: isMobileOpen ? 1 : 0, y: isMobileOpen ? "0%" : "-100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed inset-0 z-40 bg-[#D1D1D1] flex flex-col justify-center items-center gap-8 md:hidden pointer-events-none"
                style={{ pointerEvents: isMobileOpen ? "auto" : "none" }}
            >
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => scrollToSection(item.id)}
                        className="text-4xl font-black font-mono text-black uppercase hover:text-white transition-colors"
                    >
                        {item.name}
                    </button>
                ))}
            </motion.div>
        </>
    );
};

export default Navbar;
