import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useRightClickProtection from '../hooks/useRightClickProtection';

gsap.registerPlugin(ScrollTrigger);

// Black Wireframe Sphere for Light Mode
const BrutalistSphere = () => {
    const meshRef = useRef();
    const { viewport } = useThree();
    const isMobile = viewport.width < 5; // Approximate threshold

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.2;
            meshRef.current.rotation.y = t * 0.3;
        }
    });
    return (
        <Sphere args={[1.5, 64, 64]} ref={meshRef} scale={isMobile ? 1.2 : 1.8}>
            <MeshDistortMaterial
                color="#000000"
                emissive="#000000"
                emissiveIntensity={0}
                roughness={0}
                metalness={0.5}
                distort={0.3}
                speed={2}
                wireframe={true}
            />
        </Sphere>
    );
};



const Hero = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    // Check window width for initial camera position
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    useRightClickProtection(sectionRef);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal Text Staggered (Upward slide)
            gsap.from(".hero-line", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out",
                delay: 0.2
            });

            // Parallax for Sphere
            gsap.to(".hero-sphere", {
                y: 200,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full bg-[#D1D1D1] overflow-hidden flex flex-col justify-between border-b border-black"
        >
            {/* Top Grid Bar */}
            <div className="w-full flex justify-between items-start border-b border-black p-4 z-20">
                <div className="flex flex-col">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-black uppercase">
                        Portfolio_2026
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-black/60 uppercase">
                        [Ref: Amogh.M]
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-black uppercase animate-pulse">
                        ● System_Online
                    </span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative flex-grow flex items-center justify-center">

                {/* 3D Object Behind Text - Now Black Wireframe on Gray */}
                <div className="hero-sphere absolute inset-0 z-0 opacity-40">
                    <Canvas camera={{ position: [0, 0, isMobile ? 9 : 6], fov: 45 }}>
                        <ambientLight intensity={1} />
                        <pointLight position={[10, 10, 10]} intensity={1.5} />
                        <BrutalistSphere />
                    </Canvas>
                </div>

                {/* Massive Typography - Squashed & Tight */}
                <div className="relative z-10 text-center mix-blend-multiply">
                    <h1
                        ref={textRef}
                        className="flex flex-col items-center justify-center leading-[0.8]"
                    >
                        <span className="hero-line block text-[12vw] font-black tracking-[-0.08em] text-black uppercase"
                            style={{ transform: "scaleY(1.1)" }}> {/* Squashed effect */}
                            AMOGH
                        </span>
                        <span className="hero-line block text-[12vw] font-black tracking-[-0.08em] text-black uppercase"
                            style={{ transform: "scaleY(1.1)" }}>
                            MANJUNATH
                        </span>
                    </h1>
                </div>
            </div>

            {/* Bottom Grid Bar */}
            <div className="w-full grid grid-cols-3 border-t border-black z-20">
                <div className="border-r border-black p-4 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer group">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase">
                        Scroll_Down ↓
                    </span>
                </div>
                <div className="border-r border-black p-4 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase">
                        Full_Stack
                    </span>
                </div>
                <div className="p-4 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase">
                        Data_Sci
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
