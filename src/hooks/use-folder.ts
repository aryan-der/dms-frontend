import { folderEndpoint } from "@/const/endpoints"
import { folderQueryKey } from "@/const/query-key"
import { funcFetch } from "@/func/func-fetch"
import type { FileType } from "@/types/data/file-types"
import type { FolderType } from "@/types/data/folder-types"
import type { createFolderPayloadType } from "@/types/payload/cretae-folder-types"
import type { ResTypes } from "@/types/res/res-types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export default function useFolder() {
  const QueryClient = useQueryClient()

  const useCreateFolder = () =>
    useMutation({
      mutationFn: (body: createFolderPayloadType) =>
        funcFetch({
          endPoint: folderEndpoint.addFolder,
          method: "POST",
          body,
        }) as Promise<ResTypes<FolderType>>,

      onSuccess: (data, variable) => {
        QueryClient.invalidateQueries({
          queryKey: folderQueryKey.folderContent({
            parentFolderId: variable.parentFolderId ?? "",
          }),
        })
        toast.success(data?.message)
      },

      onError: (error) => {
        toast.error(error?.message)
      },
    })

  const useUploadFolder = () =>
    useMutation({
      mutationFn: async ({
        formData,
        parentFolderId,
      }: {
        formData: FormData
        parentFolderId: string | number | null
      }) =>
        funcFetch({
          endPoint: folderEndpoint.uploadFolder,
          method: "POST",
          body: formData,
        }) as Promise<{
          message: string
        }>,

      onSuccess: (data, variable) => {
        QueryClient.invalidateQueries({
          queryKey: folderQueryKey.folderContent({
            parentFolderId: variable.parentFolderId ?? "",
          }),
        })

        toast.success(data?.message || "Folder uploaded successfully")
      },

      onError: (error) => {
        toast.error(error?.message || "Error uploading folder")
      },
    })

  const useGetContent = ({
    parentFolderId,
  }: {
    parentFolderId?: string | number | null
  }) =>
    useQuery({
      queryKey: folderQueryKey.folderContent({
        parentFolderId: parentFolderId ?? "",
      }),
      queryFn: () =>
        funcFetch({
          endPoint: folderEndpoint.getFolderContent({ parentFolderId }),
        }) as Promise<
          ResTypes<{
            folders: FolderType[]
            files: FileType[]
          }>
        >,
    })

  return {
    useCreateFolder,
    useGetContent,
    useUploadFolder,
  }
}
