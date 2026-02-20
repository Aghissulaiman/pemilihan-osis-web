"use client"

export default function TopBar({ activeMenu }) {
    return (
        <header className="
            sticky top-0 z-30
            bg-slate-950/80 backdrop-blur-md
            border-b border-white/10
            px-8 py-4
            flex items-center justify-between
        ">
            <div>
                <h1
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    {activeMenu === "dashboard" ? "Dashboard" : "Kelola Kandidat"}
                </h1>
                <p className="text-slate-500 text-xs mt-0.5">
                    Pemilihan Ketua OSIS 2026/2027
                </p>
            </div>

            <span className="
                inline-flex items-center gap-1.5
                text-[11px] text-emerald-400
                bg-emerald-500/10
                px-3 py-1.5 rounded-full
                border border-emerald-500/20
            ">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Pemilihan Aktif
            </span>
        </header>
    )
}