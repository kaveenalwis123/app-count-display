import React, { useEffect, useRef, useState } from "react";
import uniliverLogo from "./assets/uniliver_logo.jpg";
import { getVideoUrlByKey } from "./videoMap";

const SOUND_KEY = "shelf_sound_unlocked";

export function MediaView({ stateKey, style, onEnded }) {
  const videoRef = useRef(null);
  const [soundUnlocked, setSoundUnlocked] = useState(
    localStorage.getItem(SOUND_KEY) === "true"
  );

  const videoUrl = getVideoUrlByKey(stateKey);

  // First user click unlocks sound
  useEffect(() => {
    const unlockSound = async () => {
      const video = videoRef.current;
      if (!video) return;

      try {
        video.muted = false;
        video.volume = 1;
        await video.play(); // must happen inside user gesture
        localStorage.setItem(SOUND_KEY, "true");
        setSoundUnlocked(true);
        console.log("Sound unlocked");
      } catch (err) {
        console.log("Sound unlock failed:", err);
      }
    };

    window.addEventListener("click", unlockSound, { once: true });
    return () => window.removeEventListener("click", unlockSound);
  }, []);

  // Play whenever state changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (stateKey === "000" || !videoUrl) {
      video.pause();
      return;
    }

    const playVideo = async () => {
      try {
        video.load();
        video.currentTime = 0;
        video.muted = !soundUnlocked;
        video.volume = 1;
        await video.play();
        console.log("Playing:", stateKey, videoUrl, "sound:", soundUnlocked);
      } catch (err) {
        console.log("Play failed:", err);
      }
    };

    playVideo();
  }, [stateKey, videoUrl, soundUnlocked]);

  if (stateKey === "000" || !videoUrl) {
    return (
      <img
        src={uniliverLogo}
        alt="Logo"
        style={{ ...style, objectFit: "contain", display: "block" }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      autoPlay
      muted={!soundUnlocked}
      playsInline
      preload="auto"
      controls={false}
      onEnded={onEnded}
      style={{
        ...style,
        display: "block",
        background: "#000",
      }}
    />
  );
}