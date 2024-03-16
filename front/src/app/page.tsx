import Features from "@/components/Features";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Plans from "@/components/Plans";
import AuthProvider from "@/utils/AuthProvider";

export default function Home() {
  return (
    <AuthProvider>
      <Hero />
      <Features />
      <Plans />
      <Faq />
      <Footer />
    </AuthProvider>
  );
}
