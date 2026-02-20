"use client"

export default function ModalVoteBerhasil({ isOpen, onClose, nama }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center animate-fadeIn">
                
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">✅</span>
                </div>

                <h2
                    className="text-white text-lg font-bold"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    Vote Berhasil!
                </h2>

                <p className="text-slate-400 text-sm mt-2">
                    Kamu telah memilih:
                </p>

                <p className="text-emerald-400 font-semibold mt-1">
                    {nama}
                </p>

                <button
                    onClick={onClose}
                    className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition text-sm font-semibold"
                >
                    Tutup
                </button>
            </div>
        </div>
    )
}