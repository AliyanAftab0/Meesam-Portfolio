import { getAllProjects } from "@/lib/db";
import ProjectCard from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <main className="pt-[120px]">
      <Navbar />
      <section className="py-16 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-[clamp(3rem,6vw,5rem)] mb-6">
            All <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-[600px] mx-auto">
            A curated collection of visual storytelling and high-end design.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project: any) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                category={project.category}
                image_url={project.image_url}
                skills={project.skills}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
