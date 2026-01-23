import { getProjectById, getAllProjects } from "@/lib/db";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Project } from "@/types/project";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = (await getProjectById(id)) as Project;

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      images: [
        {
          url: project.image_url,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image_url],
    },
  };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects.map((project: any) => ({
    id: project.id,
  }));
}

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
    <main className="pt-[140px] pb-24">
      <Navbar />

      <div className="container mx-auto px-6">
        <header className="mb-16 max-w-[800px]">
          <span className="text-[0.9rem] text-accent uppercase tracking-[0.2em] block mb-4">
            {project.category}
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] mb-8">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-3">
            {project.skills?.map((skill: string) => (
              <span
                key={skill}
                className="text-[0.8rem] px-5 py-1.5 bg-surface border border-border rounded-full inline-block"
              >
                {skill}
              </span>
            ))}
          </div>
        </header>

        <section className="mb-16 flex justify-center">
          {project.category === "Video" &&
          (project.video_url || project.video_file) ? (
            <div className="w-full flex justify-center">
              <VideoPlayer
                src={project.video_url}
                videoFile={project.video_file}
              />
            </div>
          ) : (
            <div className="w-full">
              <div className="relative w-full rounded-[24px] overflow-hidden bg-surface">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  width={1920}
                  height={1080}
                  className="w-full h-auto !relative object-contain"
                  priority
                  sizes="100vw"
                />
              </div>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-24">
          <div>
            <h2 className="text-[2rem] mb-6 font-heading">The Challenge</h2>
            <div className="text-[1.25rem] text-text-secondary leading-relaxed">
              <p>{project.description}</p>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-[0.9rem] uppercase tracking-widest text-accent mb-2">
                Client
              </h3>
              <p className="text-[1.1rem] text-foreground">Confidential</p>
            </div>
            <div>
              <h3 className="text-[0.9rem] uppercase tracking-widest text-accent mb-2">
                Role
              </h3>
              <p className="text-[1.1rem] text-foreground">
                {project.category}
              </p>
            </div>
            <div>
              <h3 className="text-[0.9rem] uppercase tracking-widest text-accent mb-2">
                Date
              </h3>
              <p className="text-[1.1rem] text-foreground">
                {new Date(project.created_at).getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
