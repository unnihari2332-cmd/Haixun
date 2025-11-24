import { motion } from "framer-motion";
import { Truck, Settings, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import ScrollAnimation from "./ScrollAnimation";

export default function AdvantagesSection() {
  const { t } = useTranslation();

  const advantages = [
    {
      icon: Truck,
      titleKey: "advantages.transportation.title",
      descriptionKey: "advantages.transportation.description",
    },
    {
      icon: Settings,
      titleKey: "advantages.logistics.title",
      descriptionKey: "advantages.logistics.description",
    },
    {
      icon: Users,
      titleKey: "advantages.team.title",
      descriptionKey: "advantages.team.description",
    },
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Optional subtle HX logo background watermark */}
      <div
        className="absolute inset-0 opacity-5 bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url('/path-to-your-HX-logo.png')`,
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#9B111E] mb-3">
            {t("advantages.title")}
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            {t("advantages.subtitle")}
          </p>
        </ScrollAnimation>

        {/* Advantage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <ScrollAnimation key={index} delay={index * 100}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl p-8 w-full max-w-[380px] text-center 
                             bg-[#9B111E] text-white shadow-md hover:shadow-xl 
                             transition-all duration-300 border border-[#9B111E]/20"
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {t(advantage.titleKey)}
                  </h3>
                  <p className="leading-relaxed text-sm text-gray-100">
                    {t(advantage.descriptionKey)}
                  </p>
                </motion.div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
