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
import useFolder from "@/hooks/use-folder";
import { useParams } from "react-router-dom";

interface FolderRenameProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    folderId: string | number | null;
    currentName: string;
}

const FolderRename: React.FC<FolderRenameProps> = ({
    open,
    onOpenChange,
    folderId,
    currentName,
}) => {
    const { useUpdateFolder } = useFolder();
    const [name, setName] = useState(currentName);
    const [error, setError] = useState<string | null>(null);
    const { mutate: updateFolder, status } = useUpdateFolder();
    const isLoading = status === "pending";
    const { parentFolderId } = useParams();

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
            setError("Folder name cannot be empty.");
            return;
        }

        updateFolder(
            { folderId, name, parentFolderId },
        );
    };

    const handleDialogClose = (openState: boolean) => {
        onOpenChange(openState);
        if (!openState) {
            setError(null);
            setName(currentName ?? "");
        }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isLoading && name.trim()) {
            handleRename();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rename Folder</DialogTitle>
                    <DialogDescription>
                        Give your folder a new, meaningful name.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 flex flex-col gap-0">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter new folder name"
                        autoFocus
                        disabled={isLoading}
                        onKeyDown={handleInputKeyDown}
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
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
                        {isLoading ? "Renaming..." : "Rename"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default FolderRename;
