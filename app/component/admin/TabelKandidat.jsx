"use client"

import { useState, useEffect } from "react"

const dataKandidat = [
    { id: 1, nama: "Ahmad Fauzi", kelas: "XI IPA 1", visi: "Membangun OSIS yang inovatif dan inklusif", suara: 145 },
    { id: 2, nama: "Siti Nurhaliza", kelas: "XI IPS 2", visi: "Meningkatkan kreativitas dan prestasi siswa", suara: 120 },
    { id: 3, nama: "Rizky Pratama", kelas: "XII IPA 3", visi: "Mewujudkan sekolah yang berprestasi dan bermartabat", suara: 82 },
]

export default function TabelKandidat({ onTambah }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 300)
        return () => clearTimeout(t)
    }, [])

    return (
        <div
            className={`
                bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden
                transition-all duration-500
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
        >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div>
                    <h2 className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>
                        👥 Daftar Kandidat
                    </h2>
                    <p className="text-slate-500 text-xs mt-1">Kelola kandidat peserta pemilihan</p>
                </div>
                <button
                    onClick={onTambah}
                    className="
                        flex items-center gap-2 px-4 py-2.5 rounded-xl
                        bg-gradient-to-r from-blue-600 to-blue-500
                        hover:from-blue-500 hover:to-cyan-500
                        text-white text-sm font-semibold tracking-wide
                        shadow-lg shadow-blue-600/30
                        hover:-translate-y-0.5 active:scale-[0.98]
                        transition-all duration-200
                    "
                >
                    <span className="text-base">＋</span>
                    Tambah Kandidat
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">No</th>
                            <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Kandidat</th>
                            <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Kelas</th>
                            <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Visi</th>
                            <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-slate-500 font-semibold text-center">Suara</th>
                            <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-slate-500 font-semibold text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataKandidat.map((k, i) => (
                            <tr
                                key={k.id}
                                className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                            >
                                <td className="px-6 py-4">
                                    <span className="w-7 h-7 inline-flex items-center justify-center rounded-lg bg-white/5 text-slate-400 text-xs font-bold">
                                        {k.id}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/40 to-cyan-500/40 flex items-center justify-center text-sm border border-white/10">
                                            👤
                                        </div>
                                        <span className="text-white text-sm font-semibold">{k.nama}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-400 text-sm">{k.kelas}</td>
                                <td className="px-6 py-4 text-slate-400 text-sm max-w-[240px] truncate">{k.visi}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-block bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/20">
                                        {k.suara}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 flex items-center justify-center text-xs transition-all duration-200" title="Edit">
                                            ✏️
                                        </button>
                                        <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 flex items-center justify-center text-xs transition-all duration-200" title="Hapus">
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between">
                <p className="text-slate-500 text-xs">Menampilkan {dataKandidat.length} kandidat</p>
            </div>
        </div>
    )
}
