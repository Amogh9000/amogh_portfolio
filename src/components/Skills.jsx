import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiPython,
    SiTensorflow,
    SiOpencv,
    SiStreamlit,
    SiR,
    SiScikitlearn,
    SiMysql,
    SiC,
    SiTableau,
} from "react-icons/si";
import { TbBrandPython, TbChartBar, TbDatabase } from "react-icons/tb";
import { FaCode, FaBrain, FaEye, FaRocket } from "react-icons/fa";

// CATEGORIZED INVENTORY DATA STRUCTURE
const skillCategories = {
    LANGUAGES: [
        { id: "L01", name: "PYTHON", icon: SiPython },
        { id: "L02", name: "C", icon: SiC },
        { id: "L03", name: "SQL", icon: SiMysql },
        { id: "L04", name: "R", icon: SiR },
    ],
    MACHINE_LEARNING: [
        { id: "ML01", name: "SCIKIT-LEARN", icon: SiScikitlearn },
        { id: "ML02", name: "XGBOOST", icon: TbBrandPython },
        { id: "ML03", name: "TENSORFLOW", icon: SiTensorflow },
        { id: "ML04", name: "DEEP LEARNING", icon: FaBrain },
        { id: "ML05", name: "FEATURE ENG.", icon: TbDatabase },
        { id: "ML06", name: "TEXT EMBEDDINGS", icon: TbChartBar },
    ],
    VISION_ANALYTICS: [
        { id: "VA01", name: "DATA PREPROC.", icon: TbDatabase },
        { id: "VA02", name: "OPENCV", icon: SiOpencv },
        { id: "VA03", name: "MATPLOTLIB", icon: TbChartBar },
        { id: "VA04", name: "SEABORN", icon: TbChartBar },
    ],
    DEPLOYMENT: [
        { id: "D01", name: "STREAMLIT", icon: SiStreamlit },
        { id: "D02", name: "TABLEAU", icon: SiTableau },
        { id: "D03", name: "EXCEL", icon: TbChartBar },
    ],
};

// Empty Slot Component with Diagonal Hatch Pattern
const EmptySlot = ({ index }) => {
    return (
        <div
            className="relative h-[200px] md:h-[240px] border border-black bg-[#D1D1D1] overflow-hidden"
            style={{
                backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    rgba(0, 0, 0, 0.05) 10px,
                    rgba(0, 0, 0, 0.05) 20px
                )`,
            }}
        >
            {/* X Wireframe */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="0.5" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="0.5" />
            </svg>

            {/* Empty Label */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[10px] text-black/20 tracking-widest">[ EMPTY ]</span>
            </div>
        </div>
    );
};

// Skill Cell Component (The 'Blimp' Interaction)
const SkillCell = ({ skill, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = skill.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative h-[200px] md:h-[240px] border border-black bg-[#D1D1D1] hover:bg-black transition-colors duration-300 cursor-crosshair overflow-hidden"
        >
            {/* ID - Top Left */}
            <div className="absolute top-3 left-3 z-10">
                <span className="text-[10px] font-mono font-bold text-black/60 group-hover:text-white/60 transition-colors duration-300">
                    {skill.id}
                </span>
            </div>

            {/* Center Content: Icon → Text on Hover */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
                <AnimatePresence mode="wait">
                    {!isHovered ? (
                        <motion.div
                            key="icon"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Icon className="text-7xl md:text-8xl text-black opacity-80" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="text"
                            initial={{ opacity: 0, y: 20, scale: 1.1 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="w-full text-center px-2"
                        >
                            <h3 className="font-[900] text-3xl md:text-4xl lg:text-5xl tracking-[-0.05em] leading-none text-white uppercase break-words">
                                {skill.name}
                            </h3>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Scan Line */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-black w-0 group-hover:w-full transition-all duration-500 ease-out" />
        </motion.div>
    );
};

// Category Section Component
const CategorySection = ({ categoryName, skills, categoryIndex, columnsPerRow = 4 }) => {
    // Calculate empty slots needed to fill the rectangle
    const totalSkills = skills.length;
    const remainder = totalSkills % columnsPerRow;
    const emptySlots = remainder === 0 ? 0 : columnsPerRow - remainder;

    // Determine grid columns class based on columnsPerRow
    const gridColsClass = columnsPerRow === 3
        ? "grid-cols-2 md:grid-cols-3"
        : "grid-cols-2 md:grid-cols-4";

    return (
        <div className="mb-0">
            {/* Manifest-Style Category Header */}
            <div className="border-b border-black bg-[#D1D1D1] px-4 py-3">
                <h3 className="font-mono text-xs md:text-sm tracking-widest uppercase text-black">
                    // {String(categoryIndex + 1).padStart(2, '0')} : {categoryName.replace('_', ' ')}
                </h3>
            </div>

            {/* Skills Grid */}
            <div className={`grid ${gridColsClass}`}>
                {skills.map((skill, index) => (
                    <SkillCell key={skill.id} skill={skill} index={index} />
                ))}

                {/* Empty Slot Fillers */}
                {Array.from({ length: emptySlots }).map((_, index) => (
                    <EmptySlot key={`empty-${categoryName}-${index}`} index={index} />
                ))}
            </div>
        </div>
    );
};

// Main Skills Component
const Skills = () => {
    return (
        <section className="bg-[#D1D1D1] py-32 px-0">
            <div className="max-w-7xl mx-auto px-6 mb-16">
                {/* Section Title */}
                <h2 className="font-[900] text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] tracking-[-0.05em] text-black mb-4">
                    SKILLS
                </h2>
                <p className="font-mono text-xs text-black/60 tracking-widest uppercase">
                    INVENTORY MANIFEST // SYSTEM_V2.0
                </p>
            </div>

            {/* Categorized Inventory Grid */}
            <div className="max-w-7xl mx-auto border-t border-black">
                {/* LANGUAGES - 4 columns */}
                <CategorySection
                    categoryName="LANGUAGES"
                    skills={skillCategories.LANGUAGES}
                    categoryIndex={0}
                    columnsPerRow={4}
                />

                {/* MACHINE LEARNING - 3 columns */}
                <CategorySection
                    categoryName="MACHINE_LEARNING"
                    skills={skillCategories.MACHINE_LEARNING}
                    categoryIndex={1}
                    columnsPerRow={3}
                />

                {/* VISION ANALYTICS - 4 columns */}
                <CategorySection
                    categoryName="VISION_ANALYTICS"
                    skills={skillCategories.VISION_ANALYTICS}
                    categoryIndex={2}
                    columnsPerRow={4}
                />

                {/* DEPLOYMENT - 3 columns */}
                <CategorySection
                    categoryName="DEPLOYMENT"
                    skills={skillCategories.DEPLOYMENT}
                    categoryIndex={3}
                    columnsPerRow={3}
                />
            </div>
        </section>
    );
};

export default Skills;
