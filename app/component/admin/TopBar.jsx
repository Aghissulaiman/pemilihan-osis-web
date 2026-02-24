// app/component/admin/TopBar.jsx
"use client"

import { usePathname } from "next/navigation"

export default function TopBar({ user }) {
  const pathname = usePathname()

  const getTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard'
    if (pathname === '/dashboard/kandidat') return 'Manajemen Kandidat'
    if (pathname === '/dashboard/users') return 'Manajemen Pengguna'
    return 'Dashboard'
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <h1 className="text-xl font-semibold text-gray-800">
        {getTitle()}
      </h1>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {user?.nama || 'Admin'}
          </p>
          <p className="text-xs text-gray-500">
            {user?.email || ''}
          </p>
        </div>
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-medium">
            {user?.nama?.[0] || 'A'}
          </span>
        </div>
      </div>
    </header>
  )
}