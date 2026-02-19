"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// ── Kandidat data ──────────────────────────────────────────────
const kandidat = [
    {
        id: 1,
        nama: "Rizky Aditya Pratama",
        kelas: "XI IPA 1",
        foto: "/kandidat1.jpg",
        warna: "from-blue-500 to-cyan-400",
        warnaBtn: "bg-blue-600 hover:bg-blue-500",
        badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        visi: "Mewujudkan OSIS yang inovatif, inklusif, dan berdampak nyata bagi seluruh warga sekolah menuju generasi emas 2025.",
        misi: [
            "Meningkatkan program ekstrakurikuler dan kegiatan kreativitas siswa",
            "Membangun komunikasi yang transparan antara OSIS dan guru",
            "Mengadakan kegiatan sosial dan pengabdian masyarakat rutin",
            "Mengembangkan digitalisasi administrasi OSIS",
        ],
    },
    {
        id: 2,
        nama: "Salsabila Nuraini",
        kelas: "XI IPS 2",
        foto: "/kandidat2.jpg",
        warna: "from-rose-500 to-pink-400",
        warnaBtn: "bg-rose-600 hover:bg-rose-500",
        badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        visi: "Menciptakan lingkungan sekolah yang harmonis, berprestasi, dan berkarakter kuat melalui kepemimpinan yang amanah.",
        misi: [
            "Mendorong budaya literasi dan diskusi ilmiah di kalangan siswa",
            "Memperkuat kegiatan seni, budaya, dan olahraga sekolah",
            "Memfasilitasi aspirasi siswa melalui forum terbuka setiap bulan",
            "Menjalin kerja sama dengan OSIS sekolah lain untuk pertukaran ide",
        ],
    },
    {
        id: 3,
        nama: "Farhan Maulana Yusuf",
        kelas: "XI IPA 3",
        foto: "/kandidat3.jpg",
        warna: "from-emerald-500 to-teal-400",
        warnaBtn: "bg-emerald-600 hover:bg-emerald-500",
        badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        visi: "Membangun OSIS yang progresif, berbasis nilai, dan mampu menjadi teladan kepemimpinan bagi generasi penerus bangsa.",
        misi: [
            "Mengoptimalkan penggunaan media sosial untuk promosi kegiatan sekolah",
            "Membuat program mentoring dan pengembangan diri siswa",
            "Mewujudkan kantin sehat dan lingkungan sekolah yang bersih",
            "Meningkatkan partisipasi siswa dalam olimpiade dan kompetisi nasional",
        ],
    },
]

const aturan = [
    { icon: "🗳️", judul: "Satu Suara per Siswa", isi: "Setiap siswa hanya dapat memberikan satu suara selama periode pemilihan berlangsung." },
    { icon: "📅", judul: "Periode Pemilihan", isi: "Pemilihan dibuka pada 10–15 Februari 2026. Suara tidak dapat diubah setelah dikonfirmasi." },
    { icon: "🔐", judul: "Kerahasiaan Terjamin", isi: "Identitas pemilih dan pilihan suara dijaga kerahasiaannya. Proses voting bersifat anonim." },
    { icon: "✅", judul: "Syarat Pemilih", isi: "Hanya siswa aktif dengan NISN terdaftar yang dapat mengikuti proses pemilihan." },
    { icon: "⚠️", judul: "Dilarang Kampanye Liar", isi: "Segala bentuk kampanye di luar jadwal resmi atau tekanan kepada pemilih adalah pelanggaran." },
    { icon: "📢", judul: "Pengumuman Hasil", isi: "Hasil pemilihan akan diumumkan secara resmi pada 17 Februari 2026 di aula sekolah." },
]

// ── Hook sederhana untuk scroll reveal ────────────────────────
function useReveal() {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
            { threshold: 0.15 }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])
    return { ref, visible }
}

// ── Kartu Kandidat ─────────────────────────────────────────────
function KandidatCard({ k, delay }) {
    const [buka, setBuka] = useState(false)
    const { ref, visible } = useReveal()

    return (
        <div
            ref={ref}
            className={`
        flex flex-col
        bg-white/5 border border-white/10 rounded-2xl overflow-hidden
        hover:border-white/25 hover:-translate-y-1
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
            style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
        >
            {/* Foto placeholder + gradient top bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${k.warna}`} />
            <div className="relative w-full h-52 bg-slate-800/60 flex items-center justify-center overflow-hidden">
                {/* Placeholder avatar — ganti dengan <Image src={k.foto} fill className="object-cover" /> jika foto tersedia */}
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${k.warna} flex items-center justify-center shadow-xl`}>
                    <span className="text-4xl">👤</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                <div>
                    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${k.badge}`}>
                        Kandidat {k.id}
                    </span>
                    <h3 className="text-white font-bold text-lg mt-2 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                        {k.nama}
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">{k.kelas}</p>
                </div>

                {/* Visi */}
                <div>
                    <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-1">Visi</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{k.visi}</p>
                </div>

                {/* Misi toggle */}
                <div>
                    <button
                        onClick={() => setBuka(!buka)}
                        className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-slate-400 hover:text-white transition mb-2"
                    >
                        <span className={`transition-transform duration-200 ${buka ? "rotate-90" : ""}`}>▶</span>
                        Misi {buka ? "(tutup)" : "(lihat)"}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${buka ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
                        <ul className="space-y-1.5">
                            {k.misi.map((m, i) => (
                                <li key={i} className="flex gap-2 text-sm text-slate-300">
                                    <span className="text-slate-500 mt-0.5 shrink-0">→</span>
                                    {m}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Tombol pilih */}
                <button
                    className={`
            mt-auto w-full py-2.5 rounded-xl text-sm font-semibold tracking-wide text-white
            ${k.warnaBtn} active:scale-[0.98]
            shadow-lg transition-all duration-200 hover:-translate-y-0.5
          `}
                >
                    Pilih Kandidat {k.id} →
                </button>
            </div>
        </div>
    )
}

// ── Main Page ──────────────────────────────────────────────────
export default function LandingPage() {
    const [mounted, setMounted] = useState(false)
    const aturanReveal = useReveal()
    const kandidatReveal = useReveal()

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 60)
        return () => clearTimeout(t)
    }, [])

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

            {/* ══ HERO ════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background image */}
                <Image
                    src="/sekolah.png"
                    alt="Sekolah"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/50 to-slate-950" />

                {/* Glow orbs */}
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

                {/* Content */}
                <div
                    className={`
            relative z-10 text-center px-6 max-w-3xl mx-auto
            transition-all duration-1000 ease-out
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
          `}
                >
                    <div className={`transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <span className="inline-block text-xs uppercase tracking-[0.25em] text-blue-300/80 border border-blue-400/30 px-4 py-1.5 rounded-full mb-6 bg-blue-500/10">
                            🗳️ &nbsp; Suaramu, Masa Depan Kita
                        </span>
                    </div>

                    <h1
                        className={`
              text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5
              transition-all duration-700 delay-200
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        Pemilihan Ketua
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            OSIS 2026/2027
                        </span>
                    </h1>

                    <p
                        className={`
              text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8
              transition-all duration-700 delay-300
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
                    >
                        Gunakan hak suaramu untuk memilih pemimpin OSIS yang akan membawa perubahan positif bagi sekolah kita. Satu suara, satu harapan.
                    </p>

                    <div
                        className={`
              flex flex-col sm:flex-row items-center justify-center gap-3
              transition-all duration-700 delay-400
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
                    >
                        <a
                            href="#kandidat"
                            className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-blue-700/40 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Lihat Kandidat →
                        </a>
                        <a
                            href="#aturan"
                            className="px-7 py-3 rounded-xl bg-white/8 border border-white/15 hover:bg-white/15 text-white font-medium text-sm tracking-wide transition-all duration-200"
                        >
                            Aturan Voting
                        </a>
                    </div>
                </div>
            </section>

            {/* ══ ATURAN VOTING ══════════════════════════════════════ */}
            <section id="aturan" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
                <div ref={aturanReveal.ref}>
                    <div
                        className={`
              text-center mb-14
              transition-all duration-700
              ${aturanReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
                    >
                        <span className="text-xs uppercase tracking-[0.25em] text-blue-300/70">Panduan</span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white" style={{ fontFamily: "Georgia, serif" }}>
                            Aturan Pemilihan
                        </h2>
                        <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
                            Harap baca dan pahami seluruh ketentuan berikut sebelum melakukan voting.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {aturan.map((a, i) => (
                            <div
                                key={i}
                                className={`
                  bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-500/30 hover:bg-white/8
                  transition-all duration-500
                  ${aturanReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
                                style={{ transitionDelay: aturanReveal.visible ? `${i * 80}ms` : "0ms" }}
                            >
                                <div className="text-2xl mb-3">{a.icon}</div>
                                <h3 className="text-white font-semibold text-sm mb-1.5">{a.judul}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{a.isi}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ KANDIDAT ══════════════════════════════════════════ */}
            <section id="kandidat" className="py-24 px-6 md:px-12 bg-slate-900/40">
                <div className="max-w-6xl mx-auto">
                    <div ref={kandidatReveal.ref}>
                        <div
                            className={`
                text-center mb-14
                transition-all duration-700
                ${kandidatReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
                        >
                            <span className="text-xs uppercase tracking-[0.25em] text-rose-300/70">Kenali Mereka</span>
                            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white" style={{ fontFamily: "Georgia, serif" }}>
                                Para Kandidat
                            </h2>
                            <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
                                Pelajari visi, misi, dan program kerja setiap kandidat sebelum menentukan pilihanmu.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {kandidat.map((k, i) => (
                            <KandidatCard key={k.id} k={k} delay={i * 120} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ FOOTER ════════════════════════════════════════════ */}
            <footer className="py-8 px-6 border-t border-white/8 text-center">
                <p className="text-slate-500 text-xs tracking-wide">
                    © 2026 &nbsp;<span className="text-slate-400 font-medium">Kelompok 6</span>&nbsp;— Pemilihan Ketua OSIS 2026/2027. Semua hak dilindungi.
                </p>
            </footer>

        </div>
    )
}