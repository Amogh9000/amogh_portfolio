import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { playSound } from "../utils/audio";

// Washi Tape Overlay
const WashiTape = ({ className = "" }) => (
  <div
    className={`absolute h-3.5 w-10 md:w-14 bg-white/70 backdrop-blur-xs border border-black/30 shadow-xs pointer-events-none select-none z-20 ${className}`}
    style={{
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.12) 1px, transparent 1px)`,
      backgroundSize: "6px 6px",
    }}
  />
);

export default function CreativeWorkbench({ activeId }) {
  const activeRole = activeId || "samsung";

  return (
    <motion.div
      key={activeRole}
      animate={{ x: [-4, 4, -2, 2, 0] }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative w-full h-[360px] md:h-[480px] lg:h-[580px] border-[2px] border-black bg-[#E5E5E5] shadow-[8px_8px_0px_#000000] rounded-none overflow-hidden flex flex-col justify-between p-3 md:p-4 lg:p-5 select-none"
    >
      {/* Industrial Grid Background Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="workbench-inner-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#000000"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#workbench-inner-grid)" />
        </svg>
      </div>

      {/* Brutalist Corner Crosshair Markers */}
      <div className="absolute top-3 left-3 w-2 h-2 md:w-2.5 md:h-2.5 bg-black pointer-events-none z-10" />
      <div className="absolute bottom-3 right-3 w-2 h-2 md:w-2.5 md:h-2.5 bg-black pointer-events-none z-10" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b-2 border-black pb-2 font-mono text-[10px] md:text-[11px] lg:text-xs font-bold text-black">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-black" />
          <span className="uppercase tracking-widest hidden sm:inline">
            TACTILE_WORKBENCH // 05_ITEMS
          </span>
          <span className="uppercase tracking-widest sm:hidden">
            WORKBENCH
          </span>
        </div>
        <span className="bg-black text-[#D1D1D1] px-2 py-0.5 uppercase text-[9px] md:text-[10px]">
          [ DRAG ]
        </span>
      </div>

      {/* Main Surface: Draggable Artifact Cards — layout adapts by screen */}
      <div className="relative flex-1 w-full mt-1.5 flex items-center justify-center overflow-hidden">

        {/* ARTIFACT 1: Samsung PRISM Polaroid */}
        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -30, bottom: 30 }}
          dragElastic={0.2}
          onDragStart={() => playSound("paper_grab")}
          onDragEnd={() => playSound("paper_drop")}
          initial={{ rotate: -8 }}
          animate={{
            rotate: -8,
            scale: activeRole === "samsung" ? 1.02 : 0.96,
            zIndex: activeRole === "samsung" ? 30 : 10,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`absolute top-1 left-1 sm:left-3 md:left-6 w-36 sm:w-44 md:w-52 lg:w-56 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none p-2 md:p-2.5 cursor-grab active:cursor-grabbing touch-none select-none ${
            activeRole === "samsung" ? "ring-2 ring-black" : ""
          }`}
        >
          <WashiTape className="-top-2 -left-2 -rotate-12" />
          <WashiTape className="-bottom-2 -right-2 rotate-6" />

          <div className="relative h-20 sm:h-24 md:h-28 lg:h-36 w-full bg-neutral-900 border-2 border-black overflow-hidden flex flex-col justify-between p-2 md:p-2.5 text-white font-mono">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px]" />
            <div className="relative z-10 flex justify-between text-[7px] md:text-[8px] lg:text-[9px] uppercase font-bold text-neutral-400">
              <span>LAT: 12.9716° N</span>
              <span>SAMSUNG R&D</span>
            </div>
            <div className="relative z-10 space-y-0.5">
              <div className="text-sm md:text-base lg:text-lg font-black tracking-tighter uppercase text-white leading-none">
                BANGALORE HQ
              </div>
              <div className="text-[7px] md:text-[8px] lg:text-[9px] font-bold text-neutral-300 uppercase tracking-widest">
                ACOUSTIC AI LAB
              </div>
            </div>
          </div>

          <div className="mt-1.5 font-mono text-[8px] md:text-[9px] lg:text-[10px] font-bold text-black flex justify-between items-center">
            <span>// BLR_HQ // 12.9716° N</span>
            <span className="bg-black text-white px-1 text-[7px] md:text-[8px]">2026</span>
          </div>

          {/* Samsung Active Stamp */}
          <AnimatePresence>
            {activeRole === "samsung" && (
              <motion.div
                initial={{ scale: 3.0, opacity: 0, rotate: -16 }}
                animate={{ scale: 1.0, opacity: 1, rotate: -10 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="absolute inset-0 m-auto w-fit h-fit border-4 border-black text-black px-2 md:px-3 py-1 font-mono font-black text-sm md:text-base lg:text-lg uppercase tracking-widest bg-white/95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] pointer-events-none z-50"
              >
                [ APPROVED // BLR ]
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ARTIFACT 2: Edunet Polaroid */}
        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -30, bottom: 30 }}
          dragElastic={0.2}
          onDragStart={() => playSound("paper_grab")}
          onDragEnd={() => playSound("paper_drop")}
          initial={{ rotate: 5 }}
          animate={{
            rotate: 5,
            scale: activeRole === "edunet" ? 1.02 : 0.96,
            zIndex: activeRole === "edunet" ? 30 : 12,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`absolute top-6 right-1 sm:right-3 md:right-6 w-36 sm:w-44 md:w-52 lg:w-56 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none p-2 md:p-2.5 cursor-grab active:cursor-grabbing touch-none select-none ${
            activeRole === "edunet" ? "ring-2 ring-black" : ""
          }`}
        >
          <WashiTape className="-top-2 left-1/2 -translate-x-1/2 rotate-3" />

          <div className="relative h-20 sm:h-24 md:h-28 lg:h-36 w-full bg-neutral-900 border-2 border-black overflow-hidden flex flex-col justify-between p-2 md:p-2.5 text-white font-mono">
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:12px_12px]" />
            <div className="relative z-10 flex justify-between text-[7px] md:text-[8px] lg:text-[9px] uppercase font-bold text-neutral-400">
              <span>REMOTE_01</span>
              <span>FAIRNESS ML</span>
            </div>
            <div className="relative z-10 space-y-0.5">
              <div className="text-sm md:text-base lg:text-lg font-black tracking-tighter uppercase text-white leading-none">
                EDUNET FDN.
              </div>
              <div className="text-[7px] md:text-[8px] lg:text-[9px] font-bold text-neutral-300 uppercase tracking-widest">
                PREDICTIVE AI
              </div>
            </div>
          </div>

          <div className="mt-1.5 font-mono text-[8px] md:text-[9px] lg:text-[10px] font-bold text-black flex justify-between items-center">
            <span>// REMOTE_NODE // 01</span>
            <span className="bg-black text-white px-1 text-[7px] md:text-[8px]">2025</span>
          </div>

          {/* Edunet Active Stamp */}
          <AnimatePresence>
            {activeRole === "edunet" && (
              <motion.div
                initial={{ scale: 3.0, opacity: 0, rotate: 14 }}
                animate={{ scale: 1.0, opacity: 1, rotate: 6 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="absolute inset-0 m-auto w-fit h-fit border-4 border-black text-black px-2 md:px-3 py-1 font-mono font-black text-sm md:text-base lg:text-lg uppercase tracking-widest bg-white/95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] pointer-events-none z-50"
              >
                [ NODE_VERIFIED ]
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ARTIFACT 3: Code Snippet Sticky Note — hidden on very small screens */}
        <motion.div
          drag
          dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
          dragElastic={0.2}
          onDragStart={() => playSound("paper_grab")}
          onDragEnd={() => playSound("paper_drop")}
          initial={{ rotate: -3 }}
          animate={{ rotate: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute top-28 sm:top-36 md:top-40 lg:top-44 left-2 sm:left-4 md:left-10 lg:left-12 w-32 sm:w-36 md:w-44 lg:w-48 border-2 border-black bg-neutral-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none p-1.5 md:p-2 cursor-grab active:cursor-grabbing touch-none select-none z-20"
        >
          <WashiTape className="-top-2 left-3 -rotate-6" />
          <div className="font-mono text-[8px] md:text-[9px] lg:text-[10px] text-black font-bold space-y-1">
            <div className="flex justify-between border-b border-black pb-0.5 text-[7px] md:text-[8px] uppercase text-neutral-600">
              <span>// SNIPPET</span>
              <span>INT8</span>
            </div>
            <p className="bg-white border border-black p-0.5 md:p-1 text-[7.5px] md:text-[8.5px]">
              <code>model.quantize(INT8) // 2.8x</code>
            </p>
          </div>
        </motion.div>

        {/* ARTIFACT 4: Security Badge — pushed to bottom-right */}
        <motion.div
          drag
          dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
          dragElastic={0.2}
          onDragStart={() => playSound("paper_grab")}
          onDragEnd={() => playSound("paper_drop")}
          initial={{ rotate: 12 }}
          animate={{ rotate: 12 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute bottom-8 sm:bottom-10 md:bottom-14 lg:bottom-16 right-2 sm:right-4 md:right-8 lg:right-10 w-28 sm:w-32 md:w-40 lg:w-44 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none p-1.5 md:p-2 cursor-grab active:cursor-grabbing touch-none select-none z-22"
        >
          <div className="font-mono text-center space-y-0.5 border border-black p-1 md:p-1.5">
            <div className="h-1.5 w-5 bg-black mx-auto rounded-full" />
            <div className="text-[7px] md:text-[8px] lg:text-[9px] font-black uppercase text-black">
              R&D SECURITY PASS
            </div>
            <div className="bg-black text-white text-[7px] md:text-[8px] font-bold py-0.5 uppercase">
              [ ACCESS: LEVEL_01 ]
            </div>
          </div>
        </motion.div>

        {/* ARTIFACT 5: Validation Log Index Card */}
        <motion.div
          drag
          dragConstraints={{ left: -25, right: 25, top: -25, bottom: 25 }}
          dragElastic={0.2}
          onDragStart={() => playSound("paper_grab")}
          onDragEnd={() => playSound("paper_drop")}
          initial={{ rotate: -15 }}
          animate={{ rotate: -15 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute bottom-1 left-1/3 -translate-x-1/2 w-36 sm:w-40 md:w-48 lg:w-52 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none p-1.5 md:p-2 cursor-grab active:cursor-grabbing touch-none select-none z-25"
        >
          <div className="font-mono text-[8px] md:text-[9px] font-bold text-black border border-dashed border-black p-0.5 md:p-1 text-center">
            <span className="text-[7px] md:text-[8px] text-neutral-500 uppercase block">
              VALIDATION MATRIX
            </span>
            <div className="bg-neutral-200 border border-black py-0.5 my-0.5 text-[8px] md:text-[9px] font-extrabold">
              [ ACCURACY: 86.4% ]
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer Status Bar */}
      <div className="relative z-10 font-mono text-[9px] md:text-[10px] lg:text-[11px] font-bold border-t-2 border-black pt-2 flex items-center justify-between text-black">
        <span>5_ARTIFACTS</span>
        <span className="bg-black text-white px-2 py-0.5 uppercase">
          [{activeRole.toUpperCase()}]
        </span>
      </div>
    </motion.div>
  );
}
