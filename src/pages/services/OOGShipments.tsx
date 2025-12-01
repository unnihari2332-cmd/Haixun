import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getCurrentCountryFromPath } from "@/services/countryDetection";
import { PackageSearch } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const OOGShipments: React.FC = () => {
  const location = useLocation();

  const detected = getCurrentCountryFromPath(location.pathname);
  const currentCountry = detected ?? { code: "SG", name: "Singapore" };

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    const countrySlug = currentCountry.name.toLowerCase().replace(/\s+/g, "-");
    return `/${countrySlug}${basePath}`;
  };

  // Match other updated service pages
  const servicesNav = [
    { label: "See All Services", path: "/services" },
    { label: "LCL Services", path: "/services/lcl" },
    { label: "FCL Services", path: "/services/fcl" },
    { label: "Warehousing", path: "/services/warehousing" },
    { label: "Project Cargo", path: "/services/project-cargo" },
    { label: "Air Freight", path: "/services/air-freight" },
    { label: "Customs Clearance", path: "/services/customs-clearance" },
    { label: "Import Services", path: "/services/import" },
    { label: "Consolidation", path: "/services/consolidation" },
    { label: "OOG Shipments", path: "/services/oog-shipments" },
  ];

  const pathname = location.pathname;

  const servicesOffered = [
    "Cargo Loading",
    "Lashing",
    "Surveyor",
    "Inter Island Movement to Main Ports",
    "Export & Import Handling",
    "Ocean Freight",
    "Warehouse and Yard Facility",
    "Crane and Container Handling Equipment’s",
    "Import Stripping and Domestic Movements",
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />

      {/* Same white gap under nav as other service pages */}
      <div className="h-[90px] w-full bg-white" />

      <main className="flex-grow">
        {/* HERO – image + gradient, same style as Air Freight / Consolidation */}
        <section className="relative h-[260px] md:h-[320px] w-full overflow-hidden flex items-center">
          <img
            src="/counter-bg.webp"
            alt="OOG Shipments Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#BC0018]">
              OOG Shipments
            </h1>

            <p className="text-white text-lg mt-3 max-w-xl">
              OOG Shipments - Inter Island Movements with reliable, coordinated
              handling for over-dimensional cargo.
            </p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-[260px,1fr] items-start">
              {/* LEFT SIDEBAR – same as other service pages */}
              <aside className="space-y-10">
                <div>
                  <h2 className="text-sm font-semibold tracking-[0.15em] text-gray-900 mb-2 uppercase">
                    OUR SERVICES
                  </h2>
                  <div className="w-12 h-[2px] bg-[#BC0018] mb-5" />
                  <nav className="border border-slate-200 rounded-md overflow-hidden bg-slate-50">
                    {servicesNav.map((item) => {
                      const to = getNavLink(item.path);
                      const isActive =
                        pathname === to ||
                        (item.path !== "/services" && pathname.startsWith(to));

                      return (
                        <Link
                          key={item.path}
                          to={to}
                          className={`block px-6 py-3 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-[#BC0018] text-white"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </aside>

              {/* RIGHT CONTENT */}
              <div className="space-y-12">
                {/* TOP IMAGE */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="rounded-md overflow-hidden shadow-lg"
                >
                  <img
                    src="/oog-shipments.png"
                    alt="OOG Shipments - Inter Island Movements"
                    className="w-full h-[340px] md:h-[380px] object-cover"
                    loading="lazy"
                  />
                </motion.div>

                {/* OOG SHIPMENTS DESCRIPTION – new content */}
                <section>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BC0018]/10">
                      <PackageSearch className="w-5 h-5 text-[#BC0018]" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-extrabold tracking-wide text-gray-900 uppercase">
                        OOG Shipments - Inter Island Movements
                      </h2>
                      <div className="mt-1 w-16 h-[2px] bg-[#BC0018]" />
                    </div>
                  </div>

                  <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-700">
                    <p>
                      Our OOG (Out-of-Gauge) shipment service provides dedicated
                      handling for cargo that exceeds standard container
                      dimensions, offering reliable inter-island movements to
                      main ports with full operational coordination.
                    </p>
                  </div>
                </section>

                {/* SERVICES OFFERED – new list content */}
                <section>
                  <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-extrabold uppercase text-gray-900">
                      Services Offered
                    </h2>
                    <div className="mt-2 w-16 h-[2px] bg-[#BC0018]" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {servicesOffered.map((service, index) => (
                      <motion.div
                        key={service}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.08 * index }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 hover:border-[#BC0018] transition-colors"
                      >
                        <div className="mt-0.5">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#BC0018]/10 text-xs font-semibold text-[#BC0018]">
                            {index + 1}
                          </span>
                        </div>
                        <p className="text-sm md:text-base text-gray-800">
                          {service}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* CTA */}
                <section className="py-12 bg-white text-center">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#BC0018] mb-4">
                    Need Support for OOG & Inter Island Movements?
                  </h2>
                  <p className="text-lg md:text-xl text-[#BC0018] mb-10">
                    Talk to our operations team for a tailored OOG solution with
                    complete loading, lashing, survey, and port-to-door
                    coordination.
                  </p>

                  <Link
                    to={getNavLink("/contact")}
                    className="inline-block bg-[#BC0018] hover:bg-[#a30014] text-white font-semibold text-lg px-10 py-4 rounded-lg transition-all"
                  >
                    Contact Us
                  </Link>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OOGShipments;
