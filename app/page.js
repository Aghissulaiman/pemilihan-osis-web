"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./component/SplashScreen";

import Footer from "./component/landingPage/Footer.jsx";
import Hero from "./component/landingPage/Hero.jsx";
import Informasi from "./component/landingPage/Informasi.jsx";
import Navbar from "./component/landingPage/Navbar.jsx";
import Tentang from "./component/landingPage/Tentang.jsx";

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // durasi splash (ms)

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Splash Screen */}
      <SplashScreen
        isVisible={showSplash}
        onExitComplete={() => console.log("Splash selesai")}
      />

      {/* Landing Page */}
      {!showSplash && (
        <>
          <Navbar />
          <Hero />
          <Tentang />
          <Informasi />
          <Footer />
        </>
      )}
    </>
  );
}