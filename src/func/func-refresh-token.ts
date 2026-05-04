import { authEndpoint } from "@/const/endpoints"
import type { ResTypes } from "@/types/res/res-types"

export async function funcRefresh({
  baseApiUrl,
  refreshToken,
  userName,
  jwtToken,
}: {
  baseApiUrl: string
  refreshToken: string
  userName: string
  jwtToken: string
}): Promise<ResTypes<string>> {
  try {
    const res = await fetch(`${baseApiUrl}${authEndpoint?.refreshToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
      },
      body: JSON.stringify({
        refreshToken,
        userName,
      }),
    })

    const contentType = res.headers.get("content-type")

    const data =
      contentType && contentType.includes("application/json")
        ? await res.json()
        : await res.text()

    if (!res.ok) {
      throw new Error(
        data?.message ||
          data ||
          "We couldn't refresh your session. Please try logging in again."
      )
    }

    return data
  } catch (error: any) {
    throw new Error(
      error?.message ||
        "We couldn't refresh your session. Please try logging in again."
    )
  }
}
