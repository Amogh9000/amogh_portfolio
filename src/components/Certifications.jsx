import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const certifications = [
  {
    id: "01",
    title: "OCI 2025 Certified AI Foundations Associate",
    serial: "ORCL-AI-2025-01",
    issued: "OCT_2025",
    auth: "ASSOCIATE",
    skills: ["LLM Prompting", "RAG", "Feature Engineering", "Deep Learning", "Statistical Analysis"]
  },
  {
    id: "02",
    title: "OCI 2025 Certified Generative AI Professional",
    serial: "ORCL-GENAI-2025-02",
    issued: "NOV_2025",
    auth: "PROFESSIONAL",
    skills: ["Agentic Workflows", "Fine-tuning", "Prompt Engineering", "Vector DBs", "Chain-of-Thought"]
  },
  {
    id: "03",
    title: "Associate Data Analyst - Datacamp",
    serial: "DC-ANA-2025-03",
    issued: "SEP_2025",
    auth: "CERTIFIED",
    skills: ["SQL", "PostgreSQL"]
  },
  {
    id: "04",
    title: "Python Data Structures - Coursera",
    serial: "COUR-PY-DS-2024-04",
    issued: "AUG_2024",
    auth: "SPECIALIST",
    skills: ["Algorithms", "Data Structures", "Recursion", "Complexity Analysis", "OOP"]
  },
  {
    id: "05",
    title: "Using Python to Access Data - Coursera",
    serial: "COUR-PY-WEB-2024-05",
    issued: "JUL_2024",
    auth: "ENGINEER",
    skills: ["Web Scraping", "APIs", "JSON", "XML", "Network Programming"]
  }
];

const CredentialCard = ({ cert, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative h-[320px] bg-[#D1D1D1] border border-black p-6 flex flex-col justify-between overflow-hidden cursor-crosshair"
    >
      {/* Scan Line Animation */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-black/20 z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Top Metadata */}
      <div className="flex justify-between items-start z-20">
        <span className="font-mono text-[10px] font-bold text-black/60 uppercase">
          SERIAL_NO: {cert.serial}
        </span>
        <span className="font-mono text-[10px] font-bold text-black/40 uppercase">
          [ {cert.issued} ]
        </span>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-grow flex items-center justify-center py-4">
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.h3
              key="title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl md:text-3xl font-black text-black leading-none tracking-tight uppercase text-center"
              style={{ fontFamily: '"Inter Tight", sans-serif' }}
            >
              {cert.title}
            </motion.h3>
          ) : (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <h4 className="font-mono text-[10px] font-bold text-black/40 mb-3 tracking-widest uppercase">
                // VALIDATED_SKILLS
              </h4>
              <ul className="space-y-1">
                {cert.skills.map((skill, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="font-mono text-xs font-bold text-black flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-black rounded-full" />
                    {skill.toUpperCase()}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Metadata */}
      <div className="flex justify-between items-end z-20">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-bold text-black/40 uppercase">
            AUTH_LEVEL:
          </span>
          <span className="font-mono text-xs font-bold text-black">
            {cert.auth}
          </span>
        </div>
        <div className={`font-mono text-[10px] font-bold border border-black px-2 py-1 transition-colors duration-300
          ${isHovered ? "bg-black text-[#D1D1D1] border-black" : "text-black/30 border-black/10"}
        `}>
          [ AUTHORIZED ]
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="bg-[#D1D1D1] py-32 px-6 border-t border-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 border-b border-black pb-8">
          <h2 className="font-[900] text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] tracking-[-0.05em] text-black mb-4">
            CERTIFICATIONS
          </h2>
          <p className="font-mono text-[10px] md:text-xs text-black/60 tracking-widest uppercase">
            DIGITAL_TRUST_PROTOCOL // VERIFIED_CREDENTIALS_V4.0
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <CredentialCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
