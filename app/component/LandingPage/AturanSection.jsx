"use client"

import { useReveal } from "../../hooks/useReveal"
import { aturan } from "../../lib/data/landingData"
import { motion } from "framer-motion"

export default function AturanSection() {
    const { ref, visible } = useReveal()

    return (
        <motion.section id="aturan" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
            <div ref={ref}>
                <div
                    className={`
            text-center mb-14
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
                >
                    <span className="text-xs uppercase tracking-[0.25em] text-blue-300/70">Panduan</span>
                    <h2
                        className="text-3xl sm:text-4xl font-bold mt-2 text-white"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        Aturan Pemilihan
                    </h2>
                    <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
                        Harap baca dan pahami seluruh ketentuan berikut sebelum melakukan voting.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {aturan.map((a, i) => (
                        <div
                            key={i}
                            className={`
                bg-white/5 border border-white/10 rounded-xl p-5
                hover:border-blue-500/30 hover:bg-white/8
                transition-all duration-500
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
                            style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
                        >
                            <div className="text-2xl mb-3">{a.icon}</div>
                            <h3 className="text-white font-semibold text-sm mb-1.5">{a.judul}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{a.isi}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}