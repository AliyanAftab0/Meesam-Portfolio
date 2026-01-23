import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { getSettings, getServices, getTestimonials } from "@/lib/db";

const Hero = dynamic(() => import("@/components/Hero"));
const About = dynamic(() => import("@/components/About"));
const Skills = dynamic(() => import("@/components/Skills"));
const FeaturedWork = dynamic(() => import("@/components/FeaturedWork"));
const Services = dynamic(() => import("@/components/Services"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Contact = dynamic(() => import("@/components/Contact"));

export default async function Home() {
  const settings = await getSettings();
  const services = await getServices();
  const testimonials = await getTestimonials();

  return (
    <main>
      <Navbar />
      <Hero
        tagline={settings.hero_tagline}
        title={settings.hero_title}
        description={settings.hero_description}
        image={settings.profile_image}
      />
      <About
        title={settings.about_title}
        p1={settings.about_p1}
        p2={settings.about_p2}
        p3={settings.about_p3}
      />
      <Skills />
      <FeaturedWork />
      <Services servicesData={services} />
      <Testimonials testimonialsData={testimonials} />
      <Contact
        email={settings.contact_email}
        instagram={settings.instagram_url}
        youtube={settings.youtube_url}
        tiktok={settings.tiktok_url}
      />
    </main>
  );
}
