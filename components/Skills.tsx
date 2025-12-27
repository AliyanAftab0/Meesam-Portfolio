"use client";

import { motion } from "framer-motion";
import { Video, Layers, PenTool, Youtube, Share2 } from "lucide-react";
import styles from "./Skills.module.css";

const skills = [
  {
    title: "Video Editing",
    description:
      "Cinematic storytelling with a focus on rhythm, pacing, and emotional impact.",
    icon: <Video size={24} />,
  },
  {
    title: "Motion Graphics",
    description:
      "Smooth, purposeful animations that breathe life into static concepts.",
    icon: <Layers size={24} />,
  },
  {
    title: "Graphic Design",
    description:
      "Timeless visual identities and layouts that prioritize clarity and prestige.",
    icon: <PenTool size={24} />,
  },
  {
    title: "Social Content",
    description:
      "High-retention social media assets designed to convert and build trust.",
    icon: <Share2 size={24} />,
  },
];

export default function Skills() {
  return (
    <section id="services" className={styles.skills}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Expertise</span>
          <h2 className={styles.title}>Crafted with Intention.</h2>
        </div>

        <div className={styles.grid}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={styles.skillCard}
            >
              <div className={styles.iconWrapper}>{skill.icon}</div>
              <h3 className={styles.skillTitle}>{skill.title}</h3>
              <p className={styles.skillDesc}>{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
