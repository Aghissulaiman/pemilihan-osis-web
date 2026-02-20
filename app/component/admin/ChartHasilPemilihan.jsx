"use client"

import { useState, useEffect } from "react"

const dataKandidat = [
    { nama: "Ahmad Fauzi", kelas: "XI IPA 1", suara: 145, warna: "from-blue-500 to-cyan-400", bg: "bg-blue-500" },
    { nama: "Siti Nurhaliza", kelas: "XI IPS 2", suara: 120, warna: "from-violet-500 to-purple-400", bg: "bg-violet-500" },
    { nama: "Rizky Pratama", kelas: "XII IPA 3", suara: 82, warna: "from-amber-500 to-orange-400", bg: "bg-amber-500" },
]

export default function ChartHasilPemilihan() {
    const [mounted, setMounted] = useState(false)
    const [animated, setAnimated] = useState(false)

    const totalSuara = dataKandidat.reduce((sum, k) => sum + k.suara, 0)
    const maxSuara = Math.max(...dataKandidat.map((k) => k.suara))

    useEffect(() => {
        const t1 = setTimeout(() => setMounted(true), 200)
        const t2 = setTimeout(() => setAnimated(true), 600)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [])

    return (
        <div
            className={`
                bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6
                transition-all duration-500
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>
                        📊 Hasil Pemilihan
                    </h2>
                    <p className="text-slate-500 text-xs mt-1">Real-time perolehan suara kandidat</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    Live
                </span>
            </div>

            <div className="space-y-5">
                {dataKandidat.map((k, i) => {
                    const persen = Math.round((k.suara / totalSuara) * 100)
                    const barWidth = (k.suara / maxSuara) * 100

                    return (
                        <div key={i} className="group">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${k.warna} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold">{k.nama}</p>
                                        <p className="text-slate-500 text-[11px]">{k.kelas}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-white font-bold text-lg">{k.suara}</span>
                                    <span className="text-slate-500 text-xs ml-1">suara</span>
                                    <p className="text-slate-500 text-[11px]">{persen}%</p>
                                </div>
                            </div>

                            <div className="relative h-8 bg-white/5 rounded-xl overflow-hidden">
                                <div
                                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${k.warna} rounded-xl transition-all duration-1000 ease-out`}
                                    style={{ width: animated ? `${barWidth}%` : "0%" }}
                                />
                                <div
                                    className={`absolute inset-y-0 left-0 rounded-xl overflow-hidden transition-all duration-1000 ease-out`}
                                    style={{ width: animated ? `${barWidth}%` : "0%" }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <p className="text-slate-500 text-xs">Total suara masuk</p>
                <p className="text-white font-bold text-xl" style={{ fontFamily: "Georgia, serif" }}>{totalSuara}</p>
            </div>
        </div>
    )
}
