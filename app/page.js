import Footer from "./component/landingPage/Footer";
import Hero from "./component/landingPage/Hero";
import Informasi from "./component/landingPage/Informasi";
import Navbar from "./component/landingPage/Navbar";
import Tentang from "./component/landingPage/Tentang";

export default function landingPage (){
  return(
    <>
    <Navbar/>
    <Hero/>
    <Tentang/>
    <Informasi/>
    <Footer/>
    </>
  )
}