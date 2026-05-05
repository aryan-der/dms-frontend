import { folderEndpoint } from "@/const/endpoints"
import { funcFetch } from "@/func/func-fetch"
import type { createFolderPayloadType } from "@/types/payload/cretae-folder-types"
import type { ResTypes } from "@/types/res/res-types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export default function useFolder() {
  //   const queryClient = useQueryClient()

  const useCreateFolder = () =>
    useMutation({
      mutationFn: (body: createFolderPayloadType) =>
        funcFetch({
          endPoint: folderEndpoint.addFolder,
          method: "POST",
          body,
        }) as Promise<ResTypes<any>>,

      onSuccess: (data) => {
        toast.success(data?.message)
      },
      onError: (data) => {
        toast.success(data?.message)
      },
    })

  return {
    useCreateFolder,
  }
}
