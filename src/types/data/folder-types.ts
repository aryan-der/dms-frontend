export type FolderType = {
  _id: string
  ownerId: string
  name: string
  parentFolderId: string | null
  isFavorite: boolean
  isDeleted: boolean
  deletedAt: string | null
  comments: unknown[]
  createdAt: string
  updatedAt: string
  __v: number
}

export type FolderCardProps = {
  folders?: FolderType[]
  onOpenFolder?: (parentFolderId: string) => void
}
