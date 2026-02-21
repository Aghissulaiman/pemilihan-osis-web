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
        setScrolled(window.scrollY > 40);
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

    const links = [
      { name: "Beranda", href: "#home" },
      { name: "Panduan", href: "#panduan" },
      { name: "Para Kandidat", href: "#kandidat" },
    ];

    return (
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            className={`text-2xl font-bold transition ${
              scrolled ? "text-blue-600" : "text-white"
            }`}
          >
            OSIS
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium transition ${
                  scrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-blue-100 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  scrolled
                    ? "bg-blue-100 text-blue-700"
                    : "bg-white/20 text-white backdrop-blur"
                }`}
              >
                <User size={18} />
                Profil
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition"
                  >
                    <User size={16} /> Profil Saya
                  </Link>

                  <Link
                    href="/riwayat"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition"
                  >
                    <History size={16} /> Riwayat Voting
                  </Link>

                  <Link
                    href="/pengaturan"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition"
                  >
                    <Settings size={16} /> Pengaturan
                  </Link>

                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>
    );
  }