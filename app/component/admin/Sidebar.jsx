"use client"

import { useRouter } from "next/navigation"

const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "kandidat", label: "Kandidat", icon: "👥" },
    { id: "users", label: "Users", icon: "🧑‍🎓" },
]

export default function Sidebar({
    activeMenu,
    setActiveMenu,
    collapsed,
    setCollapsed,
    user,
}) {
    const router = useRouter()

    const handleLogout = () => {
        // Hapus cookie user
        document.cookie = "user=; path=/; max-age=0"
        // Hapus localStorage
        localStorage.removeItem("user")
        // Redirect ke landing page
        router.push("/")
    }

    return (
        <aside
            className={`
                fixed top-0 left-0 h-screen z-40
                bg-white border-r border-gray-200
                flex flex-col shadow-lg
                transition-all duration-300
                ${collapsed ? "w-20" : "w-64"}
            `}
        >
            {/* Header / Logo */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100">
                {!collapsed && (
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-sm">
                            <span className="text-lg">🗳️</span>
                        </div>
                        <div>
                            <h1 className="text-gray-900 font-bold text-sm leading-tight">Dashboard</h1>
                            <p className="text-gray-400 text-[10px]">Pemilihan OSIS</p>
                        </div>
                    </div>
                )}
                {collapsed && (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-sm mx-auto">
                        <span className="text-lg">🗳️</span>
                    </div>
                )}
                {!collapsed && (
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-500 flex items-center justify-center transition-all duration-200 text-sm"
                        title="Collapse sidebar"
                    >
                        ◀
                    </button>
                )}
            </div>

            {/* Expand button when collapsed */}
            {collapsed && (
                <div className="flex justify-center py-3 border-b border-gray-100">
                    <button
                        onClick={() => setCollapsed(false)}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-500 flex items-center justify-center transition-all duration-200 text-sm rotate-180"
                        title="Expand sidebar"
                    >
                        ◀
                    </button>
                </div>
            )}

            {/* User info */}
            {!collapsed && user && (
                <div className="mx-3 mt-4 mb-2 px-3 py-2.5 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-blue-700 text-xs font-semibold truncate">{user.username || "Admin"}</p>
                    <p className="text-blue-400 text-[10px] capitalize">{user.role}</p>
                </div>
            )}

            {/* Menu */}
            <nav className="flex-1 px-3 py-3 space-y-1">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveMenu(item.id)}
                        title={collapsed ? item.label : ""}
                        className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                            font-medium text-sm transition-all duration-200
                            ${activeMenu === item.id
                                ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                                : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"}
                            ${collapsed ? "justify-center" : ""}
                        `}
                    >
                        <span className="text-base flex-shrink-0">{item.icon}</span>
                        {!collapsed && <span>{item.label}</span>}
                    </button>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="px-3 pb-4 pt-2 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    title={collapsed ? "Keluar" : ""}
                    className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                        font-medium text-sm text-gray-500
                        hover:bg-red-50 hover:text-red-600
                        transition-all duration-200
                        ${collapsed ? "justify-center" : ""}
                    `}
                >
                    <span className="text-base flex-shrink-0">🚪</span>
                    {!collapsed && <span>Keluar</span>}
                </button>
            </div>
        </aside>
    )
}
