"use client"

const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "kandidat", label: "Kandidat", icon: "👥" },
    { id: "users", label: "Users", icon: "🧑‍🎓" },
]

export default function Sidebar({
    activeMenu,
    setActiveMenu,
    collapsed,
    setCollapsed
}) {
    return (
        <aside
            className={`
                fixed top-0 left-0 h-screen z-40
                bg-slate-900 border-r border-white/10
                flex flex-col
                transition-all duration-300
                ${collapsed ? "w-20" : "w-64"}
            `}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-6 border-b border-white/10">
                {!collapsed && (
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                            🗳️
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-sm">Dashboard</h1>
                            <p className="text-slate-500 text-[10px]">Pemilihan OSIS</p>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center"
                >
                    <span className={`transition-transform ${collapsed ? "rotate-180" : ""}`}>
                        ◀
                    </span>
                </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveMenu(item.id)}
                        className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                            ${activeMenu === item.id
                                ? "bg-blue-500/20 text-white"
                                : "text-slate-400 hover:bg-white/5"}
                        `}
                    >
                        <span className="text-lg">{item.icon}</span>
                        {!collapsed && <span>{item.label}</span>}
                    </button>
                ))}
            </nav>
        </aside>
    )
}