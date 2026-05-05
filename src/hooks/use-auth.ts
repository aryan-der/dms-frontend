import { authEndpoint } from "@/const/endpoints"
import { useUserContext } from "@/context/user/user-context"
import { funcFetch } from "@/func/func-fetch"
import type {
  AuthLoginPayloadType,
  AuthLogoutPayloadType,
} from "@/types/payload/auth-payload-types"
import type { UserDataType } from "@/types/user-data-types"
import { useMutation } from "@tanstack/react-query"
import useLocalStorage from "./use-localstorage"
import { userLoginData } from "@/const/localstorage-key"
import { useNavigate } from "react-router-dom"
import { adminRoute, userRoute, authRoute } from "@/const/route"
import { toast } from "sonner"
import type { ResTypes } from "@/types/res/res-types"

export default function useAuth() {
  const { setUser } = useUserContext()
  const { setValue, removeValue } = useLocalStorage(userLoginData)
  const navigate = useNavigate()

  const useLogin = () =>
    useMutation({
      mutationFn: (body: AuthLoginPayloadType) =>
        funcFetch({
          endPoint: authEndpoint.login,
          method: "POST",
          body,
        }) as Promise<UserDataType>,

      onSuccess: (data) => {
        const user = data
        if (user) {
          setUser(user)
          setValue(user)
          if (user?.role === "Admin") {
            navigate(adminRoute.dashboard.base, { replace: true })
          } else {
            navigate(userRoute.dashboard.base, { replace: true })
          }
        }
      },
      onError: (data) => {
        toast.error(data?.message)
      },
    })

  const useRefreshToken = () =>
    useMutation({
      mutationFn: () =>
        funcFetch({
          endPoint: authEndpoint.refreshToken,
          method: "POST",
        }) as Promise<ResTypes<string>>,
    })

  const useLogout = () =>
    useMutation({
      mutationFn: (body: AuthLogoutPayloadType) =>
        funcFetch({
          endPoint: authEndpoint.logout,
          method: "POST",
          body,
        }) as Promise<ResTypes<string>>,

      onSuccess: async () => {
        setUser(null)
        removeValue()
        navigate(authRoute.login, { replace: true })
      },
    })

  return {
    useLogin,
    useRefreshToken,
    useLogout,
  }
}
