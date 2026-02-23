"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function UsersTable() {
    const [mounted, setMounted] = useState(false)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 300)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)

            // Fetch semua users
            const { data: usersData, error: usersError } = await supabase
                .from("users")
                .select("id, username, role")
                .order("created_at", { ascending: true })

            if (usersError) {
                setLoading(false)
                return
            }

            // Fetch semua votes untuk cek siapa yang sudah vote
            const { data: votesData } = await supabase
                .from("votes")
                .select("user_id")

            // Buat Set dari user_id yang sudah vote
            const votedUserIds = new Set(votesData?.map(v => v.user_id) ?? [])

            // Merge: tambah flag sudahVote ke tiap user
            const merged = (usersData || []).map(u => ({
                ...u,
                sudahVote: votedUserIds.has(u.id),
            }))

            setUsers(merged)
            setLoading(false)
        }

        fetchUsers()
    }, [])

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
        <div
            className={`
                bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm
                transition-all duration-500
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
        >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h2 className="text-gray-900 font-bold text-lg">🧑‍🎓 Data Users & Pilihan</h2>
                    <p className="text-gray-500 text-xs mt-1">Daftar pengguna dan status pemilihan</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                        ✅ {sudahVoteCount} sudah
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-red-500 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                        ⏳ {belumVoteCount} belum
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
                ) : users.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <span className="text-4xl mb-3">🧑‍🎓</span>
                        <p className="text-sm">Belum ada data users.</p>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">No</th>
                                <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Username</th>
                                <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Role</th>
                                <th className="px-6 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-semibold text-center">Status Vote</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, i) => (
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
                                            <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 text-xs font-semibold px-3 py-1 rounded-full border border-red-100">
                                                ⏳ Belum Memilih
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50">
                <p className="text-gray-400 text-xs">Menampilkan {users.length} users</p>
            </div>
        </div>
    )
}
