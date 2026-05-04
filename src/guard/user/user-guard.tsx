import { userLoginData } from '@/const/localstorage-key';
import { adminRoute, authRoute } from '@/const/route';
import { useUserContext } from '@/context/user/user-context';
import { isTokenExpired } from '@/func/func-jwt-helper';
import useLocalStorage from '@/hooks/use-localstorage';
import type { UserDataType } from '@/types/user-data-types';
import { useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminGuard = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const { value: user, removeValue } = useLocalStorage<UserDataType>(userLoginData)
    const { setUser } = useUserContext()

    useEffect(() => {
        if (!user?.jwtToken) {
            navigate(authRoute.login)
            return
        }
        if (isTokenExpired(user?.jwtToken)) {
            removeValue();
            navigate(authRoute.login)
            return
        }
        if (user.role !== "User") {
            setUser(user)
            navigate(adminRoute.dashboard.base)
            return
        }
        setUser(user)
    }, [user, navigate, setUser, removeValue])

    if (!user?.jwtToken || isTokenExpired(user.jwtToken)) {
        return null
    }
    return children
}

export default AdminGuard