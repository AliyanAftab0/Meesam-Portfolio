import { getAllProjects } from "@/lib/db";
import ProjectCard from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import styles from "./Projects.module.css";

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>
            All <span className="text-gradient">Projects</span>
          </h1>
          <p className={styles.description}>
            A curated collection of visual storytelling and high-end design.
          </p>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.grid}>
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
