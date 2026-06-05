import Audios from "@/app/admin/Audios/Audios"
import Dashboard from "@/app/admin/dashboard/Dashboard"
import Documents from "@/app/admin/documents/Documents"
import Favourite from "@/app/admin/favourite/Favourite"
import Gallery from "@/app/admin/Gallery/Gallery"
import Search from "@/app/admin/search/Search"
import SharedWithMe from "@/app/admin/Shared/SharedWithMe"
import Trash from "@/app/admin/trash/Trash"
import Users from "@/app/admin/users/Users"
import Login from "@/app/auth/login/Login"
import RegisterPage from "@/app/auth/register/Register"
import UserDashboard from "@/app/user/dashboard/Dashboard"
import UserFavourite from "@/app/user/favourite/Favourite"
import UserSearch from "@/app/user/search/Search"
import UserTrash from "@/app/user/trash/Trash"
import SharePage from "@/components/dashboard/SharePage"
import { adminChildRoute, adminRoute, authRoute, shareChildRoute, shareRoute, userRoute } from "@/const/route"
import AdminGuard from "@/guard/admin/admin-guard"
import AuthGuard from "@/guard/auth/auth-guard"
import UserGuard from "@/guard/user/user-guard"
import AdminRoute from "@/routes/admin/route"
import AuthRoute from "@/routes/auth/route"
import ShareRoute from "@/routes/share/route"
import UserRoute from "@/routes/user/route"
import { Routes, Route, Navigate } from "react-router-dom"

const Layout = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={authRoute.login} />} />

            {/* Share */}
            <Route path={shareRoute.base} element={
                <ShareRoute />
            }>
                <Route path={shareChildRoute.share} element={<SharePage />} />
            </Route>

            {/* Auth */}
            <Route path={authRoute.base} element={
                <AuthGuard>
                    <AuthRoute />
                </AuthGuard>
            }>
                <Route index path={authRoute.login} element={<Login />} />
                <Route path={authRoute.register} element={<RegisterPage />} />
            </Route>

            {/* Admin */}
            <Route path={adminRoute.adminBase} element={
                <AdminGuard>
                    <AdminRoute />
                </AdminGuard>
            }>
                {/* Dashboard */}
                {/* <Route path={`${adminChildRoute.dashboard}/:parentFolderId?`} element={<Dashboard />} /> */}
                <Route path={`${adminChildRoute.dashboard}/:parentFolderId?`} element={<Dashboard />} />
                <Route path={`${adminChildRoute.documents}/:parentFolderId?`} element={<Documents />} />
                <Route path={`${adminChildRoute.gallery}/:parentFolderId?`} element={<Gallery />} />
                <Route path={`${adminChildRoute.sharedwithme}/:parentFolderId?`} element={<SharedWithMe />} />
                <Route path={`${adminChildRoute.audios}/:parentFolderId?`} element={<Audios />} />
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