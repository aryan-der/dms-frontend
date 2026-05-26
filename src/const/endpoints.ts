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

  deleteFolder: "/folders/delete-folders",

  updateFolder: ({ folderId }: { folderId: string | number | null }) =>
    `/folders/update-folder/${folderId}`,
}

export const fileEndpoint = {
  addFile: "/files/upload",
  viewFile: (id: string) => `/files/view/${id}`,
}
