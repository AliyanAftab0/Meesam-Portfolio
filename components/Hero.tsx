"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
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
      }
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
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.grid}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={styles.content}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className={styles.smallTitle}
            >
              Video Editor & Graphic Designer
            </motion.span>
            <h1 className={styles.headline}>
              Crafting <span className="text-gradient">Premium</span> <br />
              Visual Stories.
            </h1>
            <p className={styles.subheadline}>
              I help brands and creators stand out through cinematic video
              editing <br />
              and intentional graphic design.
            </p>
            <div className={styles.ctaGroup}>
              <motion.a
                href="#work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.primaryBtn}
              >
                View Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ x: 5 }}
                className={styles.secondaryBtn}
              >
                Start a Project <span className={styles.btnArrow}>→</span>
              </motion.a>
            </div>
          </motion.div>

          <div className={styles.imageWrapper} ref={imageContainerRef}>
            <div className={styles.imageOverlay} />
            <Image
              ref={imageRef}
              src="/pf.png"
              alt="Creative Professional"
              width={600}
              height={800}
              className={styles.portrait}
              priority
            />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className={styles.glassCircle} />
      <div className={styles.glassCircleSmall} />
    </section>
  );
}
