import { fileEndpoint } from "@/const/endpoints"
import { fileQueryKey, folderQueryKey } from "@/const/query-key"
import { funcFetch } from "@/func/func-fetch"
import type { FileType } from "@/types/data/file-types"
import type { ResTypes } from "@/types/res/res-types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export default function useFile() {
  const QueryClient = useQueryClient()

  const useFileUpload = () =>
    useMutation({
      mutationFn: (formData: FormData) =>
        funcFetch({
          endPoint: fileEndpoint.addFile,
          method: "POST",
          body: formData,
        }) as Promise<ResTypes<FileType>>,

      onSuccess: (data, variables) => {
        const folderId = variables.get("folderId")
        QueryClient.invalidateQueries({
          queryKey: folderQueryKey.folderContent({
            parentFolderId: folderId ? String(folderId) : null,
          }),
        })
        toast.success(data?.message)
      },

      onError: (error) => {
        toast.error(error?.message)
      },
    })

  const useFileViewer = ({ fileId }: { fileId: string | number }) =>
    useQuery({
      queryKey: fileQueryKey.file({ fileId }),
      queryFn: () =>
        funcFetch({
          endPoint: fileEndpoint.viewFile(String(fileId)),
        }) as Promise<ResTypes<FileType>>,
    })

  return {
    useFileUpload,
    useFileViewer,
  }
}
