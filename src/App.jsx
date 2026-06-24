import React, { useEffect, useRef, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { platformSensorsRef, PLATFORM_FIELD } from "./firebase";
import { preprocessPlatformConditions } from "./preprocessPlatformConditions";
import { MediaView } from "./mediaMap";

export default function App() {
  const [stateKey, setStateKey] = useState("000");
  const currentKeyRef = useRef("000");
  const busyRef = useRef(false);

  useEffect(() => {
    currentKeyRef.current = stateKey;
  }, [stateKey]);

  useEffect(() => {
    const unsub = onSnapshot(platformSensorsRef, (snap) => {
      const nextKey = preprocessPlatformConditions(snap.data(), PLATFORM_FIELD);
      if (!nextKey) return;

      // Do not interrupt a currently playing triggered video
      if (busyRef.current && currentKeyRef.current !== "000") return;

      setStateKey(nextKey);

      if (nextKey !== "000") {
        busyRef.current = true;
      }
    });

    return () => unsub();
  }, []);

  const handleVideoEnded = () => {
    busyRef.current = false;
    setStateKey("000");
  };

  return (
    <div style={styles.page}>
      <MediaView
        stateKey={stateKey}
        style={styles.media}
        onEnded={handleVideoEnded}
      />
    </div>
  );
}

const styles = {
  page: {
    margin: 0,
    width: "100vw",
    height: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#000",
    overflow: "hidden",
  },
  media: {
    width: "80vw",
    height: "80vh",
    objectFit: "contain",
    border: "none",
    background: "#000",
  },
};