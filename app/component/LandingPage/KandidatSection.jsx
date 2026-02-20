"use client"

import { useReveal } from "../../hooks/useReveal"
import { kandidat } from "../../lib/data/landingData"
import KandidatCard from "../LandingPage/KandidatCard"
import { motion } from "framer-motion"

export default function KandidatSection() {
    const { ref, visible } = useReveal()

    return (
        <motion.section id="kandidat" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}className="py-24 px-6 md:px-12 bg-slate-900/40">
            <div className="max-w-6xl mx-auto">

                <div ref={ref}>
                    <div
                        className={`
              text-center mb-14
              transition-all duration-700
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
                    >
                        <span className="text-xs uppercase tracking-[0.25em] text-rose-300/70">Kenali Mereka</span>
                        <h2
                            className="text-3xl sm:text-4xl font-bold mt-2 text-white"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            Para Kandidat
                        </h2>
                        <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
                            Pelajari visi, misi, dan program kerja setiap kandidat sebelum menentukan pilihanmu.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {kandidat.map((k, i) => (
                        <KandidatCard key={k.id} k={k} delay={i * 120} />
                    ))}
                </div>

            </div>
        </motion.section>
    )
}