"use client"

import { useState } from "react"
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative min-h-screen w-full">

      {/* Background Image */}
      <Image
        src="/sekolah.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Login Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-blue-500/20">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo1.png"
              alt="Logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>

          {/* NIS */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nomor Induk Siswa"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Kata sandi"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {/* Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            Masuk
          </button>

          {/* Lupa Password */}
          <div className="text-center mt-4">
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline"
            >
              Lupa kata sandi?
            </a>
          </div>

          <hr className="my-6" />

          {/* Footer */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="cursor-pointer hover:text-blue-600 transition">
              Bahasa Indonesia (id) ▼
            </div>

            <button className="border px-3 py-1 rounded-md bg-white hover:bg-gray-100 transition">
              Pemberitahuan kuki
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
