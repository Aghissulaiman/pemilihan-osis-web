export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-white border-t border-gray-200 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Kolom 1: Logo dan deskripsi */}
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">OSIS</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Organisasi Siswa Intra Sekolah<br />
                            SMK Taruna Bhakti
                        </p>
                    </div>
                    
                    {/* Kolom 2: Copyright */}
                    <div className="text-center">
                        <p className="text-slate-500 text-sm">
                            © {currentYear} 
                            <span className="text-blue-600 font-semibold mx-1.5">Kelompok 6</span>
                        </p>
                        <p className="text-slate-400 text-xs mt-1">
                            Pemilihan Ketua OSIS 
                        </p>
                        <p className="text-slate-400 text-[10px] mt-2">
                            All rights reserved
                        </p>
                    </div>
                    
                    {/* Kolom 3: Links */}
                    <div className="text-center md:text-right">
                        <div className="space-x-4">
                            <span className="text-xs text-slate-500 hover:text-blue-600 transition-colors cursor-pointer inline-block">
                                Tentang
                            </span>
                            <span className="text-xs text-slate-500 hover:text-blue-600 transition-colors cursor-pointer inline-block">
                                Kontak
                            </span>
                            <span className="text-xs text-slate-500 hover:text-blue-600 transition-colors cursor-pointer inline-block">
                                Privasi
                            </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2">
                            v1.0.0
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}