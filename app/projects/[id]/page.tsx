import { getProjectById } from "@/lib/db";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./ProjectDetail.module.css";
import { Project } from "@/types/project";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = (await getProjectById(id)) as Project;

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <Navbar />

      <div className="container">
        <header className={styles.header}>
          <span className={styles.category}>{project.category}</span>
          <h1 className={styles.title}>{project.title}</h1>
          <div className={styles.meta}>
            <div className={styles.skills}>
              {project.skills?.map((skill: string) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className={styles.mediaSection}>
          {project.category === "Video" && project.video_url ? (
            <VideoPlayer src={project.video_url} />
          ) : (
            <div className={styles.imageGallery}>
              <div className={styles.mainImage}>
                <Image
                  src={project.image_url}
                  alt={project.title}
                  width={1920}
                  height={1080}
                  className={styles.image}
                  priority
                  sizes="100vw"
                />
              </div>
            </div>
          )}
        </section>

        <div className={styles.contentSection}>
          <div className={styles.description}>
            <h2 className={styles.descTitle}>The Challenge</h2>
            <div className={styles.descText}>
              <p>{project.description}</p>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.sidebarItem}>
              <h3 className={styles.sidebarTitle}>Client</h3>
              <p className={styles.sidebarText}>Confidential</p>
            </div>
            <div className={styles.sidebarItem}>
              <h3 className={styles.sidebarTitle}>Role</h3>
              <p className={styles.sidebarText}>{project.category}</p>
            </div>
            <div className={styles.sidebarItem}>
              <h3 className={styles.sidebarTitle}>Date</h3>
              <p className={styles.sidebarText}>
                {new Date(project.created_at).getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
