import React from 'react';

const CareerVision = () => {
    return (
        <section className="py-32 px-6 flex justify-center">
            <div className="w-full max-w-3xl glass-panel bg-black/80 rounded-xl overflow-hidden font-mono shadow-2xl shadow-indigo-500/10">
                {/* Terminal Header */}
                <div className="bg-white/10 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-4 text-xs text-gray-400">amogh@os:~/vision</span>
                </div>

                {/* Terminal Content */}
                <div className="p-8 space-y-6 text-sm md:text-base">
                    <div>
                        <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="text-white">cat current_focus.txt</span>
                        <p className="text-gray-300 mt-2 pl-4 border-l-2 border-gray-700">
                            "I am focused on bridging the gap between cutting-edge AI research and scalable, real-world applications. My goal is to build intelligent systems that solve complex problems in healthcare, finance, and enterprise operations."
                        </p>
                    </div>

                    <div>
                        <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="text-white">list --targets</span>
                        <ul className="mt-2 pl-4 text-gray-300 grid grid-cols-2 gap-2">
                            <li>[✓] Data Science</li>
                            <li>[✓] Machine Learning Engineering</li>
                            <li>[ ] AI Product Strategy</li>
                            <li>[ ] Technical Consulting</li>
                        </ul>
                    </div>

                    <div>
                        <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="text-white">./contact_me.sh</span>
                        <div className="mt-4 flex gap-4">
                            <a href="#" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded flex items-center gap-2 transition-colors">
                                Download Resume
                            </a>
                            <a href="mailto:amogh@example.com" className="px-6 py-3 border border-gray-600 hover:border-gray-400 text-gray-300 rounded transition-colors">
                                Email Me
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerVision;
