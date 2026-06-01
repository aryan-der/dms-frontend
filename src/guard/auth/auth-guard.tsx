import { userLoginData } from '@/const/localstorage-key';
import { authRoute } from '@/const/route';
import useLocalStorage from '@/hooks/use-localstorage';
import type { UserDataType } from '@/types/user-data-types';
import { useEffect, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const AuthGuard = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { value: user } = useLocalStorage<UserDataType>(userLoginData)

    useEffect(() => {
        if (location.pathname.startsWith('/share/')) return;

        // Redirect to login if user goes to register route
        if (location.pathname === authRoute.register) {
            navigate(authRoute.register);
            return;
        }
        if (!user || !user?.userId) {
            navigate(authRoute.login)
        }
    }, [user, location.pathname])

    return children
}

export default AuthGuard