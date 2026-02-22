"use client"

import { useEffect } from "react"

export default function VoteModal({ kandidat, onClose }) {
    // Close on ESC key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose()
        }
        document.addEventListener("keydown", handleKey)
        return () => document.removeEventListener("keydown", handleKey)
    }, [onClose])

    // Prevent body scroll when modal open
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => { document.body.style.overflow = "" }
    }, [])

    if (!kandidat) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden
                    animate-[fadeScaleIn_0.25s_ease_forwards]"
                style={{
                    animation: "fadeScaleIn 0.25s ease forwards",
                }}
            >
                {/* Color bar top */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${kandidat.warna}`} />

                <div className="flex flex-col items-center gap-4 p-8">
                    {/* Avatar with checkmark overlay */}
                    <div className="relative">
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${kandidat.warna} flex items-center justify-center shadow-xl`}>
                            <span className="text-4xl">👤</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md border-2 border-slate-900">
                            <span className="text-sm">✓</span>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center">
                        <h2
                            className="text-white text-2xl font-bold"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            Vote Berhasil! 🎉
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            Suaramu telah berhasil dicatat
                        </p>
                    </div>

                    {/* Kandidat info card */}
                    <div className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-center">
                        <p className="text-slate-400 text-xs mb-2">Kamu memilih</p>
                        <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${kandidat.badge}`}>
                            Kandidat {kandidat.id}
                        </span>
                        <p
                            className="text-white font-bold text-lg mt-2 leading-tight"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            {kandidat.nama}
                        </p>
                        <p className="text-slate-400 text-xs mt-0.5">{kandidat.kelas}</p>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className={`
                            w-full py-2.5 rounded-xl text-sm font-semibold tracking-wide text-white
                            ${kandidat.warnaBtn} active:scale-[0.98]
                            shadow-lg transition-all duration-200 hover:-translate-y-0.5
                        `}
                    >
                        Tutup
                    </button>
                </div>
            </div>

            {/* Keyframe animation */}
            <style>{`
                @keyframes fadeScaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.92) translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}