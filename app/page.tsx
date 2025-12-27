import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedWork from "@/components/FeaturedWork";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { getSettings, getServices } from "@/lib/db";

export default async function Home() {
  const settings = await getSettings();
  const services = await getServices();

  return (
    <main>
      <Navbar />
      <Hero />
      <About
        p1={settings.about_p1}
        p2={settings.about_p2}
        p3={settings.about_p3}
      />
      <Skills />
      <FeaturedWork />
      <Services servicesData={services} />
      <Testimonials />
      <Contact
        email={settings.contact_email}
        instagram={settings.instagram_url}
        youtube={settings.youtube_url}
        tiktok={settings.tiktok_url}
      />
    </main>
  );
}
