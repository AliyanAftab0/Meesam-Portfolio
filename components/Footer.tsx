"use client";

import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              Amcee<span className={styles.footerDot}>.</span>
            </div>
            <p className={styles.tagline}>Premium Visual Storytelling</p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkGroupHeader}>Services</h4>
              <Link href="/#work" className={styles.footerLink}>
                Featured Work
              </Link>
              <Link href="/projects" className={styles.footerLink}>
                All Projects
              </Link>
              <Link href="/#services" className={styles.footerLink}>
                Capabilities
              </Link>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkGroupHeader}>Personal</h4>
              <Link href="/#about" className={styles.footerLink}>
                About Me
              </Link>
              <Link href="/#contact" className={styles.footerLink}>
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2025 AD. Built with Intention.</p>
        </div>
      </div>
    </footer>
  );
}
