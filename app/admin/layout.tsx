"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Admin.module.css";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  LogOut,
  Home,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Overview", href: "/admin", icon: <LayoutDashboard size={20} /> },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: <FolderKanban size={20} />,
    },
    {
      name: "Services",
      href: "/admin/services",
      icon: <Sparkles size={20} />,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings size={20} />,
    },
  ];

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/admin/login");
          router.refresh();
        },
      },
    });
  };

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logo}>
            AD <span className={styles.dot}>.</span>
          </Link>
          <span className={styles.badge}>Admin</span>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${styles.navItem} ${
                pathname === item.href ? styles.active : ""
              }`}
            >
              <div className={styles.navItemIcon}>{item.icon}</div>
              <span className={styles.navItemLabel}>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
          <Link href="/" className={styles.navItem}>
            <Home size={20} />
            <span className={styles.navItemLabel}>Back to Site</span>
          </Link>
        </div>
      </aside>

      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
