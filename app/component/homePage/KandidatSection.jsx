"use client"

import React, { useState } from 'react';
import { kandidat } from "../../lib/data/landingData"

const VotingSystem = () => {
  const [showDetailPopUp, setShowDetailPopUp] = useState(false);
  const [showConfirmPopUp, setShowConfirmPopUp] = useState(false);
  const [selectedKandidat, setSelectedKandidat] = useState(null);

  const handleVoteClick = (kandidat) => {
    setSelectedKandidat(kandidat);
    setShowDetailPopUp(true);
  };

  const handleCloseDetailPopUp = () => {
    setShowDetailPopUp(false);
    setSelectedKandidat(null);
  };

  const handleConfirmDetail = () => {
    setShowDetailPopUp(false);
    setShowConfirmPopUp(true);
  };

  const handleCloseConfirmPopUp = () => {
    setShowConfirmPopUp(false);
    setSelectedKandidat(null);
  };

  const handleFinalConfirm = () => {
    alert(`Terima kasih! Suara Anda untuk ${selectedKandidat.nama} telah direkam.`);
    setShowConfirmPopUp(false);
    setSelectedKandidat(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header dengan desain premium */}
      <div className="relative bg-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-50 rounded-full -ml-24 -mb-24 opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
        
            <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Pemilihan Ketua OSIS
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Pilih pemimpin yang akan membawa perubahan positif untuk masa depan yang lebih baik
            </p>
            <div className="mt-8 flex justify-center space-x-2">
              <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
              <div className="h-1 w-12 bg-gray-300 rounded-full"></div>
              <div className="h-1 w-12 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Daftar Kandidat dengan desain card premium */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Daftar Kandidat</h2>
          <p className="text-gray-500">Pilih salah satu kandidat terbaik berikut ini</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kandidat.map((kandidatItem, index) => (
            <div 
              key={kandidatItem.id} 
              className="group relative bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300"
            >
              {/* Card decoration */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              
              {/* Foto Kandidat dengan efek premium */}
              <div className="relative h-56 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity"></div>
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full"></div>
                
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-light shadow-2xl ring-4 ring-white/30 transform group-hover:scale-105 transition-transform duration-300">
                    {kandidatItem.nama.charAt(0)}
                  </div>
                </div>
                
                {/* Badge nomor urut */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur text-gray-900 text-sm font-semibold shadow-lg">
                    {kandidatItem.id}
                  </span>
                </div>
              </div>

              {/* Info Kandidat */}
              <div className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {kandidatItem.nama}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium">
                    {kandidatItem.kelas}
                  </p>
                </div>
                
                {/* Visi */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    "{kandidatItem.visi}"
                  </p>
                </div>

                {/* Misi preview */}
                <div className="space-y-2 mb-6">
                  {kandidatItem.misi.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-gray-500">
                      <span className="inline-block w-1 h-1 rounded-full bg-blue-600 mt-1.5"></span>
                      <span className="flex-1">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tombol Vote */}
                <button
                  onClick={() => handleVoteClick(kandidatItem)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-sm font-semibold shadow-lg shadow-blue-600/20"
                >
                  Berikan Suara
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pop Up Detail Kandidat - Landscape dengan Foto di Kiri */}
      {showDetailPopUp && selectedKandidat && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Overlay dengan blur */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={handleCloseDetailPopUp}
          ></div>

          {/* Modal Landscape */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Left Side - Foto Kandidat Full Height */}
                <div className="md:w-5/12 bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex flex-col items-center justify-center relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]"></div>
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-7xl font-light shadow-2xl ring-4 ring-white/30">
                      {selectedKandidat.nama.charAt(0)}
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {selectedKandidat.nama}
                    </h3>
                    <p className="text-blue-300 text-xl mb-4">
                      {selectedKandidat.kelas}
                    </p>
                    
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-white text-2xl font-semibold border-2 border-white/30">
                      #{selectedKandidat.id}
                    </div>
                  </div>

                  {/* Tombol close di kiri atas */}
                  <button
                    onClick={handleCloseDetailPopUp}
                    className="absolute top-4 left-4 text-white/60 hover:text-white focus:outline-none"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Right Side - Informasi Lengkap */}
                <div className="md:w-7/12 p-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">
                    Informasi Kandidat
                  </h4>

                  {/* Visi */}
                  <div className="mb-6">
                    <h5 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Visi
                    </h5>
                    <p className="text-gray-700 bg-gray-50 rounded-lg p-4 border border-gray-100">
                      {selectedKandidat.visi}
                    </p>
                  </div>

                  {/* Misi - Semua ditampilkan */}
                  <div className="mb-8">
                    <h5 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Misi
                    </h5>
                    <ul className="space-y-3">
                      {selectedKandidat.misi.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-sm text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCloseDetailPopUp}
                      className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 text-sm font-semibold"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleConfirmDetail}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-sm font-semibold shadow-lg shadow-blue-600/20"
                    >
                      Lanjutkan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pop Up Konfirmasi Akhir - Anda Yakin? */}
      {showConfirmPopUp && selectedKandidat && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Overlay dengan blur */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={handleCloseConfirmPopUp}
          ></div>

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
              {/* Header modal dengan dekorasi */}
              <div className="relative h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-t-2xl"></div>
              
              <div className="px-8 py-6">
                {/* Tombol close */}
                <button
                  onClick={handleCloseConfirmPopUp}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Icon Tanya */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Anda Yakin?
                  </h3>
                  <p className="text-sm text-gray-500">
                    Pastikan pilihan Anda sudah benar
                  </p>
                </div>

                {/* Informasi Kandidat Singkat */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-lg font-light">
                      {selectedKandidat.nama.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {selectedKandidat.nama}
                      </h4>
                      <p className="text-xs text-blue-600">
                        {selectedKandidat.kelas} • #{selectedKandidat.id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Peringatan */}
                <div className="bg-red-50 border border-red-400 rounded-lg p-4 mb-6">
                  <div className="flex space-x-3">
                    <svg className="h-5 w-5 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-sm text-red-700">
                      Setelah memilih, suara Anda tidak dapat diubah.
                    </p>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleCloseConfirmPopUp}
                    className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 text-sm font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleFinalConfirm}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-sm font-semibold shadow-lg shadow-blue-600/20"
                  >
                    Ya, Saya Yakin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingSystem;