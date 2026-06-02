import { fileEndpoint, folderEndpoint } from "@/const/endpoints"
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

  const useFileViewer = ({ fileId }: { fileId: string }) =>
    useQuery({
      queryKey: ["file-view", fileId],
      staleTime: 0,
      enabled: !!fileId,
      queryFn: async () => {
        const blob = await funcFetch<Blob>({
          endPoint: fileEndpoint.viewFile(fileId),
        })

        return URL.createObjectURL(blob)
      },
    })

  const useUpdateItem = () =>
    useMutation({
      mutationFn: ({
        type,
        id,
        ...body
      }: {
        type: "FILE" | "FOLDER"
        id: string | number
        name: string
        parentFolderId?: string
      }) =>
        funcFetch({
          endPoint:
            type === "FILE"
              ? fileEndpoint.updateFile(id)
              : folderEndpoint.updateFolder({ id }),
          method: "PUT",
          body,
        }),

      onSuccess: (data, variables) => {
        QueryClient.invalidateQueries({
          queryKey: fileQueryKey.files,
        })
        QueryClient.invalidateQueries({
          queryKey: folderQueryKey.folderContent({
            parentFolderId: variables.parentFolderId ?? null,
          }),
        })
        toast.success(data?.message)
      },
      onError: (error) => {
        toast.error(error?.message)
      },
    })

  return {
    useFileUpload,
    useFileViewer,
    useUpdateItem,
  }
}
