"use client"

import { useState } from "react"

const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "kandidat", label: "Kandidat", icon: "👥" },
    { id: "users", label: "Users", icon: "🧑‍🎓" },
]

export default function Sidebar({ activeMenu, setActiveMenu }) {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <aside
            className={`
                fixed top-0 left-0 h-screen z-40
                bg-slate-900 border-r border-white/10
                flex flex-col
                transition-all duration-300 ease-out
                ${collapsed ? "w-20" : "w-64"}
            `}
        >
            <div className="flex items-center justify-between px-5 py-6 border-b border-white/10">
                <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${collapsed ? "opacity-0 w-0" : "opacity-100"}`}>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/30">
                        🗳️
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
                            Dashboard
                        </h1>
                        <p className="text-slate-500 text-[10px] tracking-wider uppercase">Pemilihan OSIS</p>
                    </div>
                </div>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 shrink-0"
                >
                    <span className={`transition-transform duration-300 text-xs ${collapsed ? "rotate-180" : ""}`}>◀</span>
                </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveMenu(item.id)}
                        className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                            transition-all duration-200
                            ${activeMenu === item.id
                                ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/10 text-white border border-blue-500/20 shadow-lg shadow-blue-500/10"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                            }
                        `}
                    >
                        <span className="text-lg shrink-0">{item.icon}</span>
                        <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${collapsed ? "opacity-0 w-0" : "opacity-100"}`}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>

            <div className={`px-4 py-4 border-t border-white/10 transition-all duration-300 ${collapsed ? "opacity-0" : "opacity-100"}`}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs">
                        👤
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-white text-xs font-medium truncate">Administrator</p>
                        <p className="text-slate-500 text-[10px] truncate">admin@sekolah.id</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
