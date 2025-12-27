"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";

interface ContactProps {
  email?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
}

import { MessageSquare } from "lucide-react";

export default function Contact({ instagram, youtube, tiktok }: ContactProps) {
  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            Let's Build Something <br />{" "}
            <span className="text-gradient">Timeless.</span>
          </h2>
          <p className={styles.description}>
            Currently accepting premium projects for Q1 2026.
          </p>
        </div>

        <div className={styles.whatsappWrapper}>
          <motion.a
            href="https://wa.me/923360396465"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.whatsappBtn}
          >
            <MessageSquare size={24} />
            Connect via WhatsApp
          </motion.a>
          <p className={styles.availability}>
            Average response time: &lt; 2 hours
          </p>
        </div>

        <div className={styles.footer}>
          <div className={styles.socials}>
            <a
              href={instagram || "https://www.instagram.com/amcedaddy"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href={youtube || "https://www.youtube.com/@AMCEDADDY"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Youtube
            </a>
            <a
              href={tiktok || "https://www.tiktok.com/@amcedaddy"}
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok
            </a>
          </div>
          <p className={styles.copyright}>© 2025 AD. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
