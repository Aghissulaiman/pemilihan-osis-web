"use client";

export default function Tentang() {
  return (
    <section id="tentang" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Tentang Pemilihan OSIS
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Pemilihan Ketua dan Wakil Ketua OSIS merupakan kegiatan demokrasi
            tahunan yang dilaksanakan untuk memilih pemimpin terbaik di
            lingkungan SMK Taruna Bhakti.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Visi Demokrasi */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Demokratis
            </h3>
            <p className="text-gray-600 text-sm">
              Proses pemilihan dilakukan secara adil dan transparan, 
              memberikan kesempatan yang sama kepada seluruh siswa untuk memilih.
            </p>
          </div>

          {/* Transparan */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Transparan
            </h3>
            <p className="text-gray-600 text-sm">
              Sistem pemilihan dilakukan secara digital untuk memastikan
              kejujuran serta meminimalisir kesalahan dalam perhitungan suara.
            </p>
          </div>

          {/* Bertanggung Jawab */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Bertanggung Jawab
            </h3>
            <p className="text-gray-600 text-sm">
              Ketua dan Wakil Ketua OSIS terpilih diharapkan mampu menjalankan
              amanah serta membawa perubahan positif bagi sekolah.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}