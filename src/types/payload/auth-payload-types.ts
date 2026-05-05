export type AuthLoginPayloadType = {
  email: string
  password: string
}

export type AuthLogoutPayloadType = Pick<AuthLoginPayloadType, "email"> & {
  refreshToken: string
}

export type AuthForgotPasswordPayloadType = Pick<AuthLoginPayloadType, "email">
