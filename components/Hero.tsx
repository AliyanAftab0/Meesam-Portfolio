"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  tagline?: string;
  title?: string;
  description?: string;
  image?: string;
}

export default function Hero({
  tagline,
  title,
  description,
  image,
}: HeroProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Initial Reveal Animation
    gsap.fromTo(
      imageContainerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      },
    );

    // Subtle Parallax on Scroll
    gsap.to(imageRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-[100px] pb-[50px]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="block text-[0.9rem] tracking-[0.3em] uppercase text-accent mb-8 font-medium"
            >
              {tagline || "Video Editor & Graphic Designer"}
            </motion.span>
            <h1 className="text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] mb-10">
              {title ? (
                <>
                  {title.split(" ").slice(0, -2).join(" ")}{" "}
                  <span className="text-gradient">
                    {title.split(" ").slice(-2).join(" ")}
                  </span>
                </>
              ) : (
                <>
                  Crafting <span className="text-gradient">Premium</span> <br />
                  Visual Stories.
                </>
              )}
            </h1>
            <p className="text-xl text-text-secondary max-w-[550px] mb-14 mx-auto lg:mx-0">
              {description ||
                "I help brands and creators stand out through cinematic video editing and intentional graphic design."}
            </p>
            <div className="flex flex-col sm:flex-row gap-8 items-center justify-center lg:justify-start">
              <motion.a
                href="#work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-foreground text-background py-5 px-12 rounded-full font-semibold text-base"
              >
                View Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ x: 5 }}
                className="text-base font-medium flex items-center gap-3 group"
              >
                Start a Project{" "}
                <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-[5px]">
                  →
                </span>
              </motion.a>
            </div>
          </motion.div>

          <div
            className="relative w-full max-w-[500px] mx-auto lg:max-w-full lg:mx-0 z-[5] opacity-0 bg-black rounded-[20px] overflow-hidden"
            ref={imageContainerRef}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95 z-[3] pointer-events-none" />
            <Image
              ref={imageRef}
              src={image || "/pf.png"}
              alt="Creative Professional"
              width={600}
              height={800}
              className="w-full h-auto block relative z-[2] contrast-[1.05] brightness-[0.95] object-cover"
              priority
              quality={90}
            />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-[10%] -right-[5%] w-[600px] h-[600px] bg-[radial-gradient(circle,var(--accent-muted)_0%,transparent_70%)] blur-[80px] z-[1] opacity-50" />
      <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-[60px] z-[1]" />
    </section>
  );
}
