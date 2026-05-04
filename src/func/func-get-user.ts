import { userLoginData } from "@/const/localstorage-key"
import type { UserDataType } from "@/types/user-data-types"

export function funcGetUser(): UserDataType | null {
  const data = localStorage.getItem(userLoginData)
  return data ? JSON.parse(data) : null
}

export function funcSetUser({ user }: { user: UserDataType }) {
  localStorage.setItem(userLoginData, JSON.stringify(user))
}
