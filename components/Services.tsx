"use client";

import { motion } from "framer-motion";

const defaultServices = [
  {
    title: "Cinematic Editing",
    description:
      "Turning raw footage into rhythmic, color-graded masterpieces that tell a story.",
  },
  {
    title: "Motion Identity",
    description:
      "Bringing brands to life through intentional motion graphics and smooth transitions.",
  },
  {
    title: "VFX & Compositing",
    description:
      "High-end visual effects and clean-up to ensure every frame is picture-perfect.",
  },
  {
    title: "Brand Strategy",
    description:
      "Helping brands find their visual voice through consistent, premium design.",
  },
];

interface ServicesProps {
  servicesData?: any[];
}

export default function Services({ servicesData }: ServicesProps) {
  const displayServices = servicesData?.length ? servicesData : defaultServices;

  return (
    <section id="services" className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-12 border border-border transition-all duration-400 ease-smooth hover:bg-background"
            >
              <div>
                <h3 className="text-2xl mb-2">{service.title}</h3>
                <p className="text-text-secondary text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
