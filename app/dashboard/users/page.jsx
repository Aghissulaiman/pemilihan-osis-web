"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Plus, Pencil, Trash2, X, Search, UserPlus, AlertCircle, Users, GraduationCap, UserCog } from "lucide-react"

export default function UsersTable() {
    const [mounted, setMounted] = useState(false)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("semua") // semua, siswa, guru, admin
    
    // State untuk modal
    const [modalOpen, setModalOpen] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [modalError, setModalError] = useState("")
    const [editData, setEditData] = useState(null)
    
    // State untuk form
    const [form, setForm] = useState({
        username: "",
        nisn: "",
        nipd: "",
        role: "siswa"
    })
    
    // State untuk delete confirmation
    const [confirmDelete, setConfirmDelete] = useState(null)
    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 300)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        
        const { data: usersData, error: usersError } = await supabase
            .from("users")
            .select("id, username, nisn, nipd, role, created_at")
            .order("created_at", { ascending: true })

        if (usersError) {
            console.error("Error fetching users:", usersError)
            setLoading(false)
            return
        }

        const { data: votesData } = await supabase
            .from("votes")
            .select("user_id")

        const votedUserIds = new Set(votesData?.map(v => v.user_id) ?? [])

        const merged = (usersData || []).map(u => ({
            ...u,
            sudahVote: votedUserIds.has(u.id),
        }))

        setUsers(merged)
        setLoading(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleTambah = () => {
        setEditData(null)
        setForm({
            username: "",
            nisn: "",
            nipd: "",
            role: "siswa"
        })
        setModalError("")
        setModalOpen(true)
    }

    const handleEdit = (user) => {
        setEditData(user)
        setForm({
            username: user.username || "",
            nisn: user.nisn || "",
            nipd: user.nipd || "",
            role: user.role || "siswa"
        })
        setModalError("")
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setEditData(null)
        setModalError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setModalLoading(true)
        setModalError("")

        if (!form.username.trim()) {
            setModalError("Username tidak boleh kosong")
            setModalLoading(false)
            return
        }

        if (form.role === "siswa" && !form.nisn.trim()) {
            setModalError("NISN wajib diisi untuk role siswa")
            setModalLoading(false)
            return
        }

        if (form.role === "guru" && !form.nipd.trim()) {
            setModalError("NIPD wajib diisi untuk role guru")
            setModalLoading(false)
            return
        }

        const payload = {
            username: form.username.trim(),
            role: form.role,
            ...(form.role === "siswa" ? { nisn: form.nisn.trim(), nipd: null } : {}),
            ...(form.role === "guru" ? { nipd: form.nipd.trim(), nisn: null } : {}),
            ...(form.role === "admin" ? { nisn: null, nipd: null } : {})
        }

        let error = null

        if (editData) {
            const { error: updateErr } = await supabase
                .from("users")
                .update(payload)
                .eq("id", editData.id)
            error = updateErr
        } else {
            const { error: insertErr } = await supabase
                .from("users")
                .insert(payload)
            error = insertErr
        }

        setModalLoading(false)

        if (error) {
            if (error.code === '23505') {
                if (error.message.includes('nisn')) {
                    setModalError("NISN sudah terdaftar")
                } else if (error.message.includes('nipd')) {
                    setModalError("NIPD sudah terdaftar")
                } else if (error.message.includes('username')) {
                    setModalError("Username sudah digunakan")
                } else {
                    setModalError("Data sudah ada yang menggunakan")
                }
            } else {
                setModalError(error.message || "Gagal menyimpan data user")
            }
            return
        }

        fetchUsers()
        handleCloseModal()
    }

    const handleHapus = async (id) => {
        const user = users.find(u => u.id === id)
        if (user?.sudahVote) {
            alert("Tidak dapat menghapus user yang sudah melakukan voting")
            setConfirmDelete(null)
            return
        }

        setDeletingId(id)
        const { error } = await supabase.from("users").delete().eq("id", id)
        
        if (!error) {
            setUsers(prev => prev.filter(u => u.id !== id))
        }
        
        setDeletingId(null)
        setConfirmDelete(null)
    }

    // Filter berdasarkan role
    const getUsersByRole = (role) => {
        if (role === "semua") return users
        return users.filter(u => u.role === role)
    }

    // Filter berdasarkan search
    const filteredUsers = getUsersByRole(activeTab).filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.nisn && user.nisn.includes(searchTerm)) ||
        (user.nipd && user.nipd.includes(searchTerm))
    )

    // Hitung statistik per role
    const stats = {
        semua: users.length,
        siswa: users.filter(u => u.role === 'siswa').length,
        guru: users.filter(u => u.role === 'guru').length,
        admin: users.filter(u => u.role === 'admin').length
    }

    const roleBadge = (role) => {
        switch (role) {
            case "admin":
                return "bg-blue-50 text-blue-600 border-blue-100"
            case "guru":
                return "bg-purple-50 text-purple-600 border-purple-100"
            case "siswa":
                return "bg-emerald-50 text-emerald-600 border-emerald-100"
            default:
                return "bg-gray-50 text-gray-500 border-gray-100"
        }
    }

    const sudahVoteCount = users.filter(u => u.sudahVote).length
    const belumVoteCount = users.filter(u => !u.sudahVote).length

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
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                <Trash2 className="w-5 h-5 text-red-500" />
                            </div>
                            <h3 className="text-gray-900 font-bold text-base">Hapus User?</h3>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">
                            User{" "}
                            <span className="text-gray-900 font-semibold">
                                {users.find(u => u.id === confirmDelete)?.username}
                            </span>{" "}
                            akan dihapus permanen.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => handleHapus(confirmDelete)}
                                disabled={deletingId === confirmDelete}
                                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold disabled:opacity-50"
                            >
                                {deletingId === confirmDelete ? "Menghapus..." : "Ya, Hapus"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Tambah/Edit User */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        onClick={handleCloseModal}
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                    />
                    <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <div>
                                <h3 className="text-gray-900 font-bold text-lg">
                                    {editData ? "✏️ Edit User" : "👤 Tambah User"}
                                </h3>
                                <p className="text-gray-400 text-xs mt-0.5">
                                    {editData ? "Ubah data user" : "Isi data user baru"}
                                </p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {modalError && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>{modalError}</span>
                                </div>
                            )}

                            <div>
                                <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                                    Username <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan username"
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                                    Role <span className="text-red-400">*</span>
                                </label>
                                <select
                                    name="role"
                                    value={form.role}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="siswa">Siswa</option>
                                    <option value="guru">Guru</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {form.role === "siswa" && (
                                <div>
                                    <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                                        NISN <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nisn"
                                        value={form.nisn}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan NISN"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            )}

                            {form.role === "guru" && (
                                <div>
                                    <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                                        NIPD <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nipd"
                                        value={form.nipd}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan NIPD"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            )}

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={modalLoading}
                                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-200 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
                                >
                                    {modalLoading ? "Menyimpan..." : editData ? "Simpan Perubahan" : "Simpan User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div
                className={`
                    bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm
                    transition-all duration-500
                    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-gray-900 font-bold text-lg flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-500" />
                                Manajemen Users
                            </h2>
                            <p className="text-gray-500 text-xs mt-1">Kelola data pengguna berdasarkan role</p>
                        </div>
                        <button
                            onClick={handleTambah}
                            className="
                                flex items-center gap-2 px-4 py-2.5 rounded-xl
                                bg-gradient-to-r from-blue-600 to-blue-500
                                hover:from-blue-700 hover:to-blue-600
                                text-white text-sm font-semibold
                                shadow-lg shadow-blue-200
                                hover:-translate-y-0.5 active:scale-[0.98]
                                transition-all duration-200
                            "
                        >
                            <Plus className="w-4 h-4" />
                            Tambah User
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari username, NISN, atau NIPD..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-1">
                        <button
                            onClick={() => setActiveTab("semua")}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors
                                ${activeTab === "semua" 
                                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50" 
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}
                            `}
                        >
                            <Users className="w-4 h-4" />
                            Semua
                            <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                {stats.semua}
                            </span>
                        </button>
                        
                        <button
                            onClick={() => setActiveTab("siswa")}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors
                                ${activeTab === "siswa" 
                                    ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50" 
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}
                            `}
                        >
                            <GraduationCap className="w-4 h-4" />
                            Siswa
                            <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                {stats.siswa}
                            </span>
                        </button>
                        
                        <button
                            onClick={() => setActiveTab("guru")}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors
                                ${activeTab === "guru" 
                                    ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50/50" 
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}
                            `}
                        >
                            <Users className="w-4 h-4" />
                            Guru
                            <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                {stats.guru}
                            </span>
                        </button>
                        
                        <button
                            onClick={() => setActiveTab("admin")}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors
                                ${activeTab === "admin" 
                                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50" 
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}
                            `}
                        >
                            <UserCog className="w-4 h-4" />
                            Admin
                            <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                {stats.admin}
                            </span>
                        </button>
                    </div>

                    {/* Stats Badges */}
                    <div className="flex items-center gap-2 mt-4">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                            ✅ {sudahVoteCount} sudah vote
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
                            ⏳ {belumVoteCount} belum vote
                        </span>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                            <span className="ml-3 text-gray-400 text-sm">Memuat data...</span>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                            <span className="text-4xl mb-3">👥</span>
                            <p className="text-sm">
                                {searchTerm 
                                    ? "Tidak ada user yang sesuai" 
                                    : `Belum ada data ${activeTab !== "semua" ? activeTab : "users"}.`}
                            </p>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">No</th>
                                    <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">User</th>
                                    <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">NISN/NIPD</th>
                                    <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Role</th>
                                    <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold text-center">Status Vote</th>
                                    <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((u, i) => (
                                    <tr
                                        key={u.id}
                                        className="border-b border-gray-50 hover:bg-blue-50/50 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4 text-gray-400 text-sm">{i + 1}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                                    {u.username?.charAt(0)?.toUpperCase()}
                                                </div>
                                                <span className="text-gray-900 text-sm font-semibold">{u.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {u.nisn || u.nipd || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${roleBadge(u.role)}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {u.sudahVote ? (
                                                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100">
                                                    ✅ Sudah Memilih
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full border border-orange-100">
                                                    ⏳ Belum Memilih
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(u)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit User"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setConfirmDelete(u.id)}
                                                    disabled={u.sudahVote}
                                                    className={`p-1.5 rounded-lg transition-colors ${
                                                        u.sudahVote 
                                                            ? 'text-gray-300 cursor-not-allowed' 
                                                            : 'text-red-600 hover:bg-red-50'
                                                    }`}
                                                    title={u.sudahVote ? "Tidak bisa menghapus user yang sudah vote" : "Hapus User"}
                                                >
                                                    <Trash2 className="w-4 h-4" />
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
                    <p className="text-gray-400 text-xs">
                        Menampilkan {filteredUsers.length} dari {getUsersByRole(activeTab).length} users di tab {activeTab}
                    </p>
                    <p className="text-gray-400 text-xs">
                        *User yang sudah vote tidak bisa dihapus
                    </p>
                </div>
            </div>
        </>
    )
}