import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiPython, SiTensorflow, SiOpencv, SiStreamlit, SiMysql, SiFastapi, SiC, SiR,
    SiScikitlearn, SiTableau
} from "react-icons/si";
import { TbBrandPython, TbChartBar, TbDatabase } from "react-icons/tb";
import { FaBrain, FaRocket, FaEye, FaList, FaTimes } from "react-icons/fa";

const skillData = [
    { id: "L01", name: "PYTHON", icon: SiPython },
    { id: "L02", name: "SQL", icon: SiMysql },
    { id: "L03", name: "C", icon: SiC },
    { id: "L04", name: "R", icon: SiR },
    { id: "AI01", name: "DEEP LEARNING", icon: FaBrain },
    { id: "AI02", name: "TENSORFLOW", icon: SiTensorflow },
    { id: "AI03", name: "SCIKIT-LEARN", icon: SiScikitlearn },
    { id: "AI04", name: "LLMS", icon: TbBrandPython },
    { id: "AI05", name: "RAG ARCHITECTURE", icon: TbDatabase },
    { id: "AI06", name: "AGENTIC WORKFLOWS", icon: FaRocket },
    { id: "VA01", name: "OPENCV", icon: SiOpencv },
    { id: "VA02", name: "LOG-MEL SPECS", icon: TbChartBar },
    { id: "VA03", name: "FEATURE EXT.", icon: FaEye },
    { id: "BO01", name: "FASTAPI", icon: SiFastapi },
    { id: "BO02", name: "STREAMLIT", icon: SiStreamlit },
    { id: "BO03", name: "TABLEAU", icon: SiTableau }
];

const SkillItem = ({ item }) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleActive = () => {
    setIsFilled(true);
    // Custom event to tell the Portfolio cursor to expand
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
      // Fixed: responsive padding to prevent the overlap seen in mobile viewports
      className="flex items-center px-6 md:px-16 group cursor-none select-none h-full touch-none"
    >
      <item.icon className={`text-2xl md:text-4xl mr-4 md:mr-6 transition-colors duration-300 ${isFilled ? 'text-white' : 'text-black'}`} />
      <span 
        // Fixed: Adjusted font-size (8vw for mobile) to prevent text stacking
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
    
    // REFRESHED: Mobile needs faster speed values because the distance (50%) is smaller
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
                {/* REFRESHED: Tripling items ensures no white-space gaps on high-res mobile screens */}
                {[...items, ...items, ...items].map((item, index) => (
                    <SkillItem key={index} item={item} />
                ))}
            </motion.div>
        </div>
    );
};

const Skills = () => {
    const [showList, setShowList] = useState(false);

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
                            <MarqueeRow items={skillData.slice(0, 6)} direction={1} baseSpeed={50} />
                            <MarqueeRow items={skillData.slice(6, 11)} direction={-1} baseSpeed={60} />
                            <MarqueeRow items={skillData.slice(11)} direction={1} baseSpeed={45} />
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
                                <div key={skill.id} className="border border-black/10 p-10 flex items-center justify-between bg-black/5 hover:bg-black group transition-all duration-300">
                                    <div className="flex items-center gap-6">
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
                    SCAN_REV_3.2.0 // LATENCY: 10MS
                </span>
            </div>
        </section>
    );
};

export default Skills;