import { userLoginData } from '@/const/localstorage-key';
import { authRoute, userRoute } from '@/const/route';
import { useUserContext } from '@/context/user/user-context';
import { isTokenExpired } from '@/func/func-jwt-helper';
import useLocalStorage from '@/hooks/use-localstorage';
import type { UserDataType } from '@/types/user-data-types';
import { useEffect, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AdminGuard = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { value: user, removeValue } = useLocalStorage<UserDataType>(userLoginData)
    const { setUser } = useUserContext()

    useEffect(() => {
        if (location.pathname.startsWith('/share/')) return;
        if (!user?.jwtToken) {
            navigate(authRoute.login)
            return
        }
        if (isTokenExpired(user?.jwtToken)) {
            removeValue();
            navigate(authRoute.login)
            return
        }
        if (user.role !== "Admin") {
            navigate(userRoute.dashboard.base)
            return
        }
        setUser(user)
    }, [user, navigate, setUser, removeValue, location.pathname])

    if (location.pathname.startsWith('/share/')) {
        return children
    }

    if (!user?.jwtToken || isTokenExpired(user.jwtToken)) {
        return null
    }
    return children
}

export default AdminGuard