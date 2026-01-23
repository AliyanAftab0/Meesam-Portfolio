"use client";

import { motion } from "framer-motion";
import { Video, Layers, PenTool, Youtube, Share2 } from "lucide-react";

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
    <section id="services" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <span className="text-[0.8rem] uppercase tracking-[0.2em] text-accent mb-4 block">
            Expertise
          </span>
          <h2 className="text-[clamp(2.5rem,5vw,3.5rem)]">
            Crafted with Intention.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-surface p-8 rounded-[24px] border border-border transition-all duration-400 ease-smooth hover:border-accent hover:-translate-y-[5px] hover:bg-surface-hover"
            >
              <div className="text-accent mb-6">{skill.icon}</div>
              <h3 className="text-xl mb-2">{skill.title}</h3>
              <p className="text-[0.95rem] text-text-secondary leading-[1.5]">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
