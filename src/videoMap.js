// Load all matching mp4 files from src/assets
const videoModules = import.meta.glob("./assets/video_*.mp4", {
  eager: true,
  import: "default",
});

// Build map like:
// {
//   "001": "/src/assets/video_001.mp4",
//   "010": "/src/assets/video_010.mp4",
//   "100": "/src/assets/video_100.mp4"
// }
const VIDEO_MAP = {};

for (const [path, url] of Object.entries(videoModules)) {
  const match = path.match(/video_(\d{3})\.mp4$/);
  if (match) {
    const key = match[1];
    VIDEO_MAP[key] = url;
  }
}

export function getVideoKey(values) {
  return values.join("");
}

export function getVideoUrl(values) {
  const key = getVideoKey(values);
  return VIDEO_MAP[key] || null;
}

export function getVideoUrlByKey(key) {
  return VIDEO_MAP[key] || null;
}

export { VIDEO_MAP };