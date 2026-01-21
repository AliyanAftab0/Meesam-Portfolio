"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Maximize, Volume2 } from "lucide-react";
import {
  YouTubeEmbed,
  TikTokEmbed,
  InstagramEmbed,
} from "react-social-media-embed";
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Determine platform
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  const isTikTok = src.includes("tiktok.com");
  const isInstagram = src.includes("instagram.com");

  if (!hasMounted) return null;

  if (isYouTube) {
    return (
      <div className={styles.socialContainer}>
        <YouTubeEmbed url={src} width="100%" />
      </div>
    );
  }

  if (isTikTok) {
    return (
      <div className={styles.socialContainer}>
        <TikTokEmbed url={src} width={325} />
      </div>
    );
  }

  if (isInstagram) {
    return (
      <div className={styles.socialContainer}>
        <InstagramEmbed url={src} width={328} />
      </div>
    );
  }

  // Legacy/Direct Video Player
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(current);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className={styles.container}>
      <video
        ref={videoRef}
        src={src}
        className={styles.video}
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
      />

      <div className={styles.controls}>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${progress}%` }} />
        </div>

        <div className={styles.bottomControls}>
          <div className={styles.left}>
            <button onClick={togglePlay} className={styles.controlBtn}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <div className={styles.time}>
              {/* Add time displays if needed */}
            </div>
          </div>

          <div className={styles.right}>
            <Volume2 size={20} />
            <button onClick={handleFullscreen} className={styles.controlBtn}>
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
