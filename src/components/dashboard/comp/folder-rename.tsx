import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import useFile from "@/hooks/use-files";

interface RenameItemProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    id: string | number;

    currentName: string;

    type: "FILE" | "FOLDER";
}

const RenameItem: React.FC<RenameItemProps> = ({
    open,
    onOpenChange,
    id,
    currentName,
    type,
}) => {
    const { useUpdateItem } = useFile();

    const [name, setName] = useState(currentName);

    const [error, setError] = useState<string | null>(null);

    const { parentFolderId } = useParams();

    const { mutate, status } = useUpdateItem();

    const isLoading = status === "pending";

    const prevOpenRef = React.useRef(open);

    React.useEffect(() => {
        if (!prevOpenRef.current && open) {
            setName(currentName ?? "");
            setError(null);
        }

        prevOpenRef.current = open;
    }, [open, currentName]);

    const handleRename = () => {
        setError(null);

        if (!name.trim()) {
            setError(
                `${type === "FILE" ? "File" : "Folder"} name cannot be empty.`,
            );

            return;
        }

        mutate(
            {
                type,
                id,
                name,
                parentFolderId,
            },
            {
                onSuccess: () => {
                    onOpenChange(false);
                },
            },
        );
    };

    const handleDialogClose = (openState: boolean) => {
        onOpenChange(openState);

        if (!openState) {
            setError(null);
            setName(currentName ?? "");
        }
    };

    const handleInputKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === "Enter" && !isLoading && name.trim()) {
            handleRename();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Rename {type === "FILE" ? "File" : "Folder"}
                    </DialogTitle>

                    <DialogDescription>
                        Give your{" "}
                        {type === "FILE" ? "file" : "folder"} a new,
                        meaningful name.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-1 py-4">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={`Enter new ${type === "FILE" ? "file" : "folder"
                            } name`}
                        autoFocus
                        disabled={isLoading}
                        onKeyDown={handleInputKeyDown}
                    />

                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleDialogClose(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={handleRename}
                        disabled={isLoading || !name.trim()}
                    >
                        {isLoading
                            ? "Renaming..."
                            : `Rename ${type === "FILE" ? "File" : "Folder"
                            }`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RenameItem;