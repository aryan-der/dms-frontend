import { fileEndpoint } from "@/const/endpoints"
import { funcFetch } from "@/func/func-fetch"
import type { FileType } from "@/types/data/file-types"
import type { ResTypes } from "@/types/res/res-types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export default function useFile() {
  const useFileUpload = () =>
    useMutation({
      mutationFn: (formData: FormData) =>
        funcFetch({
          endPoint: fileEndpoint.addFile,
          method: "POST",
          body: formData,
        }) as Promise<ResTypes<FileType>>,

      onSuccess: (data) => {
        toast.success(data?.message)
      },

      onError: (error) => {
        toast.error(error?.message)
      },
    })

  return {
    useFileUpload,
  }
}
