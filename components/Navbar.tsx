"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      className="fixed top-0 left-0 w-full py-6 z-[1000] backdrop-blur-xl bg-background/70 border-b border-border"
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link
          href="/"
          className="font-heading text-2xl font-bold tracking-tighter text-foreground"
        >
          AD <span className="text-accent">.</span>
        </Link>

        <ul className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-sm font-normal text-text-secondary transition-colors duration-300 ease-smooth hover:text-foreground"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/projects"
          className="text-sm font-medium py-2.5 px-6 border border-border rounded-full transition-all duration-300 ease-smooth hover:bg-foreground hover:text-background"
        >
          Projects
        </Link>
      </div>
    </motion.nav>
  );
}
