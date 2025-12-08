import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { getCurrentCountryFromPath, detectCountryByIP } from "@/services/countryDetection";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import the selector we just created
import CountrySelector from "@/components/common/CountrySelector";

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth(); // kept if you use auth logic later

  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  // Load preferred language from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("preferredLanguage");
      if (stored && stored !== currentLang) {
        i18n.changeLanguage(stored);
        setCurrentLang(stored);
      }
    } catch {}
  }, []);

  // Keep state in sync if i18n language changes
  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  // Toggle language EN <-> ZH and persist
  const handleLanguageSwitch = () => {
    const next = currentLang === "zh" ? "en" : "zh";
    i18n.changeLanguage(next);
    setCurrentLang(next);
    try {
      localStorage.setItem("preferredLanguage", next);
    } catch {}
  };

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === "/";

  // --- Logic for Text Colors ---
  // If we are scrolled OR not on homepage, we need dark text (white background).
  // Otherwise, we need white text (transparent background).
  const isDarkTextMode = isScrolled || !isHomePage;

  const desktopLinkColor = (active: boolean) =>
    active
      ? "text-red-600"
      : isDarkTextMode
      ? "text-gray-900"
      : "text-white";

  // Styles for Country Selector based on mode
  const selectorBtnClass = isDarkTextMode
    ? "border-gray-900/30 hover:bg-gray-100"
    : "border-white/40 hover:bg-white/10";
    
  const selectorTextClass = isDarkTextMode
    ? "text-gray-900"
    : "text-white";

  const desktopLangButtonClasses =
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors";

  const langLabel = currentLang === "zh" ? "EN" : "中文";

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isDarkTextMode ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-4 lg:py-[18px]">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/haixun-logo.svg"
                alt="Haixun Global Co., Ltd"
                className="h-8 sm:h-12 lg:h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${desktopLinkColor(
                isActive("/")
              )}`}
            >
              {t("nav.home") || "Home"}
            </Link>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors flex items-center gap-1 ${
                  location.pathname.includes("/services")
                    ? "text-red-600"
                    : desktopLinkColor(false)
                }`}
              >
                {t("nav.services") || "Services"} <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-64 bg-white border-gray-200 shadow-lg z-[100]">
                <DropdownMenuItem asChild>
                  <Link to="/services/lcl">{t("services.lcl.title") || "LCL"}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/fcl">{t("services.fcl.title") || "FCL"}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/warehousing">{t("services.warehouse.title") || "Warehousing"}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/project-cargo">{t("services.project.title") || "Project Cargo"}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/air-freight">{t("services.air.title") || "Air Freight"}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/customs-clearance">{t("services.customs.title") || "Customs Clearance"}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/import">{t("services.import.title") || "Import Services"}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/consolidation">{t("services.consolidation.title") || "Buyer's Consolidation"}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/oog-shipments">{t("services.oog.title") || "OOG Shipments"}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/about-us"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${desktopLinkColor(
                isActive("/about-us")
              )}`}
            >
              {t("nav.about") || "About Us"}
            </Link>

            <Link
              to="/blog"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${desktopLinkColor(
                isActive("/blog")
              )}`}
            >
              {t("nav.news") || "News"}
            </Link>

            <Link
              to="/advantages"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${desktopLinkColor(
                isActive("/advantages")
              )}`}
            >
              {t("nav.advantage") || "Advantage"}
            </Link>

            <Link
              to="/global-presence"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${desktopLinkColor(
                isActive("/global-presence")
              )}`}
            >
              {t("nav.globalPresence") || "Global Presence"}
            </Link>

            <Link
              to="/contact"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${desktopLinkColor(
                isActive("/contact")
              )}`}
            >
              {t("nav.contact") || "Contact"}
            </Link>

            {/* ⭐⭐⭐ Desktop Country Selector (Adaptive Colors) */}
            <CountrySelector />

            {/* Desktop language button */}
            <button
              type="button"
              onClick={handleLanguageSwitch}
              className={`${desktopLangButtonClasses} ${
                isDarkTextMode
                  ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  : "border-white/40 text-white hover:bg-white hover:text-black"
              }`}
            >
              {langLabel}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 mr-2"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X
                  className={isDarkTextMode ? "text-gray-900" : "text-white"}
                  size={24}
                />
              ) : (
                <Menu
                  className={isDarkTextMode ? "text-gray-900" : "text-white"}
                  size={24}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white py-4 shadow-md border-t max-h-[calc(100vh-56px)] overflow-y-auto animate-fade-in">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`font-medium py-2 text-lg hover:text-red-600 transition-colors ${
                  isActive("/") ? "text-red-600" : "text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home") || "Home"}
              </Link>

              {/* Collapsible services */}
              <div className="flex flex-col">
                <button
                  onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                  className="flex items-center justify-between font-medium py-2 text-lg hover:text-red-600 transition-colors text-gray-900"
                >
                  {t("nav.services") || "Services"}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isCompanyDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isCompanyDropdownOpen && (
                  <div className="flex flex-col pl-4 space-y-2 mt-2">
                    <Link to="/services/lcl" onClick={() => setIsMenuOpen(false)}>
                      {t("services.lcl.title") || "LCL"}
                    </Link>
                    <Link to="/services/fcl" onClick={() => setIsMenuOpen(false)}>
                      {t("services.fcl.title") || "FCL"}
                    </Link>
                    <Link to="/services/warehousing" onClick={() => setIsMenuOpen(false)}>
                      {t("services.warehouse.title") || "Warehousing"}
                    </Link>
                    <Link to="/services/project-cargo" onClick={() => setIsMenuOpen(false)}>
                      {t("services.project.title") || "Project Cargo"}
                    </Link>
                    <Link to="/services/air-freight" onClick={() => setIsMenuOpen(false)}>
                      {t("services.air.title") || "Air Freight"}
                    </Link>
                    <Link
                      to="/services/customs-clearance"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services.customs.title") || "Customs Clearance"}
                    </Link>
                    <Link to="/services/import" onClick={() => setIsMenuOpen(false)}>
                      {t("services.import.title") || "Import Services"}
                    </Link>
                    <Link to="/services/consolidation" onClick={() => setIsMenuOpen(false)}>
                      {t("services.consolidation.title") || "Consolidation"}
                    </Link>
                    <Link to="/services/oog-shipments" onClick={() => setIsMenuOpen(false)}>
                      {t("services.oog.title") || "OOG Shipments"}
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/about-us"
                className={`font-medium py-2 text-lg hover:text-red-600 transition-colors ${
                  isActive("/about-us") ? "text-red-600" : "text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about") || "About Us"}
              </Link>

              <Link
                to="/blog"
                className={`font-medium py-2 text-lg hover:text-red-600 transition-colors ${
                  isActive("/blog") ? "text-red-600" : "text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.news") || "News"}
              </Link>

              <Link
                to="/advantages"
                className={`font-medium py-2 text-lg hover:text-red-600 transition-colors ${
                  isActive("/advantages") ? "text-red-600" : "text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.advantage") || "Advantage"}
              </Link>

              <Link
                to="/global-presence"
                className={`font-medium py-2 text-lg hover:text-red-600 transition-colors ${
                  isActive("/global-presence") ? "text-red-600" : "text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.globalPresence") || "Global Presence"}
              </Link>

              <Link
                to="/contact"
                className={`font-medium py-2 text-lg hover:text-red-600 transition-colors ${
                  isActive("/contact") ? "text-red-600" : "text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.contact") || "Contact"}
              </Link>

              {/* ⭐⭐⭐ Mobile Country Selector (Always dark text on white bg) */}
              <div className="py-2">
                <CountrySelector />
              </div>

              {/* Mobile language button */}
              <button
                type="button"
                onClick={() => {
                  handleLanguageSwitch();
                  setIsMenuOpen(false);
                }}
                className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-red-600 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-600 hover:text-white transition-colors"
              >
                {langLabel}
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
