import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Users,
  UserCircle,
  SearchCode,
  Ship,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  const portalLinks = useMemo(
    () => [
      { icon: <Users className="w-5 h-5" />, title: "Consolmate", url: "https://consolmate.com/auth/login/10" },
      { icon: <UserCircle className="w-5 h-5" />, title: "Partner Portal", url: "https://pp.onlinetracking.co/auth/login/10" },
      { icon: <SearchCode className="w-5 h-5" />, title: "Tracking", url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:102:::::P0_GROUP_RID:195" },
      { icon: <Ship className="w-5 h-5" />, title: "Sailing Schedule", url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:104:::::P0_GROUP_RID:195" },
    ],
    []
  );

  const heroImages = useMemo(() => ["/oceanfreight.png", "/airfreight.png", "/truck.png"], []);
  const videoSrc = "/Hero01.mp4";
  const videoPoster = "/hero-poster.jpg";

  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() => heroImages.map(() => false));
  const [autoPlay, setAutoPlay] = useState(true);
  const [useVideo, setUseVideo] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const prefersReducedMotion = useRef<boolean>(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  useEffect(() => {
    const imgs = heroImages.map((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () =>
        setLoaded((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      return img;
    });
    return () => imgs.forEach((img) => (img.onload = null));
  }, [heroImages]);

  useEffect(() => {
    if (prefersReducedMotion || !autoPlay || useVideo) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [heroImages.length, prefersReducedMotion, autoPlay, useVideo]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setUseVideo(false);
      return;
    }

    const tryPlay = async () => {
      try {
        await videoRef.current?.play();
        setUseVideo(true);
      } catch {
        setUseVideo(false);
      }
    };

    tryPlay();

    const onVis = () => {
      if (!videoRef.current) return;
      if (document.hidden) videoRef.current.pause();
      else videoRef.current.play().catch(() => setUseVideo(false));
    };

    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [prefersReducedMotion]);

  const goNext = () => {
    setAutoPlay(false);
    setIndex((p) => (p + 1) % heroImages.length);
  };

  const goPrev = () => {
    setAutoPlay(false);
    setIndex((p) => (p - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {useVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={videoPoster}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          heroImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        )}
      </div>

      {/* LEFT SIDE GRADIENT OVERLAY */}
      <div
        className="
          absolute inset-y-0 left-0 w-1/2
          bg-gradient-to-r
          from-black/70 via-black/40 to-transparent
          pointer-events-none
          z-[5]
        "
      ></div>

      {/* CONTENT */}
      <div
        className="
          absolute top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          md:left-40 lg:left-56 md:-translate-x-0
          z-20
          w-[calc(100%-2rem)]
          sm:w-auto sm:max-w-md md:max-w-xl
          px-4
          text-center sm:text-left
        "
      >
        <h1
          className="
            text-3xl sm:text-3xl md:text-4xl lg:text-5xl
            font-extrabold
            leading-tight
            text-white
          "
        >
          {t("hero.title")}
        </h1>

        <p
          className="
            mt-4
            text-base sm:text-lg md:text-xl
            leading-relaxed
            text-gray-200
          "
        >
          {t("hero.subtitle")}
        </p>

        <div className="mt-6 flex justify-center sm:justify-start">
          <a
            href="#about"
            className="
              inline-flex items-center justify-center
              rounded-xl
              bg-[#BC0018]
              px-6 py-3.5
              text-base sm:text-sm
              font-semibold
              text-white
              shadow-xl
              hover:bg-[#A90015]
            "
          >
            {t("hero.contactUs")}
          </a>
        </div>
      </div>

      {/* SLIDER BUTTONS */}
      {!useVideo && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* PORTAL LINKS */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 sm:grid-cols-4">
          {portalLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <span className="rounded-full bg-white/20 p-2">{link.icon}</span>
              <span className="text-xs sm:text-sm font-semibold">{link.title}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </section>
  );
};

export default HeroSection;
