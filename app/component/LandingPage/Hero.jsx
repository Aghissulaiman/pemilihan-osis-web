"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Hero() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 60)
        return () => clearTimeout(t)
    }, [])

    const scrollToSection = (id) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <Image
                src="/sekolah.png"
                alt="Sekolah"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/50 to-slate-950" />
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            <div
                className={`
          relative z-10 text-center px-6 max-w-3xl mx-auto
          transition-all duration-1000 ease-out
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        `}
            >
                <div className={`transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    <span className="inline-block text-xs uppercase tracking-[0.25em] text-blue-300/80 border border-blue-400/30 px-4 py-1.5 rounded-full mb-6 bg-blue-500/10">
                        🗳️ &nbsp; Suaramu, Masa Depan Kita
                    </span>
                </div>

                <h1
                    className={`
            text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5
            transition-all duration-700 delay-200
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    Pemilihan Ketua
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        OSIS 2026/2027
                    </span>
                </h1>

                <p
                    className={`
            text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8
            transition-all duration-700 delay-300
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
                >
                    Gunakan hak suaramu untuk memilih pemimpin OSIS yang akan membawa perubahan positif bagi sekolah kita. Satu suara, satu harapan.
                </p>

                <div
                    className={`
        flex flex-col sm:flex-row items-center justify-center gap-3
        transition-all duration-700 delay-400
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
    `}
                >
                    <button
                        onClick={() => scrollToSection("kandidat")}
                        className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-blue-700/40 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Lihat Kandidat →
                    </button>

                    <button
                        onClick={() => scrollToSection("aturan")}
                        className="px-7 py-3 rounded-xl bg-white/8 border border-white/15 hover:bg-white/15 text-white font-medium text-sm tracking-wide transition-all duration-200"
                    >
                        Aturan Voting
                    </button>
                </div>
            </div>
        </section>
    )
}