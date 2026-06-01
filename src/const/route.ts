import { funcGetChildPath } from "@/func/func-get-child-path"

// Auth

const authBaseRoute = "/auth"

export const authRoute = {
  base: authBaseRoute,
  login: `${authBaseRoute}/login`,
  register: `${authBaseRoute}/register`,
}

export const authChildRoute = {
  login: funcGetChildPath(authRoute.login, authRoute.base),
  register: funcGetChildPath(authRoute.register, authRoute.base),
}

const shareBaseRoute = "/share"

export const shareRoute = {
  base: shareBaseRoute,
  share: `${shareBaseRoute}/:token`,
}

export const shareChildRoute = {
  share: funcGetChildPath(shareRoute.share, shareRoute.base),
}

// Admin

const adminBase = "/admin"

export const adminRoute = {
  adminBase: `${adminBase}`,
  dashboard: {
    base: `${adminBase}/dashboard`,
  },
  users: {
    base: `${adminBase}/users`,
  },
  favourite: {
    base: `${adminBase}/favourite`,
  },
  trash: {
    base: `${adminBase}/trash`,
  },
  search: {
    base: `${adminBase}/search`,
  },
}

export const adminChildRoute = {
  dashboard: funcGetChildPath(adminRoute.dashboard.base, adminRoute.adminBase),
  users: funcGetChildPath(adminRoute.users.base, adminRoute.adminBase),
  favourite: funcGetChildPath(adminRoute.favourite.base, adminRoute.adminBase),
  trash: funcGetChildPath(adminRoute.trash.base, adminRoute.adminBase),
  search: funcGetChildPath(adminRoute.search.base, adminRoute.adminBase),
}

// User

export const userRoute = {
  userBase: "/",
  dashboard: {
    base: "/dashboard",
  },
  search: {
    base: "/search",
  },
  favourite: {
    base: "/favourite",
  },
  trash: {
    base: "/trash",
  },
}

export const userChildRoute = {
  dashboard: funcGetChildPath(userRoute.dashboard.base, userRoute.userBase),
  search: funcGetChildPath(userRoute.search.base, userRoute.userBase),
  favourite: funcGetChildPath(userRoute.favourite.base, userRoute.userBase),
  trash: funcGetChildPath(userRoute.trash.base, userRoute.userBase),
}
