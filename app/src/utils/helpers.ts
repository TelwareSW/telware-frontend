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
    return `${seconds}s`;
  }
}
function getAvatarName(name: string | undefined): string {
  const firstName = name?.split(" ")[0];
  const lastName = name?.split(" ")[1];
  return `${firstName?.charAt(0) || ""} ${lastName?.charAt(0) || ""}`;
}
export { getElapsedTime, getAvatarName };
