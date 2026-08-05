import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
    SiPython, SiTensorflow, SiOpencv, SiStreamlit, SiMysql, SiFastapi, SiR,
    SiScikitlearn, SiTableau, SiPytorch, SiDocker, SiAmazon, SiNumpy,
    SiPandas, SiHuggingface
} from "react-icons/si";
import { TbChartBar, TbDatabase, TbChartHistogram } from "react-icons/tb";
import { FaBrain, FaRocket, FaEye, FaList, FaTimes, FaCloud, FaCode, FaChartLine } from "react-icons/fa";
import { MdOutlineSchema } from "react-icons/md";

const skillData = [
    // ── Languages ──
    { id: "L01", name: "PYTHON",     icon: SiPython },
    { id: "L02", name: "SQL",        icon: SiMysql },
    { id: "L03", name: "R",          icon: SiR },

    // ── ML / DL ──
    { id: "ML01", name: "PYTORCH",       icon: SiPytorch },
    { id: "ML02", name: "TENSORFLOW",    icon: SiTensorflow },
    { id: "ML03", name: "SCIKIT-LEARN",  icon: SiScikitlearn },
    { id: "ML04", name: "XGBOOST",       icon: FaChartLine },
    { id: "ML05", name: "HUGGING FACE",  icon: SiHuggingface },
    { id: "ML06", name: "OPENCV",        icon: SiOpencv },
    { id: "ML07", name: "DEEP LEARNING", icon: FaBrain },

    // ── Gen AI ──
    { id: "AI01", name: "LLMs",              icon: FaBrain },
    { id: "AI02", name: "RAG",               icon: TbDatabase },
    { id: "AI03", name: "AGENTIC WORKFLOWS", icon: FaRocket },
    { id: "AI04", name: "VECTOR DBs",        icon: MdOutlineSchema },
    { id: "AI05", name: "PROMPT ENG.",       icon: FaCode },

    // ── Data & Signal ──
    { id: "DS01", name: "NUMPY",          icon: SiNumpy },
    { id: "DS02", name: "PANDAS",         icon: SiPandas },
    { id: "DS03", name: "LOG-MEL SPECS",  icon: TbChartBar },
    { id: "DS04", name: "FEATURE ENG.",   icon: FaEye },

    // ── Deployment ──
    { id: "DE01", name: "FASTAPI",   icon: SiFastapi },
    { id: "DE02", name: "DOCKER",    icon: SiDocker },
    { id: "DE03", name: "AWS",       icon: SiAmazon },
    { id: "DE04", name: "STREAMLIT", icon: SiStreamlit },

    // ── Viz ──
    { id: "VZ01", name: "TABLEAU",   icon: SiTableau },
    { id: "VZ02", name: "POWER BI",  icon: TbChartHistogram },
    { id: "VZ03", name: "CLOUD OPS", icon: FaCloud },
];

const SkillItem = ({ item }) => {
    const [isFilled, setIsFilled] = useState(false);

    const handleActive = () => {
        setIsFilled(true);
        window.dispatchEvent(new Event("portfolio-node-active"));
    };

    const handleInactive = () => {
        setIsFilled(false);
        window.dispatchEvent(new Event("portfolio-node-inactive"));
    };

    return (
        <div
            onMouseEnter={handleActive}
            onMouseLeave={handleInactive}
            onTouchStart={handleActive}
            onTouchEnd={handleInactive}
            className="flex items-center px-6 md:px-16 group cursor-none select-none h-full touch-none"
        >
            <item.icon className={`text-2xl md:text-4xl mr-4 md:mr-6 transition-colors duration-300 ${isFilled ? 'text-white' : 'text-black'}`} />
            <span
                className="text-[8vw] md:text-[6vw] font-black uppercase tracking-tighter transition-all duration-300"
                style={{
                    WebkitTextStroke: "1px black",
                    color: isFilled ? "black" : "transparent"
                }}
            >
                {item.name}
            </span>
            <span className={`ml-4 md:ml-8 font-mono text-[8px] md:text-xs tracking-[0.3em] hidden sm:inline transition-opacity ${isFilled ? 'opacity-100' : 'opacity-20'}`}>
                [ {item.id} ]
            </span>
        </div>
    );
};

const MarqueeRow = ({ items, direction = 1, baseSpeed = 40 }) => {
    const [rowHovered, setRowHovered] = useState(false);

    const responsiveSpeed = typeof window !== 'undefined' && window.innerWidth < 768
        ? baseSpeed * 0.5
        : baseSpeed;

    return (
        <div
            className="flex overflow-hidden whitespace-nowrap border-b border-black/10 py-3 md:py-6"
            onMouseEnter={() => setRowHovered(true)}
            onMouseLeave={() => setRowHovered(false)}
        >
            <motion.div
                initial={{ x: direction > 0 ? 0 : "-50%" }}
                animate={{ x: direction > 0 ? "-50%" : 0 }}
                transition={{
                    duration: rowHovered ? responsiveSpeed * 2.5 : responsiveSpeed,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex"
            >
                {[...items, ...items, ...items].map((item, index) => (
                    <SkillItem key={index} item={item} />
                ))}
            </motion.div>
        </div>
    );
};

const Skills = () => {
    const [showList, setShowList] = useState(false);

    // Split into rows for marquee
    const row1 = skillData.slice(0, 9);
    const row2 = skillData.slice(9, 18);
    const row3 = skillData.slice(18);

    return (
        <section id="skills" className="w-full bg-[#D1D1D1] py-20 overflow-hidden relative min-h-screen">
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

            <div className="relative z-10">
                <div className="px-[5%] mb-16 flex justify-between items-end">
                    <div>
                        <h2 className="text-[10px] font-mono tracking-[0.5em] text-black/40 uppercase mb-2">
                            // KINETIC_DATA_STREAM
                        </h2>
                        <div className="h-1 w-12 bg-black" />
                    </div>

                    <button
                        onClick={() => setShowList(!showList)}
                        className="flex items-center gap-3 bg-black text-white px-6 py-3 font-mono text-[11px] tracking-widest hover:bg-[#D1D1D1] hover:text-black transition-all border border-black"
                    >
                        {showList ? <><FaTimes /> CLOSE_ARRAY</> : <><FaList /> ACCESS_FULL_MANIFEST</>}
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {!showList ? (
                        <motion.div key="marquee" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <MarqueeRow items={row1} direction={1}  baseSpeed={50} />
                            <MarqueeRow items={row2} direction={-1} baseSpeed={60} />
                            <MarqueeRow items={row3} direction={1}  baseSpeed={45} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="px-[5%] grid grid-cols-1 md:grid-cols-3 gap-1"
                        >
                            {skillData.map((skill) => (
                                <div key={skill.id} className="border border-black/10 p-8 flex items-center justify-between bg-black/5 hover:bg-black group transition-all duration-300">
                                    <div className="flex items-center gap-5">
                                        <skill.icon className="text-3xl text-black group-hover:text-white transition-colors" />
                                        <span className="font-mono text-sm font-black uppercase text-black group-hover:text-white tracking-tighter">
                                            {skill.name}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[9px] text-black/30 group-hover:text-white/20">
                                        {skill.id}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-20 px-[5%] flex justify-between items-end border-t border-black/10 pt-8">
                <div className="space-y-1">
                    <p className="font-mono text-[9px] text-black/40 uppercase tracking-widest">
                        Status: System_Active
                    </p>
                    <p className="font-mono text-[9px] text-black/60 max-w-[300px] uppercase leading-relaxed">
                        Velocity adjusted for deep-packet inspection. <br />
                        [ TOTAL_COMPETENCIES: {skillData.length} ]
                    </p>
                </div>
                <span className="font-mono text-[9px] text-black/40 italic">
                    SCAN_REV_4.0.0 // LATENCY: 10MS
                </span>
            </div>
        </section>
    );
};

export default Skills;