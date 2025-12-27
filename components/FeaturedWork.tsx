import { getFeaturedProjects } from "@/lib/db";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import styles from "./FeaturedWork.module.css";

export default async function FeaturedWork() {
  const projects = await getFeaturedProjects();

  return (
    <section id="work" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            Selected <span className="text-gradient">Work</span>
          </h2>
          <Link href="/projects" className={styles.viewAll}>
            View All Projects <span className={styles.viewAllArrow}>→</span>
          </Link>
        </div>

        <div className={styles.grid}>
          {projects.map((project: any) => (
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
  );
}
