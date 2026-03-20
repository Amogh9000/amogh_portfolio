import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
    { name: "OPERATOR PROFILE", id: "about" },
    { name: "EXPERIENCE", id: "experience" },
    { name: "PROJECTS", id: "projects" },
    { name: "SKILLS", id: "skills" },
    { name: "CERTIFICATIONS", id: "certifications" },
    { name: "CONTACT", id: "contact" }
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
        setIsOpen(false);
    };

    // Mobile Menu Items
    const mobileNavItems = navItems;

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-6 md:px-0"
            >
                <div className="pointer-events-auto bg-[#D1D1D1]/90 backdrop-blur-md border border-black p-1 shadow-[4px_4px_0px_#000000] flex justify-between items-center w-full md:w-auto">

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-2 px-2">
                        {navItems.map((item) => (
                            <li key={item.name} className="relative">
                                {item.external ? (
                                    <motion.a
                                        href="#"
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
                                        className="block px-4 py-2 font-mono text-sm font-bold text-black border border-transparent uppercase bg-transparent"
                                    >
                                        {item.name}
                                    </motion.a>
                                ) : (
                                    <motion.button
                                        onClick={() => scrollToSection(item.id)}
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
                                        className="nav-item block px-4 py-2 font-mono text-sm font-bold text-black border border-transparent uppercase bg-transparent"
                                    >
                                        {item.name}
                                    </motion.button>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex justify-between w-full items-center px-4 py-2">
                        <span className="font-mono text-sm font-bold text-black uppercase">AMOGH M.</span>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="font-mono text-sm font-bold text-black uppercase border border-black px-2 py-1 hover:bg-black hover:text-[#D1D1D1] transition-colors"
                        >
                            {isOpen ? "[ CLOSE ]" : "[ MENU ]"}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Fullscreen Menu */}
            <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? "0%" : "-100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed inset-0 z-40 bg-[#D1D1D1] flex flex-col justify-center items-center gap-8 md:hidden"
            >
                {mobileNavItems.map((item) => (
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
