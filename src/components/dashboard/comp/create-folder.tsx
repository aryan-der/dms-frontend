import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useParentFolderId } from '@/context/folder/folder-id-context'
import useFolder from '@/hooks/use-folder'
import { useState, type ReactNode } from 'react'

const CreateFolder = ({ children }: { children: ReactNode }) => {
    const [folderName, setFolderName] = useState("")
    const [open, setOpen] = useState(false)
    const { parentFolderId } = useParentFolderId()
    const { useCreateFolder } = useFolder()
    const { mutate, isPending } = useCreateFolder()

    // handle open/close dialog and clear name
    const handleDialogOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (!isOpen) {
            setFolderName("")
        }
    }

    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault()
        if (!folderName.trim() || isPending) return
        mutate(
            {
                name: folderName,
                parentFolderId
            },
            {
                onSuccess: () => {
                    setFolderName("")
                    setOpen(false)
                }
            }
        )
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={handleDialogOpenChange}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Create Folder</DialogTitle>
                            <DialogDescription>
                                Manage easily your documents, now create folder
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name-1" className='mt-3'>Folder Name</Label>
                                <Input
                                    id="name-1"
                                    required
                                    name="name"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                                    autoFocus
                                    disabled={isPending}
                                    className='mb-3'
                                />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button" onClick={() => setOpen(false)} disabled={isPending}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Creating" : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateFolder