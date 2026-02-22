"use client"

import Link from "next/link"
import { CheckCircle, ArrowLeft } from "lucide-react"

export default function VoteSuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* Header */}
            <div className="bg-white shadow-sm px-6 py-4 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-900">Hasil Voting</h1>
            </div>

            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-16 flex flex-col items-center text-center relative overflow-hidden">
                {/* Dekorasi lingkaran */}
                <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-white/10 rounded-full" />
                <div className="absolute bottom-[-30px] left-[-30px] w-36 h-36 bg-white/10 rounded-full" />

                {/* Icon */}
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg mb-4 z-10">
                    <CheckCircle size={52} className="text-blue-600" />
                </div>

                <h2 className="text-3xl font-bold text-white z-10">Vote Berhasil! 🎉</h2>
                <p className="text-blue-100 text-sm mt-2 max-w-xs leading-relaxed z-10">
                    Suaramu telah berhasil dicatat. Terima kasih telah menggunakan hak pilihmu!
                </p>
            </div>

            {/* Card Info */}
            <div className="flex-1 max-w-md w-full mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Suaramu sangat berarti untuk menentukan pemimpin OSIS SMK Taruna Bhakti yang akan datang. 
                        Hasil pemilihan akan diumumkan setelah proses voting selesai.
                    </p>
                    <div className="mt-4 py-3 px-4 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-blue-600 text-sm font-medium">✅ Status: Suara Tercatat</p>
                    </div>
                </div>

                {/* Tombol Kembali */}
                <div className="text-center mt-6 pb-6">
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
    )
}
