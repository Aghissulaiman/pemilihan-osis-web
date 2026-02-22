"use client";

import { ArrowLeft, CheckCircle, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export default function RiwayatVotingPage() {
  // Data dummy riwayat voting - bisa diganti dengan data asli dari API/session
  const riwayat = [
    {
      id: 1,
      kandidat: "Nama Kandidat",
      kelas: "XI RPL 2",
      tanggal: "22 Februari 2026",
      waktu: "09:32 WIB",
      status: "Berhasil",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header / Navbar */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center gap-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">Riwayat Voting</h1>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative max-w-2xl mx-auto px-6 pt-12 pb-16 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30">
              <CheckCircle size={32} className="text-white" />
            </div>
          </div>
          <p className="text-blue-100 text-xs font-medium uppercase tracking-widest mb-1">Rekap Suara</p>
          <h2 className="text-2xl font-bold text-white">Riwayat Voting Kamu</h2>
          <p className="text-blue-200 text-sm mt-1">Berikut adalah rekap suara yang telah kamu berikan</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">

        {riwayat.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
            {riwayat.map((item) => (
              <div key={item.id} className="px-6 py-5">
                {/* Status badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                    <CheckCircle size={12} />
                    {item.status}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock size={12} />
                    {item.waktu}
                  </div>
                </div>

                {/* Kandidat info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-lg">{item.kandidat.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Kandidat Dipilih</p>
                    <p className="text-gray-900 font-semibold">{item.kandidat}</p>
                    <p className="text-blue-600 text-sm">{item.kelas}</p>
                  </div>
                </div>

                {/* Tanggal */}
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                  <Calendar size={13} />
                  <span>{item.tanggal}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Jika belum ada riwayat */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-blue-300" />
            </div>
            <h3 className="text-gray-900 font-semibold text-lg mb-2">Belum Ada Riwayat</h3>
            <p className="text-gray-400 text-sm">Kamu belum memberikan suara. Yuk gunakan hak pilihmu!</p>
          </div>
        )}

        {/* Tombol Kembali */}
        <div className="text-center mt-6 pb-12">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <ArrowLeft size={18} />
            Kembali ke Beranda
          </Link>
        </div>

      </div>

    </div>
  );
}
