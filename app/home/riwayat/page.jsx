"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function RiwayatVotingPage() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Ambil user dari cookie / localStorage
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

  // Fetch riwayat vote dari Supabase
  useEffect(() => {
    if (!currentUser) return;

    const fetchRiwayat = async () => {
      setLoading(true);
      try {
        // Ambil data vote user ini
        const { data: voteData, error: voteErr } = await supabase
          .from("votes")
          .select("id, kandidat_id, created_at")
          .eq("user_id", String(currentUser.id));

        if (voteErr) throw voteErr;

        if (!voteData || voteData.length === 0) {
          setRiwayat([]);
          setLoading(false);
          return;
        }

        // Ambil data kandidat yang dipilih
        const kandidatIds = voteData.map((v) => v.kandidat_id);
        const { data: kandidatData, error: kandErr } = await supabase
          .from("kandidat")
          .select("id, nama, kelas")
          .in("id", kandidatIds);

        if (kandErr) throw kandErr;

        // Gabungkan data
        const hasil = voteData.map((v) => {
          const kandidat = kandidatData?.find((k) => k.id === v.kandidat_id);
          const tgl = new Date(v.created_at);
          return {
            id: v.id,
            kandidat: kandidat?.nama ?? "Tidak diketahui",
            kelas: kandidat?.kelas ?? "-",
            tanggal: tgl.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            waktu:
              tgl.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              }) + " WIB",
            status: "Berhasil",
          };
        });

        setRiwayat(hasil);
      } catch (err) {
        console.error("Error fetch riwayat:", err);
        setRiwayat([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, [currentUser]);

  return (
    <div
      className="min-h-screen bg-[#eef3fb] overflow-x-hidden relative"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,700&display=swap');
        @keyframes iconIn { from{transform:scale(0.6) translateY(20px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spinRing { to{transform:rotate(360deg)} }
        @keyframes pulseDot { 0%{box-shadow:0 0 0 0 rgba(34,197,94,0.4)} 70%{box-shadow:0 0 0 7px rgba(34,197,94,0)} 100%{box-shadow:0 0 0 0 rgba(34,197,94,0)} }
        @keyframes blobFloat { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-20px) scale(1.06)} }
        .anim-icon { animation: iconIn 0.6s cubic-bezier(.34,1.56,.64,1) both; }
        .anim-1 { animation: fadeUp 0.5s 0.15s both; }
        .anim-2 { animation: fadeUp 0.5s 0.2s both; }
        .anim-3 { animation: fadeUp 0.5s 0.25s both; }
        .anim-sec { animation: fadeUp 0.5s 0.35s both; }
        .anim-card { animation: fadeUp 0.5s 0.4s both; }
        .anim-cta { animation: fadeUp 0.5s 0.55s both; }
        .spin-ring { animation: spinRing 4s linear infinite; }
        .pulse-dot { animation: pulseDot 2s ease-out infinite; }
        .blob1 { animation: blobFloat 14s ease-in-out infinite; }
        .blob2 { animation: blobFloat 14s ease-in-out -5s infinite; }
        .btn-shimmer::before { content:''; position:absolute; top:0; left:-100%; width:70%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transition:left 0.5s ease; }
        .btn-shimmer:hover::before { left:150%; }
      `}</style>

      {/* BG Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="blob1 absolute w-[500px] h-[500px] rounded-full -top-40 -left-20 opacity-[0.15] blur-[70px] bg-blue-400" />
        <div className="blob2 absolute w-[380px] h-[380px] rounded-full -bottom-20 -right-20 opacity-[0.15] blur-[70px] bg-blue-700" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 h-[60px] flex items-center justify-between px-5 bg-white/75 backdrop-blur-2xl border-b border-blue-100/60">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-[9px] flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
              boxShadow: "0 2px 10px rgba(37,99,235,0.35)",
            }}
          >
            <CheckCircle size={16} color="#fff" />
          </div>
          <span className="font-semibold text-[15px] text-[#1e3a5f] tracking-tight">
            Riwayat Voting
          </span>
        </div>
        <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 uppercase tracking-[1px]">
          Rekap
        </span>
      </nav>

      {/* HERO */}
      <div
        className="relative z-10 px-5 pt-11 pb-24 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(150deg,#1e3a8a 0%,#1d4ed8 40%,#2563eb 70%,#3b82f6 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full -top-44 -right-36 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(255,255,255,0.1) 0%,transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-14 bg-[#eef3fb] z-20"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />

        <div className="relative z-30 max-w-md mx-auto flex flex-col items-center">
          <div
            className="anim-icon relative w-[90px] h-[90px] rounded-full p-[3px] mb-[22px]"
            style={{
              background:
                "linear-gradient(135deg,rgba(255,255,255,0.45),rgba(255,255,255,0.1))",
              boxShadow:
                "0 12px 40px rgba(0,0,0,0.2),0 0 0 6px rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="spin-ring absolute rounded-full pointer-events-none"
              style={{
                inset: "-6px",
                background:
                  "conic-gradient(from 0deg,transparent,rgba(255,255,255,0.3) 60deg,transparent 120deg)",
              }}
            />
            <div className="relative w-full h-full rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center">
              <CheckCircle
                size={36}
                color="rgba(255,255,255,0.9)"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <p className="anim-1 text-[9px] font-bold tracking-[3.5px] uppercase text-white/45 mb-2">
            Rekap Suara
          </p>
          <h2
            className="anim-2 text-[30px] font-bold text-white tracking-tight mb-2"
            style={{
              fontFamily: "'Fraunces',serif",
              textShadow: "0 2px 16px rgba(0,0,0,0.2)",
            }}
          >
            Riwayat Voting Kamu
          </h2>
          <p className="anim-3 text-[12.5px] text-white/60">
            Berikut adalah rekap suara yang telah kamu berikan
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-20 max-w-[500px] mx-auto px-4 pt-2 pb-10">
        <div className="anim-sec flex items-center gap-2 mb-3.5 mt-2">
          <span className="text-[9px] font-bold tracking-[2.5px] uppercase text-slate-400">
            Daftar Suara
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background: "linear-gradient(90deg,#cbd5e1,transparent)",
            }}
          />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="anim-card bg-white/90 backdrop-blur-xl border border-white/95 rounded-[22px] px-6 py-14 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
            <p className="text-[13px] text-slate-400">Memuat riwayat voting...</p>
          </div>
        ) : riwayat.length > 0 ? (
          <div className="flex flex-col gap-3">
            {riwayat.map((item) => (
              <div
                key={item.id}
                className="anim-card bg-white/90 backdrop-blur-xl border border-white/95 rounded-[22px] overflow-hidden"
                style={{
                  boxShadow:
                    "0 4px 24px rgba(37,99,235,0.08),0 1px 0 rgba(255,255,255,0.8) inset",
                }}
              >
                <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300" />
                <div className="p-[22px]">
                  {/* Status & Waktu */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-3 py-[5px]">
                      <span className="pulse-dot w-[7px] h-[7px] rounded-full bg-green-400 flex-shrink-0" />
                      {item.status}
                    </span>
                    <span className="inline-flex items-center gap-[5px] text-[11px] font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-full px-2.5 py-1">
                      <Clock size={11} />
                      {item.waktu}
                    </span>
                  </div>

                  {/* Kandidat */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-[58px] h-[58px] rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0 text-[22px] font-bold text-blue-600"
                      style={{
                        fontFamily: "'Fraunces',serif",
                        boxShadow:
                          "0 4px 12px rgba(37,99,235,0.15),0 1px 0 rgba(255,255,255,0.8) inset",
                      }}
                    >
                      {item.kandidat.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-slate-400 mb-1">
                        Kandidat Dipilih
                      </div>
                      <div
                        className="text-[16px] font-bold text-[#1e3a5f] tracking-tight mb-1"
                        style={{ fontFamily: "'Fraunces',serif" }}
                      >
                        {item.kandidat}
                      </div>
                      <span className="inline-flex text-[11.5px] font-medium text-blue-600 bg-blue-50 rounded-full px-2.5 py-0.5">
                        {item.kelas}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="my-[18px] h-px"
                    style={{
                      background:
                        "linear-gradient(90deg,transparent,#e2e8f0,transparent)",
                    }}
                  />

                  {/* Tanggal */}
                  <div className="flex items-center gap-2">
                    <div className="w-[34px] h-[34px] rounded-[10px] bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Calendar size={16} color="#2563eb" strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-slate-400 mb-0.5">
                        Tanggal Voting
                      </div>
                      <div className="text-[13px] font-semibold text-[#1e3a5f]">
                        {item.tanggal}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="anim-card bg-white/90 backdrop-blur-xl border border-dashed border-blue-200 rounded-[22px] px-6 py-14 text-center">
            <div
              className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mx-auto mb-[18px]"
              style={{ boxShadow: "0 4px 16px rgba(37,99,235,0.1)" }}
            >
              <CheckCircle size={32} color="#93c5fd" strokeWidth={1.5} />
            </div>
            <h3
              className="text-[20px] font-bold text-[#1e3a5f] mb-2"
              style={{ fontFamily: "'Fraunces',serif" }}
            >
              Belum Ada Riwayat
            </h3>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              Kamu belum memberikan suara.
              <br />
              Yuk gunakan hak pilihmu!
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="anim-cta mt-4">
          <Link
            href="/home"
            className="btn-shimmer relative overflow-hidden flex items-center justify-center gap-2.5 w-full py-4 text-white font-semibold text-[14px] tracking-tight rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
              boxShadow:
                "0 6px 24px rgba(37,99,235,0.35),0 1px 0 rgba(255,255,255,0.15) inset",
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
