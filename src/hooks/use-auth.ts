import { authEndpoint } from "@/const/endpoints"
import { useUserContext } from "@/context/user/user-context"
import { funcFetch } from "@/func/func-fetch"
import type { AuthLoginPayloadType } from "@/types/payload/auth-payload-types"
import type { UserDataType } from "@/types/user-data-types"
import { useMutation } from "@tanstack/react-query"
import useLocalStorage from "./use-localstorage"
import { userLoginData } from "@/const/localstorage-key"
import { useNavigate } from "react-router-dom"
import { adminRoute, userRoute } from "@/const/route"
import { toast } from "sonner"

export default function useAuth() {
  const { setUser } = useUserContext()
  const { setValue } = useLocalStorage(userLoginData)
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
        console.log("LOGIN SUCCESS:", data)
        const user = data
        if (user) {
          console.log("SETTING USER:", user)
          setUser(user)
          setValue(user)
          console.log("AFTER SET:", localStorage.getItem("login-data"))
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

  return {
    useLogin,
  }
}
