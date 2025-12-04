import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
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

const LCL = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const detected = getCurrentCountryFromPath(location.pathname);
  const currentCountry = detected ?? { code: "SG", name: "Singapore" };

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    return `/${currentCountry.name.toLowerCase().replace(/\s+/g, "-")}${basePath}`;
  };

  const servicesNav = [
    { label: t("services.seeAllServices"), path: "/services" },
    { label: t("services.lcl.title"), path: "/services/lcl" },
    { label: t("services.fcl.title"), path: "/services/fcl" },
    { label: t("services.warehouse.title"), path: "/services/warehousing" },
    { label: t("services.projectCargo.title"), path: "/services/project-cargo" },
    { label: t("services.air.title"), path: "/services/air-freight" },
    { label: t("services.customs.title"), path: "/services/customs-clearance" },
    { label: t("services.import.title"), path: "/services/import" },
    { label: t("services.consolidation.title"), path: "/services/consolidation" },
    { label: t("services.oog.title"), path: "/services/oog-shipments" },
  ];

  const pathname = location.pathname;

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />

      <div className="h-[90px] w-full bg-white" />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative h-[250px] md:h-[360px] w-full overflow-hidden flex items-center justify-center">
          <img
            src="/servicepagehero.jpg"
            alt="LCL Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-block max-w-3xl"
            >
              <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                {t("services.lcl.title")}
              </h1>
              <div className="w-24 h-[3px] bg-[#BC0018] mx-auto mt-3" />

              <p className="mt-4 text-sm md:text-lg text-gray-200 leading-relaxed px-4">
                {t("services.lcl.heroTagline")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="py-10 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:gap-12 md:grid-cols-[260px,1fr] items-start">
              {/* SIDEBAR - Hidden on mobile, shown on md+ */}
              <aside className="hidden md:block space-y-10">
                <div>
                  <h2 className="text-sm font-semibold tracking-[0.15em] text-gray-900 mb-2 uppercase">
                    {t("services.ourServices")}
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

              {/* MAIN CONTENT */}
              <div className="space-y-8 md:space-y-12">
                {/* TOP IMAGE */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="rounded-md overflow-hidden shadow-lg"
                >
                  <img
                    src="/lcl1.JPG"
                    alt="LCL Road & Ocean Freight"
                    className="w-full h-[240px] md:h-[380px] object-cover"
                    loading="lazy"
                  />
                </motion.div>

                {/* DESCRIPTION */}
                <section>
                  <div className="mb-4 md:mb-6">
                    <h2 className="text-lg md:text-2xl font-extrabold tracking-wide text-gray-900 uppercase">
                      {t("services.description")}
                    </h2>
                    <div className="mt-2 w-16 h-[2px] bg-[#BC0018]" />
                  </div>

                  <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-700">
                    <p>{t("services.lcl.content1")}</p>
                    <p>{t("services.lcl.content2")}</p>
                    <p>{t("services.lcl.content3")}</p>
                    <p>{t("services.lcl.content4")}</p>
                  </div>
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

export default LCL;