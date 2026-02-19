"use client"

import { useState } from "react"
import { useReveal } from "../../hooks/useReveal"

export default function KandidatCard({ k, delay }) {
    const [buka, setBuka] = useState(false)
    const { ref, visible } = useReveal()

    return (
        <div
            ref={ref}
            className={`
        flex flex-col
        bg-white/5 border border-white/10 rounded-2xl overflow-hidden
        hover:border-white/25 hover:-translate-y-1
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
            style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
        >
            {/* Color top bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${k.warna}`} />

            {/* Photo area */}
            <div className="relative w-full h-52 bg-slate-800/60 flex items-center justify-center overflow-hidden">
                {/* Ganti dengan <Image src={k.foto} fill className="object-cover" alt={k.nama} /> jika foto tersedia */}
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${k.warna} flex items-center justify-center shadow-xl`}>
                    <span className="text-4xl">👤</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 p-5 gap-3">

                {/* Badge + Nama + Kelas */}
                <div>
                    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${k.badge}`}>
                        Kandidat {k.id}
                    </span>
                    <h3
                        className="text-white font-bold text-lg mt-2 leading-tight"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        {k.nama}
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">{k.kelas}</p>
                </div>

                {/* Visi */}
                <div>
                    <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-1">Visi</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{k.visi}</p>
                </div>

                {/* Misi toggle */}
                <div>
                    <button
                        onClick={() => setBuka(!buka)}
                        className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-slate-400 hover:text-white transition mb-2"
                    >
                        <span className={`transition-transform duration-200 ${buka ? "rotate-90" : ""}`}>▶</span>
                        Misi {buka ? "(tutup)" : "(lihat)"}
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ${buka ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                        <ul className="space-y-1.5">
                            {k.misi.map((m, i) => (
                                <li key={i} className="flex gap-2 text-sm text-slate-300">
                                    <span className="text-slate-500 mt-0.5 shrink-0">→</span>
                                    {m}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Tombol Pilih */}
                <button
                    className={`
            mt-auto w-full py-2.5 rounded-xl text-sm font-semibold tracking-wide text-white
            ${k.warnaBtn} active:scale-[0.98]
            shadow-lg transition-all duration-200 hover:-translate-y-0.5
          `}
                >
                    Pilih Kandidat {k.id} →
                </button>

            </div>
        </div>
    )
}