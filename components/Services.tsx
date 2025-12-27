"use client";

import { motion } from "framer-motion";
import styles from "./Services.module.css";

const defaultServices = [
  {
    title: "Cinematic Editing",
    description:
      "Turning raw footage into rhythmic, color-graded masterpieces that tell a story.",
  },
  {
    title: "Motion Identity",
    description:
      "Bringing brands to life through intentional motion graphics and smooth transitions.",
  },
  {
    title: "VFX & Compositing",
    description:
      "High-end visual effects and clean-up to ensure every frame is picture-perfect.",
  },
  {
    title: "Brand Strategy",
    description:
      "Helping brands find their visual voice through consistent, premium design.",
  },
];

interface ServicesProps {
  servicesData?: any[];
}

export default function Services({ servicesData }: ServicesProps) {
  const displayServices = servicesData?.length ? servicesData : defaultServices;

  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {displayServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={styles.card}
            >
              <div className={styles.content}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
