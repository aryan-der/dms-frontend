import { userLoginData } from '@/const/localstorage-key';
import { authRoute } from '@/const/route';
import useLocalStorage from '@/hooks/use-localstorage';
import type { UserDataType } from '@/types/user-data-types';
import { useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthGuard = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const { value: user } = useLocalStorage<UserDataType>(userLoginData)

    useEffect(() => {
        if (!user || !user?.userId) {
            navigate(authRoute.login)
        }
    }, [user])

    return children
}

export default AuthGuard