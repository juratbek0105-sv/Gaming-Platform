export const useApi = () => {
    const config = useRuntimeConfig()
    const token = useCookie('auth_token')
    const baseUrl = config.public.apiBase || 'http://localhost:5000/api'

    const fetchOptions = (options: any = {}) => {
        const headers = {
            ...options.headers,
        }

        if (token.value) {
            headers['Authorization'] = `Bearer ${token.value}`
        }

        return {
            ...options,
            baseURL: baseUrl,
            headers,
        }
    }

    return {
        get: (url: string, options: any = {}) => $fetch(url, fetchOptions({ ...options, method: 'GET' })),
        post: (url: string, body: any, options: any = {}) => $fetch(url, fetchOptions({ ...options, method: 'POST', body })),
        patch: (url: string, body: any, options: any = {}) => $fetch(url, fetchOptions({ ...options, method: 'PATCH', body })),
        put: (url: string, body: any, options: any = {}) => $fetch(url, fetchOptions({ ...options, method: 'PUT', body })),
        delete: (url: string, options: any = {}) => $fetch(url, fetchOptions({ ...options, method: 'DELETE' })),
    }
}
