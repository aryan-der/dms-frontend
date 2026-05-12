export type FileType = {
  _id: string
  ownerId: string
  name: string
  folderId: string | null
  type: "FILE"
  mimeType: string
  size: number
  path: string
  originalName: string
  isDeleted: boolean
  deletedAt: string | null
  createdAt: string
  updatedAt: string
  __v: number
}
