"use client"

import { useState, useEffect } from "react"

const dataUsers = [
    { id: 1, nama: "Andi Saputra", kelas: "XI RPL 1", memilih: "Ahmad Fauzi" },
    { id: 2, nama: "Dewi Lestari", kelas: "XI IPA 2", memilih: "Siti Nurhaliza" },
    { id: 3, nama: "Rafi Maulana", kelas: "XII TKJ 1", memilih: null },
]

export default function UsersTable() {
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
            <div className="px-6 py-5 border-b border-white/10">
                <h2 className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>
                    🧑‍🎓 Data Users & Pilihan
                </h2>
                <p className="text-slate-500 text-xs mt-1">
                    Daftar siswa dan kandidat yang dipilih
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="px-6 py-3 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">No</th>
                            <th className="px-6 py-3 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Nama</th>
                            <th className="px-6 py-3 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Kelas</th>
                            <th className="px-6 py-3 text-[11px] uppercase tracking-wider text-slate-500 font-semibold text-center">Pilihan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataUsers.map((u) => (
                            <tr
                                key={u.id}
                                className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                            >
                                <td className="px-6 py-4 text-slate-400 text-sm">{u.id}</td>
                                <td className="px-6 py-4 text-white text-sm font-semibold">{u.nama}</td>
                                <td className="px-6 py-4 text-slate-400 text-sm">{u.kelas}</td>
                                <td className="px-6 py-4 text-center">
                                    {u.memilih ? (
                                        <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                                            {u.memilih}
                                        </span>
                                    ) : (
                                        <span className="inline-block bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/20">
                                            Belum Memilih
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between">
                <p className="text-slate-500 text-xs">
                    Menampilkan {dataUsers.length} users
                </p>
            </div>
        </div>
    )
}