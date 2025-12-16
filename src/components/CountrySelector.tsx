import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { getCurrentCountryFromPath, detectCountryByIP } from '@/services/countryDetection';
// Import useTranslation
import { useTranslation } from "react-i18next"; // <-- Added useTranslation

interface CountryData {
  country: string;
  company: string;
  website: string;
  priority: number;
  flag?: string;
  route?: string;
  visibilityByCountry?: Record<string, boolean>;
}

const countries: CountryData[] = [
  { country: "SINGAPORE", company: "GGL", website: "https://www.ggl.sg", priority: 1, flag: "/sg.svg" },
  { country: "SRI LANKA", company: "GC", website: "https://www.globalconsol.com/sri-lanka/home", priority: 2, flag: "/lk.svg" },
  { country: "MYANMAR", company: "GC", website: "https://www.globalconsol.com/myanmar/home", priority: 3, flag: "/mm.svg" },
  { country: "PAKISTAN", company: "GC", website: "https://www.globalconsol.com/pakistan/home", priority: 5, flag: "/pk.svg" },
  { country: "MALAYSIA", company: "OECL", website: "https://oecl.sg/malaysia", priority: 6, flag: "/my.svg", visibilityByCountry: { BANGLADESH: false } },
  { country: "INDONESIA", company: "OECL", website: "https://oecl.sg/indonesia", priority: 7, flag: "/id.svg", visibilityByCountry: { BANGLADESH: false } },
  { country: "THAILAND", company: "OECL", website: "https://oecl.sg/thailand", priority: 8, flag: "/th.svg", visibilityByCountry: { BANGLADESH: false } },
  { country: "INDIA", company: "GGL", website: "https://gglindia.com", priority: 8, flag: "/in.svg" },
  { country: "AUSTRALIA", company: "GGL", website: "https://www.gglaustralia.com/", priority: 10, flag: "/au.svg" },
  { country: "QATAR", company: "ONE GLOBAL", website: "https://oneglobalqatar.com/", priority: 11, flag: "/qa.svg" },
  { country: "USA", company: "GGL", website: "https://gglusa.us/", priority: 14, flag: "/us.svg", visibilityByCountry: { MYANMAR: false } },
  { country: "UK", company: "Moltech", website: "https://moltech.uk/", priority: 15, flag: "/gb.svg" }
];


const CountrySelector = () => {
  // Use useTranslation hook
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  const [isOpen, setIsOpen] = useState(false);
  const [ipCountry, setIpCountry] = useState<{ code: string; name: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const detected = getCurrentCountryFromPath(location.pathname) ?? { code: "SG", name: "Singapore" };
  const currentCountryName = detected.name?.toUpperCase() || "SINGAPORE";

  // Language logic derived from Navigation component
  const handleLanguageSwitch = () => {
    const next = currentLang === "zh" ? "en" : "zh";
    i18n.changeLanguage(next);
    setCurrentLang(next);
    try {
      localStorage.setItem("preferredLanguage", next);
    } catch {}
    // Optionally close the dropdown after switching language
    setIsOpen(false);
  };

  // The label for the language switch button
  const langLabel = currentLang === "zh" ? "EN" : t("nav.switchcountry") ? t("nav.switchcountry") : "中文";
  
  useEffect(() => {
    const detect = async () => {
      try {
        const saved = localStorage.getItem("preferredCountry");
        if (saved) {
          setIpCountry(JSON.parse(saved));
          return;
        }
        const c = await detectCountryByIP();
        setIpCountry(c);
      } catch {
        setIpCountry(null);
      }
    };
    detect();
  }, []);
  
  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);


  const visibleCountries = countries.filter(c =>
    !c.visibilityByCountry || c.visibilityByCountry[currentCountryName] !== false
  );

  const sortedCountries = [...visibleCountries].sort((a, b) => {
    if (a.priority === b.priority) {
      return (a.company || "").localeCompare(b.company || "");
    }
    return a.priority - b.priority;
  });

  const handleCountrySelect = (country: CountryData) => {
    localStorage.setItem("preferredCountry", JSON.stringify({
      name: country.country,
      code: country.flag?.split('/')[1]?.split('.')[0] || ''
    }));

    const currentPath = location.pathname;
    const slug = country.country.toLowerCase().replace(/\s+/g, '-');
    let targetRoute = country.route;

    if (currentPath.includes('/about-us')) {
      const prefix = country.country === 'SINGAPORE' ? '' : `/${slug}`;
      targetRoute = `${prefix}/about-us`;
    } else if (currentPath.includes('/contact')) {
      const prefix = country.country === 'SINGAPORE' ? '' : `/${slug}`;
      targetRoute = `${prefix}/contact`;
    }

    if (targetRoute) {
      window.location.href = targetRoute;
    } else {
      window.open(country.website, '_blank', 'noopener,noreferrer');
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-50 flex items-center gap-2">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 px-4 py-2 rounded-full flex items-center gap-2 focus-visible:ring-red-500"
          >
            <Globe className="w-6 h-6 text-white" />
            <span className="flex items-center gap-1">
              {/* Use translation for "Switch Country" */}
              {t("nav.switchcountry") || "Switch Country"} <ChevronDown className="h-3 w-3 ml-1 text-white" />
            </span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          className="w-[280px] h-[400px] border border-gray-200 bg-white p-2 rounded-lg shadow-xl overflow-y-auto flex flex-col"
        >
          <ScrollArea className="flex-1 w-full pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 gap-1 p-1">
              {sortedCountries.map(country => (
                <DropdownMenuItem
                  key={`${country.country}-${country.company}`}
                  onSelect={(e) => {
                    e.preventDefault();
                    handleCountrySelect(country);
                  }}
                  className="cursor-pointer hover:bg-red-50 py-4 px-3 min-h-[60px] rounded-md flex items-center gap-3 transition-all focus:bg-red-100"
                >
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center w-full">
                    <div className="flex-shrink-0">
                      {country.flag ? (
                        <img
                          src={country.flag}
                          alt={`${country.country} flag`}
                          className="w-6 h-6 rounded-sm shadow-sm object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-gray-200 rounded-sm flex items-center justify-center">
                          <Globe className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-sm">{country.country}</div>
                      <div className="text-xs text-gray-500">{country.company}</div>
                    </div>
                  </motion.div>
                </DropdownMenuItem>
              ))}
            </div>
          </ScrollArea>

          {/* Language Switch Button added to the bottom of the dropdown */}
          <div className="p-2 border-t border-gray-100 mt-2">
            <Button
              type="button"
              onClick={handleLanguageSwitch}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-md border border-red-600 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white transition-colors"
            >
              Switch Language: **{langLabel}**
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CountrySelector;
