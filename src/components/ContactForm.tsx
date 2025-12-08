import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function ContactUsSection() {
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    const formData = new FormData(e.currentTarget);

    try {
      await fetch("https://formsubmit.co/ajax/helen@haixun.co", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      setFormStatus("success");
      e.currentTarget.reset();
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT COLUMN — FORM */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* TOP SMALL TITLE */}
          <p className="text-xs md:text-sm font-semibold text-[#9B111E] tracking-[0.2em] uppercase mb-2">
            {t("contact.sendUsMail")}
          </p>

          {/* MAIN TITLE */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            {t("contact.feelFreeToWrite")}
          </h2>

          {/* SUBTEXT */}
          <p className="text-gray-700 text-sm md:text-base max-w-xl mb-8 leading-relaxed">
            {t("contact.logisticsDesc")}
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* TOP ROW — FIRST / LAST NAME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="FirstName"
                placeholder={t("contact.form.firstName")}
                required
                className="h-12 rounded-none border-0 bg-[#FBF5EE] text-sm"
              />
              <Input
                name="LastName"
                placeholder={t("contact.form.lastName")}
                required
                className="h-12 rounded-none border-0 bg-[#FBF5EE] text-sm"
              />
            </div>

            {/* SECOND ROW — EMAIL / PHONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="Email"
                type="email"
                placeholder={t("contact.form.yourEmail")}
                required
                className="h-12 rounded-none border-0 bg-[#FBF5EE] text-sm"
              />
              <Input
                name="Phone"
                placeholder={t("contact.form.phone")}
                className="h-12 rounded-none border-0 bg-[#FBF5EE] text-sm"
              />
            </div>

            {/* MESSAGE */}
            <Textarea
              name="Message"
              placeholder={t("contact.form.message")}
              rows={5}
              required
              className="rounded-none border-0 bg-[#FBF5EE] text-sm"
            />

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={formStatus === "loading"}
              className="mt-2 inline-flex items-center gap-2 rounded-none bg-[#9B111E] px-10 py-6 
              text-sm font-semibold uppercase tracking-wide hover:bg-[#7F0E18] w-auto"
            >
              <Send className="w-4 h-4" />
              {t("contact.form.send")}
            </Button>

            {/* FORM STATUS */}
            {formStatus === "success" && (
              <p className="text-green-600 text-sm mt-3">✅ {t("contact.success")}</p>
            )}
            {formStatus === "error" && (
              <p className="text-red-600 text-sm mt-3">❌ {t("contact.error")}</p>
            )}
          </form>
        </motion.div>

        {/* RIGHT COLUMN — CONTACT DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* TOP SMALL TITLE */}
          <p className="text-xs md:text-sm font-semibold text-[#9B111E] tracking-[0.2em] uppercase">
            {t("contact.needAnyHelp")}
          </p>

          {/* MAIN TITLE */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {t("contact.getInTouchWithUs")}
          </h2>

          {/* SUBTEXT */}
          <p className="text-gray-700 text-sm md:text-base max-w-xl leading-relaxed">
            {t("contact.logisticsDesc")}
          </p>

          {/* CONTACT CARDS */}
          <div className="space-y-6 mt-4">

            {/* PHONE CARD */}
            <div className="flex items-center gap-4 bg-white rounded-xl shadow-md border border-gray-100 p-5">
              <div className="w-14 h-14 rounded-md bg-[#9B111E] flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("contact.haveAnyQuestion")}
                </p>
                <a
                  href="tel:+8675582222447"
                  className="mt-1 block text-gray-900 font-semibold text-sm"
                >
                  +86 75582222447
                </a>
              </div>
            </div>

            {/* FAX CARD */}
            <div className="flex items-center gap-4 bg-white rounded-xl shadow-md border border-gray-100 p-5">
              <div className="w-14 h-14 rounded-md bg-[#9B111E] flex items-center justify-center">
                {/* rotate phone icon to look like a fax symbol */}
                <Phone className="w-6 h-6 text-white rotate-90" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("footer.fax")}
                </p>
                <a
                  href="fax:+8675582192854"
                  className="mt-1 block text-gray-900 font-semibold text-sm"
                >
                  +86 75582192854
                </a>
              </div>
            </div>

            {/* EMAIL CARD */}
            <div className="flex items-center gap-4 bg-white rounded-xl shadow-md border border-gray-100 p-5">
              <div className="w-14 h-14 rounded-md bg-[#9B111E] flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("contact.writeUsEmail")}
                </p>
                <a
                  href="mailto:helen@haixun.co"
                  className="mt-1 block text-gray-900 font-semibold text-sm"
                >
                  helen@haixun.co
                </a>
              </div>
            </div>

            {/* ADDRESS CARD */}
            <div className="flex items-center gap-4 bg-white rounded-xl shadow-md border border-gray-100 p-5">
              <div className="w-14 h-14 rounded-md bg-[#9B111E] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("contact.headquarters")}
                </p>
                <p className="mt-1 text-gray-900 text-sm leading-relaxed whitespace-pre-line">
                  {t("footer.shenzhenAddress")}
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}