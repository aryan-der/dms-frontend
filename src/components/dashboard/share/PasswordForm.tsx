// components/share/PasswordForm.tsx

import { useState } from "react"
import { Lock, Loader2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import useFolder from "@/hooks/use-folder"
import ShareContent from "./ShareContent"

interface Props {
    token: string
}

const PasswordForm = ({ token }: Props) => {
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [accessData, setAccessData] = useState(null)
    const [error, setError] = useState<string | null>(null)

    const { useShareAccess } = useFolder()
    const { mutate, isPending } = useShareAccess({ token })

    const handleSubmit = () => {
        if (!password) return
        setError(null)

        mutate(
            { password },
            {
                onSuccess: (data) => {
                    if (!data?.success) {
                        setError(data?.message ?? "Incorrect password")
                        return
                    }
                    setAccessData(data)
                },
                onError: () => {
                    setError("Something went wrong")
                },
            }
        )
    }

    // Access મળ્યા પછી content show કરો
    if (accessData) {
        return (
            <ShareContent
                token={token}
                allowDownload={accessData.allowDownload}
                prefetchedData={accessData}
            />
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                        <Lock className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl">Password Protected</CardTitle>
                    <CardDescription>
                        Enter the password to access the shared files
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Password Input */}
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSubmit()
                            }}
                            className="pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}

                    {/* Submit */}
                    <Button
                        className="w-full"
                        disabled={!password || isPending}
                        onClick={handleSubmit}
                    >
                        {isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Access Files
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default PasswordForm