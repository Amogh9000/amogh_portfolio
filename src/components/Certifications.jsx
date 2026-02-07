import React from 'react';
import { motion } from 'framer-motion';

const certs = [
    { title: "OCI 2025 Certified AI Foundations Associate", provider: "ORACLE", year: "2025" },
    { title: "OCI 2025 Certified Generative AI Professional", provider: "ORACLE", year: "2025" },
    { title: "Associate Data Analyst", provider: "DATACAMP", year: "2025" },
    { title: "Python Data Structures", provider: "COURSERA", year: "2024" },
    { title: "Using Python to Access Data", provider: "COURSERA", year: "2024" },
];

const Certifications = () => {
    return (
        <section className="bg-[#D1D1D1] text-black py-24 border-t border-black">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="mb-16 pb-4 border-b border-black">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter" style={{ fontFamily: '"Inter Tight", sans-serif' }}>
                        // LICENSES_&_CERTIFICATIONS
                    </h2>
                </div>

                <div className="border border-black bg-[#D1D1D1]">
                    {certs.map((cert, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group grid grid-cols-[60px_1fr_120px] md:grid-cols-[80px_1fr_200px] border-b border-black last:border-b-0 hover:bg-black hover:text-white transition-colors duration-200 cursor-none"
                        >
                            {/* Column 1: Year */}
                            <div className="border-r border-black group-hover:border-white/20 p-4 flex items-center justify-center transition-colors duration-200">
                                <span className="font-mono text-sm md:text-lg font-bold" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                                    {cert.year}
                                </span>
                            </div>

                            {/* Column 2: Title */}
                            <div className="p-6 md:p-8 flex items-center border-r border-black group-hover:border-white/20 transition-colors duration-200">
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase leading-none tracking-tight" style={{ fontFamily: '"Inter Tight", sans-serif' }}>
                                    {cert.title}
                                </h3>
                            </div>

                            {/* Column 3: Issuer */}
                            <div className="p-4 flex items-center justify-end px-6 md:px-8">
                                <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-right">
                                    {cert.provider}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
