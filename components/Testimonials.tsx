"use client";

import { motion } from "framer-motion";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    quote:
      "Working with AD was a revelation. The level of detail and artistic vision they brought to our brand story was beyond anything we expected.",
    author: "Creative Director, Peak Global",
  },
  {
    quote:
      "Precision, elegance, and speed. A rare triple-threat in the creative industry. Our conversion rates for the new campaign speak for themselves.",
    author: "Marketing Lead, Flux Agency",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className={styles.item}
            >
              <blockquote className={styles.quote}>"{t.quote}"</blockquote>
              <footer className={styles.author}>— {t.author}</footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
