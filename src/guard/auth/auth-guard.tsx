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
        // ✅ Share page હોય તો redirect ન કરો

        if (location.pathname.startsWith('/share/')) return;

        if (!user || !user?.userId) {
            navigate(authRoute.login)
        }
    }, [user, location.pathname])

    return children
}

export default AuthGuard