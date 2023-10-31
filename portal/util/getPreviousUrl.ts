export default function getPreviousUrl(path: string) {
  return path.split("/").slice(0, -1).join("/");
}
