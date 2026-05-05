import { Bell, FolderPlus, Upload, UploadCloud } from "lucide-react";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarTrigger } from "../ui/sidebar";
import { Input } from "../ui/input";
import CreateFolder from "../dashboard/comp/create-folder";

const Navbar = () => {
    return (
        <div className="sticky top-0 z-20 flex h-14 w-full shrink-0 items-center justify-between border-b bg-background px-3">
            <div className="flex items-center gap-3 w-full">
                <div className="rounded-md border bg-accent">
                    <SidebarTrigger className="cursor-pointer text-muted-foreground" />
                </div>
                <div className="flex items-center w-full">
                    <span className="border-l h-7 mr-2"></span>
                    <Input
                        type="text"
                        value=""
                        placeholder="Here Search Folder & Files..."
                        className="bg-accent border-none px-3 mx-5 font-medium text-base cursor-default text-foreground w-full focus:ring-0 focus:outline-none"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="icon-lg"
                            variant="default"
                            aria-label="Quick Actions"
                            className="mr-1 px-10 flex items-center gap-2 cursor-pointer"
                        >
                            New <FolderPlus className="w-8 h-8" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <CreateFolder>
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onSelect={(e) => e.preventDefault()}>
                                <FolderPlus className="w-4 h-4" /> Create Folder
                            </DropdownMenuItem>
                        </CreateFolder>

                        <DropdownMenuItem
                            className="flex items-center gap-2 cursor-pointer"
                            onSelect={e => {
                                e.preventDefault();
                                document.getElementById('upload-folder-input')?.click();
                            }}
                        >
                            <UploadCloud className="w-4 h-4" /> Upload Folder
                            <input
                                id="upload-folder-input"
                                type="file"
                                style={{ display: 'none' }}
                                // @ts-expect-error
                                webkitdirectory="true"
                            />
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="flex items-center gap-2 cursor-pointer"
                            onSelect={e => {
                                e.preventDefault();
                                document.getElementById('upload-files-input')?.click();
                            }}
                        >
                            <Upload className="w-4 h-4" /> Upload File
                            <input
                                id="upload-files-input"
                                type="file"
                                style={{ display: 'none' }}
                                multiple
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon-lg" variant="outline" className="cursor-pointer">
                            <Bell />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Notifications</SheetTitle>
                            <SheetDescription>
                                View recent activity and alerts related to your account.
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default Navbar;