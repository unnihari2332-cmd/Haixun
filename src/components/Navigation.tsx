import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CountrySelector from "@/components/common/CountrySelector";

const JOIN_US_URL =
  "https://www.zhaopin.com/sou/jl765/kwDLRONBSFQ27P739OCO9VU23DU5BJ7VO9CS4PCK2HDH9VG/p1";

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  /* ---------------- Language ---------------- */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("preferredLanguage");
      if (stored && stored !== currentLang) {
        i18n.changeLanguage(stored);
        setCurrentLang(stored);
      }
    } catch {}
  }, []);

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  const handleLanguageSwitch = () => {
    const next = currentLang === "zh" ? "en" : "zh";
    i18n.changeLanguage(next);
    setCurrentLang(next);
    try {
      localStorage.setItem("preferredLanguage", next);
    } catch {}
  };

  /* ---------------- Scroll ---------------- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";
  const isDarkTextMode = isScrolled || !isHomePage;

  const desktopLinkColor = (active: boolean) =>
    active
      ? "text-red-600"
      : isDarkTextMode
      ? "text-gray-900"
      : "text-white";

  const langLabel = currentLang === "zh" ? "EN" : "中文";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkTextMode ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 lg:py-[18px]">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img
              src="/haixun-logo.svg"
              alt="Haixun Global"
              className="h-10 lg:h-14 w-auto"
            />
          </Link>

          {/* ================= Desktop ================= */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className={desktopLinkColor(location.pathname === "/")}
            >
              {t("nav.home")}
            </Link>

            {/* Services */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1 ${desktopLinkColor(
                  location.pathname.includes("/services")
                )}`}
              >
                {t("nav.services")}
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-64">
                {[
                  ["lcl", "services.lcl.title"],
                  ["fcl", "services.fcl.title"],
                  ["warehouse", "services.warehouse.title"],
                  ["project-cargo", "services.projectCargo.title"],
                  ["air-freight", "services.air.title"],
                  ["customs-clearance", "services.customs.title"],
                  ["import", "services.import.title"],
                  ["consolidation", "services.consolidation.title"],
                  ["oog-shipments", "services.oog.title"],
                ].map(([slug, key]) => (
                  <DropdownMenuItem asChild key={slug}>
                    <Link to={`/services/${slug}`}>{t(key)}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/about-us"
              className={desktopLinkColor(location.pathname === "/about-us")}
            >
              {t("nav.about")}
            </Link>

            <Link
              to="/blog"
              className={desktopLinkColor(location.pathname === "/blog")}
            >
              {t("nav.news")}
            </Link>

            <Link
              to="/advantages"
              className={desktopLinkColor(
                location.pathname === "/advantages"
              )}
            >
              {t("nav.advantage")}
            </Link>

            <Link
              to="/global-presence"
              className={desktopLinkColor(
                location.pathname === "/global-presence"
              )}
            >
              {t("nav.globalPresence")}
            </Link>

            {/* Contact Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1 ${desktopLinkColor(
                  location.pathname === "/contact"
                )}`}
              >
                {t("nav.contact")}
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-44">
                <DropdownMenuItem asChild>
                  <Link to="/contact">{t("nav.contactUs")}</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <a
                    href={JOIN_US_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("nav.joinUs")}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <CountrySelector />

            <button
              onClick={handleLanguageSwitch}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                isDarkTextMode
                  ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              {langLabel}
            </button>
          </div>

          {/* ================= Mobile Toggle ================= */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={isDarkTextMode ? "text-black" : "text-white"} />
            ) : (
              <Menu className={isDarkTextMode ? "text-black" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* ================= Mobile Menu ================= */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              {t("nav.home")}
            </Link>

            {/* Mobile Services */}
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex justify-between items-center"
            >
              {t("nav.services")}
              <ChevronDown />
            </button>

            {isServicesOpen && (
              <div className="pl-4 space-y-2">
                {[
                  ["lcl", "services.lcl.title"],
                  ["fcl", "services.fcl.title"],
                  ["warehouse", "services.warehouse.title"],
                  ["project-cargo", "services.projectCargo.title"],
                  ["air-freight", "services.air.title"],
                  ["customs-clearance", "services.customs.title"],
                  ["import", "services.import.title"],
                  ["consolidation", "services.consolidation.title"],
                  ["oog-shipments", "services.oog.title"],
                ].map(([slug, key]) => (
                  <Link
                    key={slug}
                    to={`/services/${slug}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(key)}
                  </Link>
                ))}
              </div>
            )}

            <Link to="/about-us" onClick={() => setIsMenuOpen(false)}>
              {t("nav.about")}
            </Link>

            <Link to="/blog" onClick={() => setIsMenuOpen(false)}>
              {t("nav.news")}
            </Link>

            <Link to="/advantages" onClick={() => setIsMenuOpen(false)}>
              {t("nav.advantage")}
            </Link>

            <Link to="/global-presence" onClick={() => setIsMenuOpen(false)}>
              {t("nav.globalPresence")}
            </Link>

            {/* Mobile Contact */}
            <button
              onClick={() => setIsContactOpen(!isContactOpen)}
              className="flex justify-between items-center"
            >
              {t("nav.contact")}
              <ChevronDown />
            </button>

            {isContactOpen && (
              <div className="pl-4 space-y-2">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  {t("nav.contactUs")}
                </Link>

                <a
                  href={JOIN_US_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.joinUs")}
                </a>
              </div>
            )}

            <CountrySelector />

            <button
              onClick={() => {
                handleLanguageSwitch();
                setIsMenuOpen(false);
              }}
              className="mt-3 border border-red-600 text-red-600 px-3 py-1 rounded-full w-fit"
            >
              {langLabel}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
