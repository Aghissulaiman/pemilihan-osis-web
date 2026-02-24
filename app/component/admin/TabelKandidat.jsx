"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { Plus, Pencil, Trash2, X, Image as ImageIcon, Award, Users, Target } from "lucide-react"

export default function KandidatManager() {
    // State untuk data kandidat
    const [kandidat, setKandidat] = useState([])
    const [loading, setLoading] = useState(true)
    const [mounted, setMounted] = useState(false)

    // State untuk modal
    const [modalOpen, setModalOpen] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [modalError, setModalError] = useState("")
    const [editData, setEditData] = useState(null)

    // State untuk delete confirmation
    const [confirmDelete, setConfirmDelete] = useState(null)
    const [deletingId, setDeletingId] = useState(null)

    // State untuk form
    const [form, setForm] = useState({
        no_kandidat: "",
        nama: "",
        kelas: "",
        visi: "",
        misi: "",
        foto: "",
    })

    // Animation mount
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 300)
        return () => clearTimeout(t)
    }, [])

    // Fetch data kandidat
    const fetchKandidat = useCallback(async () => {
        setLoading(true)

        // Fetch kandidat
        const { data, error } = await supabase
            .from("kandidat")
            .select("*")
            .order("no_kandidat", { ascending: true })

        if (error) {
            console.error("Error fetching kandidat:", error)
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
        fetchKandidat()
    }, [fetchKandidat])

    // Handle form input
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    // Open modal for add
    const handleTambah = () => {
        setEditData(null)
        setForm({
            no_kandidat: "",
            nama: "",
            kelas: "",
            visi: "",
            misi: "",
            foto: "",
        })
        setModalError("")
        setModalOpen(true)
    }

    // Open modal for edit
    const handleEdit = (kandidat) => {
        setEditData(kandidat)
        setForm({
            no_kandidat: kandidat.no_kandidat ?? "",
            nama: kandidat.nama ?? "",
            kelas: kandidat.kelas ?? "",
            visi: kandidat.visi ?? "",
            misi: Array.isArray(kandidat.misi)
                ? kandidat.misi.join("\n")
                : kandidat.misi ?? "",
            foto: kandidat.foto ?? "",
        })
        setModalError("")
        setModalOpen(true)
    }

    // Close modal
    const handleCloseModal = () => {
        setModalOpen(false)
        setEditData(null)
        setModalError("")
    }

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault()
        setModalLoading(true)
        setModalError("")

        const payload = {
            no_kandidat: Number(form.no_kandidat),
            nama: form.nama.trim(),
            kelas: form.kelas.trim(),
            visi: form.visi.trim(),
            misi: form.misi.trim(),
            foto: form.foto.trim() || null,
        }

        let error = null

        if (editData) {
            // UPDATE
            const { error: updateErr } = await supabase
                .from("kandidat")
                .update(payload)
                .eq("id", editData.id)
            error = updateErr
        } else {
            // INSERT
            const { error: insertErr } = await supabase
                .from("kandidat")
                .insert(payload)
            error = insertErr
        }

        setModalLoading(false)

        if (error) {
            setModalError(error.message || "Gagal menyimpan data kandidat.")
            return
        }

        fetchKandidat()
        handleCloseModal()
    }

    // Handle delete
    const handleHapus = async (id) => {
        setDeletingId(id)
        const { error } = await supabase.from("kandidat").delete().eq("id", id)
        if (!error) {
            setKandidat(prev => prev.filter(k => k.id !== id))
        }
        setDeletingId(null)
        setConfirmDelete(null)
    }

    // Format misi untuk tampilan
    const formatMisi = (misi) => {
        if (!misi) return []
        if (Array.isArray(misi)) return misi
        return misi.split('\n').filter(item => item.trim() !== '')
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

            {/* Modal Tambah/Edit Kandidat */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        onClick={handleCloseModal}
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
                    />

                    {/* Modal */}
                    <div className="relative w-full max-w-lg bg-white border border-gray-100 rounded-2xl shadow-xl transition-all duration-300">
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
                                onClick={handleCloseModal}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all duration-200"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {modalError && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                                    {modalError}
                                </div>
                            )}

                            {/* No Kandidat */}
                            <div>
                                <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                                    No. Kandidat
                                </label>
                                <input
                                    type="number"
                                    name="no_kandidat"
                                    value={form.no_kandidat}
                                    onChange={handleInputChange}
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
                                    name="nama"
                                    value={form.nama}
                                    onChange={handleInputChange}
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
                                    name="kelas"
                                    value={form.kelas}
                                    onChange={handleInputChange}
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
                                    name="visi"
                                    value={form.visi}
                                    onChange={handleInputChange}
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
                                    name="misi"
                                    value={form.misi}
                                    onChange={handleInputChange}
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
                                    name="foto"
                                    value={form.foto}
                                    onChange={handleInputChange}
                                    placeholder="https://..."
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-all duration-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={modalLoading}
                                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {modalLoading ? "Menyimpan..." : editData ? "Simpan Perubahan" : "Simpan Kandidat"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div
                className={`
                    transition-all duration-500
                    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-gray-900 font-bold text-xl flex items-center gap-2">
                            <Award className="w-6 h-6 text-blue-500" />
                            Manajemen Kandidat
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Kelola kandidat peserta pemilihan OSIS</p>
                    </div>
                    <button
                        onClick={handleTambah}
                        className="
                            flex items-center gap-2 px-5 py-2.5 rounded-xl
                            bg-gradient-to-r from-blue-600 to-blue-500
                            hover:from-blue-700 hover:to-blue-600
                            text-white text-sm font-semibold
                            shadow-lg shadow-blue-200
                            hover:-translate-y-0.5 active:scale-[0.98]
                            transition-all duration-200
                        "
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Kandidat
                    </button>
                </div>

                {/* Grid Cards */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100">
                        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                        <span className="mt-4 text-gray-400 text-sm">Memuat data kandidat...</span>
                    </div>
                ) : kandidat.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Users className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-gray-400 text-sm mb-4">Belum ada kandidat</p>
                        <button
                            onClick={handleTambah}
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            Tambah Kandidat Pertama
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {kandidat.map((k, index) => {
                            const misiList = formatMisi(k.misi)
                            return (
                                <div
                                    key={k.id}
                                    className="
                                        group bg-white rounded-2xl border border-gray-100 
                                        hover:border-blue-200 hover:shadow-xl 
                                        transition-all duration-300 overflow-hidden
                                    "
                                >
                                    {/* Header Card dengan Foto */}
                                    <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-400 p-5">
                                        {/* Nomor Kandidat */}
                                        <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white font-bold text-sm border border-white/30">
                                            #{k.no_kandidat}
                                        </div>
                                        
                                        {/* Foto Kandidat */}
                                        <div className="absolute -bottom-8 left-5">
                                            <div className="w-20 h-20 rounded-xl bg-white border-4 border-white shadow-lg overflow-hidden">
                                                {k.foto ? (
                                                    <img 
                                                        src={k.foto} 
                                                        alt={k.nama}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.onerror = null
                                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(k.nama)}&background=3b82f6&color=fff&size=80`
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center text-white text-2xl font-bold">
                                                        {k.nama?.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="pt-12 p-5">
                                        {/* Nama dan Kelas */}
                                        <h3 className="text-gray-900 font-bold text-lg mb-1">{k.nama}</h3>
                                        <p className="text-gray-500 text-sm mb-4">{k.kelas}</p>

                                        {/* Visi */}
                                        <div className="mb-4">
                                            <div className="flex items-center gap-1.5 mb-2">
                                                <Target className="w-4 h-4 text-blue-500" />
                                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Visi</span>
                                            </div>
                                            <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">
                                                {k.visi}
                                            </p>
                                        </div>

                                        {/* Misi (max 2 baris) */}
                                        <div className="mb-4">
                                            <div className="flex items-center gap-1.5 mb-2">
                                                <Award className="w-4 h-4 text-purple-500" />
                                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Misi</span>
                                            </div>
                                            <ul className="space-y-1">
                                                {misiList.slice(0, 2).map((item, i) => (
                                                    <li key={i} className="text-gray-500 text-sm flex items-start gap-2">
                                                        <span className="text-purple-400 mt-1">•</span>
                                                        <span className="flex-1 line-clamp-1">{item}</span>
                                                    </li>
                                                ))}
                                                {misiList.length > 2 && (
                                                    <li className="text-gray-400 text-xs">+{misiList.length - 2} misi lainnya</li>
                                                )}
                                            </ul>
                                        </div>

                                        {/* Footer Card */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            {/* Suara */}
                                            <div className="flex items-center gap-2">
                                                <div className="px-3 py-1.5 bg-blue-50 rounded-lg">
                                                    <span className="text-blue-600 font-bold text-sm">{k.vote_count}</span>
                                                    <span className="text-blue-400 text-xs ml-1">suara</span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(k)}
                                                    className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 border border-gray-100 flex items-center justify-center transition-all duration-200"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setConfirmDelete(k.id)}
                                                    disabled={deletingId === k.id}
                                                    className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-100 flex items-center justify-center transition-all duration-200 disabled:opacity-50"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-gray-400 text-sm">
                        Menampilkan <span className="font-medium text-gray-600">{kandidat.length}</span> kandidat
                    </p>
                    <p className="text-gray-400 text-xs">
                        Total suara: <span className="font-medium text-gray-600">
                            {kandidat.reduce((acc, k) => acc + k.vote_count, 0)}
                        </span>
                    </p>
                </div>
            </div>
        </>
    )
}