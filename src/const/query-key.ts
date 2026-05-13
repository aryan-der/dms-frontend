export const folderQueryKey = {
  folders: ["folders"],
  folder: ({ folderId }: { folderId: string | number }) => {
    return ["folder", folderId]
  },
  folderContent: ({
    parentFolderId,
  }: {
    parentFolderId: string | number | null
  }) => {
    return ["folder", "content", `${parentFolderId ? parentFolderId : ""}`]
  },
  trashFolders: ["folders", "trash"],
}

export const fileQueryKey = {
  files: ["files"],
  file: ({ fileId }: { fileId: string | number }) => {
    return ["file", fileId]
  },
  search: ({ keyword }: { keyword: string }) => {
    return ["file", "search", keyword]
  },
  trashFiles: ["files", "trash"],
  filePage: ({
    fileId,
    filePath,
    pageNumber,
  }: {
    fileId: number
    filePath: string
    pageNumber: number
  }) => {
    return ["file", fileId, filePath, pageNumber]
  },
}
