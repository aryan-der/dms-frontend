import { jwtDecode } from "jwt-decode"

type jwtType = {
  exp: number
}

export const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtDecode<jwtType>(token)
    return decoded.exp * 1000 < Date.now()
  } catch {
    return true
  }
}
