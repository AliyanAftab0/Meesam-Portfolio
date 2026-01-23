"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ContactProps {
  email?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
}

import { MessageSquare } from "lucide-react";

export default function Contact({ instagram, youtube, tiktok }: ContactProps) {
  return (
    <section id="contact" className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] mb-6">
            Let's Build Something <br />{" "}
            <span className="text-gradient">Timeless.</span>
          </h2>
          <p className="text-text-secondary text-xl">
            Currently accepting premium projects for Q1 2026.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 mt-8">
          <motion.a
            href="https://wa.me/923360396465"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#25d366] text-white py-5 px-10 rounded-full font-bold text-[1.1rem] flex items-center gap-4 shadow-[0_10px_30px_rgba(37,211,102,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(37,211,102,0.3)] hover:brightness-110"
          >
            <MessageSquare size={24} />
            Connect via WhatsApp
          </motion.a>
          <p className="text-text-secondary text-sm opacity-70">
            Average response time: &lt; 2 hours
          </p>
        </div>

        <div className="mt-32 flex flex-col md:flex-row justify-between items-center py-8 border-t border-border gap-8">
          <div className="flex gap-8">
            <a
              href={instagram || "https://www.instagram.com/amcedaddy"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors duration-300 hover:text-accent"
            >
              Instagram
            </a>
            <a
              href={youtube || "https://www.youtube.com/@AMCEDADDY"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors duration-300 hover:text-accent"
            >
              Youtube
            </a>
            <a
              href={tiktok || "https://www.tiktok.com/@amcedaddy"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors duration-300 hover:text-accent"
            >
              TikTok
            </a>
          </div>
          <p className="text-[0.8rem] text-text-secondary">
            © 2025 AD. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
