import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SecureEmail from './SecureEmail';

const Contact = () => {
    return (
        <section
            id="contact"
            className="w-full bg-black text-white border-t border-white/20 flex flex-col pt-0" // Dark Theme
        >
            {/* Main Split Layout - Black on Black */}
            <div className="w-full flex flex-col md:flex-row min-h-[60vh]">

                {/* LEFT: Massive Headline (Improved Copy) */}
                <div className="w-full md:w-2/3 border-b md:border-b-0 md:border-r border-white/20 p-8 md:p-16 flex flex-col justify-center group hover:bg-white hover:text-black transition-colors duration-300 cursor-crosshair">
                    <span className="font-mono text-xs uppercase tracking-widest opacity-60 mb-8 group-hover:text-black/60 transition-colors">
                        [ Status: Available_For_Hire ]
                    </span>

                    <h2
                        className="text-[12vw] md:text-[8rem] font-black uppercase leading-[0.8] tracking-tighter"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        LET'S <br /> BUILD <br /> IMPACT
                    </h2>

                    <div className="mt-12">
                        <motion.button
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
                            className="flex items-center gap-4 border border-transparent bg-transparent px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest group-hover:border-black transition-colors duration-300"
                        >
                            <span>INITIATE_HANDSHAKE</span>
                            <ArrowUpRight strokeWidth={3} />
                        </motion.button>
                    </div>
                </div>

                {/* RIGHT: Link List */}
                <div className="w-full md:w-1/3 flex flex-col">
                    {/* Email Component */}
                    <SecureEmail />

                    {[
                        { label: "LINKEDIN", url: "https://www.linkedin.com/in/amogh-m-866323355", sub: "Connect_Network" },
                        { label: "GITHUB", url: "https://github.com/Amogh9000", sub: "Inspect_Source" }
                    ].map((link, idx) => (
                        <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex flex-col justify-center px-8 md:px-12 border-b border-white/20 last:border-b-0 hover:bg-white hover:text-black transition-colors duration-200 group/link cursor-pointer py-12 md:py-0"
                        >
                            <div className="flex justify-between items-start w-full">
                                <span className="font-mono text-[10px] uppercase opacity-50 mb-2 group-hover/link:text-black/60 transition-colors">
                                    // {link.sub}
                                </span>
                                <ArrowUpRight className="opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" size={24} />
                            </div>

                            <span className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                                {link.label}
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Footer Bar */}
            <div className="w-full bg-black border-t border-white/20 p-4 flex justify-between items-center text-white/40">
                <span className="font-mono text-[10px] uppercase font-bold">
                    © 2026 Amogh M.
                </span>
                <span className="font-mono text-[10px] uppercase font-bold">
                    [ BUILD_VER: 2.0.4-STABLE ]
                </span>
            </div>
        </section>
    );
};

export default Contact;
