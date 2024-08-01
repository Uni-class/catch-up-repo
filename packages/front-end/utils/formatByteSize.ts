export default function formatByteSize(size: number) {
  const units = ["KB", "MB", "GB", "TB"];
  let unitIndex = -1;
  do {
    size /= 1024;
    unitIndex++;
  } while (size >= 1024 && unitIndex < units.length - 1);
  if (unitIndex < 1) {
    return `${size.toFixed(0)}${units[unitIndex]}`;
  }
  return `${size.toFixed(2)}${units[unitIndex]}`;
};
