"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Maximize, Volume2 } from "lucide-react";
import dynamic from "next/dynamic";

const YouTubeEmbed = dynamic(
  () => import("react-social-media-embed").then((mod) => mod.YouTubeEmbed),
  { ssr: false },
);
const TikTokEmbed = dynamic(
  () => import("react-social-media-embed").then((mod) => mod.TikTokEmbed),
  { ssr: false },
);
const InstagramEmbed = dynamic(
  () => import("react-social-media-embed").then((mod) => mod.InstagramEmbed),
  { ssr: false },
);

interface VideoPlayerProps {
  src?: string;
  videoFile?: string;
}

export default function VideoPlayer({ src, videoFile }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // If it's a direct sanity file, it's not a platform embed
  const effectiveSrc = videoFile || src || "";
  const isYouTube =
    effectiveSrc.includes("youtube.com") || effectiveSrc.includes("youtu.be");
  const isTikTok = effectiveSrc.includes("tiktok.com");
  const isInstagram = effectiveSrc.includes("instagram.com");

  if (!hasMounted) return null;

  // Render social embeds ONLY if it's a URL and NOT a direct file
  if (!videoFile) {
    if (isYouTube) {
      return (
        <div className="w-full max-w-[100%] mx-auto overflow-hidden rounded-[20px] bg-surface flex justify-center max-h-[90vh]">
          <YouTubeEmbed url={effectiveSrc} width="100%" />
        </div>
      );
    }

    if (isTikTok) {
      return (
        <div className="w-full max-w-[100%] mx-auto overflow-hidden rounded-[20px] bg-surface flex justify-center max-h-[90vh]">
          <TikTokEmbed url={effectiveSrc} width={325} />
        </div>
      );
    }

    if (isInstagram) {
      return (
        <div className="w-full max-w-[100%] mx-auto overflow-hidden rounded-[20px] bg-surface flex justify-center max-h-[90vh]">
          <InstagramEmbed url={effectiveSrc} width={328} />
        </div>
      );
    }
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
    <div className="relative w-full rounded-[24px] overflow-hidden bg-black group max-h-[90vh] flex items-center justify-center">
      <video
        ref={videoRef}
        src={effectiveSrc}
        className="max-w-full max-h-[90vh] block cursor-pointer object-contain"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
      />

      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full h-1 bg-white/20 rounded-full mb-4 overflow-hidden cursor-pointer">
          <div
            className="h-full bg-accent transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-accent transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <div className="text-sm text-white/80 font-mono">
              {/* Add time displays if needed */}
            </div>
          </div>

          <div className="flex items-center gap-4 text-white">
            <Volume2 size={20} />
            <button
              onClick={handleFullscreen}
              className="text-white hover:text-accent transition-colors"
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
