import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdvantagesSection from "@/components/AdvantagesSection";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const Advantages = () => {
  return (
    <div className="bg-white min-h-screen">
      <ScrollToTop />
      <Navigation />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-gray-900 to-red-900">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Advantages
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Excellence through capacity, service, and expertise
            </p>
          </div>
        </section>
        <AdvantagesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Advantages;
