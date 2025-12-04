import React, { useEffect, useMemo, useRef, useState } from "react";
import { Users, UserCircle, SearchCode, Ship, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  const portalLinks = useMemo(
    () => [
      {
        icon: <Users className="w-5 h-5" />,
        title: "Consolmate",
        url: "https://consolmate.com/auth/login/10",
      },
      {
        icon: <UserCircle className="w-5 h-5" />,
        title: "Partner Portal",
        url: "https://pp.onlinetracking.co/auth/login/10",
      },
      {
        icon: <SearchCode className="w-5 h-5" />,
        title: "Tracking",
        url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:102:::::P0_GROUP_RID:195",
      },
      {
        icon: <Ship className="w-5 h-5" />,
        title: "Sailing Schedule",
        url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:104:::::P0_GROUP_RID:195",
      },
    ],
    []
  );

  const heroImages = useMemo(
    () => ["/oceanfreight.png", "/airfreight.png", "/truck.png"],
    []
  );

  // Use Hero01.mp4 from public as background video
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

  // Preload images
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

  // Auto-play slider only when not using video and motion allowed
  useEffect(() => {
    if (prefersReducedMotion || !autoPlay || useVideo) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [heroImages.length, prefersReducedMotion, autoPlay, useVideo]);

  // Try playing video; fall back to images if it fails or user prefers reduced motion
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
      if (document.hidden) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => setUseVideo(false));
      }
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
      {/* BACKGROUND MEDIA */}
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
              alt={`Hero background ${i + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={i !== index}
              draggable={false}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))
        )}
      </div>

      {/* SINGLE OVERLAY (gradient removed) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* LEFT CENTER CONTENT (shifted right) */}
      <div
        className="
          absolute top-1/2 
          left-10 sm:left-14 md:left-20 lg:left-24 
          -translate-y-1/2 
          z-20 
          w-[calc(100%-2rem)] 
          sm:w-auto sm:max-w-md md:max-w-xl 
          pr-4 sm:pr-6 
          text-left
        "
      >
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-md text-white">
          {t("hero.title")}
        </h1>

        <p className="mt-2 sm:mt-4 md:mt-5 text-xs sm:text-sm md:text-lg leading-relaxed text-gray-200">
          {t("hero.subtitle")}
        </p>

        <div className="mt-4 sm:mt-7 flex items-start">
          <a
            href="#about"
            className="
              inline-flex items-center justify-center 
              rounded-xl 
              bg-[#BC0018] 
              px-5 sm:px-7 py-3 
              text-xs sm:text-sm 
              font-semibold 
              text-white
              shadow-lg shadow-black/30 
              hover:bg-[#A90015] 
              focus:outline-none 
              focus:ring-2 focus:ring-white/80
            "
          >
            {t("hero.contactUs")}
          </a>
        </div>
      </div>

      {/* IMAGE SLIDER CONTROLS (ONLY WHEN NO VIDEO) */}
      {!useVideo && (
        <>
          <button
            aria-label="Previous slide"
            onClick={goPrev}
            className="group absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Next slide"
            onClick={goNext}
            className="group absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* SLIDER DOTS (ONLY WHEN NO VIDEO) */}
      {!useVideo && (
        <div className="absolute bottom-28 left-0 right-0 z-20 flex items-center justify-center gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setAutoPlay(false);
                setIndex(i);
              }}
              className={`h-2.5 w-2.5 rounded-full border border-white/60 transition ${
                i === index ? "bg-white" : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
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
              className="group flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur-md transition hover:bg-white/15 hover:border-white/25"
            >
              <span className="rounded-full bg-white/20 p-2">{link.icon}</span>
              <span className="text-sm font-semibold">{link.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* FRAME + FALLBACK SKELETON */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
      {!useVideo && !loaded[0] && (
        <div className="absolute inset-0 z-0 animate-pulse bg-neutral-900" aria-hidden />
      )}
    </section>
  );
};

export default HeroSection;
