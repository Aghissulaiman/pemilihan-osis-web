"use client"

import { useState } from "react"
import KandidatCard from "./KandidatCard"
import ModalVoteBerhasil from "./ModalVoteBerhasil"
import { kandidat } from "../../lib/data/landingData"

export default function KandidatSection() {
    const [modalOpen, setModalOpen] = useState(false)
    const [namaDipilih, setNamaDipilih] = useState("")

    const handleVote = (nama) => {
        setNamaDipilih(nama)
        setModalOpen(true)
    }

    return (
        <section className="px-6 py-20">
            <h2
                className="text-center text-2xl font-bold text-white mb-10"
                style={{ fontFamily: "Georgia, serif" }}
            >
                Kandidat Ketua OSIS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {kandidat.map((k, i) => (
                    <KandidatCard
                        key={k.id}
                        k={k}
                        delay={i * 100}
                        onVote={handleVote}
                    />
                ))}
            </div>

            <ModalVoteBerhasil
                isOpen={modalOpen}
                nama={namaDipilih}
                onClose={() => setModalOpen(false)}
            />
        </section>
    )
}