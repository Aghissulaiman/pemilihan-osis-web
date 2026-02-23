"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function ModalTambahKandidat({ isOpen, onClose, onSuccess, editData }) {
    const [mounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        no_kandidat: "",
        nama: "",
        kelas: "",
        visi: "",
        misi: "",
        foto: "",
    })

    // Isi form kalau mode edit
    useEffect(() => {
        if (editData) {
            setForm({
                no_kandidat: editData.no_kandidat ?? "",
                nama: editData.nama ?? "",
                kelas: editData.kelas ?? "",
                visi: editData.visi ?? "",
                misi: Array.isArray(editData.misi)
                    ? editData.misi.join("\n")
                    : editData.misi ?? "",
                foto: editData.foto ?? "",
            })
        } else {
            setForm({ no_kandidat: "", nama: "", kelas: "", visi: "", misi: "", foto: "" })
        }
        setError("")
    }, [editData, isOpen])

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
        setError("")
        setTimeout(onClose, 200)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const payload = {
            no_kandidat: Number(form.no_kandidat),
            nama: form.nama.trim(),
            kelas: form.kelas.trim(),
            visi: form.visi.trim(),
            misi: form.misi.trim(),
            foto: form.foto.trim() || null,
        }

        let err = null

        if (editData) {
            // UPDATE
            const { error: updateErr } = await supabase
                .from("kandidat")
                .update(payload)
                .eq("id", editData.id)
            err = updateErr
        } else {
            // INSERT
            const { error: insertErr } = await supabase
                .from("kandidat")
                .insert(payload)
            err = insertErr
        }

        setLoading(false)

        if (err) {
            setError(err.message || "Gagal menyimpan data kandidat.")
            return
        }

        if (onSuccess) onSuccess()
        handleClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                onClick={handleClose}
                className={`
                    absolute inset-0 bg-black/30 backdrop-blur-sm
                    transition-opacity duration-300
                    ${mounted ? "opacity-100" : "opacity-0"}
                `}
            />

            {/* Modal */}
            <div
                className={`
                    relative w-full max-w-lg
                    bg-white border border-gray-100 rounded-2xl
                    shadow-xl
                    transition-all duration-300 ease-out
                    ${mounted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div>
                        <h3 className="text-gray-900 font-bold text-lg">
                            {editData ? "✏️ Edit Kandidat" : "＋ Tambah Kandidat"}
                        </h3>
                        <p className="text-gray-400 text-xs mt-0.5">
                            {editData ? "Ubah data kandidat" : "Isi data kandidat baru"}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all duration-200"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* No Kandidat */}
                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                            No. Kandidat
                        </label>
                        <input
                            type="number"
                            value={form.no_kandidat}
                            onChange={(e) => setForm({ ...form, no_kandidat: e.target.value })}
                            placeholder="Contoh: 1"
                            required
                            min={1}
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        />
                    </div>

                    {/* Nama */}
                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            value={form.nama}
                            onChange={(e) => setForm({ ...form, nama: e.target.value })}
                            placeholder="Masukkan nama kandidat"
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        />
                    </div>

                    {/* Kelas */}
                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                            Kelas
                        </label>
                        <input
                            type="text"
                            value={form.kelas}
                            onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                            placeholder="Contoh: XI IPA 1"
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        />
                    </div>

                    {/* Visi */}
                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                            Visi
                        </label>
                        <input
                            type="text"
                            value={form.visi}
                            onChange={(e) => setForm({ ...form, visi: e.target.value })}
                            placeholder="Visi kandidat"
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        />
                    </div>

                    {/* Misi */}
                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                            Misi
                        </label>
                        <textarea
                            value={form.misi}
                            onChange={(e) => setForm({ ...form, misi: e.target.value })}
                            placeholder="Misi kandidat (pisahkan dengan baris baru)"
                            rows={3}
                            required
                            className="w-full px-4 py-2.5 rounded-xl resize-none bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        />
                        <p className="text-gray-400 text-[10px] mt-1">Pisahkan tiap misi dengan Enter</p>
                    </div>

                    {/* Foto URL (opsional) */}
                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                            URL Foto <span className="text-gray-300">(opsional)</span>
                        </label>
                        <input
                            type="text"
                            value={form.foto}
                            onChange={(e) => setForm({ ...form, foto: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-all duration-200"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Menyimpan..." : editData ? "Simpan Perubahan" : "Simpan Kandidat"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
