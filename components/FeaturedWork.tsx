import { getFeaturedProjects } from "@/lib/db";
import ProjectCard from "./ProjectCard";
import Link from "next/link";

export default async function FeaturedWork() {
  const projects = await getFeaturedProjects();

  return (
    <section id="work" className="section-padding py-24">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-[clamp(2.5rem,5vw,4rem)]">
            Selected <span className="text-gradient">Work</span>
          </h2>
          <Link
            href="/projects"
            className="text-base text-text-secondary flex items-center gap-3 transition-colors duration-300 ease-smooth hover:text-accent group"
          >
            View All Projects{" "}
            <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-[5px]">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {projects.map((project: any, index: number) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              category={project.category}
              image_url={project.image_url}
              skills={project.skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
