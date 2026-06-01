export type shareEveryonePayload = {
  folderIds: string[]
  fileIds: string[]
  shareType: "public" | "private"
  password: string
  emails: string[]
  phones: string[]
  expiryDays: number
}

export interface ShareFile {
  _id: string
  name: string
  size: number
  mimeType: string
  url: string
}

export interface ShareFolder {
  _id: string
  name: string
}

export interface ShareInfoResponse {
  success: boolean
  shareType: "public" | "private"
  allowDownload: boolean
  message?: string
}

export interface ShareAccessResponse {
  success: boolean
  allowDownload: boolean
  files: ShareFile[]
  folders: ShareFolder[]
  message?: string
}

export interface ShareAccessRequest {
  password: string
}
