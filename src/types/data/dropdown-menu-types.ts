import type { FileType } from "./file-types"
import type { FolderType } from "./folder-types"

export type SubMenuItem = {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
}

export type MenuItem =
  | {
      type: "item"
      id?: string
      label: React.ReactNode
      icon: React.ReactNode
      right?: string
      hasSubmenu?: boolean
      submenuItems?: SubMenuItem[]
      danger?: boolean
      onClick?: () => void
    }
  | { type: "divider" }

export interface DropdownItemsProps {
  folder: FolderType | FileType
  onSelectFolder?: (folderId: string) => void
}

export type BulkMenuuItems = {
  totalSelected: number
  clearSelection: () => void
  selectedItems: {
    folders: string[]
    files: string[]
  }
}
