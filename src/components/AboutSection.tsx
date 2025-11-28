import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe2, ShieldCheck, Phone } from "lucide-react";

const AboutSection: React.FC = () => {
  const ACCENT = "#BC0018";

  return (
    <section className="relative overflow-hidden py-16 md:py-20 bg-white">

      {/* TOP-LEFT SHAPE */}
      <div className="pointer-events-none absolute -top-6 left-0">
        <img
          src="/about-shape-1.png"
          alt="Decorative shape"
          className="w-40 md:w-60 opacity-80"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* LEFT — TEXT CONTENT */}
        <div>
          <p
            className="uppercase tracking-wide font-extrabold text-3xl"
            style={{ color: ACCENT }}
          >
            ABOUT US
          </p>

          <p className="mt-5 text-gray-700 max-w-xl">
            <strong>Haixun Global Shenzhen</strong> leverages over 30 years of
            expertise in logistics including sea, land, and air transportation,
            customs declaration, warehousing, and distribution.
          </p>

          <p className="mt-5 text-gray-700 max-w-xl">
            Established in <strong>2019</strong>, Haixun Global Shenzhen upholds
            the Group’s commitment to integrity, customer satisfaction, and rapid
            response, ensuring reliable and customer-focused service in China.
          </p>

          {/* FEATURES */}
          <div className="mt-8 space-y-7">
            <div className="flex items-start gap-4">
              <Globe2 className="w-8 h-8" style={{ color: ACCENT }} />
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  Fast Worldwide Delivery
                </h4>
                <p className="text-gray-600 text-sm">
                  Our vast global network ensures timely delivery across destinations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ShieldCheck className="w-8 h-8" style={{ color: ACCENT }} />
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  Safe And Secure Delivery
                </h4>
                <p className="text-gray-600 text-sm">
                  We maintain strict safety and compliance from pickup to delivery.
                </p>
              </div>
            </div>
          </div>

          {/* CTA & Contact */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
            <Link to="/contact">
              <Button
                className="text-white text-base font-semibold px-6 py-3 rounded-md shadow-lg"
                style={{ backgroundColor: ACCENT }}
              >
                Know More About Us
              </Button>
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Need Help?</p>
                  <p className="text-lg font-bold text-gray-900">
                    +86 75582222447
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — IMAGE BLOCK (SMALL + RIGHT SIDE) */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative grid grid-cols-2 gap-3 items-center w-[70%]">

            {/* IMAGE 1 */}
            <img
              src="/container.png"
              alt="Container stacks"
              className="rounded-xl shadow-xl w-full h-[260px] md:h-[300px] object-cover"
            />

            {/* IMAGE 2 */}
            <img
              src="/service.png"
              alt="Logistics truck"
              className="rounded-xl shadow-xl w-full h-[260px] md:h-[300px] mt-8 -ml-2 object-cover"
            />

            {/* CENTER LOGO */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
              w-24 h-24 md:w-28 md:h-28 rounded-full bg-white shadow-2xl flex items-center justify-center border-4"
              style={{ borderColor: ACCENT }}
            >
              <img
                src="/haixun-logo.svg"
                alt="Haixun Logo"
                className="w-14 h-14 object-contain"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
