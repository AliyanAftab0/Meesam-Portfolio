"use client";

import { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import { Save, Loader2 } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await fetch("/api/settings");
    const data = await res.json();
    setSettings(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      if (res.ok) {
        setMessage("Settings updated successfully");
      } else {
        setMessage("Failed to update settings");
      }
    } catch (error) {
      setMessage("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  if (!settings)
    return <div className={styles.loading}>Loading settings...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Site Settings</h1>
          <p>Manage your profile info, social links, and about section.</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className={styles.saveBtn}
        >
          {saving ? (
            <Loader2 className={styles.spin} size={20} />
          ) : (
            <Save size={20} />
          )}
          Save Changes
        </button>
      </header>

      {message && (
        <div
          className={`${styles.message} ${
            message.includes("success") ? styles.success : styles.error
          }`}
        >
          {message}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.section}>
          <h2>Profile Information</h2>
          <div className={styles.field}>
            <label>Hero Title</label>
            <input
              value={settings.hero_title || ""}
              onChange={(e) => handleChange("hero_title", e.target.value)}
              placeholder="Main impact title"
            />
          </div>
          <div className={styles.field}>
            <label>Contact Email</label>
            <input
              value={settings.contact_email || ""}
              onChange={(e) => handleChange("contact_email", e.target.value)}
              placeholder="Your professional email"
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>About Section</h2>
          <div className={styles.field}>
            <label>Paragraph 1 (Philosophy)</label>
            <textarea
              rows={3}
              value={settings.about_p1 || ""}
              onChange={(e) => handleChange("about_p1", e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label>Paragraph 2 (Experience)</label>
            <textarea
              rows={3}
              value={settings.about_p2 || ""}
              onChange={(e) => handleChange("about_p2", e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label>Paragraph 3 (Location/Call)</label>
            <textarea
              rows={3}
              value={settings.about_p3 || ""}
              onChange={(e) => handleChange("about_p3", e.target.value)}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>Social Links</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Instagram URL</label>
              <input
                value={settings.instagram_url || ""}
                onChange={(e) => handleChange("instagram_url", e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Youtube URL</label>
              <input
                value={settings.youtube_url || ""}
                onChange={(e) => handleChange("youtube_url", e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>TikTok URL</label>
              <input
                value={settings.tiktok_url || ""}
                onChange={(e) => handleChange("tiktok_url", e.target.value)}
              />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
