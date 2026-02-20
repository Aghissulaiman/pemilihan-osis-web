"use client"

import { useState } from "react"
import Sidebar from "../component/admin/Sidebar"
import TopBar from "../component/admin/TopBar"
import StatsCards from "../component/admin/StatsCards"
import ChartHasilPemilihan from "../component/admin/ChartHasilPemilihan"
import TabelKandidat from "../component/admin/TabelKandidat"
import ModalTambahKandidat from "../component/admin/ModalTambahKandidat"

export default function DashboardPage() {
    const [activeMenu, setActiveMenu] = useState("dashboard")
    const [collapsed, setCollapsed] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Sidebar
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <main
                className={`
                    min-h-screen transition-all duration-300
                    ${collapsed ? "ml-20" : "ml-64"}
                `}
            >
                <TopBar activeMenu={activeMenu} />

                <div className="p-8 space-y-6">
                    {activeMenu === "dashboard" && (
                        <>
                            <StatsCards />
                            <ChartHasilPemilihan />
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