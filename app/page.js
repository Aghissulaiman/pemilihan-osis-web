"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./component/SplashScreen";

import Footer from "./component/landingPage/Footer";
import Hero from "./component/landingPage/Hero";
import Informasi from "./component/landingPage/Informasi";
import Navbar from "./component/landingPage/Navbar";
import Tentang from "./component/landingPage/Tentang";

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