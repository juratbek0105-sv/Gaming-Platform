export const useModals = () => {
    const showCreatePost = useState('show-create-post', () => false)

    const openCreatePost = () => {
        showCreatePost.value = true
    }

    const closeCreatePost = () => {
        showCreatePost.value = false
    }

    return {
        showCreatePost,
        openCreatePost,
        closeCreatePost
    }
}
