"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-16 pb-12 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
          <div className="max-w-[300px]">
            <div className="font-heading text-2xl font-bold">
              Amcee<span className="text-accent">.</span>
            </div>
            <p className="mt-6 text-text-secondary text-[0.95rem]">
              Premium Visual Storytelling
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 lg:gap-20">
            <div className="flex flex-col gap-3">
              <h4 className="text-foreground text-base mb-8 font-semibold">
                Services
              </h4>
              <Link
                href="/#work"
                className="text-text-secondary text-[0.95rem] transition-colors duration-300 ease-smooth hover:text-accent"
              >
                Featured Work
              </Link>
              <Link
                href="/projects"
                className="text-text-secondary text-[0.95rem] transition-colors duration-300 ease-smooth hover:text-accent"
              >
                All Projects
              </Link>
              <Link
                href="/#services"
                className="text-text-secondary text-[0.95rem] transition-colors duration-300 ease-smooth hover:text-accent"
              >
                Capabilities
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-foreground text-base mb-8 font-semibold">
                Personal
              </h4>
              <Link
                href="/#about"
                className="text-text-secondary text-[0.95rem] transition-colors duration-300 ease-smooth hover:text-accent"
              >
                About Me
              </Link>
              <Link
                href="/#contact"
                className="text-text-secondary text-[0.95rem] transition-colors duration-300 ease-smooth hover:text-accent"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex justify-center lg:justify-between items-center text-text-secondary text-[0.85rem]">
          <p>© 2025 AD. Built with Intention.</p>
        </div>
      </div>
    </footer>
  );
}
