export const funcGetChildPath = (fullPath: string, parent: string) => {
  return fullPath.replace(parent + "/", "")
}
