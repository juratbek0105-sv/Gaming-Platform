// Toast composable - provides global toast notifications
export interface Toast {
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    duration?: number
}

const toasts = ref<Toast[]>([])

export function useToast() {
    const add = (type: Toast['type'], message: string, duration = 4000) => {
        const id = Math.random().toString(36).substr(2, 9)
        toasts.value.push({ id, type, message, duration })
        setTimeout(() => remove(id), duration)
    }
    const remove = (id: string) => {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }
    return {
        toasts: readonly(toasts),
        success: (msg: string, d?: number) => add('success', msg, d),
        error: (msg: string, d?: number) => add('error', msg, d),
        warning: (msg: string, d?: number) => add('warning', msg, d),
        info: (msg: string, d?: number) => add('info', msg, d),
        remove,
    }
}
