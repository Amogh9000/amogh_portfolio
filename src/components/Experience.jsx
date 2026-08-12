import React, { useState } from "react";
import { motion } from "framer-motion";

// Sample dataset structured for engineering roles
const EXPERIENCE_DATA = [
  {
    id: "samsung",
    roleTitle: "Research & Development Intern",
    company: "Samsung PRISM",
    location: "BANGALORE, IN",
    period: "// JAN 2026 - JUL 2026",
    narrative:
      "Engineered an edge-deployed acoustic intelligence system built for real-time sound event classification. By leveraging knowledge distillation to compress large vision-transformer models into lightweight CNN students, the pipeline achieved high-fidelity inference under strict edge resource constraints.",
    achievements: [
      "Achieved 2.8× faster inference speed on edge target hardware via static INT8 quantization.",
      "Cut model parameter footprint by 85% down to 2.8 MB without degrading top-1 classification accuracy.",
      "Architected cloud benchmarking and automated evaluation pipelines using PyTorch and Modal infrastructure.",
    ],
    techStack: "FASTAPI · PYTHON · YAMNet · PYTORCH · INT8 QUANTIZATION · MODAL",
  },
  {
    id: "edunet",
    roleTitle: "AI / Machine Learning Intern",
    company: "Edunet Foundation",
    location: "REMOTE",
    period: "// JUN 2025 - JUL 2025",
    narrative:
      "Designed end-to-end predictive healthcare machine learning models prioritizing algorithmic fairness and statistical robustness. Focused on addressing heavy class imbalance across large-scale patient telemetry datasets to produce reliable diagnostic insights.",
    achievements: [
      "Balanced complex 48,000-record dataset using SMOTE synthetic oversampling techniques.",
      "Optimized XGBoost and Gradient Boosting classifiers to reach 86% overall diagnostic accuracy.",
      "Implemented model interpretability frameworks and Responsible AI compliance standards.",
    ],
    techStack: "PYTHON · SCIKIT-LEARN · XGBOOST · SMOTE · PANDAS · RESPONSIBLE AI",
  },
];

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="experience"
      className="relative w-full min-h-screen bg-[#d9d9d9] text-black py-24 px-6 md:px-12 lg:px-24 border-t border-black/15 selection:bg-black selection:text-white overflow-hidden"
    >
      {/* 2. Canvas Background Refinement: Clean 32px Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Absolute Positioned Fixed Corner Crosshair Nodes (+) */}
      <span className="absolute top-6 left-6 font-mono text-[10px] text-black/30 pointer-events-none select-none">
        +
      </span>
      <span className="absolute top-6 right-6 font-mono text-[10px] text-black/30 pointer-events-none select-none">
        +
      </span>
      <span className="absolute bottom-6 left-6 font-mono text-[10px] text-black/30 pointer-events-none select-none">
        +
      </span>
      <span className="absolute bottom-6 right-6 font-mono text-[10px] text-black/30 pointer-events-none select-none">
        +
      </span>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* 1. Left Column (Sticky Anchor) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="space-y-1">

            {/* Interactive State Inversion (Group Hover) */}
            <div className="group cursor-pointer">
              <h2 className="font-bold tracking-tighter text-4xl md:text-5xl text-black group-hover:text-transparent group-hover:[-webkit-text-stroke:1.5px_#000000] uppercase leading-none transition-all duration-300 ease-in-out">
                EXPERIENCE
              </h2>
              <div className="font-bold tracking-tighter text-4xl md:text-5xl text-transparent [-webkit-text-stroke:1.5px_#000000] group-hover:text-black group-hover:[-webkit-text-stroke:0px] uppercase leading-none mt-1 transition-all duration-300 ease-in-out">
                JOURNEY
              </div>
            </div>

            <p className="text-sm md:text-base text-[#555555] font-medium leading-relaxed mt-4">
              A chronological record of engineering roles, system architecture design, and measurable impact.
            </p>
          </div>
        </div>

        {/* 2. Right Column (Scrolling Stream) */}
        <div className="lg:col-span-8 flex flex-col">
          {EXPERIENCE_DATA.map((role, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={role.id}
                onViewportEnter={() => setActiveIndex(idx)}
                viewport={{ amount: 0.5, margin: "-10% 0px -20% 0px" }}
                className={`border-t border-black/15 pt-8 pb-16 transition-all duration-500 ease-out first:border-t-0 first:pt-0 ${isActive ? "opacity-100" : "opacity-40 hover:opacity-75"
                  }`}
              >
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-black tracking-tight">
                      {role.roleTitle}
                    </h3>
                    <span className="text-xl md:text-2xl text-[#555555] font-medium">
                      — {role.company}
                    </span>
                  </div>
                </div>

                {/* System Metadata Line */}
                <div className="font-mono text-xs text-[#555555] font-semibold mt-2 flex flex-wrap items-center gap-3">
                  <span>{role.period}</span>
                  <span className="text-black/30">•</span>
                  <span>[ {role.location} ]</span>
                </div>

                {/* Story Narrative */}
                <p className="text-base md:text-lg text-gray-800 leading-relaxed mt-6 font-normal">
                  {role.narrative}
                </p>

                {/* Key Achievements */}
                <div className="mt-6 space-y-3">
                  {role.achievements.map((item, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                      <p className="text-sm md:text-base text-gray-900 leading-normal font-normal">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Line */}
                <div className="mt-8 pt-4 border-t border-black/10 font-mono text-xs text-[#555555] font-semibold uppercase tracking-tight block">
                  {role.techStack}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;