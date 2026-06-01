import ShareNavbar from "@/components/navigation/share-navbar"
import ShareSidebar from "@/components/navigation/share-sidebar"
import { Outlet } from "react-router-dom"

const ShareRoute = () => {
    return (
        <div className="flex min-h-screen w-full">
            <ShareSidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <ShareNavbar />
                <div className="custom-scroll min-w-0 flex-1 overflow-auto bg-primary/4 p-4 md:p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default ShareRoute
