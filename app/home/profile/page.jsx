"use client";

import { User, Mail, School, Phone, ArrowLeft, IdCard, Shield, Star } from "lucide-react";
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

  const infoItems = [
    { icon: IdCard, label: "NISN", value: user.nisn, desc: "Nomor Induk Siswa" },
    { icon: Mail, label: "Email", value: user.email, desc: "Alamat Surat Elektronik" },
    { icon: School, label: "Kelas", value: user.kelas, desc: "Kelas Aktif" },
    { icon: Phone, label: "No. HP", value: user.phone, desc: "Nomor Handphone" },
  ];

  const animDelays = ["anim-c1", "anim-c2", "anim-c3", "anim-c4"];

  return (
    <div className="min-h-screen bg-[#eef3fb] overflow-x-hidden relative" style={{ fontFamily: "'Sora',sans-serif" }}>

      {/* Fonts + Keyframes only — cannot be done in Tailwind */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap');
        @keyframes floatBlob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-20px) scale(1.05)}66%{transform:translate(-20px,15px) scale(0.95)}}
        @keyframes avatarIn{from{transform:scale(0.7) translateY(20px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
        @keyframes spinRing{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blinkDot{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes shimmer{0%{left:-100%}50%,100%{left:150%}}
        @keyframes livePulse{0%{box-shadow:0 0 0 0 rgba(34,197,94,.4)}70%{box-shadow:0 0 0 8px rgba(34,197,94,0)}100%{box-shadow:0 0 0 0 rgba(34,197,94,0)}}
        .blob1{animation:floatBlob 12s ease-in-out infinite}
        .blob2{animation:floatBlob 12s ease-in-out -4s infinite}
        .blob3{animation:floatBlob 12s ease-in-out -8s infinite}
        .anim-avatar{animation:avatarIn 0.6s cubic-bezier(.34,1.56,.64,1) both}
        .spin-ring{animation:spinRing 4s linear infinite}
        .anim-u1{animation:fadeUp .5s .15s both}
        .anim-u2{animation:fadeUp .5s .2s both}
        .anim-u3{animation:fadeUp .5s .25s both}
        .anim-u4{animation:fadeUp .5s .3s both}
        .anim-u5{animation:fadeUp .5s .4s both}
        .anim-c1{animation:fadeUp .5s .45s both}
        .anim-c2{animation:fadeUp .5s .5s both}
        .anim-c3{animation:fadeUp .5s .55s both}
        .anim-c4{animation:fadeUp .5s .6s both}
        .anim-verified{animation:fadeUp .5s .65s both}
        .anim-cta{animation:fadeUp .5s .7s both}
        .blink-dot{animation:blinkDot 2s ease-in-out infinite}
        .ic-shimmer::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent);animation:shimmer 3s ease-in-out infinite}
        .live-pulse{animation:livePulse 2s ease-out infinite}
        .card-hover:hover{transform:translateX(4px);border-color:rgba(59,130,246,.2);box-shadow:0 6px 24px rgba(37,99,235,.1),0 1px 0 rgba(255,255,255,.8) inset}
        .btn-shimmer::before{content:'';position:absolute;top:0;left:-100%;width:70%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);transition:left .5s ease}
        .btn-shimmer:hover::before{left:150%}
      `}</style>

      {/* ── BG BLOBS ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="blob1 absolute w-[500px] h-[500px] rounded-full -top-[150px] -left-[100px] opacity-[.18] blur-[60px]" style={{ background: "radial-gradient(circle,#3b82f6,transparent 70%)" }} />
        <div className="blob2 absolute w-[400px] h-[400px] rounded-full -bottom-[100px] -right-[80px] opacity-[.18] blur-[60px]" style={{ background: "radial-gradient(circle,#1d4ed8,transparent 70%)" }} />
        <div className="blob3 absolute w-[300px] h-[300px] rounded-full top-[40%] left-[60%] opacity-[.18] blur-[60px]" style={{ background: "radial-gradient(circle,#60a5fa,transparent 70%)" }} />
      </div>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-[100] h-[60px] flex items-center justify-between px-5 bg-white/70 backdrop-blur-2xl border-b border-blue-100/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[9px] flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", boxShadow: "0 2px 10px rgba(37,99,235,.35)" }}>
            <User size={16} color="#fff" />
          </div>
          <span className="font-semibold text-[15px] text-[#1e3a5f] tracking-tight">Profil Saya</span>
        </div>
        <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 uppercase tracking-[1px]">Siswa</span>
      </nav>

      {/* ── HERO ── */}
      <div className="relative z-10 px-5 pt-10 pb-[100px] overflow-hidden" style={{ background: "linear-gradient(150deg,#1e3a8a 0%,#1d4ed8 40%,#2563eb 70%,#3b82f6 100%)" }}>
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
        {/* Glare */}
        <div className="absolute w-[600px] h-[600px] rounded-full -top-[200px] -right-[150px] pointer-events-none" style={{ background: "radial-gradient(circle,rgba(255,255,255,.12) 0%,transparent 65%)" }} />
        <div className="absolute w-[350px] h-[350px] rounded-full bottom-5 -left-[100px] pointer-events-none" style={{ background: "radial-gradient(circle,rgba(255,255,255,.07) 0%,transparent 65%)" }} />
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-[#eef3fb] z-20" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

        <div className="relative z-30 max-w-[480px] mx-auto flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-[22px]">
            <div className="anim-avatar relative w-[116px] h-[116px] rounded-full p-[3px]" style={{ background: "linear-gradient(135deg,rgba(255,255,255,.5),rgba(255,255,255,.1))", boxShadow: "0 12px 40px rgba(0,0,0,.25),0 0 0 6px rgba(255,255,255,.08)" }}>
              <div className="spin-ring absolute rounded-full pointer-events-none" style={{ inset: "-6px", background: "conic-gradient(from 0deg,transparent 0deg,rgba(255,255,255,.35) 60deg,transparent 120deg)" }} />
              <div className="relative w-full h-full rounded-full bg-white/[.12] backdrop-blur-xl flex items-center justify-center overflow-hidden">
                {user.foto ? (
                  <img src={user.foto} alt="Foto Profil" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <User size={48} color="rgba(255,255,255,.85)" strokeWidth={1.5} />
                )}
              </div>
            </div>
          </div>

          <p className="anim-u1 text-[9px] font-bold tracking-[3.5px] uppercase text-white/45 mb-2">Akun Siswa Aktif</p>
          <h2 className="anim-u2 text-[32px] font-bold text-white text-center mb-3 leading-tight" style={{ fontFamily: "'Fraunces',serif", letterSpacing: "-0.5px", textShadow: "0 2px 16px rgba(0,0,0,.2)" }}>
            {user.name}
          </h2>

          <div className="anim-u3 inline-flex items-center gap-[7px] bg-white/[.13] border border-white/20 backdrop-blur-lg rounded-full px-4 py-[6px] text-[12px] font-medium text-white/85 mb-5">
            <span className="blink-dot w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: "#93c5fd", boxShadow: "0 0 8px #93c5fd" }} />
            {user.kelas}
          </div>

          {/* Stats */}
          <div className="anim-u4 flex gap-[10px]">
            {[
              { val: "XII", lbl: "Tingkat" },
              { val: "RPL", lbl: "Jurusan" },
              { val: null,  lbl: "Aktif", star: true },
            ].map(({ val, lbl, star }) => (
              <div key={lbl} className="bg-white/10 border border-white/15 backdrop-blur-md rounded-[14px] px-[18px] py-[10px] text-center min-w-[80px]">
                <div className="flex justify-center items-center mb-1" style={{ fontFamily: "'Fraunces',serif", fontSize: "18px", fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                  {star ? <Star size={16} fill="#fbbf24" color="#fbbf24" /> : val}
                </div>
                <div className="text-[9px] font-semibold tracking-[1.5px] uppercase text-white/45">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-20 max-w-[500px] mx-auto px-4 pb-10">
        {/* Section head */}
        <div className="anim-u5 flex items-center gap-2 mt-2 mb-3.5">
          <span className="text-[9px] font-bold tracking-[2.5px] uppercase text-slate-400">Informasi Akun</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,#cbd5e1,transparent)" }} />
        </div>

        {/* Info cards */}
        <div className="flex flex-col gap-[10px]">
          {infoItems.map(({ icon: Icon, label, value, desc }, i) => (
            <div
              key={label}
              className={`card-hover ${animDelays[i]} bg-white/90 backdrop-blur-xl border border-white/90 rounded-[18px] px-[18px] py-4 flex items-center gap-[14px] cursor-default transition-all duration-[250ms]`}
              style={{ boxShadow: "0 2px 12px rgba(37,99,235,.06),0 1px 0 rgba(255,255,255,.8) inset" }}
            >
              <div className="ic-shimmer relative w-[46px] h-[46px] rounded-[14px] flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: "linear-gradient(135deg,#dbeafe,#bfdbfe)", boxShadow: "0 2px 8px rgba(37,99,235,.12),0 1px 0 rgba(255,255,255,.7) inset" }}>
                <Icon size={20} color="#2563eb" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-slate-400 mb-[3px]">{label}</div>
                <div className="text-[13.5px] font-semibold text-[#1e3a5f] tracking-tight truncate">{value}</div>
                <div className="text-[10px] text-slate-400 mt-[1px]">{desc}</div>
              </div>
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-300 text-[15px]">›</div>
            </div>
          ))}
        </div>

        {/* Verified */}
        <div className="anim-verified mt-3 flex items-center gap-[10px] border border-blue-100 rounded-2xl px-[18px] py-[13px]" style={{ background: "linear-gradient(135deg,rgba(37,99,235,.06),rgba(59,130,246,.04))" }}>
          <div className="w-9 h-9 rounded-[10px] bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Shield size={18} color="#2563eb" strokeWidth={1.8} />
          </div>
          <div>
            <div className="text-[12.5px] font-semibold text-blue-600 leading-tight">Data Terverifikasi</div>
            <div className="text-[10px] text-slate-400 mt-[1px]">Dikonfirmasi oleh sistem sekolah</div>
          </div>
          <div className="live-pulse ml-auto w-[10px] h-[10px] rounded-full bg-green-400 flex-shrink-0" />
        </div>

        {/* CTA */}
        <div className="anim-cta mt-5">
          <Link
            href="/home"
            className="btn-shimmer relative overflow-hidden flex items-center justify-center gap-[10px] w-full py-4 text-white font-semibold text-[14px] tracking-tight rounded-2xl transition-all duration-300 hover:-translate-y-[3px] hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", boxShadow: "0 6px 24px rgba(37,99,235,.35),0 1px 0 rgba(255,255,255,.15) inset" }}
          >
            <ArrowLeft size={17} />
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
}