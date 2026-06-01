import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Loader2, X } from "lucide-react"
import useFolder from "@/hooks/use-folder"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

interface Folder {
    _id: string
    [key: string]: unknown
}

interface ShareEveryoneDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    folder: Folder
}

interface ShareInput {
    folderIds: string[]
    fileIds: string[]
    shareType: "public" | "private"
    password: string
    emails: string[]
    phones: string[]
    expiryDays: number
}

interface ShareData {
    share?: {
        shareUrl?: string
        [key: string]: unknown
    }
    [key: string]: unknown
}

const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface TagInputProps {
    value: string[]
    onChange: (value: string[]) => void
    placeholder: string
    type: "email" | "phone"
}

const TagInput = ({
    value,
    onChange,
    placeholder,
    type,
}: TagInputProps) => {
    const [input, setInput] = useState("")

    const addTag = () => {
        const val = input.trim()

        if (!val) return

        if (type === "email") {
            if (!emailRegex.test(val))
                return
        }

        if (type === "phone") {
            if (!/^\d{10}$/.test(val))
                return
        }

        if (value.includes(val))
            return

        onChange([...value, val])

        setInput("")
    }

    const removeTag = (
        tag: string,
    ) => {
        onChange(
            value.filter(
                (item) => item !== tag,
            ),
        )
    }

    return (
        <div className="min-h-[48px] rounded-xl border border-border bg-background px-3 py-2">

            <div className="flex flex-wrap gap-2">

                {value.map((tag) => (
                    <div
                        key={tag}
                        className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-sm"
                    >
                        <span>{tag}</span>

                        <button
                            type="button"
                            onClick={() =>
                                removeTag(tag)
                            }
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}

                <input
                    value={input}
                    onChange={(e) => {
                        let val = e.target.value

                        if (type === "phone") {
                            val = val.replace(
                                /\D/g,
                                "",
                            )

                            if (
                                val.length > 10
                            ) {
                                val = val.slice(
                                    0,
                                    10,
                                )
                            }
                        }

                        setInput(val)
                    }}
                    placeholder={
                        value.length
                            ? ""
                            : placeholder
                    }
                    className="min-w-[180px] flex-1 bg-transparent text-sm outline-none"
                    onKeyDown={(e) => {
                        if (
                            e.key === "Enter" ||
                            e.key === "," ||
                            e.key === "Tab"
                        ) {
                            e.preventDefault()
                            addTag()
                        }
                    }}
                    onBlur={addTag}
                />
            </div>
        </div>
    )
}

const ShareEveryoneDialog = ({
    open,
    onOpenChange,
    folder,
}: ShareEveryoneDialogProps) => {
    const { useShareEveryone } = useFolder()
    const { mutate, isPending } = useShareEveryone() as {
        mutate: (
            input: ShareInput,
            options?: { onSuccess?: (data: ShareData) => void }
        ) => void
        isPending: boolean
    }
    const [shareType, setShareType] = useState<"public" | "private">("public")

    const [password, setPassword] = useState("")
    const [expiryDays, setExpiryDays] = useState(7)

    const [emails, setEmails] = useState<string[]>([])
    // const [phones, setPhones] = useState<string[]>([])

    const [shareUrl, setShareUrl] = useState("")

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareUrl)
    }

    const handleShare = () => {
        mutate(
            {
                folderIds: [folder._id],
                fileIds: [],
                shareType,
                password,
                emails: emails.filter(Boolean),
                expiryDays,
                phones: [], // phones.filter(Boolean)
            },
            {
                onSuccess: (data?: ShareData) => {
                    setShareUrl(data?.share?.shareUrl || "")
                },
            },
        )
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        Share Everyone
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-5">

                    {/* Share Type */}
                    <div className="flex gap-3">
                        <Button
                            variant={
                                shareType === "public"
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() =>
                                setShareType("public")
                            }
                        >
                            Public Link
                        </Button>

                        <Button
                            variant={
                                shareType === "private"
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() =>
                                setShareType("private")
                            }
                        >
                            Private Link
                        </Button>
                    </div>

                    {/* Private Fields */}
                    {shareType === "private" && (
                        <>
                            <div className="flex justify-center flex-col">
                                <label className="mb-2 block text-sm font-medium">
                                    Password
                                </label>
                                <InputOTP
                                    maxLength={6}
                                    value={password}
                                    onChange={(value) =>
                                        setPassword(value)
                                    }
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>

                                    <InputOTPSeparator />

                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>

                            {/* Emails */}
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Email Addresses
                                </label>

                                <TagInput
                                    type="email"
                                    value={emails}
                                    onChange={setEmails}
                                    placeholder="Enter email and press Enter"
                                />
                            </div>

                            {/* Phones */}
                            {/* <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Mobile Numbers
                                </label>

                                <TagInput
                                    type="phone"
                                    value={phones}
                                    onChange={setPhones}
                                    placeholder="Enter 10 digit mobile number and press Enter"
                                />

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Only 10 digit numbers allowed
                                </p>
                            </div> */}
                        </>
                    )}

                    {/* Expiry */}
                    <div>
                        <label className="mb-2 block text-sm">
                            Expiry Days
                        </label>

                        <Input
                            type="number"
                            value={expiryDays}
                            onChange={(e) =>
                                setExpiryDays(
                                    Number(e.target.value),
                                )
                            }
                        />
                    </div>

                    {/* Share URL */}
                    {shareUrl && (
                        <div className="rounded-lg border p-3">
                            <label className="mb-2 block text-sm">
                                Share URL
                            </label>

                            <div className="flex gap-2">
                                <Input
                                    readOnly
                                    value={shareUrl}
                                />

                                <Button
                                    variant="outline"
                                    onClick={handleCopy}
                                >
                                    <Copy size={14} />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Submit */}
                    <Button
                        className="w-full"
                        onClick={handleShare}
                        disabled={
                            isPending
                        }
                    >
                        {isPending ? (
                            <>
                                <Loader2
                                    size={16}
                                    className="mr-2 animate-spin"
                                />
                                Sharing...
                            </>
                        ) : (
                            "Share"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ShareEveryoneDialog