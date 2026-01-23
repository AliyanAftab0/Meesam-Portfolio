"use client";

import { motion } from "framer-motion";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
}

interface TestimonialsProps {
  testimonialsData?: Testimonial[];
}

export default function Testimonials({
  testimonialsData = [],
}: TestimonialsProps) {
  // Use data from Sanity if available, otherwise use default
  const displayTestimonials =
    testimonialsData.length > 0
      ? testimonialsData.map((t) => ({
          quote: t.content,
          author: `${t.name}, ${t.role}`,
        }))
      : [
          {
            quote:
              "Working with AD was a revelation. The level of detail and artistic vision they brought to our brand story was beyond anything we expected.",
            author: "Creative Director, Peak Global",
          },
          {
            quote:
              "Precision, elegance, and speed. A rare triple-threat in the creative industry. Our conversion rates for the new campaign speak for themselves.",
            author: "Marketing Lead, Flux Agency",
          },
        ];
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-[1000px]">
        <div>
          {displayTestimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="mb-24 last:mb-0"
            >
              <blockquote className="font-heading text-[clamp(1.5rem,4vw,2.5rem)] font-normal leading-tight mb-8 text-foreground italic">
                "{t.quote}"
              </blockquote>
              <footer className="text-base text-accent uppercase tracking-widest">
                — {t.author}
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
