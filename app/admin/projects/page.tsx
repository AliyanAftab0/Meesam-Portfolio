"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./Projects.module.css";
import { Plus, Trash2, Edit2, ExternalLink } from "lucide-react";
import { Project } from "@/types/project";
import FileUpload from "./FileUpload";

function ProjectsContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  const searchParams = useSearchParams();

  // Track uploaded URLs
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");

  useEffect(() => {
    fetchProjects();

    // Check for quick actions
    if (searchParams.get("action") === "new") {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  const initDelete = (id: number) => {
    setProjectToDelete(id);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      const res = await fetch(`/api/projects?id=${projectToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setProjectToDelete(null);
      fetchProjects();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete project");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setUploadedImageUrl("");
    setUploadedVideoUrl("");
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.headerMain}>
          <h1>Projects</h1>
          <p>Manage your portfolio work and featured projects.</p>
        </div>
        <button
          className={styles.addBtn}
          onClick={() => {
            setEditingProject(null);
            setUploadedImageUrl("");
            setUploadedVideoUrl("");
            setIsModalOpen(true);
          }}
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.projectTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Project</th>
              <th className={styles.tableHeader}>Category</th>
              <th className={styles.tableHeader}>Featured</th>
              <th className={styles.tableHeader}>Date</th>
              <th className={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: any) => (
              <tr key={project.id}>
                <td className={styles.tableCell}>
                  <div className={styles.projectTitle}>{project.title}</div>
                </td>
                <td className={styles.tableCell}>
                  <span className={styles.categoryTag}>{project.category}</span>
                </td>
                <td className={styles.tableCell}>
                  <span
                    className={`${styles.featuredTag} ${
                      project.is_featured ? styles.isFeatured : ""
                    }`}
                  >
                    {project.is_featured ? "Yes" : "No"}
                  </span>
                </td>
                <td className={styles.tableCell}>
                  {new Date(project.created_at).toLocaleDateString()}
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionIcon}
                      title="Edit"
                      onClick={() => {
                        setEditingProject(project);
                        setUploadedImageUrl(project.image_url);
                        setUploadedVideoUrl(project.video_url || "");
                        setIsModalOpen(true);
                      }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className={`${styles.actionIcon} ${styles.delete}`}
                      onClick={() => initDelete(project.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    <a
                      href={`/projects/${project.id}`}
                      target="_blank"
                      className={styles.actionIcon}
                      title="View"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{editingProject ? "Edit Project" : "Add New Project"}</h2>
            <form
              className={styles.form}
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const projectData = {
                  id: editingProject?.id,
                  title: formData.get("title"),
                  category: formData.get("category"),
                  description: formData.get("description"),
                  image_url: uploadedImageUrl,
                  video_url: uploadedVideoUrl,
                  is_featured: formData.get("is_featured") === "on",
                  skills: (formData.get("skills") as string)
                    .split(",")
                    .map((s) => s.trim()),
                };

                const method = editingProject ? "PUT" : "POST";
                await fetch("/api/projects", {
                  method,
                  body: JSON.stringify(projectData),
                  headers: { "Content-Type": "application/json" },
                });

                handleModalClose();
                fetchProjects();
              }}
            >
              <input
                name="title"
                className={styles.formInput}
                placeholder="Project Title"
                defaultValue={editingProject?.title}
                required
              />
              <select
                name="category"
                className={styles.formSelect}
                defaultValue={editingProject?.category || "Video"}
                required
              >
                <option value="Video">Video</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Motion Graphics">Motion Graphics</option>
              </select>
              <textarea
                name="description"
                className={styles.formTextarea}
                placeholder="Description"
                rows={3}
                defaultValue={editingProject?.description}
                required
              ></textarea>

              <FileUpload
                label="Project Thumbnail"
                accept="image/*"
                type="image"
                defaultValue={editingProject?.image_url}
                onUpload={(url) => setUploadedImageUrl(url)}
              />

              <div className={styles.inputGroup}>
                <label className={styles.label}>Social/Video Link</label>
                <input
                  type="url"
                  name="video_url"
                  className={styles.formInput}
                  placeholder="https://youtube.com/..., https://tiktok.com/..., or .mp4"
                  defaultValue={editingProject?.video_url}
                  onChange={(e) => setUploadedVideoUrl(e.target.value)}
                />
                <p className={styles.hint}>
                  Supports YouTube, TikTok, Instagram, or direct MP4 links
                </p>
              </div>

              <input
                name="skills"
                className={styles.formInput}
                placeholder="Skills (comma separated)"
                defaultValue={editingProject?.skills?.join(", ")}
              />
              <div className={styles.formCheckbox}>
                <input
                  type="checkbox"
                  name="is_featured"
                  id="is_featured"
                  className={styles.checkboxInput}
                  defaultChecked={editingProject?.is_featured}
                />
                <label htmlFor="is_featured">Feature on homepage</label>
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={handleModalClose}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  {editingProject ? "Update" : "Save"} Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {projectToDelete && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modal} ${styles.deleteModal}`}>
            <h2>Delete Project?</h2>
            <p>
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>
            <div className={styles.modalActions}>
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminProjects() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
