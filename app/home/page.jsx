import Hero from "../component/homePage/Hero"
import AturanSection from "../component/homePage/AturanSection"
import KandidatSection from "../component/homePage/KandidatSection"
import Footer from "../component/homePage/Footer"
import Navbar from "../component/homePage/NavbarS"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
            <Navbar/>
            <Hero />
            <AturanSection />
            <KandidatSection />
            <Footer />
        </div>
    )
}