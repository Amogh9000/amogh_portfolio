import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Integrate Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Sync Lenis update with GSAP's ticker for perfectly aligned frame updates
        const rafCallback = (time) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(rafCallback);

        // Disable lag smoothing to prevent jumps during heavy paint tasks
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(rafCallback);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <div id="smooth-wrapper">{children}</div>;
};

export default SmoothScroll;
