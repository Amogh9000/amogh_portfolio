import React, { useState } from 'react';

const SecureEmail = () => {
    const [text, setText] = useState('[ INITIATE_HANDSHAKE ]');
    const [copied, setCopied] = useState(false);

    // Email parts to avoid scraper detection
    const user = "amoghmanjunath2019";
    const domain = "gmail.com";

    const handleCopy = (e) => {
        e.preventDefault();

        const email = `${user}@${domain}`;
        navigator.clipboard.writeText(email);

        setText('// COPIED_TO_CLIPBOARD');
        setCopied(true);

        setTimeout(() => {
            setText('[ INITIATE_HANDSHAKE ]');
            setCopied(false);
        }, 3000);
    };

    return (
        <button
            onClick={handleCopy}
            className={`
                w-full flex-1 flex flex-col justify-center items-center px-8 md:px-12 
                border-b border-white/20 last:border-b-0 
                transition-all duration-200 group/link cursor-pointer py-12 md:py-0
                hover:bg-white hover:text-black uppercase text-left
                ${copied ? "bg-white text-black" : "bg-black text-white"}
            `}
        >
            <div className="flex justify-between items-start w-full">
                <span className={`font-mono text-[10px] uppercase opacity-50 mb-2 transition-colors ${copied ? "text-black/60" : "group-hover/link:text-black/60"}`}>
                    // Send_Transmission
                </span>
            </div>

            <span className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none w-full text-left font-mono">
                {text}
            </span>
        </button>
    );
};

export default SecureEmail;
