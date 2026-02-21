"use client"

import { motion } from "framer-motion"
import { aturan } from "../../lib/data/landingData"

export default function AturanSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    }

    return (
        <section id="aturan" className="py-28 px-6 md:px-12 bg-[#fafafa] overflow-hidden">
            <div className="max-w-6xl mx-auto relative">
                
                {/* Background Decor */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10" />

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
    
                    
                    <h2 className="text-4xl md:text-5xl font-extralight text-slate-900 mb-6 tracking-tight">
                        Aturan <span className="font-semibold text-blue-600">Pemilihan</span>
                    </h2>
                    
                    <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
                        Integritas adalah prioritas. Kami menyusun panduan ini untuk memastikan 
                        suara setiap siswa dihitung secara adil dan transparan.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {aturan.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="group relative bg-white border border-slate-200/60 p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 rounded-2xl"
                        >
                            {/* Decorative Number */}
                            <div className="absolute top-6 right-8 text-5xl font-black text-slate-50 group-hover:text-blue-50 transition-colors duration-500 select-none -z-0">
                                {(index + 1).toString().padStart(2, '0')}
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-slate-800 font-semibold text-xl mb-3 pr-10 group-hover:text-blue-600 transition-colors">
                                    {item.judul}
                                </h3>
                                
                                <p className="text-slate-500 text-sm leading-relaxed antialiased">
                                    {item.isi}
                                </p>
                            </div>

                            {/* Accent Corner */}
                            <div className="absolute top-0 left-0 w-2 h-0 bg-blue-600 group-hover:h-full transition-all duration-300 rounded-l-2xl"></div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Info Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-20 flex flex-col items-center"
                >
                    <div className="group cursor-help flex items-center gap-3 px-8 py-4 bg-white border border-slate-100 shadow-sm rounded-full hover:border-blue-200 transition-all">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-400 animate-ping rounded-full opacity-20"></div>
                            <svg className="relative w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                         <span className="text-xs text-blue-700">
                            Informasi lebih lanjut hubungi panitia OSIS atau guru pembimbing
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}