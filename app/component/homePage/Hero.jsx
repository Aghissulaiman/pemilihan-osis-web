// components/HeroSection.jsx
"use client";

const handleScrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export default function HeroSection() {
  return (
    <section id="home" className="bg-white py-30 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
     
          {/* Main Heading */}
          <h1 className="space-y-2">
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Pilih Pemimpin
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600">
              Masa Depan SMK Taruna Bhakti
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Wujudkan perubahan positif untuk sekolah kita. Gunakan hak pilihmu dengan bijak 
            untuk memilih ketua OSIS yang visioner dan berintegritas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => handleScrollTo("kandidat")}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Lihat Kandidat
            </button>
            
            <button
              onClick={() => handleScrollTo("panduan")}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              Aturan Pemilihan
            </button>
          </div>

          {/* Optional: Simple decoration line */}
          <div className="w-24 h-1 bg-blue-200 mx-auto mt-12"></div>
        </div>
      </div>
    </section>
  );
}