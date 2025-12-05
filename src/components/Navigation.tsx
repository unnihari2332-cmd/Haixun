import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import CountrySelector from "@/components/CountrySelector";
import { getCurrentCountryFromPath, detectCountryByIP } from "@/services/countryDetection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

/** Small flag component that never shows raw text like '/lk.svg' */
function FlagIcon({
  code,
  className = "h-5 w-7 object-contain rounded-[2px]",
}: {
  code: string;
  className?: string;
}) {
  const iso = (code || "").toLowerCase();
  const src = `/${iso}.svg`;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      draggable={false}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [ipCountry, setIpCountry] = useState<{ code: string; name: string } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  // Load preferred language from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("preferredLanguage");
      if (stored && stored !== currentLang) {
        i18n.changeLanguage(stored);
        setCurrentLang(stored);
      }
    } catch {
      // ignore
    }
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
    } catch {
      // ignore
    }
  };

  // We use the URL to decide the current country flag
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  // Detect country by IP for flag display
  useEffect(() => {
    const detect = async () => {
      try {
        const saved = localStorage.getItem("preferredCountry");
        if (saved) {
          setIpCountry(JSON.parse(saved));
          return;
        }
        const country = await detectCountryByIP();
        setIpCountry({ code: country.code, name: country.name });
      } catch {
        setIpCountry(null);
      }
    };
    detect();
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    return `/${currentCountry.name.toLowerCase().replace(" ", "-")}${basePath}`;
  };

  const isHomePage = location.pathname === "/";

  const desktopLinkColor = (active: boolean) =>
    active
      ? "text-red-600"
      : isScrolled || !isHomePage
      ? "text-gray-900"
      : "text-white";

  const desktopLangButtonClasses =
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors";

  const langLabel = currentLang === "zh" ? "EN" : "中文";

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage ? "bg-white shadow-md" : "bg-transparent"
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
              {t("nav.home")}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors flex items-center gap-1 ${
                  location.pathname.includes("/services")
                    ? "text-red-600"
                    : desktopLinkColor(false)
                }`}
              >
                {t("nav.services")} <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-white border-gray-200 shadow-lg z-[100]">
                <DropdownMenuItem asChild>
                  <Link to="/services" className="w-full cursor-pointer hover:bg-gray-100">
                    {t("services.allServices")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/lcl" className="w-full cursor-pointer hover:bg-gray-100">
                    {t("services.lcl.title")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/fcl" className="w-full cursor-pointer hover:bg-gray-100">
                    {t("services.fcl.title")}
                  </Link>
                </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                  <Link to="/services/warehousing" className="w-full cursor-pointer hover:bg-gray-100">
                    {t("services.warehouse.title")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/air-freight" className="w-full cursor-pointer hover:bg-gray-100">
                    {t("services.air.title")}
                  </Link>
                </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                  <Link to="/services/customs-clearance" className="w-full cursor-pointer hover:bg-gray-100">
                    {t("services.customs clearance.title")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/project-cargo" className="w-full cursor-pointer hover:bg-gray-100">
                    {t("services.projectCargo.title")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/customs-clearance" className="w-full cursor-pointer hover:bg-gray-100">
                    {t("services.customs.title")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/consolidation" className="w-full cursor-pointer hover:bg-gray-100">
                    {t("services.consolidation.title")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/oog-shipments" className="w-full cursor-pointer hover:bg-gray-100">
                    {t("services.oogshipments.title")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/about-us"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${desktopLinkColor(
                isActive("/about-us")
              )}`}
            >
              {t("nav.about")}
            </Link>

            <Link
              to="/blog"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${desktopLinkColor(
                isActive("/blog")
              )}`}
            >
              {t("nav.news")}
            </Link>

            <Link
              to="/advantages"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${desktopLinkColor(
                isActive("/advantages")
              )}`}
            >
              {t("nav.advantage")}
            </Link>

            <Link
              to="/global-presence"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${desktopLinkColor(
                isActive("/global-presence")
              )}`}
            >
              {t("nav.globalPresence")}
            </Link>

            <Link
              to="/contact"
              className={`nav-link font-medium text-base xl:text-lg hover:text-red-600 transition-colors ${desktopLinkColor(
                isActive("/contact")
              )}`}
            >
              {t("nav.contact")}
            </Link>

            {/* Desktop language button with red icon on white bg */}
            <button
              type="button"
              onClick={handleLanguageSwitch}
              className={`${desktopLangButtonClasses} ${
                isScrolled || !isHomePage
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
                  className={isScrolled || !isHomePage ? "text-gray-900" : "text-white"}
                  size={24}
                />
              ) : (
                <Menu
                  className={isScrolled || !isHomePage ? "text-gray-900" : "text-white"}
                  size={24}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white py-4 shadow-md animate-fade-in border-t max-h-[calc(100vh-56px)] overflow-y-auto">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`font-medium py-2 text-lg hover:text-red-600 transition-colors ${
                  isActive("/") ? "text-red-600" : "text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>

              {/* Services Collapsible */}
              <div className="flex flex-col">
                <button
                  onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                  className="flex items-center justify-between font-medium py-2 text-lg hover:text-red-600 transition-colors text-gray-900"
                >
                  {t("nav.services")}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isCompanyDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isCompanyDropdownOpen && (
                  <div className="flex flex-col pl-4 space-y-2 mt-2">
                    <Link
                      to="/services"
                      className="py-2 text-base hover:text-red-600 transition-colors text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services.allServices")}
                    </Link>
                    <Link
                      to="/services/lcl"
                      className="py-2 text-base hover:text-red-600 transition-colors text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services.lcl.title")}
                    </Link>
                    <Link
                      to="/services/cfs"
                      className="py-2 text-base hover:text-red-600 transition-colors text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services.cfs.title")}
                    </Link>
                    <Link
                      to="/services/sea-freight"
                      className="py-2 text-base hover:text-red-600 transition-colors text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services.oceanFreight.title")}
                    </Link>
                    <Link
                      to="/services/air-freight"
                      className="py-2 text-base hover:text-red-600 transition-colors text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services.air.title")}
                    </Link>
                    <Link
                      to="/services/warehousing"
                      className="py-2 text-base hover:text-red-600 transition-colors text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services.warehouse.title")}
                    </Link>
                    <Link
                      to="/services/project-cargo"
                      className="py-2 text-base hover:text-red-600 transition-colors text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services.projectCargo.title")}
                    </Link>
                    <Link
                      to="/services/customs-clearance"
                      className="py-2 text-base hover:text-red-600 transition-colors text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services.customs.title")}
                    </Link>
                    <Link
                      to="/services/consolidation"
                      className="py-2 text-base hover:text-red-600 transition-colors text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services.consolidation.title")}
                    </Link>
                    <Link
                      to="/services/liquid-cargo"
                      className="py-2 text-base hover:text-red-600 transition-colors text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services.liquidCargo.title")}
                    </Link>
                    <Link
                      to="/services/third-party-logistics"
                      className="py-2 text-base hover:text-red-600 transition-colors text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services.thirdPartyLogistics.title")}
                    </Link>
                    <Link
                      to="/services/liner-agency"
                      className="py-2 text-base hover:text-red-600 transition-colors text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("services.linerAgency.title")}
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
                {t("nav.about")}
              </Link>

              <Link
                to="/blog"
                className={`font-medium py-2 text-lg hover:text-red-600 transition-colors ${
                  isActive("/blog") ? "text-red-600" : "text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.news")}
              </Link>

              <Link
                to="/advantages"
                className={`font-medium py-2 text-lg hover:text-red-600 transition-colors ${
                  isActive("/advantages") ? "text-red-600" : "text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.advantage")}
              </Link>

              <Link
                to="/global-presence"
                className={`font-medium py-2 text-lg hover:text-red-600 transition-colors ${
                  isActive("/global-presence") ? "text-red-600" : "text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.globalPresence")}
              </Link>

              <Link
                to="/contact"
                className={`font-medium py-2 text-lg hover:text-red-600 transition-colors ${
                  isActive("/contact") ? "text-red-600" : "text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.contact")}
              </Link>

              {/* Mobile language button with red color */}
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
