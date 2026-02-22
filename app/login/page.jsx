"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [nisn, setNisn] = useState("")
  const [nipd, setNipd] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validasi input tidak kosong
      if (!nisn || !nipd) {
        throw new Error("NISN dan NIPD harus diisi")
      }

      // Cek user di database berdasarkan NISN dan NIPD
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('nisn', nisn)
        .eq('nipd', nipd)
        .single()

      if (userError) {
        console.error('Error detail:', userError)
        throw new Error("NISN atau NIPD tidak ditemukan")
      }

      if (!user) {
        throw new Error("User tidak ditemukan")
      }

      // Simpan data user ke cookie dengan format yang benar
      const userData = {
        id: user.id,
        nisn: user.nisn,
        nipd: user.nipd,
        role: user.role
      }

      // Set cookie dengan path yang benar dan httpOnly false (untuk client)
      document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 hari

      // Simpan juga ke localStorage sebagai backup
      localStorage.setItem('user', JSON.stringify(userData))

      // Redirect berdasarkan role
      if (user.role === 'admin') {
        router.push('/dashboard')
      } else {
        router.push('/home')
      }

    } catch (err) {
      setError(err.message)
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <Image
        src="/sekolah.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-slate-900/70 to-blue-950/85 backdrop-blur-[2px]" />

      {/* Subtle floating dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/10 animate-pulse"
            style={{
              width: `${6 + (i % 4) * 4}px`,
              height: `${6 + (i % 4) * 4}px`,
              left: `${(i * 8.5) % 100}%`,
              top: `${(i * 13) % 100}%`,
              animationDuration: `${2 + (i % 5)}s`,
              animationDelay: `${(i * 0.4) % 2}s`,
            }}
          />
        ))}
      </div>

      {/* Centered layout */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8">

        {/* Card */}
        <div
          className={`
            w-full max-w-sm
            bg-white/10 border border-white/20
            backdrop-blur-2xl rounded-2xl
            shadow-2xl shadow-blue-950/60
            px-7 py-8
            transition-all duration-700 ease-out
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          {/* Logo */}
          <div
            className={`
              flex justify-center mb-4
              transition-all duration-500 delay-150
              ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}
            `}
          >
            <Image
              src="/logo1.png"
              alt="Logo"
              width={88}
              height={88}
              className="object-contain drop-shadow-lg"
            />
          </div>

          {/* Headline */}
          <div
            className={`
              text-center mb-5
              transition-all duration-500 delay-200
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
            `}
          >
            <h1 className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              Pemilihan OSIS
            </h1>
            <p className="text-blue-200/65 text-[11px] mt-1 tracking-widest uppercase font-light">
              Masuk untuk memilih kandidat terbaik
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-4">
            <span className="flex-1 h-px bg-white/15" />
            <span className="text-white/30 text-[10px] uppercase tracking-widest">Login</span>
            <span className="flex-1 h-px bg-white/15" />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div
              className={`
                space-y-3
                transition-all duration-500 delay-300
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
              `}
            >
              {/* NISN */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nomor Induk Siswa (NISN)"
                  value={nisn}
                  onChange={(e) => setNisn(e.target.value)}
                  className="w-full pl-4 pr-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400/50 focus:bg-white/15 transition duration-200"
                  disabled={loading}
                  required
                />
              </div>

              {/* NIPD (Password) */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="NIPD"
                  value={nipd}
                  onChange={(e) => setNipd(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400/50 focus:bg-white/15 transition duration-200"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/55 hover:text-blue-200 transition text-sm"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>

              {/* Tombol Masuk */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white text-sm font-semibold tracking-wide shadow-lg shadow-blue-700/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div
            className={`
              mt-5 pt-4 border-t border-white/10 text-center
              transition-all duration-500 delay-500
              ${mounted ? "opacity-100" : "opacity-0"}
            `}
          >
            <p className="text-white/30 text-[11px] tracking-wide">
              © 2026 &nbsp;<span className="text-white/50 font-medium">Kelompok 6</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}