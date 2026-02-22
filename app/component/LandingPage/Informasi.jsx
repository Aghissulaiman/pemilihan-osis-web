"use client";

export default function Informasi() {
  return (
    <section id="info" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cara Menggunakan
          </h2>
          <p className="text-gray-600">
            Ikuti langkah-langkah berikut untuk memberikan suara dalam pemilihan
            Ketua dan Wakil Ketua OSIS SMK Taruna Bhakti.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto">
          
          {/* Step 1 */}
          <div className="flex gap-6 mb-8">
            <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-base font-medium text-gray-700">1</span>
            </div>
            <div className="flex-1 pb-8 border-b border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Login ke Sistem
              </h3>
              <p className="text-sm text-gray-600">
                Masuk menggunakan akun yang telah diberikan oleh panitia OSIS. 
                Gunakan username dan password yang sudah didaftarkan sebelumnya.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-6 mb-8">
            <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-base font-medium text-gray-700">2</span>
            </div>
            <div className="flex-1 pb-8 border-b border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Lihat Profil Kandidat
              </h3>
              <p className="text-sm text-gray-600">
                Pelajari visi, misi, dan program kerja dari masing-masing 
                kandidat Ketua dan Wakil Ketua OSIS. Pastikan kamu mengenal 
                calon pemimpinmu.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-6 mb-8">
            <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-base font-medium text-gray-700">3</span>
            </div>
            <div className="flex-1 pb-8 border-b border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Pilih Kandidat
              </h3>
              <p className="text-sm text-gray-600">
                Klik tombol pilih pada kandidat yang kamu inginkan. 
                Pastikan pilihanmu sudah benar sebelum melanjutkan ke tahap berikutnya.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-6 mb-8">
            <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-base font-medium text-gray-700">4</span>
            </div>
            <div className="flex-1 pb-8 border-b border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Konfirmasi Pilihan
              </h3>
              <p className="text-sm text-gray-600">
                Periksa kembali pilihanmu. Jika sudah yakin, klik tombol konfirmasi 
                untuk mengunci suara. Ingat, suara yang sudah dikonfirmasi tidak dapat diubah.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-base font-medium text-gray-700">5</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selesai
              </h3>
              <p className="text-sm text-gray-600">
                Kamu akan menerima notifikasi bahwa suaramu telah berhasil direkam. 
                Jangan lupa untuk logout setelah selesai.
              </p>
            </div>
          </div>

        </div>

        {/* Note */}
        <div className="text-center mt-16">
          <p className="text-sm text-gray-500">
            Pastikan koneksi internet stabil selama proses pemilihan berlangsung.
            Jika mengalami kendala, hubungi panitia OSIS.
          </p>
        </div>

      </div>
    </section>
  );
}