"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Loader2, ArrowRight } from "lucide-react";
import styles from "./Login.module.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.loginCard}
      >
        <div className={styles.header}>
          <div className={styles.logo}>AD</div>
          <h1>Admin Portal</h1>
          <p>Please enter your credentials to continue.</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>
              <User size={16} /> Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>
              <Lock size={16} /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.error}
            >
              {error}
            </motion.div>
          )}

          <button type="submit" disabled={loading} className={styles.loginBtn}>
            {loading ? (
              <Loader2 className={styles.spin} />
            ) : (
              <>
                Confirm Access <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className={styles.footer}>© 2025 Amcee Daddy. Secure Access.</div>
      </motion.div>
    </div>
  );
}
