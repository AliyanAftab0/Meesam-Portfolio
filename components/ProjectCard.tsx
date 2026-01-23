"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  image_url: string;
  skills: string[];
  index?: number;
}

export default function ProjectCard({
  id,
  title,
  category,
  image_url,
  skills,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative rounded-[20px] overflow-hidden bg-surface transition-transform duration-300 ease-smooth group mx-auto"
      style={{
        width: "100%",
        maxWidth: "474.67px",
        height: "auto",
        aspectRatio: "474.67 / 650.66",
      }}
    >
      <Link href={`/projects/${id}`} className="block w-full h-full">
        <div className="relative w-full h-full bg-surface">
          <Image
            src={image_url || "/placeholder-project.jpg"}
            alt={title}
            width={475}
            height={651}
            className="w-full h-full block object-cover transition-transform duration-[800ms] ease-slow group-hover:scale-110"
            priority={index !== undefined && index < 2}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400 ease-smooth">
            <div className="translate-y-0 md:translate-y-5 md:group-hover:translate-y-0 transition-transform duration-500 ease-smooth">
              <span className="text-[0.75rem] text-accent uppercase tracking-[0.15em] mb-2 block">
                {category}
              </span>
              <h3 className="text-2xl mb-4">{title}</h3>
              <div className="flex gap-2 flex-wrap">
                {skills?.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-[0.7rem] px-3 py-1 bg-white/10 rounded-full backdrop-blur-[4px]"
                  >
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
