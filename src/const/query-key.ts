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
  downloadItems: ["downloadItem"],
}

export const fileQueryKey = {
  files: ["files"],
  file: ({ fileId }: { fileId: string | number }) => {
    return ["file", fileId]
  },
}
