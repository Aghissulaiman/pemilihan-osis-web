// app/home/page.jsx
"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Hero from "../component/homePage/Hero"
import AturanSection from "../component/homePage/AturanSection"
import KandidatSection from "../component/homePage/KandidatSection"
import Footer from "../component/homePage/Footer"
import Navbar from "../component/homePage/NavbarS"

export default function LandingPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Ambil user dari cookie
    const checkUser = () => {
      const cookies = document.cookie.split(';')
      const userCookie = cookies.find(c => c.trim().startsWith('user='))
      
      if (userCookie) {
        try {
          const userData = JSON.parse(userCookie.split('=')[1])
          setUser(userData)
        } catch (e) {
          console.error('Error parsing user cookie:', e)
        }
      } else {
        // Fallback ke localStorage
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser)
            setUser(userData)
          } catch (e) {
            console.error('Error parsing localStorage user:', e)
          }
        } else {
          // Jika tidak ada user, redirect ke landing page
          router.push('/')
        }
      }
      setLoading(false)
    }

    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-blue-200">Memuat...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Akan redirect oleh useEffect
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar user={user} /> {/* Kirim user ke Navbar */}
      <Hero />
      <AturanSection />
      <KandidatSection />
      <Footer />
    </div>
  )
}