"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"

export default function TabelKandidat({ onTambah, onEdit, refreshKey }) {
    const [mounted, setMounted] = useState(false)
    const [kandidat, setKandidat] = useState([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(null)

    const fetchKandidat = useCallback(async () => {
        setLoading(true)

        // Fetch kandidat
        const { data, error } = await supabase
            .from("kandidat")
            .select("*")
            .order("no_kandidat", { ascending: true })

        if (error) {
            setLoading(false)
            return
        }

        // Fetch votes untuk hitung suara per kandidat
        const { data: votesData } = await supabase
            .from("votes")
            .select("kandidat_id")

        // Hitung suara per kandidat
        const suaraMap = {}
        votesData?.forEach(v => {
            suaraMap[v.kandidat_id] = (suaraMap[v.kandidat_id] ?? 0) + 1
        })

        // Merge suara ke data kandidat
        const kandidatWithVotes = (data || []).map(k => ({
            ...k,
            vote_count: suaraMap[k.id] ?? 0,
        }))

        setKandidat(kandidatWithVotes)
        setLoading(false)
    }, [])

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 300)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        fetchKandidat()
    }, [fetchKandidat, refreshKey])

    const handleHapus = async (id) => {
        setDeletingId(id)
        const { error } = await supabase.from("kandidat").delete().eq("id", id)
        if (!error) {
            setKandidat(prev => prev.filter(k => k.id !== id))
        }
        setDeletingId(null)
        setConfirmDelete(null)
    }

    return (
        <>
            {/* Modal Konfirmasi Hapus */}
            {confirmDelete !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={() => setConfirmDelete(null)}
                    />
                    <div className="relative bg-white border border-gray-100 rounded-2xl shadow-xl p-6 w-full max-w-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-xl">
                                🗑️
                            </div>
                            <h3 className="text-gray-900 font-bold text-base">Hapus Kandidat?</h3>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">
                            Data kandidat{" "}
                            <span className="text-gray-900 font-semibold">
                                {kandidat.find(k => k.id === confirmDelete)?.nama}
                            </span>{" "}
                            akan dihapus permanen dan tidak bisa dikembalikan.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-all duration-200"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => handleHapus(confirmDelete)}
                                disabled={deletingId === confirmDelete}
                                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {deletingId === confirmDelete ? "Menghapus..." : "Ya, Hapus"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`
                    bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm
                    transition-all duration-500
                    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div>
                        <h2 className="text-gray-900 font-bold text-lg">👥 Daftar Kandidat</h2>
                        <p className="text-gray-500 text-xs mt-1">Kelola kandidat peserta pemilihan</p>
                    </div>
                    <button
                        onClick={onTambah}
                        className="
                            flex items-center gap-2 px-4 py-2.5 rounded-xl
                            bg-blue-600 hover:bg-blue-700
                            text-white text-sm font-semibold
                            shadow-sm shadow-blue-200
                            hover:-translate-y-0.5 active:scale-[0.98]
                            transition-all duration-200
                        "
                    >
                        <span className="text-base">＋</span>
                        Tambah Kandidat
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                            <span className="ml-3 text-gray-400 text-sm">Memuat data...</span>
                        </div>
                    ) : kandidat.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                            <span className="text-4xl mb-3">👥</span>
                            <p className="text-sm">Belum ada kandidat. Tambahkan kandidat baru.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">No</th>
                                    <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Kandidat</th>
                                    <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Kelas</th>
                                    <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Visi</th>
                                    <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold text-center">Suara</th>
                                    <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kandidat.map((k) => (
                                    <tr
                                        key={k.id}
                                        className="border-b border-gray-50 hover:bg-blue-50/50 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="w-7 h-7 inline-flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                                                {k.no_kandidat}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center text-white text-sm font-bold shadow-sm overflow-hidden">
                                                    {k.foto ? (
                                                        <img src={k.foto} alt={k.nama} className="w-full h-full object-cover" />
                                                    ) : (
                                                        k.nama?.charAt(0)
                                                    )}
                                                </div>
                                                <span className="text-gray-900 text-sm font-semibold">{k.nama}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">{k.kelas}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm max-w-[240px] truncate">{k.visi}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                                                {k.vote_count}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => onEdit && onEdit(k)}
                                                    className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 border border-gray-100 flex items-center justify-center text-xs transition-all duration-200"
                                                    title="Edit"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => setConfirmDelete(k.id)}
                                                    disabled={deletingId === k.id}
                                                    className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-100 flex items-center justify-center text-xs transition-all duration-200 disabled:opacity-50"
                                                    title="Hapus"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <p className="text-gray-400 text-xs">Menampilkan {kandidat.length} kandidat</p>
                </div>
            </div>
        </>
    )
}
