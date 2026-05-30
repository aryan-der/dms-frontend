import Dashboard from "@/app/admin/dashboard/Dashboard"
import Favourite from "@/app/admin/favourite/Favourite"
import Search from "@/app/admin/search/Search"
import Trash from "@/app/admin/trash/Trash"
import Users from "@/app/admin/users/Users"
import Login from "@/app/auth/login/Login"
import UserDashboard from "@/app/user/dashboard/Dashboard"
import UserFavourite from "@/app/user/favourite/Favourite"
import UserSearch from "@/app/user/search/Search"
import UserTrash from "@/app/user/trash/Trash"
import SharePage from "@/components/dashboard/SharePage"
import { adminChildRoute, adminRoute, authRoute, userRoute } from "@/const/route"
import AdminGuard from "@/guard/admin/admin-guard"
import AuthGuard from "@/guard/auth/auth-guard"
import UserGuard from "@/guard/user/user-guard"
import AdminRoute from "@/routes/admin/route"
import AuthRoute from "@/routes/auth/route"
import UserRoute from "@/routes/user/route"
import { Routes, Route, Navigate } from "react-router-dom"

const Layout = () => {
    return (
        <Routes>
            <Route path="/share/:token" element={<SharePage />} />
            <Route path="/" element={<Navigate to={authRoute.login} />} />
            {/* Auth */}
            <Route path={authRoute.base} element={
                <AuthGuard>
                    <AuthRoute />
                </AuthGuard>
            }>
                <Route index path={authRoute.login} element={<Login />} />
            </Route>

            {/* Admin */}
            <Route path={adminRoute.adminBase} element={
                <AdminGuard>
                    <AdminRoute />
                </AdminGuard>
            }>
                {/* Dashboard */}
                <Route path={`${adminChildRoute.dashboard}/:parentFolderId?`} element={<Dashboard />} />
                <Route path={adminChildRoute.users} element={<Users />} />
                <Route path={adminChildRoute.favourite} element={<Favourite />} />
                <Route path={adminChildRoute.trash} element={<Trash />} />
                <Route path={adminChildRoute.search} element={<Search />} />
            </Route>


            {/* User */}
            <Route path={userRoute.userBase} element={
                <UserGuard>
                    <UserRoute />
                </UserGuard>
            }>
                <Route path={userRoute.dashboard.base} element={<UserDashboard />} />
                <Route path={`${userRoute.dashboard.base}/:folderId`} element={<UserDashboard />} />
                <Route path={userRoute.search.base} element={<UserSearch />} />
                <Route path={userRoute.favourite.base} element={<UserFavourite />} />
                <Route path={userRoute.trash.base} element={<UserTrash />} />
            </Route>

        </Routes>
    )
}

export default Layout