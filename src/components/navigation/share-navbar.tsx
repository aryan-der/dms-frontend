import { SidebarTrigger } from "../ui/sidebar";
import { Input } from "../ui/input";

const ShareNavbar = () => {
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
        </div>
    );
};

export default ShareNavbar;