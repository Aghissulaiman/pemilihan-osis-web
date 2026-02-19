import Hero from "../component/LandingPage/Hero"
import AturanSection from "../component/LandingPage/AturanSection"
import KandidatSection from "../component/LandingPage/KandidatSection"
import Footer from "../component/LandingPage/Footer"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
            <Hero />
            <AturanSection />
            <KandidatSection />
            <Footer />
        </div>
    )
}