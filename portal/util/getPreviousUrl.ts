export default function getPreviousUrl(path: string) {
  return path.replace("/[id]", "").split("/").slice(0, -1).join("/");
}
