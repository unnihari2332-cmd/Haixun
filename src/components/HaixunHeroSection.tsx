import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Button } from "./ui/button";

export default function HaixunHeroSection() {
  const { t } = useTranslation();
  
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden bg-transparent">

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <p className="text-base md:text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-lg shadow-xl">
                  {t('hero.ourServices')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white px-8 py-6 text-lg rounded-lg backdrop-blur-sm">
                  {t('hero.contactUs')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
