export const useAuth = () => {
    const token = useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 }) // 7 days
    const user = useState<any>('auth_user', () => null)
    const { post, get } = useApi()

    const login = async (credentials: any) => {
        try {
            const res: any = await post('/auth/login', credentials)
            token.value = res.token
            user.value = res.user
            return res
        } catch (err) {
            throw err
        }
    }

    const register = async (data: any) => {
        try {
            const res: any = await post('/auth/register', data)
            token.value = res.token
            user.value = res.user
            return res
        } catch (err) {
            throw err
        }
    }

    const logout = () => {
        token.value = null
        user.value = null
        navigateTo('/auth/login')
    }

    const fetchMe = async () => {
        if (!token.value) return
        try {
            const res = await get('/users/me')
            user.value = res
        } catch (err) {
            logout()
        }
    }

    return {
        user,
        token,
        login,
        register,
        logout,
        fetchMe,
        isAuthenticated: computed(() => !!token.value)
    }
}
