import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import UseCases from "@/components/UseCase";
import HowItWorks from "@/components/HowItWorks";
import ContactForm from "@/components/ContactForm";
import CtaBanner from "@/components/CtaBanner";
import ChatArgix from "@/components/ChatArgix";
import FloatingChatLauncher from "@/components/FloatingChatLauncher";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Features />
      <UseCases />

      {/* Inline: punto estratégico */}
      <section id="demo-chat" className="scroll-mt-24 my-12 sm:my-16">
        <ChatArgix />
      </section>

      <HowItWorks />
      <ContactForm />
      <CtaBanner />
      <Footer />

      {/* Launcher global (mobile + desktop) */}
      <FloatingChatLauncher />
    </>
  );
}
