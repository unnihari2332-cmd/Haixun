import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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

const ImportServices = () => {
  const location = useLocation();

  const detected = getCurrentCountryFromPath(location.pathname);
  const currentCountry = detected ?? { code: "SG", name: "Singapore" };

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    return `/${currentCountry.name.toLowerCase().replace(/\s+/g, "-")}${basePath}`;
  };

  const pathname = location.pathname;

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />

      <div className="h-[90px] w-full bg-white" />

      <main className="flex-grow">
        {/* HERO */}
        <section className="relative h-[260px] md:h-[320px] w-full overflow-hidden flex items-center">
          <img
            src="/import hero.jpg"
            alt="Import Services Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#BC0018]">
              Import
            </h1>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-[260px,1fr] items-start">

              {/* EMPTY SIDEBAR (NO ENGLISH CONTENT) */}
              <aside></aside>

              {/* CONTENT RIGHT SIDE */}
              <div className="space-y-12">

                {/* IMAGE */}
                <div className="rounded-md overflow-hidden shadow-lg">
                  <img
                    src="/import.png"
                    alt="Import Logistics Services"
                    className="w-full h-[340px] md:h-[380px] object-cover"
                  />
                </div>

                {/* CHINESE CONTENT ONLY */}
                <section>
                  <h2 className="text-xl md:text-2xl font-extrabold uppercase text-gray-900">
                    Import
                  </h2>
                  <div className="mt-2 w-16 h-[2px] bg-[#BC0018]" />

                  <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 mt-5">

                    <p>总用地面积：5220㎡</p>
                    <p>总建筑面积：44525㎡</p>
                    <p>容积率：7.08</p>

                    <p>
                      该项目位于深圳南头半岛东南部，南临望海路，北靠蛇口老街，
                      西为海韵路，东为规划道路，向南面向大海，向北近2号线地铁口。
                      规划建成为商业高级商务写字楼及大型购物中心，
                      周围交通便利，各类配套设施完善，景观资源丰富，
                      发展前景广阔。
                    </p>
                  </div>
                </section>

                {/* REMOVE CTA, REMOVE VALUE — ALL ENGLISH REMOVED */}

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ImportServices;
