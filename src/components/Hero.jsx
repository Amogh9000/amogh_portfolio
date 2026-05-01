import React, { useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const letters = "AMOGH M".split("");

const WireframeTerrain = () => {
    const meshRef = useRef();

    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(60, 40, 100, 80);
        geo.rotateX(-Math.PI / 2);

        const pos = geo.attributes.position;
        const originalY = new Float32Array(pos.count);

        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const z = pos.getZ(i);

            // Create a central valley: high on left/right, flat in middle
            // x range is roughly -30 to 30
            const distFromCenter = Math.abs(x);
            const valleyWidth = 10;
            let y = 0;

            if (distFromCenter > valleyWidth) {
                const normalizedDist = (distFromCenter - valleyWidth) / 20;
                y = Math.pow(normalizedDist, 2) * 25; // Quadratic curve for mountains

                // Add jagged noise to mountain peaks
                y += Math.sin(x * 0.8) * Math.cos(z * 0.8) * 3 * normalizedDist;
                y += Math.sin(x * 2.5 + z * 1.5) * 1.2 * normalizedDist;
            } else {
                // Subtle floor ripples in the valley
                y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 0.2;
            }

            pos.setY(i, y);
            originalY[i] = y;
        }

        geo.userData = { originalY };
        geo.computeVertexNormals();
        return geo;
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const pos = geometry.attributes.position;
        const originalY = geometry.userData.originalY;
        const time = state.clock.getElapsedTime();

        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const z = pos.getZ(i);
            const baseY = originalY[i];
            const ripple = Math.sin(x * 1.5 + time) * 0.3 + Math.cos(z * 1.5 + time * 0.7) * 0.3;
            pos.setY(i, baseY + ripple);
        }

        // eslint-disable-next-line react-hooks/immutability
        pos.needsUpdate = true;
    });

    return (
        <mesh ref={meshRef} geometry={geometry} position={[0, -2, -5]}>
            <meshBasicMaterial
                color="#000000"
                wireframe={true}
                transparent={true}
                opacity={0.4}
                wireframeLinewidth={0.5}
            />
        </mesh>
    );
};

const FLIP_SEQUENCE = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const MechanicalLetter = ({ targetChar, index }) => {
    const tileRef = useRef(null);
    const frontRef = useRef(null);
    const isLockedRef = useRef(false);

    useEffect(() => {
        const front = frontRef.current;
        const tile = tileRef.current;
        if (!front || !tile) return;

        const normalChar = targetChar === " " ? " " : targetChar.toUpperCase();
        const targetIdx = FLIP_SEQUENCE.indexOf(normalChar);

        // Start blank
        front.textContent = "\u00A0";
        gsap.set(tile, { rotateX: 0 });

        if (targetIdx <= 0) {
            front.textContent = normalChar === " " ? "\u00A0" : normalChar;
            isLockedRef.current = true;
            return;
        }

        let step = 0;
        let killed = false;

        // Recursive sequential flip - each step waits for the previous to finish
        const doFlip = () => {
            if (killed || step > targetIdx) {
                if (!killed) isLockedRef.current = true;
                return;
            }

            const char = FLIP_SEQUENCE[step];

            gsap.to(tile, {
                rotateX: -90,
                duration: 0.022,
                ease: "power2.in",
                onComplete: () => {
                    if (killed) return;
                    front.textContent = char === " " ? "\u00A0" : char;
                    gsap.set(tile, { rotateX: 90 });
                    gsap.to(tile, {
                        rotateX: 0,
                        duration: 0.022,
                        ease: "power2.out",
                        onComplete: () => {
                            if (killed) return;
                            step++;
                            doFlip();
                        }
                    });
                }
            });
        };

        // Wait for Loader to fully exit (~2000ms), then stagger per tile
        // Loader: 1500ms count + 200ms hold + ~800ms slide-out = ~2500ms
        const LOADER_CLEAR_MS = 1900;
        const t = setTimeout(() => {
            if (!killed) doFlip();
        }, LOADER_CLEAR_MS + index * 60);

        return () => {
            killed = true;
            clearTimeout(t);
            gsap.killTweensOf(tile);
        };
    }, []);

    const handleMouseMove = (e) => {
        if (!isLockedRef.current || !tileRef.current) return;
        const rect = tileRef.current.getBoundingClientRect();
        const rX = (((e.clientY - rect.top) / rect.height) - 0.5) * -20;
        const rY = (((e.clientX - rect.left) / rect.width) - 0.5) * 20;
        gsap.to(tileRef.current, { rotateX: rX, rotateY: rY, duration: 0.3, ease: "power2.out", overwrite: true });
    };

    const handleMouseEnter = () => {
        if (!isLockedRef.current || !tileRef.current) return;
        gsap.to(tileRef.current, { scale: 1.06, boxShadow: "4px 4px 0px 0px #000", duration: 0.2, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
        if (!isLockedRef.current || !tileRef.current) return;
        gsap.to(tileRef.current, { rotateX: 0, rotateY: 0, scale: 1, boxShadow: "0px 0px 0px 0px #000", duration: 0.5, ease: "power4.out", overwrite: true });
    };

    return (
        <div
            className="tile-flap"
            data-target={targetChar}
            ref={tileRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <div className="tile-face" ref={frontRef}>&nbsp;</div>
        </div>
    );
};

const Hero = () => {
    const heroGridRef = useRef(null);
    useGSAP(() => {

        // Perspective Zoom on Scroll
        gsap.to(".terrain-canvas", {
            scale: 1.5,
            z: 100,
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }, { scope: heroGridRef });

    return (
        <>
            {/* Fixed Global Brutalist Frame */}
            <div className="fixed inset-0 border border-black pointer-events-none z-50"></div>

            <section className="hero-section relative h-screen w-full bg-[#E5E5E5] overflow-hidden box-border font-mono text-black">
                <style>{`
                    .hero-grid {
                        perspective: 1000px;
                        margin-top: 60px; /* Offset for Navbar */
                    }

                    .hero-grid {
                        perspective: 800px;
                        margin-top: 60px;
                    }

                    .tile-flap {
                        position: relative;
                        width: 100%;
                        aspect-ratio: 1/1;
                        transform-style: preserve-3d;
                        will-change: transform;
                        cursor: pointer;
                    }

                    .tile-face {
                        position: absolute;
                        inset: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #E5E5E5;
                        border: 1px solid #000000;
                        font-family: 'Inter', 'Arial Black', sans-serif;
                        font-weight: 900;
                        font-size: 8vw;
                        color: #000000;
                        box-sizing: border-box;
                        user-select: none;
                        line-height: 1;
                    }

                    @media (max-width: 768px) {
                        .tile-face { font-size: 14vw; }
                        .hero-grid { margin-top: 100px; }
                    }

                    .marquee-container {
                        display: flex;
                        white-space: nowrap;
                        overflow: hidden;
                        width: 100%;
                    }

                    .marquee-content {
                        display: flex;
                        animation: marquee 20s linear infinite;
                    }

                    @keyframes marquee {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }
                `}</style>

                {/* Technical Brutalist Corner UI */}
                <div 
                    className="absolute text-[10px] sm:text-xs font-bold uppercase z-[100] pointer-events-none"
                    style={{ top: '20px', left: '24px', backgroundColor: '#E5E5E5', border: '1px solid #000000', padding: '4px 8px' }}
                >
                    PORTFOLIO_2026 [REF: AMOGH.M]
                </div>
                <div 
                    className="absolute text-[10px] sm:text-xs font-bold uppercase z-[100] pointer-events-none animate-pulse"
                    style={{ top: '20px', right: '24px', backgroundColor: '#E5E5E5', border: '1px solid #000000', padding: '4px 8px' }}
                >
                    ● SYSTEM_READY
                </div>

                {/* Background 3D Wireframe Layer */}
                <div className="terrain-canvas absolute inset-0 z-0 pointer-events-none">
                    <Canvas camera={{ position: [0, 4, 12], fov: 45 }}>
                        <WireframeTerrain />
                    </Canvas>
                </div>

                {/* Hero State (Initial) */}
                <div className="absolute inset-0 flex items-center justify-center z-10 px-4 pointer-events-none">
                    <div
                        ref={heroGridRef}
                        className="hero-grid grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 md:gap-2 w-full max-w-4xl pointer-events-auto"
                    >
                        {letters.map((char, i) => (
                            <MechanicalLetter key={i} targetChar={char} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
