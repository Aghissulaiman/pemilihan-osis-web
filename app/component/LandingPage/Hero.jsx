"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden"
    >
      {/* Background Decorative Blur */}
      <div className="absolute w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h1 className="text-4xl py-25 md:text-6xl font-bold leading-tight text-gray-800">
          Suaramu Menentukan
          <span className="block text-blue-600 mt-2">
            Masa Depan SMK Taruna Bhakti
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          Gunakan hak pilihmu dengan bijak. Pilih calon ketua dan wakil ketua
          OSIS terbaik yang siap membawa perubahan dan inovasi untuk sekolah
          kita.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
          >
            Mulai Memilih
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/login"
            className="px-8 py-3 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-all duration-300"
          >
            Lihat Kandidat
          </Link>
        </div>

      
      </div>
    </section>
  );
}