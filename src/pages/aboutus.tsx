import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Ship,
  Truck,
  Boxes,
  Plane,
  FileText,
  Package,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const RUBY_RED = "#BC0018";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const AboutUs: React.FC = () => {
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
        {/* ABOUT SECTION */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* LEFT IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full flex justify-center"
              >
                <div className="w-full max-w-xl rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.18)] bg-slate-100">
                  <img
                    src="/Dubai.jpg"
                    alt="Haixun Global operations"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* RIGHT TEXT */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p
                  className="text-sm font-semibold tracking-[0.22em] uppercase"
                  style={{ color: RUBY_RED }}
                >
                  Who We Are
                </p>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  About Haixun Global
                </h1>

                <p className="text-lg leading-relaxed text-gray-700">
                  Haixun Global stands on a powerful legacy of over three
                  decades in the logistics and supply chain industry. With deep
                  expertise in sea freight, land transportation, air cargo,
                  customs clearance, warehousing, and distribution, we deliver
                  end-to-end logistics solutions for businesses of all sizes.
                </p>

                <p className="text-lg leading-relaxed text-gray-700">
                  Our growth across China, India, Malaysia, the UAE, and other
                  key regions reflects our commitment to operational excellence,
                  responsive service, and seamless cross-border movement. Every
                  shipment is handled with precision, transparency, and a strong
                  customer-first approach.
                </p>

                <p className="text-lg leading-relaxed text-gray-700">
                  Haixun Global Shenzhen—established in 2019—represents the
                  Group’s strong and rapidly expanding presence in China.
                  Although young as a branch, it draws strength from the Group’s
                  30+ years of logistics expertise, global network, and trusted
                  partnerships.
                </p>

                <div className="grid gap-4 sm:grid-cols-2 text-sm text-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Tailored Transport Plans
                    </h3>
                    <p>
                      Solutions built around cargo type, route complexity, and
                      delivery timelines to optimise cost and reliability.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Certified & Compliant
                    </h3>
                    <p>
                      Safe, compliant handling for Flat Rack, Open Top,
                      Breakbulk and traditional container shipping.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to="/contact">
                    <Button
                      className="text-white rounded-full px-8"
                      style={{ backgroundColor: RUBY_RED }}
                    >
                      {t("nav.contact")}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION – CARD STYLE LIKE REFERENCE */}
        <section
          className="py-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/service-bg02.jpg')" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-sm font-semibold tracking-[0.25em] uppercase text-slate-100 mb-4">
                What We Do
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                We Offer Cost-Efficient
                <br />
                Transport Shipping Solutions
              </h2>
            </motion.div>

            {/* Cards */}
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
              {/* 1. LCL Services */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-white rounded-[26px] shadow-[0_18px_50px_rgba(15,23,42,0.30)] overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1547153760-18fc86324498?w=900&q=80"
                    alt="LCL Services"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute left-7 -bottom-7">
                    <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center justify-center">
                      <Ship className="w-6 h-6" style={{ color: RUBY_RED }} />
                    </div>
                  </div>
                </div>

                <div className="px-8 pt-12 pb-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      LCL Services
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      HAIXUN operate own consolidation service on many trade
                      routes, providing complete Less-Than Container Load
                      solutions.
                    </p>
                  </div>

                  <div className="mt-8 flex items-end justify-between">
                    <Link
                      to={getNavLink("/services/lcl")}
                      className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-[#BC0018]"
                    >
                      Explore More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <span className="text-4xl font-semibold text-slate-200">
                      01
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 2. FCL Services */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75 }}
                viewport={{ once: true }}
                className="bg-white rounded-[26px] shadow-[0_18px_50px_rgba(15,23,42,0.30)] overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80"
                    alt="FCL Services"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute left-7 -bottom-7">
                    <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center justify-center">
                      <Ship className="w-6 h-6" style={{ color: RUBY_RED }} />
                    </div>
                  </div>
                </div>

                <div className="px-8 pt-12 pb-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      FCL Services
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Own fleet of containers, including special equipment, for
                      flexible full-container load solutions across key trade
                      lanes.
                    </p>
                  </div>

                  <div className="mt-8 flex items-end justify-between">
                    <Link
                      to={getNavLink("/services/fcl")}
                      className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-[#BC0018]"
                    >
                      Explore More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <span className="text-4xl font-semibold text-slate-200">
                      02
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 3. OOG Shipments */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-[26px] shadow-[0_18px_50px_rgba(15,23,42,0.30)] overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=900&q=80"
                    alt="OOG Shipments"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute left-7 -bottom-7">
                    <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center justify-center">
                      <Package
                        className="w-6 h-6"
                        style={{ color: RUBY_RED }}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-8 pt-12 pb-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      OOG Shipments
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Handling oversized and heavy-lift cargo, including
                      lashing, special equipment planning, and survey
                      coordination.
                    </p>
                  </div>

                  <div className="mt-8 flex items-end justify-between">
                    <Link
                      to={getNavLink("/services/oog-shipments")}
                      className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-[#BC0018]"
                    >
                      Explore More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <span className="text-4xl font-semibold text-slate-200">
                      03
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 4. LCL Consolidation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85 }}
                viewport={{ once: true }}
                className="bg-white rounded-[26px] shadow-[0_18px_50px_rgba(15,23,42,0.30)] overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=900&q=80"
                    alt="LCL Consolidation"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute left-7 -bottom-7">
                    <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center justify-center">
                      <ClipboardList
                        className="w-6 h-6"
                        style={{ color: RUBY_RED }}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-8 pt-12 pb-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      LCL Consolidation
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Combining smaller shipments into efficiently planned
                      consolidated containers for optimised space and cost.
                    </p>
                  </div>

                  <div className="mt-8 flex items-end justify-between">
                    <Link
                      to={getNavLink("/services/lcl-consolidation")}
                      className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-[#BC0018]"
                    >
                      Explore More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <span className="text-4xl font-semibold text-slate-200">
                      04
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 5. Warehouse Management */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-white rounded-[26px] shadow-[0_18px_50px_rgba(15,23,42,0.30)] overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80"
                    alt="Warehouse Management"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute left-7 -bottom-7">
                    <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center justify-center">
                      <Boxes className="w-6 h-6" style={{ color: RUBY_RED }} />
                    </div>
                  </div>
                </div>

                <div className="px-8 pt-12 pb-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Warehouse Management
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Comprehensive facilities for warehousing, cold storage,
                      and specialised commodities with efficient inventory
                      control.
                    </p>
                  </div>

                  <div className="mt-8 flex items-end justify-between">
                    <Link
                      to={getNavLink("/services/warehouse-management")}
                      className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-[#BC0018]"
                    >
                      Explore More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <span className="text-4xl font-semibold text-slate-200">
                      05
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 6. Project Logistics */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75 }}
                viewport={{ once: true }}
                className="bg-white rounded-[26px] shadow-[0_18px_50px_rgba(15,23,42,0.30)] overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=900&q=80"
                    alt="Project Logistics"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute left-7 -bottom-7">
                    <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center justify-center">
                      <Truck className="w-6 h-6" style={{ color: RUBY_RED }} />
                    </div>
                  </div>
                </div>

                <div className="px-8 pt-12 pb-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Project Logistics
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Dedicated division managing end-to-end project logistics
                      for critical industries and time-bound movements.
                    </p>
                  </div>

                  <div className="mt-8 flex items-end justify-between">
                    <Link
                      to={getNavLink("/services/project-logistics")}
                      className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-[#BC0018]"
                    >
                      Explore More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <span className="text-4xl font-semibold text-slate-200">
                      06
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 7. Air Shipments */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-[26px] shadow-[0_18px_50px_rgba(15,23,42,0.30)] overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534448311378-1e193fb2570e?w=900&q=80"
                    alt="Air Shipments"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute left-7 -bottom-7">
                    <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center justify-center">
                      <Plane className="w-6 h-6" style={{ color: RUBY_RED }} />
                    </div>
                  </div>
                </div>

                <div className="px-8 pt-12 pb-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Air Shipments
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Customised sea–air and air–sea options for time-critical
                      cargo requiring faster transit.
                    </p>
                  </div>

                  <div className="mt-8 flex items-end justify-between">
                    <Link
                      to={getNavLink("/services/air-shipments")}
                      className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-[#BC0018]"
                    >
                      Explore More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <span className="text-4xl font-semibold text-slate-200">
                      07
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 8. Customs Declaration & Insurance */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85 }}
                viewport={{ once: true }}
                className="bg-white rounded-[26px] shadow-[0_18px_50px_rgba(15,23,42,0.30)] overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80"
                    alt="Customs Declaration & Insurance"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute left-7 -bottom-7">
                    <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center justify-center">
                      <FileText
                        className="w-6 h-6"
                        style={{ color: RUBY_RED }}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-8 pt-12 pb-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Customs Declaration & Insurance
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Complete compliance, documentation, and insurance support
                      for smooth shipment clearance and risk coverage.
                    </p>
                  </div>

                  <div className="mt-8 flex items-end justify-between">
                    <Link
                      to={getNavLink("/services/customs-declaration")}
                      className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-[#BC0018]"
                    >
                      Explore More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <span className="text-4xl font-semibold text-slate-200">
                      08
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
