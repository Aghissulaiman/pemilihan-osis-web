// app/component/admin/Sidebar.jsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Vote // <-- TAMBAHKAN IMPORT INI
} from "lucide-react"

export default function Sidebar({ collapsed, setCollapsed, user }) {
  const pathname = usePathname()

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard"
    },
    {
      id: "kandidat",
      label: "Kandidat",
      icon: Users,
      href: "/dashboard/kandidat"
    },
    {
      id: "voting", // <-- TAMBAHKAN MENU INI
      label: "Detail Voting",
      icon: Vote,
      href: "/dashboard/voting"
    },
    {
      id: "users",
      label: "Pengguna",
      icon: UserCircle,
      href: "/dashboard/users"
    }
  ]

  const handleLogout = () => {
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  const isActive = (href) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200
        transition-all duration-300 z-50
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <div className={`
          font-bold text-xl text-blue-600
          ${collapsed ? "hidden" : "block"}
        `}>
          Admin Panel
        </div>
        <div className={`
          font-bold text-xl text-blue-600 mx-auto
          ${collapsed ? "block" : "hidden"}
        `}>
          AP
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex items-center px-4 py-3 rounded-lg transition-colors
                ${active 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-700 hover:bg-gray-100"
                }
                ${collapsed ? "justify-center" : "space-x-3"}
              `}
            >
              <Icon className={`w-5 h-5 ${active ? "text-blue-600" : "text-gray-500"}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className={`
          flex items-center mb-4
          ${collapsed ? "justify-center" : "space-x-3"}
        `}>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.nama?.[0] || user?.username?.[0] || 'A'}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.nama || user?.username || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || ''}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className={`
            flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors
            ${collapsed ? "justify-center" : "space-x-3"}
          `}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </aside>
  )
}