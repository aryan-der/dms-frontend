export type MoveItemsPayload = {
  folderIds: string[]
  fileIds: string[]
  destinationFolderId: string | null
  targetFolderId?: string | null // invalidate માટે
  parentFolderId?: string
}
