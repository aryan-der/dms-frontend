export const authEndpoint = {
  login: "/Auth/Login",
  refreshToken: "/Auth/RefreshToken",
  logout: "/Auth/Logout",
  forgotPassword: "/Auth/ForgotPassword",
  resetPassword: "/Auth/ResetPassword",
}

export const folderEndpoint = {
  // Create a new folder
  addFolder: "/folders",

  // Get folders/files content
  getFolderContent: ({
    parentFolderId,
  }: {
    parentFolderId?: string | number | null
  }) =>
    parentFolderId
      ? `/get/content?parentFolderId=${parentFolderId}`
      : `/get/content`,

  // Upload folder
  uploadFolder: "/folders/upload",

  deleteItems: "/folders/delete-items",

  updateFolder: ({ id }: { id: string | number | null }) =>
    `/folders/update-folder/${id}`,

  moveItems: "/folders/move-items",
  downloadItem: "/folders/download-items",
  shareEveryone: "/folders/share",
  getShare: (token: string) => `/get/share/${token}`,
  shareAccess: (token: string) => `/folders/share/${token}`,
}

export const fileEndpoint = {
  addFile: "/files/upload",
  viewFile: (id: string) => `/files/view/${id}`,
  updateFile: (fileId: string | number) => `/files/update-file/${fileId}`,
}
