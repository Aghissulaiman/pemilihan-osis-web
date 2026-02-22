// app/dashboard/page.jsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "../component/admin/Sidebar"
import TopBar from "../component/admin/TopBar"
import StatsCards from "../component/admin/StatsCards"
import ChartHasilPemilihan from "../component/admin/ChartHasilPemilihan"
import TabelKandidat from "../component/admin/TabelKandidat"
import ModalTambahKandidat from "../component/admin/ModalTambahKandidat"
import UsersTable from "../component/admin/UsersTable"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [collapsed, setCollapsed] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Ambil user dari cookie
    const cookies = document.cookie.split(';')
    const userCookie = cookies.find(c => c.trim().startsWith('user='))
    
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie.split('=')[1])
        
        // Validasi role admin
        if (userData.role !== 'admin') {
          router.push('/404')
          return
        }
        
        setUser(userData)
      } catch (e) {
        console.error('Error parsing user cookie:', e)
        router.push('/')
      }
    } else {
      // Fallback ke localStorage
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          if (userData.role !== 'admin') {
            router.push('/404')
            return
          }
          setUser(userData)
        } catch (e) {
          console.error('Error parsing localStorage user:', e)
          router.push('/')
        }
      } else {
        router.push('/')
      }
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-blue-200">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        user={user} // Kirim user ke Sidebar
      />

      <main
        className={`
          min-h-screen transition-all duration-300
          ${collapsed ? "ml-20" : "ml-64"}
        `}
      >
        <TopBar activeMenu={activeMenu} user={user} />

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

          {activeMenu === "users" && (
            <UsersTable />
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