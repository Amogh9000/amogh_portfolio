let audioCtx = null;

const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
};

export const playClickSound = () => {
    try {
        const ctx = initAudio();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // Soft, organic pop
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
        // Silently fail if audio context is not allowed yet
    }
};
