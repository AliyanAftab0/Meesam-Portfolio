"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import styles from "./Login.module.css";
import { authClient } from "@/lib/auth-client";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await authClient.signIn.username(
      {
        username,
        password,
      },
      {
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
        onError: (ctx) => setError(ctx.error.message || "Invalid credentials"),
        onSuccess: () => {
          router.push("/admin");
          router.refresh();
        },
      }
    );
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
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
