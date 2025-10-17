"use client";

import styles from "./BackgroundVideo.module.scss";

interface BackgroundVideoProps {
  src?: string;
  className?: string;
}

export default function BackgroundVideo({
  src = "/videos/vid1.mp4",
  className = "",
}: BackgroundVideoProps) {
  return (
    <video
      className={`${styles.backgroundVideo} ${className}`}
      autoPlay
      muted
      loop
      playsInline
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
