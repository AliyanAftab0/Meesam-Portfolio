"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectCard.module.css";
import { Project } from "@/types/project";

interface ProjectCardProps {
  id: number;
  title: string;
  category: string;
  image_url: string;
  skills: string[];
}

export default function ProjectCard({
  id,
  title,
  category,
  image_url,
  skills,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={styles.card}
    >
      <Link href={`/projects/${id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={image_url}
            alt={title}
            width={800}
            height={450}
            className={styles.image}
            priority={id < 3}
          />
          <div className={styles.overlay}>
            <div className={styles.content}>
              <span className={styles.category}>{category}</span>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.skills}>
                {skills?.slice(0, 3).map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
