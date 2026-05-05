import { baseApiUrl } from "@/const/env"
import { funcGetUser, funcSetUser } from "./func-get-user"
import { funcRefresh } from "./func-refresh-token"

type FetchPropsType = {
  endPoint: string
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: any
  headers?: Record<string, string>
  _retry?: boolean
}

export async function funcFetch<T = any>({
  endPoint,
  method = "GET",
  body,
  headers,
  _retry = false,
}: FetchPropsType): Promise<T> {
  const user = funcGetUser()

  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...(body && !(body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...(user?.jwtToken ? { Authorization: `Bearer ${user.jwtToken}` } : {}),
      ...(headers || {}),
    },
    ...(body
      ? {
          body: body instanceof FormData ? body : JSON.stringify(body),
        }
      : {}),
  }

  try {
    const res = await fetch(`${baseApiUrl}${endPoint}`, fetchOptions)

    const contentType = res.headers.get("content-type") || ""

    let data: any

    if (
      contentType.includes("application/octet-stream") ||
      contentType.includes("application/zip") ||
      contentType.includes("application/pdf")
    ) {
      data = await res.blob()
    } else if (contentType.includes("application/json")) {
      data = await res.json()
    } else {
      data = await res.text()
    }

    // ❌ error handling
    if (!res.ok) {
      // 🔁 refresh token logic
      if (res.status === 401 && !_retry) {
        if (!user?.refreshToken) {
          localStorage.removeItem("login-data")
          window.location.href = "/"
          throw new Error("Session expired")
        }

        try {
          const refreshRes = await funcRefresh({
            baseApiUrl,
            refreshToken: user.refreshToken,
            userName: user.email,
            jwtToken: user.jwtToken,
          })

          const newToken = refreshRes?.data

          funcSetUser({
            user: {
              ...user,
              jwtToken: newToken,
            },
          })

          // 🔁 retry request
          return await funcFetch({
            endPoint,
            method,
            body,
            headers,
            _retry: true,
          })
        } catch {
          localStorage.removeItem("login-data")
          window.location.href = "/"
          throw new Error("Session expired")
        }
      }

      throw new Error(data?.message || data || "Something went wrong")
    }

    return data as T
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong")
  }
}
