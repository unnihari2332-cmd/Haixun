import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Office = {
  name: string;
  address: string;
  phone?: string;
  fax?: string;
  email?: string;
  country?: string;
};

const Footer = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Move keyAddresses inside useMemo to react to language changes
  const offices = useMemo(() => {
    const keyAddresses = [
      {
        country: t("globalPresence.countries.china"),
        offices: [
          {
            name: t("footer.shenzhenOffice"),
            address: t("footer.shenzhenAddress"),
            phone: "+86 75582222447",
            fax: "+86 75582192854",
            email: "info@haixun.cn",
          } as Office,
        ],
      },
    ];

    const all = keyAddresses.flatMap((c) =>
      c.offices.map((o) => ({ ...o, country: c.country }))
    );
    const current = t("globalPresence.countries.china");
    return [
      ...all.filter((o) => o.country === current),
      ...all.filter((o) => o.country !== current),
    ];
  }, [t, i18n.language, location.pathname]);

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalMs = 4000;
  const slideMs = 450;

  useEffect(() => setIdx(0), [location.pathname]);

  useEffect(() => {
    if (paused || offices.length <= 1) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % offices.length), intervalMs);
    return () => clearInterval(timer);
  }, [paused, offices.length]);

  const current = offices[idx];

  const footerAnim = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <footer className="pt-16 pb-8 text-white relative overflow-hidden bg-[#9B111E]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#6E0C13] via-[#9B111E] to-[#B92D35] opacity-90"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="h-1 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-full mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-4">

          {/* Column 1 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnim}
            className="flex flex-col items-start"
          >
            <div className="mb-4 p-2 rounded-xl border-2 border-white/80 bg-white/10 backdrop-blur-sm inline-block shadow-lg">
              <div className="rounded-lg bg-white p-3 shadow-md flex items-center justify-center">
                <img
                  src="/haixun-logo.svg"
                  alt="Haixun Global"
                  className="h-16 w-auto md:h-20"
                  loading="lazy"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">{t("footer.company")}</h3>
            <p className="text-sm md:text-base max-w-xs text-left leading-relaxed mb-4 text-white/90">
              {t("footer.description")}
            </p>
          </motion.div>

          {/* Column 2 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnim}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-start md:items-end lg:items-start lg:pl-10"
          >
            <h3 className="font-bold text-xl mb-4">{t("footer.usefulLinks")}</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: t("nav.home"), path: "/" },
                { name: t("nav.services"), path: "/services" },
                { name: t("nav.about"), path: "/about-us" },
                { name: t("nav.news"), path: "/blog" },
                { name: t("nav.advantage"), path: "/advantages" },
                { name: t("nav.contact"), path: "/contact" },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-white/90 hover:text-[#FFDCDC] transition flex items-center gap-2"
                >
                  <ArrowRight size={14} className="text-white/70" />
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Column 3 — NO ARROWS, NO DOTS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnim}
            transition={{ delay: 0.4 }}
            className="lg:pl-10"
          >
            <h3 className="font-bold text-xl mb-4">{t("footer.contactUs")}</h3>

            <div
              className="relative h-[168px] overflow-hidden"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`${idx}-${i18n.language}`}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: slideMs / 1000, ease: "easeOut" }}
                  className="space-y-3"
                >
                  <p className="font-semibold">
                    {current.name} • {current.country}
                  </p>

                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-white/80 mt-1" />
                    <p className="whitespace-pre-line text-sm leading-relaxed text-white/90">
                      {current.address}
                    </p>
                  </div>

                  {current.phone && (
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <Phone size={16} className="text-white/80" />
                      <span>{current.phone}</span>
                    </div>
                  )}

                  {current.fax && (
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <Phone size={16} className="text-white/80" />
                      <span>{t("footer.fax")}: {current.fax}</span>
                    </div>
                  )}

                  {current.email && (
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <Mail size={16} className="text-white/80" />
                      <span>{current.email}</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="text-center text-white/80 mt-12 pt-8 border-t border-white/20 text-sm">
          &copy; {new Date().getFullYear()} {t("footer.company")}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
