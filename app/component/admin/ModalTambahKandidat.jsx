"use client"

import { useState, useEffect } from "react"

export default function ModalTambahKandidat({ isOpen, onClose }) {
    const [mounted, setMounted] = useState(false)
    const [form, setForm] = useState({ nama: "", kelas: "", visi: "", misi: "" })

    useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => setMounted(true), 50)
            return () => clearTimeout(t)
        } else {
            setMounted(false)
        }
    }, [isOpen])

    const handleClose = () => {
        setMounted(false)
        setTimeout(onClose, 200)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`Kandidat "${form.nama}" berhasil ditambahkan! (data dummy)`)
        setForm({ nama: "", kelas: "", visi: "", misi: "" })
        handleClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div
                onClick={handleClose}
                className={`
                    absolute inset-0 bg-slate-950/80 backdrop-blur-sm
                    transition-opacity duration-300
                    ${mounted ? "opacity-100" : "opacity-0"}
                `}
            />

            <div
                className={`
                    relative w-full max-w-lg
                    bg-slate-900 border border-white/10 rounded-2xl
                    shadow-2xl shadow-black/50
                    transition-all duration-300 ease-out
                    ${mounted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
                `}
            >
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/10">
                    <div>
                        <h3 className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>
                            ＋ Tambah Kandidat
                        </h3>
                        <p className="text-slate-500 text-xs mt-0.5">Isi data kandidat baru</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="relative px-6 py-5 space-y-4">
                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            value={form.nama}
                            onChange={(e) => setForm({ ...form, nama: e.target.value })}
                            placeholder="Masukkan nama kandidat"
                            required
                            className="
                                w-full px-4 py-2.5 rounded-xl
                                bg-white/5 border border-white/10
                                text-white text-sm placeholder-slate-600
                                focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30
                                transition-all duration-200
                            "
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
                            Kelas
                        </label>
                        <input
                            type="text"
                            value={form.kelas}
                            onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                            placeholder="Contoh: XI IPA 1"
                            required
                            className="
                                w-full px-4 py-2.5 rounded-xl
                                bg-white/5 border border-white/10
                                text-white text-sm placeholder-slate-600
                                focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30
                                transition-all duration-200
                            "
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
                            Visi
                        </label>
                        <input
                            type="text"
                            value={form.visi}
                            onChange={(e) => setForm({ ...form, visi: e.target.value })}
                            placeholder="Visi kandidat"
                            required
                            className="
                                w-full px-4 py-2.5 rounded-xl
                                bg-white/5 border border-white/10
                                text-white text-sm placeholder-slate-600
                                focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30
                                transition-all duration-200
                            "
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
                            Misi
                        </label>
                        <textarea
                            value={form.misi}
                            onChange={(e) => setForm({ ...form, misi: e.target.value })}
                            placeholder="Misi kandidat (pisahkan dengan baris baru)"
                            rows={3}
                            required
                            className="
                                w-full px-4 py-2.5 rounded-xl resize-none
                                bg-white/5 border border-white/10
                                text-white text-sm placeholder-slate-600
                                focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30
                                transition-all duration-200
                            "
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="
                                flex-1 py-2.5 rounded-xl
                                bg-white/5 border border-white/10
                                text-slate-400 text-sm font-medium
                                hover:bg-white/10 hover:text-white
                                transition-all duration-200
                            "
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="
                                flex-1 py-2.5 rounded-xl
                                bg-gradient-to-r from-blue-600 to-blue-500
                                hover:from-blue-500 hover:to-cyan-500
                                text-white text-sm font-semibold
                                shadow-lg shadow-blue-600/30
                                hover:-translate-y-0.5 active:scale-[0.98]
                                transition-all duration-200
                            "
                        >
                            Simpan Kandidat
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
