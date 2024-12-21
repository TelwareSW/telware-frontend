function getElapsedTime(timestamp: string): string {
  const now = new Date().getTime();
  const referenceTime = new Date(timestamp).getTime();
  const elapsedMs = now - referenceTime;

  const seconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years}y`;
  } else if (months > 0) {
    return `${months}mo`;
  } else if (weeks > 0) {
    return `${weeks}w`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${Math.max(seconds, 1)}s`;
  }
}

function getAvatarName(name: string | undefined): string {
  const firstName = name?.split(" ")[0];
  const lastName = name?.split(" ")[1];
  return `${firstName?.charAt(0) || ""} ${lastName?.charAt(0) || ""}`;
}

function isValidDate(date: string): boolean {
  return new Date(date).toString() !== "Invalid Date";
}

export type SearchFilter =
  | "text"
  | "image"
  | "GIF"
  | "sticker"
  | "audio"
  | "video"
  | "file"
  | "link";

function getFileType(filename?: string, content?: string): SearchFilter {
  if (content === undefined) return "text";

  const urlPattern = /(https?:\/\/)/i;
  if (urlPattern.test(content)) return "link";

  if (!filename) return "text";

  const ext = filename.toLowerCase().split(".").pop() || "";

  const imageExts = ["jpg", "jpeg", "png", "webp", "svg", "bmp"];
  if (imageExts.includes(ext)) return "image";

  if (ext === "gif") return "GIF";

  const stickerExts = ["webp", "apng"];
  if (stickerExts.includes(ext)) return "sticker";

  const audioExts = ["mp3", "wav", "ogg", "m4a", "aac", "webm"];
  if (audioExts.includes(ext)) return "audio";

  const videoExts = ["mp4", "mov", "avi", "mkv"];
  if (videoExts.includes(ext)) return "video";

  if (ext) return "file";

  return "text";
}

export { getElapsedTime, getAvatarName, isValidDate, getFileType };
