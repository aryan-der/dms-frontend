import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import useFolder from "@/hooks/use-folder"
import ShareContent from "./ShareContent"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field } from "@/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import type { ShareAccessResponse } from "@/types/payload/share-items-types"

interface Props {
    token: string
}

const PasswordForm = ({ token }: Props) => {
    const STORAGE_KEY = `share_access_${token}`

    const [password, setPassword] = useState("")

    const [accessData, setAccessData] =
        useState<ShareAccessResponse | null>(() => {
            try {
                const stored =
                    sessionStorage.getItem(STORAGE_KEY)

                if (!stored) return null

                const parsed = JSON.parse(stored)

                // Expiry check
                if (
                    parsed.__expires_at &&
                    Date.now() > parsed.__expires_at
                ) {
                    sessionStorage.removeItem(
                        STORAGE_KEY
                    )
                    return null
                }

                return parsed
            } catch {
                sessionStorage.removeItem(
                    STORAGE_KEY
                )
                return null
            }
        })

    const [error, setError] =
        useState<string | null>(null)

    const { useShareAccess } = useFolder()

    const { mutate, isPending } =
        useShareAccess({ token })

    const handleSubmit = () => {
        if (!password) return

        setError(null)

        mutate(
            { password },
            {
                onSuccess: (data) => {
                    if (!data?.success) {
                        setError(
                            data?.message ??
                            "Incorrect password"
                        )
                        return
                    }

                    const sessionData = {
                        ...data,
                        __expires_at:
                            Date.now() +
                            8 * 60 * 60 * 1000, // 8 Hours
                    }

                    sessionStorage.setItem(
                        STORAGE_KEY,
                        JSON.stringify(sessionData)
                    )

                    setAccessData(data)
                },

                onError: () => {
                    setError(
                        "Something went wrong"
                    )
                },
            }
        )
    }

    if (accessData) {
        return (
            <ShareContent
                token={token}
                allowDownload={
                    accessData.allowDownload
                }
                prefetchedData={accessData}
            />
        )
    }

    return (
        <div className="flex min-h-full items-center justify-center bg-muted/40 px-3 sm:px-4 py-6 sm:py-8">
            <Card className="w-full max-w-md sm:max-w-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-lg text-center sm:text-xl">
                        Password Protected
                    </CardTitle>

                    <CardDescription className="text-center">
                        Enter the password to access the shared files.
                    </CardDescription>
                </CardHeader>

                <CardContent className="overflow-x-auto">
                    <Field>
                        <div className="flex justify-center">
                            <InputOTP
                                maxLength={6}
                                value={password}
                                onChange={setPassword}
                                id="otp-verification"
                            >
                                <InputOTPGroup
                                    className="
                                *:data-[slot=input-otp-slot]:h-12
                                *:data-[slot=input-otp-slot]:w-10
                                *:data-[slot=input-otp-slot]:text-lg
                                sm:*:data-[slot=input-otp-slot]:h-16
                                sm:*:data-[slot=input-otp-slot]:w-16
                                sm:*:data-[slot=input-otp-slot]:text-xl
                            "
                                >
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>

                                <InputOTPSeparator />

                                <InputOTPGroup
                                    className="
                                *:data-[slot=input-otp-slot]:h-12
                                *:data-[slot=input-otp-slot]:w-10
                                *:data-[slot=input-otp-slot]:text-lg
                                sm:*:data-[slot=input-otp-slot]:h-16
                                sm:*:data-[slot=input-otp-slot]:w-16
                                sm:*:data-[slot=input-otp-slot]:text-xl
                            "
                                >
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        {error && (
                            <p className="mt-2 text-sm text-destructive">
                                {error}
                            </p>
                        )}
                    </Field>
                </CardContent>

                <CardFooter className="flex justify-end">
                    <Button
                        type="button"
                        disabled={password.length < 6 || isPending}
                        onClick={handleSubmit}
                    >
                        {isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}

                        Access
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PasswordForm