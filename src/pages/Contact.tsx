import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Truck,
  Headset,
  User,
  MessageCircle,
} from "lucide-react";

const BRAND_RED = "#BC0018";

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const urls = [
      "https://formsubmit.co/ajax/karthikjungleemara@gmail.com",
      "https://formsubmit.co/ajax/karthiktrendsandtactics@gmail.com",
    ];

    try {
      const responses = await Promise.all(
        urls.map((url) =>
          fetch(url, {
            method: "POST",
            body: formData,
          })
        )
      );

      const allSuccessful = responses.every((res) => res.ok);

      if (allSuccessful) {
        setShowNotification(true);
        form.reset();
        setSelectedLocation("");
        setTimeout(() => setShowNotification(false), 3000);
      } else {
        alert(t("contact.error"));
      }
    } catch (err) {
      alert(t("contact.error"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      <Navigation />

      {/* header-height white space */}
      <div className="h-20 md:h-24 bg-white" />

      {/* MAP */}
      <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden bg-white">
        <iframe
          title="Haixun Global Shenzhen Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.9747126781313!2d114.11695999999999!3d22.54262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f5bf0884ff7b%3A0xda2e416692e764e2!2sZhaoxin%20Huijin%20Plaza!5e0!3m2!1sen!2sin!4v1764335462682!5m2!1sen!2sin"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* success toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-4 z-50 flex items-center gap-3 rounded-xl bg-emerald-500 px-4 py-3 text-white shadow-xl"
          >
            <Send className="h-4 w-4" />
            <span>{t("contact.messageSent")}</span>
            <button
              type="button"
              onClick={() => setShowNotification(false)}
              className="ml-2"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* CONTACT SECTION WITH NEW BACKGROUND */}
        <section
          className="py-8 md:py-16 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/about-bg.webp')" }}
        >
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-none md:rounded-2xl bg-white/90 backdrop-blur-sm">
              {/* subtle world map background */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[url('/world-map-light.png')] bg-cover bg-center" />

              <div className="relative grid gap-8 md:gap-12 lg:grid-cols-2">
                {/* LEFT – FORM SIDE */}
                <div className="px-4 sm:px-8 pb-6 md:pb-10">
                  <button className="group inline-flex items-center gap-2 text-[13px] font-semibold text-red-600 mb-2">
                    <span className="text-[13px] text-red-600 underline decoration-red-600">
                      {t("contact.sendUsMail")}
                    </span>
                    <Truck className="h-4 w-4 text-red-600 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <h2 className="text-[28px] sm:text-[40px] font-bold text-slate-900 leading-tight mb-4">
                    {t("contact.feelFreeToWrite")}{" "}
                    <span
                      className="underline decoration-[4px] underline-offset-[6px]"
                      style={{ textDecorationColor: BRAND_RED }}
                    >
                    </span>
                  </h2>

                  <p className="max-w-xl text-[15px] leading-relaxed text-slate-600 mb-6 md:mb-8">
                    {t("contact.logisticsDesc")}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="Location" value={selectedLocation} />

                    <div className="grid gap-4 md:grid-cols-2">
                      {/* First Name */}
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          name="First Name"
                          placeholder={t("contact.form.firstName")}
                          required
                          className="h-12 rounded-none border border-transparent bg-[#f8f4ee] text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#f0e6da] focus:ring-0 pl-10"
                        />
                      </div>

                      {/* Last Name */}
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          name="Last Name"
                          placeholder={t("contact.form.lastName")}
                          className="h-12 rounded-none border border-transparent bg-[#f8f4ee] text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#f0e6da] focus:ring-0 pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Email */}
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          type="email"
                          name="Email"
                          placeholder={t("contact.form.email")}
                          required
                          className="h-12 rounded-none border border-transparent bg-[#f8f4ee] text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#f0e6da] focus:ring-0 pl-10"
                        />
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          name="Phone"
                          placeholder={t("contact.form.phone")}
                          className="h-12 rounded-none border border-transparent bg-[#f8f4ee] text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#f0e6da] focus:ring-0 pl-10"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <MessageCircle className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-slate-400" />
                      <Textarea
                        name="Message"
                        placeholder={t("contact.form.message")}
                        required
                        className="min-h-[120px] md:min-h-[150px] rounded-none border border-transparent bg-[#f8f4ee] text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#f0e6da] focus:ring-0 pl-10 pt-3"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="mt-2 inline-flex h-11 items-center justify-center rounded-none bg-[#E0001B] px-8 text-sm font-semibold text-white hover:bg-[#c30017]"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {t("contact.form.send")}
                    </Button>
                  </form>
                </div>

                {/* RIGHT – CONTACT INFO */}
                <div className="px-4 sm:px-8 pb-8 md:pb-12">
                  <button className="group inline-flex items-center gap-2 text-[13px] font-semibold text-red-600 mb-2">
                    <span className="underline decoration-red-600">
                      {t("contact.needAnyHelp")}
                    </span>
                    <Headset className="h-4 w-4 text-red-600 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <h2 className="text-[28px] sm:text-[40px] font-bold text-slate-900 leading-tight mb-4">
                    {t("contact.getInTouchWithUs")}
                  </h2>

                  <p className="text-[15px] leading-relaxed text-slate-600 mb-6 md:mb-10 max-w-md">
                    {t("contact.logisticsDesc")}
                  </p>

                  <div className="space-y-5 md:space-y-6">
                    {/* phone */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-sm bg-[#E0001B]">
                        <Phone className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {t("contact.haveAnyQuestion")}
                        </p>
                        <p className="text-sm text-slate-700">+86 75582222447</p>
                      </div>
                    </div>

                    {/* email */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-sm bg-[#E0001B]">
                        <Mail className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {t("contact.writeUsEmail")}
                        </p>
                        <p className="text-sm text-slate-700">helen@haixun.co</p>
                      </div>
                    </div>

                    {/* address */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-sm bg-[#E0001B]">
                        <MapPin className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {t("contact.headquarters")}
                        </p>
                        <p className="text-sm text-slate-700">
                          13C02, Block A, Zhaoxin Huijin Plaza 3085 Shennan East
                          Road,
                          <br />
                          Luohu, Shenzhen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END RIGHT */}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;