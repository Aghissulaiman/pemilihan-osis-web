"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function StatsCards({ refreshKey }) {
    const [mounted, setMounted] = useState(false)
    const [totalSuara, setTotalSuara] = useState(0)
    const [totalKandidat, setTotalKandidat] = useState(0)

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 100)
        return () => clearTimeout(t)
    }, [])

    const fetchStats = async () => {
        const { count: kandCount } = await supabase
            .from("kandidat")
            .select("*", { count: "exact", head: true })

        const { count: voteCount } = await supabase
            .from("votes")
            .select("*", { count: "exact", head: true })

        setTotalKandidat(kandCount ?? 0)
        setTotalSuara(voteCount ?? 0)
    }

    useEffect(() => {
        fetchStats()
    }, [refreshKey])

    useEffect(() => {
        const channel = supabase
            .channel("realtime-stats")
            .on("postgres_changes", { event: "*", schema: "public", table: "kandidat" }, () => { fetchStats() })
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "votes" }, () => { fetchStats() })
            .subscribe()
        return () => { supabase.removeChannel(channel) }
    }, [])

    const stats = [
        {
            label: "Total Suara Masuk",
            value: totalSuara,
            icon: "🗳️",
            gradient: "from-blue-500 to-cyan-400",
            iconShadow: "shadow-blue-200",
            change: "Total suara terkumpul",
            changeColor: "text-emerald-600",
            blob: "bg-blue-100",
        },
        {
            label: "Total Kandidat",
            value: totalKandidat,
            icon: "👥",
            gradient: "from-violet-500 to-purple-400",
            iconShadow: "shadow-violet-200",
            change: "Kandidat terdaftar",
            changeColor: "text-violet-600",
            blob: "bg-violet-100",
        },
        {
            label: "Status Pemilihan",
            value: "Aktif",
            icon: "🟢",
            gradient: "from-emerald-500 to-teal-400",
            iconShadow: "shadow-emerald-200",
            change: "Pemilihan sedang berjalan",
            changeColor: "text-amber-600",
            blob: "bg-emerald-100",
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stats.map((s, i) => (
                <div
                    key={i}
                    className={`
                        relative overflow-hidden
                        bg-white border border-gray-100 rounded-2xl
                        p-5 group shadow-sm hover:shadow-md
                        transition-all duration-500 ease-out hover:-translate-y-1
                        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                    `}
                    style={{ transitionDelay: mounted ? `${i * 100}ms` : "0ms" }}
                >
                    {/* Decorative blob */}
                    <div className={`absolute -top-8 -right-8 w-28 h-28 ${s.blob} rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />

                    <div className="relative flex items-start justify-between">
                        <div>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">{s.label}</p>
                            <p className="text-gray-900 text-3xl font-bold tracking-tight">
                                {s.value}
                            </p>
                            <p className={`text-[11px] mt-2 font-medium ${s.changeColor}`}>{s.change}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} shadow-lg ${s.iconShadow} flex items-center justify-center text-xl flex-shrink-0`}>
                            {s.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
