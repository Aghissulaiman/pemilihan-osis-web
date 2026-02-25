"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-800 to-blue-700 text-blue-100 relative">
      
      {/* subtle top glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-14">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold text-white tracking-tight">
              E-Voting OSIS
            </h3>
            <p className="mt-4 text-sm text-blue-100/80 leading-relaxed max-w-xs">
              Platform pemilihan Ketua dan Wakil Ketua OSIS
              SMK Taruna Bhakti yang cepat, transparan,
              dan berbasis digital.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Navigasi
            </h4>
            <ul className="space-y-3 text-sm text-blue-100/80">
              <li>
                <Link href="#Hero" className="hover:text-white transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#tentang" className="hover:text-white transition">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="#info" className="hover:text-white transition">
                  Informasi
                </Link>
              </li>
              <li>
                <Link href="#info" className="hover:text-white transition">
                  Cara Menggunakan
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Kontak
            </h4>
            <ul className="space-y-3 text-sm text-blue-100/80">
              <li>SMK Taruna Bhakti</li>
              <li>admin@smktb.sch.id</li>
              <li>(021) 1234 5678</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-blue-500/40 text-center text-xs text-blue-200/70">
          © {new Date().getFullYear()} SMK Taruna Bhakti. All rights reserved.
        </div>
      </div>
    </footer>
  );
}