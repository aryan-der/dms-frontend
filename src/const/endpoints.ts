export const authEndpoint = {
  login: "/Auth/Login",
  refreshToken: "/Login/RefreshToken",
  logout: "/Login/Logout",
  forgotPassword: "/Login/ForgotPassword",
  resetPassword: "/Login/ResetPassword",
}

export const folderEndpoint = {
  addFolder: "/FolderDetails/Create",
  updateFolder: "/FolderDetails/Update",
  getFolders: "/FolderDetails/Get",
  getFolderById: ({ folderId }: { folderId: string | number }) => {
    return `/FolderDetails/GetById?Id=${String(folderId)}`
  },
  deleteFolder: "/FolderDetails/Delete",
  getFolderContent: ({
    parentFolderId,
  }: {
    parentFolderId: string | number
  }) => {
    return `/FolderDetails/GetFolderContent?parentFolderId=${String(parentFolderId)}`
  },
  getTrashFolderData: "/FolderDetails/GetTrashData",
  addOrUpdateColor: "/FolderDetails/AddOrUpdateColor",
}

export const fileEndpoint = {
  addFile: "/FileDetails/Create",
  getFiles: "/FileDetails/Get",
  getFileById: ({ fileId }: { fileId: string | number }) => {
    return `/FileDetails/GetById?Id=${String(fileId)}`
  },
  deleteFile: "/FileDetails/Delete",
  searchFile: ({ keyword }: { keyword: string }) => {
    return `/FileDetails/FileSearch?keyword=${keyword}`
  },
  getTrashFileData: "/FileDetails/GetTrashData",
  viewFile: ({ fileId }: { fileId: string | number }) => {
    return `/SecureFile/${String(fileId)}/view`
  },
  filePagePreview: ({
    fileId,
    filePath,
    pageNumber,
  }: {
    fileId: number
    filePath: string
    pageNumber: number
  }) => {
    return `/FileDetails/GetFilePage?fileId=${String(fileId)}&filePath=${filePath}&pageNumber=${String(pageNumber)}`
  },
}

export const userEndpoint = {
  addUser: "/UserDetails/Create",
  updateUser: "/UserDetails/Update",
  deleteUserById: ({ userId }: { userId: string | number }) => {
    return `/UserDetails/Delete?Id=${String(userId)}`
  },
  getUsers: "/UserDetails/Get",
  getUserById: ({ userId }: { userId: string | number }) => {
    return `/UserDetails/GetById?Id=${String(userId)}`
  },
  toggleVisible: ({ userId }: { userId: string | number }) => {
    return `/UserDetails/ToggleVisibility?id=${String(userId)}`
  },
  userPermissions: ({
    userId,
    fileId,
    folderId,
  }: {
    userId: string | number
    fileId: string | number
    folderId: string | number
  }) => {
    return `/UserRights/GetUserRights?userId=${userId}&folderId=${folderId}&fileId=${fileId}`
  },
}

export const userRightEndpoint = {
  addUserPermission: "/UserRights/AssignPermission",
  addFavourite: "/UserRights/AddFavourite",
  deleteFromTrash: "/Dashboard/DeleteFromTrash",
  dashBordCount: "/Dashboard/GetDashboardCount",
  getFavourite: "/UserRights/GetFavourite",
  getStorage: "/Dashboard/Storage",
  moveFileorFolder: "/UserRights/MoveFoldeOrFile",
  addComment: "/UserRights/AddComment",
  getComment: ({
    folderId,
    fileId,
  }: {
    folderId?: string | number | null
    fileId?: string | number | null
  }) => {
    return `/UserRights/GetComments?folderId=${folderId ?? ""}&fileId=${fileId ?? ""}`
  },
  deleteComment: ({ commentId }: { commentId: string | number }) => {
    return `/UserRights/DeleteComment?commentId=${String(commentId)}`
  },
  GetDownloadFolderFiles: ({
    folderId,
    fileId,
  }: {
    folderId?: string | number
    fileId?: string | number
  }) => {
    return `/UserRights/GetDownloadData?fileId=${fileId ?? ""}&folderId=${folderId ?? ""}`
  },
}

export const metaDataEndPoint = {
  addMetaData: "/TagDetails/Create",
  updateMetaData: "/TagDetails/Update",
  getMetaData: "/TagDetails/Get",
  getMetaDataByID: ({
    folderId,
    fileId,
  }: {
    folderId?: string | number | null
    fileId?: string | number | null
  }) => {
    return `/TagDetails/GetById?folderId=${folderId ?? ""}&fileId=${fileId ?? ""}`
  },
  deleteMetaData: ({ tagId }: { tagId: string | number }) => {
    return `/TagDetails/Delete?Id=${String(tagId)}`
  },
}
