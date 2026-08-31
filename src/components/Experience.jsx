import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CreativeWorkbench from "./CreativeWorkbench";

const EXPERIENCE_DATA = [
  {
    id: "samsung",
    roleTitle: "RESEARCH & DEVELOPMENT INTERN",
    company: "SAMSUNG PRISM",
    location: "BANGALORE, IN",
    period: "// JAN 2026 - JUL 2026",
    narrative:
      "Built real-time AI models that recognize and classify sound events instantly. Focused on creating super lightweight algorithms designed to run fast on low-power devices.",
    achievements: [
      "2.8x faster edge inference via INT8 static quantization.",
      "85% parameter footprint reduction down to 2.8MB without sacrificing classification accuracy.",
      "Automated evaluation pipeline built on Modal cloud infrastructure.",
    ],
    tags: [
      "FASTAPI",
      "PYTHON",
      "YAMNET",
      "PYTORCH",
      "INT8 QUANTIZATION",
      "MODAL",
    ],
  },
  {
    id: "edunet",
    roleTitle: "AI / MACHINE LEARNING INTERN",
    company: "EDUNET FOUNDATION",
    location: "REMOTE / BANGALORE",
    period: "// JUN 2025 - JUL 2025",
    narrative:
      "Developed predictive healthcare models to assist in early disease risk detection. Ensured algorithms remained fair, unbiased, and accurate across diverse patient datasets.",
    achievements: [
      "Balanced complex 48,000-record dataset using SMOTE synthetic oversampling techniques.",
      "Optimized XGBoost and Gradient Boosting classifiers to reach 86% overall diagnostic accuracy.",
      "Implemented model interpretability frameworks and Responsible AI compliance standards.",
    ],
    tags: [
      "PYTHON",
      "SCIKIT-LEARN",
      "XGBOOST",
      "SMOTE",
      "PANDAS",
      "RESPONSIBLE AI",
    ],
  },
];

const Experience = () => {
  const [activeId, setActiveId] = useState("samsung");

  return (
    <section
      id="experience"
      className="relative w-full min-h-screen bg-[#D1D1D1] text-black py-16 md:py-24 px-4 md:px-12 lg:px-24 border-t border-black select-none overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <h2
            className="font-[900] text-[clamp(2rem,6vw,4rem)] leading-[0.9] tracking-[-0.05em] text-black uppercase"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            EXPERIENCE <br />
            <span
              className="text-transparent transition-colors duration-300 hover:text-black cursor-crosshair"
              style={{ WebkitTextStroke: "1.5px black" }}
            >
              JOURNEY
            </span>
          </h2>
          <span className="font-mono text-xs md:text-sm font-bold text-black/40 tracking-wider block">
            // CAREER TELEMETRY & TACTILE ARTIFACT WORKBENCH
          </span>
        </div>

        {/* Responsive 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Sticky Workbench Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <CreativeWorkbench activeId={activeId} />
          </div>

          {/* RIGHT COLUMN: Scrollable Experience Text Cards */}
          <div className="lg:col-span-7 space-y-8">
            {EXPERIENCE_DATA.map((role) => {
              const isActive = activeId === role.id;

              return (
                <motion.div
                  key={role.id}
                  id={`experience-card-${role.id}`}
                  onViewportEnter={() => setActiveId(role.id)}
                  viewport={{ amount: 0.3, margin: "-5% 0px -15% 0px" }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: "out" }}
                  onClick={() => setActiveId(role.id)}
                  className={`relative bg-[#E5E5E5] border-[2px] border-black p-5 md:p-8 lg:p-10 shadow-[8px_8px_0px_#000000] cursor-pointer transition-colors duration-300 select-none ${
                    isActive ? "ring-2 ring-black" : ""
                  }`}
                >
                  {/* Brutalist Corner Crosshair Markers matching Projects console */}
                  <div className="absolute top-3 left-3 w-2.5 h-2.5 bg-black pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-2.5 h-2.5 bg-black pointer-events-none" />

                  {/* Card Header & Industrial Metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-5 border-b-2 border-black">
                    <div>
                      <span className="font-mono text-xs font-bold text-black/60 tracking-tight uppercase block mb-1">
                        // {role.company}
                      </span>
                      <h3 className="font-[900] text-xl md:text-2xl lg:text-3xl tracking-tight text-black uppercase leading-none">
                        {role.roleTitle}
                      </h3>
                    </div>
                    <div className="flex sm:flex-col items-end gap-1 font-mono text-xs font-bold text-black text-right">
                      <span className="bg-black text-[#D1D1D1] px-2 py-0.5 uppercase tracking-wider">
                        {role.period}
                      </span>
                      <span className="text-black/60">
                        [ {role.location} ]
                      </span>
                    </div>
                  </div>

                  {/* Narrative Body */}
                  <p className="font-mono text-xs md:text-sm lg:text-base leading-relaxed text-black/80 font-medium mt-5 md:mt-6">
                    {role.narrative}
                  </p>

                  {/* Bullet Achievements */}
                  <div className="mt-6 space-y-3">
                    {role.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-black mt-1.5 shrink-0" />
                        <p className="font-mono text-xs md:text-sm font-semibold text-black/90 leading-normal">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Tags Line */}
                  <div className="mt-8 pt-6 border-t border-black/20 flex flex-wrap gap-2">
                    {role.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-xs font-bold uppercase px-3 py-1 bg-black/5 border border-black/10 text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;