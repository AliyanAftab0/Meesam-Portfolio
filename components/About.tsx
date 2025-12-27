"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";

interface AboutProps {
  p1?: string;
  p2?: string;
  p3?: string;
}

export default function About({ p1, p2, p3 }: AboutProps) {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.grid}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={styles.textContainer}
          >
            <h2 className={styles.title}>
              Less Noise, <br /> More Impact.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className={styles.description}
          >
            <p>
              {p1 ||
                "I believe great design isn't about what you add, but what you leave behind. My work is centered on clarity, rhythm, and emotional resonance."}
            </p>
            <p>
              {p2 ||
                "With over 5 years of experience in high-end video production and visual identity, I help serious brands communicate their value without shouting."}
            </p>
            <p>
              {p3 ||
                "Based in London, working with partners globally to build digital experiences that feel as premium as the services they represent."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
