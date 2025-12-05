import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Ship,
  Boxes,
  Warehouse as WarehouseIcon,
  Package,
  Plane,
  FileCheck,
  ArrowDownToLine,
  Container,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrollAnimation from "./ScrollAnimation";

type Service = {
  icon: LucideIcon;
  image: string;
  titleKey: string;
  descriptionKey: string;
  link: string;
};

export default function HaixunServicesSection() {
  const { t } = useTranslation();

  const services: Service[] = [
    {
      icon: Boxes,
      image: "/fcp.jpg",
      titleKey: "services.lcl.title",
      descriptionKey: "services.lcl.description",
      link: "/services/lcl",
    },
    {
      icon: Ship,
      image: "/ocean-freight-realistic.jpg",
      titleKey: "services.fcl.title",
      descriptionKey: "services.fcl.description",
      link: "/services/fcl",
    },
    {
      icon: WarehouseIcon,
      image: "/warehouse-realistic.jpg",
      titleKey: "services.warehouse.title",
      descriptionKey: "services.warehouse.description",
      link: "/services/warehousing",
    },
    {
      icon: Package,
      image: "/Projectcargofrontbanner.jpg",
      titleKey: "services.project.title",
      descriptionKey: "services.project.description",
      link: "/services/project-cargo",
    },
    {
      icon: Plane,
      image: "/Airfrontbannner.png",
      titleKey: "services.air.title",
      descriptionKey: "services.air.description",
      link: "/services/air-freight",
    },
    {
      icon: FileCheck,
      image: "/customs.jpg",
      titleKey: "services.customs.title",
      descriptionKey: "services.customs.description",
      link: "/services/customs-clearance",
    },
    {
      icon: ArrowDownToLine,
      image: "/cfs-realistic.jpg",
      titleKey: "services.import.title",
      descriptionKey: "services.import.description",
      link: "/services/import",
    },
    {
      icon: Boxes,
      image: "/lcl-realistic.jpg",
      titleKey: "services.consolidation.title",
      descriptionKey: "services.consolidation.description",
      link: "/services/consolidation",
    },
    {
      icon: Container,
      image: "/project-cargo-realistic.jpg",
      titleKey: "services.oog.title",
      descriptionKey: "services.oog.description",
      link: "/services/oog-shipments",
    },
  ];

  return (
    <section
      className="relative py-20 overflow-hidden min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        background: "#BC0018", // FULL RED BACKGROUND
      }}
    >
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <ScrollAnimation className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-white mb-3">
            {t("services.overline", "What We Do")}
          </p>

          <h2 className="font-extrabold text-white text-4xl md:text-5xl mb-3 leading-tight">
            {t("services.title", "Our Services")}
          </h2>

          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {t("services.subtitle", "Comprehensive logistics solutions tailored to your needs")}
          </p>
        </ScrollAnimation>

        {/* SERVICE CARDS */}
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const numberLabel = String(index + 1).padStart(2, "0");

            return (
              <ScrollAnimation key={service.titleKey} delay={index * 60}>
                <Link to={service.link} aria-label={t(service.titleKey)}>
                  <motion.article
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    className="bg-white rounded-[26px] shadow-[0_18px_50px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col h-full cursor-pointer"
                  >
                    {/* IMAGE */}
                    <div className="relative">
                      <img
                        src={service.image}
                        alt={t(service.titleKey)}
                        className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />

                      {/* FLOATING ICON */}
                      <div className="absolute left-6 -bottom-7">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#BC0018]" />
                        </div>
                      </div>
                    </div>

                    {/* TEXT */}
                    <div className="px-8 pt-12 pb-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                          {t(service.titleKey)}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {t(service.descriptionKey)}
                        </p>
                      </div>

                      <div className="mt-8 flex items-end justify-between">
                        <span className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-[#BC0018]">
                          {t("services.readMore")}
                          <ArrowDownToLine className="w-4 h-4 ml-2" />
                        </span>

                        <span className="text-4xl font-semibold text-slate-200">
                          {numberLabel}
                        </span>
                      </div>
                    </div>

                  </motion.article>
                </Link>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
