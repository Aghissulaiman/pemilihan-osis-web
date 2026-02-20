"use client"

import { useState } from "react"
import Sidebar from "../component/admin/Sidebar"
import StatsCards from "../component/admin/StatsCards"
import ChartHasilPemilihan from "../component/admin/ChartHasilPemilihan"
import TabelKandidat from "../component/admin/TabelKandidat"
import ModalTambahKandidat from "../component/admin/ModalTambahKandidat"

export default function DashboardPage() {
    const [activeMenu, setActiveMenu] = useState("dashboard")
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <main className="ml-64 min-h-screen transition-all duration-300">
                <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-8 py-4 flex items-center justify-between">
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
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Pemilihan Aktif
                        </span>
                    </div>
                </header>

                <div className="p-8 space-y-6">
                    {activeMenu === "dashboard" && (
                        <>
                            <StatsCards />
                            <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                                <ChartHasilPemilihan />
                            </div>
                            <TabelKandidat onTambah={() => setModalOpen(true)} />
                        </>
                    )}

                    {activeMenu === "kandidat" && (
                        <TabelKandidat onTambah={() => setModalOpen(true)} />
                    )}
                </div>
            </main>

            <ModalTambahKandidat
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    )
}
