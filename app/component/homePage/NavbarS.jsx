"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut, Settings, History } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  const links = [
    { name: "Beranda", href: "#home" },
    { name: "Panduan", href: "#panduan" },
    { name: "Para Kandidat", href: "#kandidat" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo - SAMA PERSIS DENGAN LANDING */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, "#home")}
          className="text-2xl font-bold text-blue-600 tracking-tight"
        >
          OSIS
          <span className="text-gray-700 text-sm ml-1 hidden sm:inline">
            SMK Taruna Bhakti
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="relative text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {/* Profile Dropdown - Menggantikan Login Button dengan styling yang sama */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-blue-500/30"
            >
              <User size={18} />
              Profil
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <Link
                  href="/home/profile"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition"
                  onClick={() => setProfileOpen(false)}
                >
                  <User size={16} /> Profil Saya
                </Link>

                <Link
                  href="/home/riwayat"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition"
                  onClick={() => setProfileOpen(false)}
                >
                  <History size={16} /> Riwayat Voting
                </Link>

                <Link
                  href="/pengaturan"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition"
                  onClick={() => setProfileOpen(false)}
                >
                  <Settings size={16} /> Pengaturan
                </Link>

                <Link
                  href="/login"
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t"
                  onClick={() => setProfileOpen(false)}
                >
                  <LogOut size={16} /> Logout
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu - SAMA PERSIS DENGAN LANDING TAPI FITURNYA DIGANTI */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ${
          open ? "top-full opacity-100" : "top-[-500px] opacity-0"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="block text-gray-700 font-medium hover:text-blue-600 transition"
            >
              {link.name}
            </a>
          ))}

          {/* Profile Menu Items untuk Mobile */}
          <div className="py-2 px-4 rounded-lg bg-blue-50 text-blue-700 text-center font-semibold">
            Menu Profil
          </div>

          <Link
            href="/profile"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-4 py-2"
            onClick={() => setOpen(false)}
          >
            <User size={18} />
            Profil Saya
          </Link>

          <Link
            href="/riwayat"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-4 py-2"
            onClick={() => setOpen(false)}
          >
            <History size={18} />
            Riwayat Voting
          </Link>

          <Link
            href="/pengaturan"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-4 py-2"
            onClick={() => setOpen(false)}
          >
            <Settings size={18} />
            Pengaturan
          </Link>

          <Link href="/login">
            <button className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-full font-medium hover:bg-red-700 transition shadow-md mt-4">
              <LogOut size={18} />
              Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}