export type UserDataType = {
  userId: number
  email: string
  role: "Admin" | "User"
  jwtToken: string
  refreshToken: string
}
