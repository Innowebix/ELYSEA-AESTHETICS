"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

type SoundContextValue = {
    enabled: boolean;
    ready: boolean;
    toggle: () => void;
    chime: (note?: number) => void;
};

const SoundContext = createContext<SoundContextValue>({
    enabled: false,
    ready: false,
    toggle: () => { },
    chime: () => { },
});

export const useSound = () => useContext(SoundContext);

type Engine = {
    ctx: AudioContext;
    master: GainNode;
    nodes: AudioScheduledSourceNode[];
};

function buildEngine(): Engine | null {
    const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
    if (!Ctor) return null;

    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);

    const nodes: AudioScheduledSourceNode[] = [];

    const pad = ctx.createGain();
    pad.gain.value = 0.5;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 720;
    lp.Q.value = 0.6;
    pad.connect(lp);
    lp.connect(master);

    [110, 164.81, 220.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 2 ? "triangle" : "sine";
        osc.frequency.value = freq;
        osc.detune.value = i * 4 - 4;
        const g = ctx.createGain();
        g.gain.value = i === 2 ? 0.16 : 0.3;
        osc.connect(g);
        g.connect(pad);
        osc.start();
        nodes.push(osc);
    });

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.055;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.22;
    lfo.connect(lfoGain);
    lfoGain.connect(pad.gain);
    lfo.start();
    nodes.push(lfo);

    const frames = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < frames; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.2;
    }
    const air = ctx.createBufferSource();
    air.buffer = buffer;
    air.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 900;
    bp.Q.value = 0.7;
    const airGain = ctx.createGain();
    airGain.gain.value = 0.05;
    air.connect(bp);
    bp.connect(airGain);
    airGain.connect(master);
    air.start();
    nodes.push(air);

    return { ctx, master, nodes };
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [enabled, setEnabled] = useState(true);
    const [ready, setReady] = useState(false);
    const engineRef = useRef<Engine | null>(null);
    const enabledRef = useRef(true);

    useEffect(() => {
        enabledRef.current = enabled;
    }, [enabled]);

    useEffect(() => {
        const unlock = () => {
            if (!engineRef.current) {
                const engine = buildEngine();
                if (!engine) return;
                engineRef.current = engine;
                setReady(true);
            }
            const engine = engineRef.current;
            if (!engine) return;
            if (engine.ctx.state === "suspended") void engine.ctx.resume();
            const target = enabledRef.current ? 0.05 : 0.0001;
            engine.master.gain.cancelScheduledValues(engine.ctx.currentTime);
            engine.master.gain.setTargetAtTime(target, engine.ctx.currentTime, 0.8);
        };

        window.addEventListener("pointerdown", unlock, { passive: true });
        window.addEventListener("keydown", unlock);
        return () => {
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
        };
    }, []);

    useEffect(() => {
        return () => {
            const engine = engineRef.current;
            engineRef.current = null;
            if (!engine) return;
            engine.nodes.forEach((n) => {
                try {
                    n.stop();
                } catch { }
            });
            void engine.ctx.close();
        };
    }, []);

    const toggle = useCallback(() => {
        setEnabled((prev) => {
            const next = !prev;
            enabledRef.current = next;
            const engine = engineRef.current;
            if (engine) {
                if (next && engine.ctx.state === "suspended") void engine.ctx.resume();
                engine.master.gain.cancelScheduledValues(engine.ctx.currentTime);
                engine.master.gain.setTargetAtTime(
                    next ? 0.05 : 0.0001,
                    engine.ctx.currentTime,
                    0.35
                );
            }
            return next;
        });
    }, []);

    const chime = useCallback((note = 659.25) => {
        const engine = engineRef.current;
        if (!engine || !enabledRef.current || engine.ctx.state !== "running") return;
        const t = engine.ctx.currentTime;
        const osc = engine.ctx.createOscillator();
        const g = engine.ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = note;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.16, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
        osc.connect(g);
        g.connect(engine.master);
        osc.start(t);
        osc.stop(t + 2.3);
    }, []);

    return (
        <SoundContext.Provider value={{ enabled, ready, toggle, chime }}>
            {children}
        </SoundContext.Provider>
    );
}

export function SoundControl({ tone = "dark" }: { tone?: "dark" | "light" }) {
    const { enabled, ready, toggle } = useSound();
    const live = enabled && ready;
    return (
        <button
            type="button"
            onClick={toggle}
            aria-pressed={enabled}
            aria-label={enabled ? "Mute clinic ambience" : "Play clinic ambience"}
            title={enabled ? "Ambience on — click to mute" : "Ambience muted — click to play"}
            className={
                "group flex h-10 items-center gap-2 rounded-full border px-3 transition-colors " +
                (tone === "light"
                    ? "border-cream/25 text-cream hover:border-gild"
                    : "border-plum/20 text-plum hover:border-copper")
            }
        >
            <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                    <span
                        key={i}
                        className={
                            "w-[2px] rounded-full transition-all duration-300 " +
                            (live ? "sound-bar bg-copper" : "h-[3px] bg-current opacity-40")
                        }
                        style={live ? { animationDelay: `${i * 0.18}s` } : undefined}
                    />
                ))}
            </span>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.18em] sm:inline">
                {enabled ? (ready ? "Ambience" : "Tap for sound") : "Muted"}
            </span>
        </button>
    );
}