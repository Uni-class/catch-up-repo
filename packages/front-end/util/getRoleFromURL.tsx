export default function getRoleFromURL(pathname: string): string {
  return pathname.split("/").at(-1) || "participant";
}
