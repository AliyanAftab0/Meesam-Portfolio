import { sql } from "@/lib/db";
import styles from "./Overview.module.css";
import { Video, ImageIcon, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function AdminOverview() {
  const stats = await sql`
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE category = 'Video') as videos,
      COUNT(*) FILTER (WHERE category = 'Graphic Design') as graphics,
      COUNT(*) FILTER (WHERE is_featured = true) as featured
    FROM projects
  `;

  const { total, videos, graphics, featured } = stats[0];

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.overviewTitle}>Dashboard Overview</h1>
        <p className={styles.overviewSubtitle}>
          Welcome back. Here's what's happening with your portfolio.
        </p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Sparkles size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.label}>Total Projects</span>
            <span className={styles.value}>{total}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Video size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.label}>Video Content</span>
            <span className={styles.value}>{videos}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <ImageIcon size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.label}>Graphic Design</span>
            <span className={styles.value}>{graphics}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Sparkles size={24} color="var(--accent)" />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.label}>Featured Work</span>
            <span className={styles.value}>{featured}</span>
          </div>
        </div>
      </div>

      <section className={styles.recentActivity}>
        <h2>Quick Actions</h2>
        <div className={styles.actionGrid}>
          <Link href="/admin/projects?action=new" className={styles.actionBtn}>
            Upload New Project
          </Link>
          <Link href="/admin/services" className={styles.actionBtn}>
            Update Services
          </Link>
          <Link href="/admin/settings" className={styles.actionBtn}>
            Site Settings
          </Link>
        </div>
      </section>
    </div>
  );
}
