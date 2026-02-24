// app/dashboard/layout.jsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "../component/admin/Sidebar"
import TopBar from "../component/admin/TopBar"

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false)
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        user={user}
      />
      
      <main
        className={`
          min-h-screen transition-all duration-300
          ${collapsed ? "ml-20" : "ml-64"}
        `}
      >
        <TopBar user={user} />
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}