"use client"

import { useState, useEffect } from "react"

const stats = [
    {
        label: "Total Suara Masuk",
        value: 347,
        icon: "🗳️",
        gradient: "from-blue-500 to-cyan-400",
        shadow: "shadow-blue-500/20",
        change: "+12 hari ini",
        changeColor: "text-emerald-400",
    },
    {
        label: "Total Kandidat",
        value: 3,
        icon: "👥",
        gradient: "from-violet-500 to-purple-400",
        shadow: "shadow-violet-500/20",
        change: "Aktif",
        changeColor: "text-violet-400",
    },
    {
        label: "Status Pemilihan",
        value: "Aktif",
        icon: "🟢",
        gradient: "from-emerald-500 to-teal-400",
        shadow: "shadow-emerald-500/20",
        change: "Berakhir 3 hari lagi",
        changeColor: "text-amber-400",
    },
]

export default function StatsCards() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 100)
        return () => clearTimeout(t)
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stats.map((s, i) => (
                <div
                    key={i}
                    className={`
                        relative overflow-hidden
                        bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl
                        p-5 group hover:border-white/20
                        transition-all duration-500 ease-out hover:-translate-y-1
                        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                    `}
                    style={{ transitionDelay: mounted ? `${i * 100}ms` : "0ms" }}
                >
                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${s.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />

                    <div className="relative flex items-start justify-between">
                        <div>
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">{s.label}</p>
                            <p className="text-white text-3xl font-bold tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                                {s.value}
                            </p>
                            <p className={`text-[11px] mt-2 font-medium ${s.changeColor}`}>{s.change}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} ${s.shadow} shadow-lg flex items-center justify-center text-xl`}>
                            {s.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
