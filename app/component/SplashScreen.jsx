"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

function generateBubbles(count) {
    return Array.from({ length: count }, (_, i) => ({
        size:  6  + ((i * 137.508 + 42) % 100) / 100 * 14,
        left:  5  + ((i * 73.1   + 17) % 100) / 100 * 90,
        dur:   5  + ((i * 51.3   + 88) % 100) / 100 * 6,
        delay: ((i * 29.7 + 5) % 100) / 100 * 7,
        drift: (((i * 61.8 + 33) % 100) / 100 - 0.5) * 60,
        alpha: 0.2 + ((i * 137.508 + 42) % 100) / 100 * 0.35,
    }));
}

export default function SplashScreen({ isVisible, onExitComplete }) {
    const bubbles = useMemo(() => generateBubbles(22), []);

    return (
        <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
            {isVisible && (
                <motion.div
                    key="splash"
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
                    style={{
                        background: "linear-gradient(150deg, #38bdf8 0%, #3b82f6 35%, #2563eb 70%, #1d4ed8 100%)",
                    }}
                    exit={{
                        y: "-100%",
                        borderBottomLeftRadius: "60%",
                        borderBottomRightRadius: "60%",
                        transition: { duration: 1.3, ease: [0.45, 0, 0.55, 1] },
                    }}
                >
                    {/* Glow */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{ opacity: [0.3, 0.55, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{
                            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 65%)",
                        }}
                    />

                    {/* Bubbles */}
                    {bubbles.map((b, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                width: b.size, height: b.size,
                                left: `${b.left}%`, bottom: -20,
                                background: `rgba(255,255,255,${b.alpha})`,
                                boxShadow: `0 0 ${b.size}px rgba(255,255,255,${b.alpha})`,
                            }}
                            animate={{ y: [0, -1000], x: [0, b.drift], opacity: [0, b.alpha * 2, 0] }}
                            transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
                        />
                    ))}

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                        className="relative flex flex-col items-center gap-3 text-center px-6"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            style={{ fontSize: "2rem", filter: "drop-shadow(0 0 10px rgba(255,255,255,0.8))" }}
                        >
                            ✦
                        </motion.div>

                        <div>
                            <h1 style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: "clamp(2rem, 8vw, 3.8rem)",
                                fontWeight: 900,
                                color: "#fff",
                                letterSpacing: "0.1em",
                                lineHeight: 1.1,
                                textShadow: "0 0 40px rgba(255,255,255,0.5)",
                            }}>
                                PEMILIHAN
                            </h1>
                            <h1 style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: "clamp(2.8rem, 11vw, 5.2rem)",
                                fontWeight: 900,
                                color: "#fff",
                                letterSpacing: "0.2em",
                                lineHeight: 1,
                                textShadow: "0 0 50px rgba(255,255,255,0.6), 0 0 90px rgba(186,230,253,0.4)",
                            }}>
                                OSIS
                            </h1>
                        </div>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.6, duration: 0.7 }}
                            style={{
                                height: "1px", width: "160px",
                                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.7), transparent)",
                            }}
                        />

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.7 }}
                            style={{
                                fontFamily: "monospace",
                                fontSize: "0.72rem",
                                letterSpacing: "0.28em",
                                color: "rgba(224,242,254,0.9)",
                                textTransform: "uppercase",
                            }}
                        >
                            SMK TARUNA BHAKTI
                        </motion.p>

                        {/* Loading dots */}
                        <div className="flex gap-2 mt-1">
                            {[0, 0.18, 0.36].map((delay, i) => (
                                <motion.div
                                    key={i}
                                    className="rounded-full"
                                    style={{ width: 6, height: 6, background: "rgba(255,255,255,0.85)" }}
                                    animate={{ y: [0, -7, 0], opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 0.9, delay, repeat: Infinity }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}