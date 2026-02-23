"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const WARNA_LIST = [
    "from-blue-500 to-cyan-400",
    "from-violet-500 to-purple-400",
    "from-amber-500 to-orange-400",
    "from-emerald-500 to-teal-400",
    "from-rose-500 to-pink-400",
]

export default function ChartHasilPemilihan({ refreshKey }) {
    const [mounted, setMounted] = useState(false)
    const [animated, setAnimated] = useState(false)
    const [dataKandidat, setDataKandidat] = useState([])

    const fetchData = async () => {
        const { data: kandidatData, error } = await supabase
            .from("kandidat")
            .select("id, nama, kelas, no_kandidat")
            .order("no_kandidat", { ascending: true })

        if (error || !kandidatData) return

        const { data: votesData } = await supabase
            .from("votes")
            .select("kandidat_id")

        const suaraMap = {}
        votesData?.forEach(v => {
            suaraMap[v.kandidat_id] = (suaraMap[v.kandidat_id] ?? 0) + 1
        })

        setDataKandidat(kandidatData.map((k, i) => ({
            ...k,
            suara: suaraMap[k.id] ?? 0,
            warna: WARNA_LIST[i % WARNA_LIST.length],
        })))
    }

    useEffect(() => {
        const t1 = setTimeout(() => setMounted(true), 200)
        return () => clearTimeout(t1)
    }, [])

    useEffect(() => {
        fetchData()
        setAnimated(false)
        const t2 = setTimeout(() => setAnimated(true), 400)
        return () => clearTimeout(t2)
    }, [refreshKey])

    useEffect(() => {
        const channel = supabase
            .channel("realtime-chart")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "votes" }, () => { fetchData() })
            .on("postgres_changes", { event: "DELETE", schema: "public", table: "votes" }, () => { fetchData() })
            .subscribe()
        return () => { supabase.removeChannel(channel) }
    }, [])

    const totalSuara = dataKandidat.reduce((sum, k) => sum + (k.suara ?? 0), 0)
    const maxSuara = Math.max(...dataKandidat.map((k) => k.suara ?? 0), 1)

    return (
        <div
            className={`
                bg-white border border-gray-100 rounded-2xl p-6 shadow-sm
                transition-all duration-500
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-gray-900 font-bold text-lg">📊 Hasil Pemilihan</h2>
                    <p className="text-gray-500 text-xs mt-1">Real-time perolehan suara kandidat</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                    Live
                </span>
            </div>

            {dataKandidat.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                    <span className="text-3xl mb-2">📊</span>
                    <p className="text-sm">Belum ada data kandidat</p>
                </div>
            ) : (
                <div className="space-y-5">
                    {dataKandidat.map((k, i) => {
                        const persen = totalSuara > 0 ? Math.round((k.suara / totalSuara) * 100) : 0
                        const barWidth = maxSuara > 0 ? (k.suara / maxSuara) * 100 : 0

                        return (
                            <div key={k.id} className="group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${k.warna} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                                            {i + 1}
                                        </div>
                                        <div>
                                            <p className="text-gray-900 text-sm font-semibold">{k.nama}</p>
                                            <p className="text-gray-400 text-[11px]">{k.kelas}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-gray-900 font-bold text-lg">{k.suara}</span>
                                        <span className="text-gray-400 text-xs ml-1">suara</span>
                                        <p className="text-gray-400 text-[11px]">{persen}%</p>
                                    </div>
                                </div>

                                <div className="relative h-7 bg-gray-100 rounded-xl overflow-hidden">
                                    <div
                                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${k.warna} rounded-xl transition-all duration-1000 ease-out`}
                                        style={{ width: animated ? `${barWidth}%` : "0%" }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-gray-500 text-xs">Total suara masuk</p>
                <p className="text-gray-900 font-bold text-xl">{totalSuara}</p>
            </div>
        </div>
    )
}
