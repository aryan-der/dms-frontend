import { userEndPoint } from "@/const/endpoints"
import { funcFetch } from "@/func/func-fetch"
import type { UserRegisterTypes } from "@/types/payload/user-register-types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export default function useUser() {
  const useRegister = () =>
    useMutation({
      mutationFn: (body: UserRegisterTypes) =>
        funcFetch({
          endPoint: userEndPoint.register,
          method: "POST",
          body,
        }),
      onSuccess: (data) => {
        toast.success(data?.message)
      },
      onError: (data) => {
        toast.error(data?.message)
      },
    })

  return {
    useRegister,
  }
}
