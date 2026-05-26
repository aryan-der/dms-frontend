import { folderEndpoint } from "@/const/endpoints"
import { folderQueryKey } from "@/const/query-key"
import { funcFetch } from "@/func/func-fetch"
import type { BreadcrumbType } from "@/types/data/bredcrumb-types"
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
            breadcrumb: BreadcrumbType[]
          }>
        >,
    })

  const useDeleteFolder = () =>
    useMutation({
      mutationFn: (body) =>
        funcFetch({
          endPoint: folderEndpoint.deleteFolder,
          method: "DELETE",
          body,
        }),
      onSuccess: (data) => {
        QueryClient.invalidateQueries({
          queryKey: folderQueryKey.folders,
        })
        toast.success(data?.message)
      },
      onError: (error) => {
        toast.error(error?.message)
      },
    })

  const useUpdateFolder = () =>
    useMutation({
      mutationFn: ({
        folderId,
        ...body
      }: {
        folderId: string | number | null
        parentFolderId?: string | number | null
        [key: string]: unknown
      }) =>
        funcFetch({
          endPoint: folderEndpoint.updateFolder({ folderId }),
          method: "PUT",
          body,
        }),
      onSuccess: (data, variable) => {
        QueryClient.invalidateQueries({
          queryKey: folderQueryKey.folders,
        })
        QueryClient.invalidateQueries({
          queryKey: folderQueryKey.folderContent({
            parentFolderId:
              variable?.parentFolderId !== undefined
                ? variable.parentFolderId
                : null,
          }),
        })
        toast.success(data?.message)
      },
      onError: (error) => {
        toast.error(error?.message)
      },
    })

  return {
    useCreateFolder,
    useGetContent,
    useUploadFolder,
    useDeleteFolder,
    useUpdateFolder,
  }
}
