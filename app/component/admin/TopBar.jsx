"use client"

const pageTitles = {
    dashboard: "Dashboard",
    kandidat: "Kelola Kandidat",
    users: "Data Users",
}

export default function TopBar({ activeMenu, user }) {
    return (
        <header className="
            sticky top-0 z-30
            bg-white border-b border-gray-200
            shadow-sm
            px-8 py-4
            flex items-center justify-between
        ">
            <div>
                <h1 className="text-xl font-bold text-gray-900">
                    {pageTitles[activeMenu] || "Dashboard"}
                </h1>
                <p className="text-gray-400 text-xs mt-0.5">
                    Pemilihan Ketua OSIS 2026/2027
                </p>
            </div>

            <div className="flex items-center gap-3">
                <span className="
                    inline-flex items-center gap-1.5
                    text-[11px] font-medium text-emerald-700
                    bg-emerald-50
                    px-3 py-1.5 rounded-full
                    border border-emerald-200
                ">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Pemilihan Aktif
                </span>
                {user && (
                    <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                            {(user.username || "A").charAt(0).toUpperCase()}
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-gray-800 text-xs font-semibold leading-tight">{user.username || "Admin"}</p>
                            <p className="text-gray-400 text-[10px] capitalize">{user.role}</p>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
