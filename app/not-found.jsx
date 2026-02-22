// app/not-found.jsx
"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Cek user dari cookie
    const cookies = document.cookie.split(';')
    const userCookie = cookies.find(c => c.trim().startsWith('user='))
    
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie.split('=')[1])
        setUser(userData)
      } catch (e) {
        console.error('Error parsing user cookie:', e)
      }
    }
  }, [])

  const getRedirectPath = () => {
    if (!user) return '/'
    return user.role === 'admin' ? '/dashboard' : '/home'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-blue-950 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animasi 404 */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-blue-600/20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-600/10 rounded-full animate-ping"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl font-bold text-blue-600 drop-shadow-2xl">404</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-semibold text-white mt-4 mb-2">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-blue-200/70 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak ada atau Anda tidak memiliki akses ke halaman ini.
        </p>
        
        <Link 
          href={getRedirectPath()}
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition duration-300 shadow-lg shadow-blue-600/20 hover:shadow-xl"
        >
          {!user ? 'Kembali ke Landing Page' : 'Kembali ke Halaman Utama'}
        </Link>
      </div>
    </div>
  )
}