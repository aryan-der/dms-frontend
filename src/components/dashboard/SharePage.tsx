// pages/SharePage.tsx

import { useParams } from "react-router-dom"
import { Loader2, AlertTriangle } from "lucide-react"
import useFolder from "@/hooks/use-folder"
import PasswordForm from "./share/PasswordForm"
import ShareContent from "./share/ShareContent"

const SharePage = () => {
    const { token } = useParams<{ token: string }>()
    const { useGetShare } = useFolder()
    const { data, isLoading, isError } = useGetShare({ token: token! })
    const storedAccess = sessionStorage.getItem(`share_access_${token}`)
    const cachedData = storedAccess ? JSON.parse(storedAccess) : null
    // Loading
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }
    // Error / Invalid token
    if (isError || !data?.success) {
        return (
            <div className="flex min-h-full items-center justify-center">
                <div className="text-center space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                        <AlertTriangle className="h-7 w-7 text-destructive" />
                    </div>
                    <h2 className="text-xl font-semibold">Link Invalid</h2>
                    <p className="text-sm text-muted-foreground">
                        {data?.message ?? "This link has expired or does not exist."}
                    </p>
                </div>
            </div>
        )
    }
    if (data.shareType === "private" && cachedData) {
        return <ShareContent token={token!} allowDownload={cachedData.allowDownload} prefetchedData={cachedData} />
    }

    // Private — password form
    if (data.shareType === "private") {
        return <PasswordForm token={token!} />
    }

    // Public → Direct Content
    return <ShareContent token={token!} allowDownload={data?.allowDownload} />
}

export default SharePage