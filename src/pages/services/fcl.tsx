import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const FCL = () => {
  const location = useLocation();

  const detected = getCurrentCountryFromPath(location.pathname);
  const currentCountry = detected ?? { code: "SG", name: "Singapore" };

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    return `/${currentCountry.name.toLowerCase().replace(/\s+/g, "-")}${basePath}`;
  };

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

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />

      {/* Match LCL layout spacing */}
      <div className="h-[90px] w-full bg-white" />

      <main className="flex-grow">
        {/* HERO SECTION – aligned to LCL style */}
        <section className="relative h-[300px] md:h-[360px] w-full overflow-hidden flex items-center justify-center">
          <img
            src="/fclhero.jpg"
            alt="FCL Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-block max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                FCL Services
              </h1>
              <div className="w-24 h-[3px] bg-[#BC0018] mx-auto mt-3" />

              {/* Centered tagline under title */}
              <p className="mt-4 text-base md:text-lg text-gray-200 leading-relaxed">
                Reliable Full Container Load solutions for time-critical and
                high-volume cargo across global routes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-[260px,1fr] items-start">
              {/* SIDEBAR */}
              <aside className="space-y-10">
                <div>
                  <h2 className="text-sm font-semibold tracking-[0.15em] text-gray-900 mb-2 uppercase">
                    OUR SERVICES
                  </h2>
                  <div className="w-12 h-[2px] bg-[#BC0018] mb-5" />

                  <div className="border border-slate-200 rounded-md overflow-hidden bg-slate-50">
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
                  </div>
                </div>
              </aside>

              {/* MAIN COLUMN */}
              <div className="space-y-12">
                {/* IMAGE */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="rounded-md overflow-hidden shadow-lg"
                >
                  <img
                    src="/container.jpg"
                    alt="FCL Shipping"
                    className="w-full h-[340px] md:h-[380px] object-cover"
                    loading="lazy"
                  />
                </motion.div>

                {/* DESCRIPTION – replaced with your new content */}
                <section>
                  <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-extrabold tracking-wide text-gray-900 uppercase">
                      Description
                    </h2>
                    <div className="mt-2 w-16 h-[2px] bg-[#BC0018]" />
                  </div>

                  <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-700">
                    <p>
                      HAIXUN has own fleet of containers including special equipment’s to
                      accommodate special requirements of customers and specializes in many
                      trade lanes. Being sea freight professionals with vast experience in
                      the field helps to match frequent sailing and flexible service
                      options.
                    </p>
                    <p>
                      Multiple carrier options on any trade route with contracted rates
                      helps to secure the space, allocation, timing, pricing and frequency
                      of your shipments. FCL is the most optimized container shipping way
                      regarding cost, volume and weight of the cargo.
                    </p>
                    <p>
                      We take special care at each step of the process which involves
                      fixing contract pricing with carriers, reserving space, making
                      booking, picking up empty container at the container depot, loading
                      at shipper facility, transporting by truck / rail to the port and
                      vessel loading, and monitoring vessel schedule till final delivery to
                      consignee.
                    </p>
                    <p>
                      For import bookings we engage our overseas partners in the absence of
                      our own network and monitor each step and keep our customers /
                      consignees informed at all stages.
                    </p>
                  </div>
                </section>

                {/* No CTA – aligned with LCL style */}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FCL;
