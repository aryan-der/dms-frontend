import { Outlet } from "react-router-dom"

const AuthRoute = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <Outlet />
        </div>
    )
}

export default AuthRoute
