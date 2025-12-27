"use client";

import { useState, useEffect } from "react";
import styles from "./Services.module.css";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      id: editingService?.id,
      title: formData.get("title"),
      description: formData.get("description"),
    };

    const method = editingService ? "PUT" : "POST";
    await fetch("/api/services", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setIsModalOpen(false);
    setEditingService(null);
    fetchServices();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this service?")) {
      await fetch(`/api/services?id=${id}`, { method: "DELETE" });
      fetchServices();
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Services</h1>
          <p>Manage the services you offer on the homepage.</p>
        </div>
        <button
          className={styles.addBtn}
          onClick={() => {
            setEditingService(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={20} />
          Add Service
        </button>
      </header>

      <div className={styles.grid}>
        {services.map((service) => (
          <div key={service.id} className={styles.card}>
            <div className={styles.cardContent}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => {
                  setEditingService(service);
                  setIsModalOpen(true);
                }}
                className={styles.iconBtn}
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className={`${styles.iconBtn} ${styles.delete}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{editingService ? "Edit Service" : "Add Service"}</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label>Title</label>
                <input
                  name="title"
                  defaultValue={editingService?.title}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Description</label>
                <textarea
                  name="description"
                  defaultValue={editingService?.description}
                  rows={4}
                  required
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                {editingService ? "Update" : "Save"} Service
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
