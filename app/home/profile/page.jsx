"use client";

import { useEffect, useState } from "react";
import { User, ArrowLeft, IdCard, Shield, Hash } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const cookies = document.cookie.split(";");
      const userCookie = cookies.find((c) => c.trim().startsWith("user="));
      if (userCookie) {
        const raw = userCookie.split("=").slice(1).join("=");
        setCurrentUser(JSON.parse(decodeURIComponent(raw)));
      } else {
        const stored = localStorage.getItem("user");
        if (stored) setCurrentUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error parse user:", e);
    }
  }, []);

  const roleLabel = (role) => {
    if (role === "admin") return "Admin";
    if (role === "guru") return "Guru";
    return "Siswa";
  };

  const roleColor = (role) => {
    if (role === "admin") return { bg: "#fef3c7", border: "#fbbf24", text: "#92400e" };
    if (role === "guru") return { bg: "#ede9fe", border: "#a78bfa", text: "#4c1d95" };
    return { bg: "#dbeafe", border: "#60a5fa", text: "#1e40af" };
  };

  const infoCards = currentUser
    ? [
        {
          icon: IdCard,
          label: "NISN",
          value: currentUser.nisn ?? "-",
          desc: "Nomor Induk Siswa Nasional",
        },
        {
          icon: Hash,
          label: "NIPD",
          value: currentUser.nipd ?? "-",
          desc: "Nomor Induk Peserta Didik",
        },
        {
          icon: Shield,
          label: "Role",
          value: roleLabel(currentUser.role),
          desc: "Peran Akun",
        },
      ]
    : [];

  return (
    <div
      className="min-h-screen bg-[#eef3fb] overflow-x-hidden relative"
      style={{ fontFamily: "'Sora',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap');
        @keyframes floatBlob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-20px) scale(1.05)}66%{transform:translate(-20px,15px) scale(0.95)}}
        @keyframes avatarIn{from{transform:scale(0.7) translateY(20px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
        @keyframes spinRing{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blinkDot{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes shimmer{0%{left:-100%}50%,100%{left:150%}}
        @keyframes blobFloat{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(20px,-20px) scale(1.06)}}
        .blob1{animation:floatBlob 12s ease-in-out infinite}
        .blob2{animation:floatBlob 12s ease-in-out -4s infinite}
        .blob3{animation:floatBlob 12s ease-in-out -8s infinite}
        .anim-avatar{animation:avatarIn 0.6s cubic-bezier(.34,1.56,.64,1) both}
        .spin-ring{animation:spinRing 4s linear infinite}
        .anim-u1{animation:fadeUp .5s .15s both}
        .anim-u2{animation:fadeUp .5s .2s both}
        .anim-u3{animation:fadeUp .5s .25s both}
        .anim-u5{animation:fadeUp .5s .4s both}
        .anim-cta{animation:fadeUp .5s .6s both}
        .blink-dot{animation:blinkDot 2s ease-in-out infinite}
        .ic-shimmer::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent);animation:shimmer 3s ease-in-out infinite}
        .btn-shimmer::before{content:'';position:absolute;top:0;left:-100%;width:70%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);transition:left .5s ease}
        .btn-shimmer:hover::before{left:150%}
        .card-hover:hover{transform:translateY(-2px);border-color:rgba(59,130,246,.2);box-shadow:0 8px 24px rgba(37,99,235,.1),0 1px 0 rgba(255,255,255,.8) inset}
      `}</style>

      {/* BG Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="blob1 absolute w-[500px] h-[500px] rounded-full -top-[150px] -left-[100px] opacity-[.18] blur-[60px]" style={{ background: "radial-gradient(circle,#3b82f6,transparent 70%)" }} />
        <div className="blob2 absolute w-[400px] h-[400px] rounded-full -bottom-[100px] -right-[80px] opacity-[.18] blur-[60px]" style={{ background: "radial-gradient(circle,#1d4ed8,transparent 70%)" }} />
        <div className="blob3 absolute w-[300px] h-[300px] rounded-full top-[40%] left-[60%] opacity-[.18] blur-[60px]" style={{ background: "radial-gradient(circle,#60a5fa,transparent 70%)" }} />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-[100] h-[60px] flex items-center justify-between px-5 bg-white/70 backdrop-blur-2xl border-b border-blue-100/60">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-[9px] flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", boxShadow: "0 2px 10px rgba(37,99,235,.35)" }}
          >
            <User size={16} color="#fff" />
          </div>
          <span className="font-semibold text-[15px] text-[#1e3a5f] tracking-tight">Profil Saya</span>
        </div>
        <span
          className="text-[10px] font-semibold rounded-full px-3 py-1 uppercase tracking-[1px] border"
          style={{
            background: roleColor(currentUser?.role).bg,
            borderColor: roleColor(currentUser?.role).border,
            color: roleColor(currentUser?.role).text,
          }}
        >
          {roleLabel(currentUser?.role)}
        </span>
      </nav>

      {/* HERO */}
      <div
        className="relative z-10 px-5 pt-10 pb-[100px] overflow-hidden"
        style={{ background: "linear-gradient(150deg,#1e3a8a 0%,#1d4ed8 40%,#2563eb 70%,#3b82f6 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full -top-[200px] -right-[150px] pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(255,255,255,.12) 0%,transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[60px] bg-[#eef3fb] z-20"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />

        <div className="relative z-30 max-w-[480px] mx-auto flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-[22px]">
            <div
              className="anim-avatar relative w-[116px] h-[116px] rounded-full p-[3px]"
              style={{
                background: "linear-gradient(135deg,rgba(255,255,255,.5),rgba(255,255,255,.1))",
                boxShadow: "0 12px 40px rgba(0,0,0,.25),0 0 0 6px rgba(255,255,255,.08)",
              }}
            >
              <div
                className="spin-ring absolute rounded-full pointer-events-none"
                style={{
                  inset: "-6px",
                  background: "conic-gradient(from 0deg,transparent 0deg,rgba(255,255,255,.35) 60deg,transparent 120deg)",
                }}
              />
              <div className="relative w-full h-full rounded-full bg-white/[.12] backdrop-blur-xl flex items-center justify-center overflow-hidden">
                <User size={48} color="rgba(255,255,255,.85)" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <p className="anim-u1 text-[9px] font-bold tracking-[3.5px] uppercase text-white/45 mb-2">
            Akun Aktif
          </p>
          <h2
            className="anim-u2 text-[32px] font-bold text-white text-center mb-3 leading-tight"
            style={{ fontFamily: "'Fraunces',serif", letterSpacing: "-0.5px", textShadow: "0 2px 16px rgba(0,0,0,.2)" }}
          >
            {currentUser?.username ?? "Memuat..."}
          </h2>
          <div className="anim-u3 inline-flex items-center gap-[7px] bg-white/[.13] border border-white/20 backdrop-blur-lg rounded-full px-4 py-[6px] text-[12px] font-medium text-white/85">
            <span
              className="blink-dot w-[6px] h-[6px] rounded-full flex-shrink-0"
              style={{ background: "#93c5fd", boxShadow: "0 0 8px #93c5fd" }}
            />
            {roleLabel(currentUser?.role)}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-20 max-w-[500px] mx-auto px-4 pb-10">
        {/* Section header */}
        <div className="anim-u5 flex items-center gap-2 mt-2 mb-3.5">
          <span className="text-[9px] font-bold tracking-[2.5px] uppercase text-slate-400">
            Informasi Akun
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,#cbd5e1,transparent)" }} />
        </div>

        {/* 3 Cards */}
        <div className="flex flex-col gap-3">
          {infoCards.map(({ icon: Icon, label, value, desc }, i) => (
            <div
              key={label}
              className="card-hover bg-white/90 backdrop-blur-xl border border-white/90 rounded-[18px] p-5 flex items-center gap-4 cursor-default transition-all duration-[250ms]"
              style={{
                boxShadow: "0 2px 12px rgba(37,99,235,.06),0 1px 0 rgba(255,255,255,.8) inset",
                animation: `fadeUp .5s ${0.35 + i * 0.08}s both`,
              }}
            >
              <div
                className="ic-shimmer relative w-[48px] h-[48px] rounded-[14px] flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg,#dbeafe,#bfdbfe)",
                  boxShadow: "0 2px 8px rgba(37,99,235,.12),0 1px 0 rgba(255,255,255,.7) inset",
                }}
              >
                <Icon size={21} color="#2563eb" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-slate-400 mb-[3px]">
                  {label}
                </div>
                <div className="text-[15px] font-bold text-[#1e3a5f] tracking-tight truncate">
                  {value}
                </div>
                <div className="text-[10px] text-slate-400 mt-[2px]">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="anim-cta mt-5">
          <Link
            href="/home"
            className="btn-shimmer relative overflow-hidden flex items-center justify-center gap-2.5 w-full py-4 text-white font-semibold text-[14px] tracking-tight rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
              boxShadow: "0 6px 24px rgba(37,99,235,0.35),0 1px 0 rgba(255,255,255,0.15) inset",
            }}
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
