"use client";

import { User, Mail, School, Phone, ArrowLeft, IdCard } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const user = {
    name: "Nama Siswa",
    nisn: "1234567890",
    email: "siswa@smktarunabhakti.sch.id",
    kelas: "XII RPL 1",
    phone: "081234567890",
    foto: null,
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header / Navbar */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center gap-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">Profil Saya</h1>
      </div>

      {/* Hero Banner + Avatar */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

        <div className="relative max-w-2xl mx-auto px-6 pt-12 pb-16 text-center">
          {/* Avatar di dalam hero */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white/50">
              {user.foto ? (
                <img
                  src={user.foto}
                  alt="Foto Profil"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={40} className="text-blue-600" />
                </div>
              )}
            </div>
          </div>
          <p className="text-blue-100 text-xs font-medium uppercase tracking-widest mb-1">Akun Siswa</p>
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <p className="text-blue-200 text-sm mt-1">{user.kelas}</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">

          <div className="flex items-center gap-4 px-6 py-5">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <IdCard size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wider">NISN</p>
              <p className="text-gray-900 font-medium">{user.nisn}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-5">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Mail size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wider">Email</p>
              <p className="text-gray-900 font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-5">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <School size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wider">Kelas</p>
              <p className="text-gray-900 font-medium">{user.kelas}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-5">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wider">No. HP</p>
              <p className="text-gray-900 font-medium">{user.phone}</p>
            </div>
          </div>

        </div>

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
