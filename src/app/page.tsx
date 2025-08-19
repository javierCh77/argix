import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import UseCases from "@/components/UseCase";
import HowItWorks from "@/components/HowItWorks";
import ContactForm from "@/components/ContactForm";
import CtaBanner from "@/components/CtaBanner";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Features />
      <UseCases />
      <HowItWorks />
      <CtaBanner />
      <ContactForm />
   
      <Footer />
    </>
  );
}
