"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "Work", href: "/#work" },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={styles.navbar}
    >
      <div className={clsx("container", styles.navContainer)}>
        <Link href="/" className={styles.logo}>
          AD <span className={styles.dot}>.</span>
        </Link>

        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className={styles.navLink}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/projects" className={styles.cta}>
          Projects
        </Link>
      </div>
    </motion.nav>
  );
}
