import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Truck, Ship } from "lucide-react";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const AboutUs = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const detected = getCurrentCountryFromPath(location.pathname);
  const currentCountry = detected ?? { code: "SG", name: "Singapore" };

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    return `/${currentCountry.name.toLowerCase().replace(/\s+/g, "-")}${basePath}`;
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />
      <main className="flex-grow pt-20">
        {/* Hero / About Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-50" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                About Haixun Global
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-700">
                30+ Years of Logistics Excellence
              </p>
            </motion.div>

            {/* Two-column text: left + right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              {/* LEFT SIDE CONTENT */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-900">
                  About Haixun Global
                </h2>

                <p className="text-lg leading-relaxed text-gray-700">
                  Haixun Global stands on a powerful legacy of over three decades
                  in the logistics and supply chain industry. With deep expertise
                  in sea freight, land transportation, air cargo, customs
                  clearance, warehousing, and distribution, we deliver complete
                  end-to-end logistics solutions for businesses of all sizes.
                </p>

                <p className="text-lg leading-relaxed text-gray-700">
                  Our growth across China, India, Malaysia, the UAE, and other
                  major trade hubs highlights our commitment to operational
                  excellence, responsive service, and seamless cross-border
                  movement. Every shipment is handled with precision,
                  transparency, and a strong customer-first approach.
                </p>

                <Link to="/contact" className="inline-block pt-2">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    {t("nav.contact")}
                  </Button>
                </Link>
              </motion.div>

              {/* RIGHT SIDE CONTENT */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>

                <p className="text-lg leading-relaxed text-gray-700">
                  Established in 2019, Haixun Global Shenzhen represents the
                  Group’s strong and rapidly expanding presence in China.
                  Although young as a branch, it draws power from the Group’s
                  30+ years of logistics expertise, global network, and trusted
                  partnerships.
                </p>

                <p className="text-lg leading-relaxed text-gray-700">
                  We specialise in creating personalised transport solutions
                  based on cargo requirements, trade lane specifics, and
                  delivery timelines. Whether Flat Rack, Open Top, Breakbulk,
                  OOG, or standard container shipping — we ensure every movement
                  is compliant, safe, and cost-efficient.
                </p>

                <p className="text-lg leading-relaxed text-gray-700">
                  Backed by a strong commitment to punctuality, safety, and
                  transparent communication, Haixun Global continues to be a
                  preferred logistics partner for companies seeking reliability
                  in global operations.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-kargon-blue mb-6">
                Our Core Services
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* LCL Service */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl p-8 bg-slate-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-kargon-blue rounded-full flex items-center justify-center mr-4">
                    <Ship className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-kargon-blue">
                    LCL Services
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Haixun Global offers flexible Less-Than Container Load (LCL)
                  solutions for customers who need reliable, cost-efficient,
                  consolidated shipments. We design LCL movements that optimise
                  space, reduce freight costs, and ensure timely delivery across
                  key trade lanes.
                </p>
                <Link
                  to={getNavLink("/services/lcl")}
                  className="text-kargon-red font-medium hover:underline"
                >
                  Read more →
                </Link>
              </motion.div>

              {/* CFS / Warehouse Service */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="rounded-2xl p-8 bg-slate-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-kargon-blue rounded-full flex items-center justify-center mr-4">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-kargon-blue">
                    CFS & Warehouse Services
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Our Container Freight Station (CFS) and dedicated warehousing
                  facilities are equipped to handle diverse cargo types,
                  including Flat Rack, Open Top, and Breakbulk. With experienced
                  teams and modern handling equipment, we ensure cargo is
                  received, stored, and dispatched safely and efficiently.
                </p>
                <Link
                  to={getNavLink("/services/cfs")}
                  className="text-kargon-red font-medium hover:underline"
                >
                  Read more →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats / Trust Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              Why Businesses Trust Haixun Global
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="text-4xl font-bold text-kargon-red mb-2">
                  30+
                </div>
                <div className="text-gray-700 font-medium">
                  Years of Industry Experience
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="text-4xl font-bold text-kargon-red mb-2">
                  Multi-
                </div>
                <div className="text-gray-700 font-medium">
                  Modal Transport Expertise
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="text-4xl font-bold text-kargon-red mb-2">
                  5+
                </div>
                <div className="text-gray-700 font-medium">
                  Key Global Regions Served
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="text-4xl font-bold text-kargon-red mb-2">
                  24/7
                </div>
                <div className="text-gray-700 font-medium">
                  Commitment to Service & Support
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
