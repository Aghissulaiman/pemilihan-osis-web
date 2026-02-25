"use client";

import { useState, useEffect } from "react";
import { Menu, X, LogIn,} from "lucide-react";
import Link from "next/link";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Beranda", href: "#home" },
    { name: "Tentang", href: "#about" },
    { name: "Info", href: "#info" },
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
        {/* Logo */}
        <a
          href="#home"
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
              className="relative text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {/* Highlight */}
          <div className="px-4 py-2 rounded-full bg-blue-600/10 text-blue-700 text-sm font-semibold border border-blue-200">
            Pemilihan OSIS 2027
          </div>

          {/* Login Button */}
          <Link href="/login">
          
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-blue-500/30">
            <LogIn size={18} />
            Login
          </button>
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
              onClick={() => setOpen(false)}
              className="block text-gray-700 font-medium hover:text-blue-600 transition"
            >
              {link.name}
            </a>
          ))}

          <div className="py-2 px-4 rounded-lg bg-blue-50 text-blue-700 text-center font-semibold">
            Pemilihan OSIS 2024
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-full font-medium hover:bg-blue-700 transition shadow-md">
            <LogIn size={18} />
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}