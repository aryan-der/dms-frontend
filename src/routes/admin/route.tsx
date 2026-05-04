import AdminSidebar from "@/components/navigation/admin-sidebar"
import { Outlet } from "react-router-dom"

const AdminRoute = () => {
    return (
        <div className="flex min-h-screen w-full">
            <AdminSidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <div className="custom-scroll min-w-0 flex-1 overflow-auto bg-primary/4 p-4 md:p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminRoute
