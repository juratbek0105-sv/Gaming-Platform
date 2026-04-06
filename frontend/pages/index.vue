<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { get } = useApi()
const posts = ref<any[]>([])
const isLoading = ref(true)

const fetchPosts = async () => {
  try {
    const data: any = await get('/posts')
    // Format backend data to match frontend component expected structure
    posts.value = data.map((p: any) => ({
      id: p.id,
      user: {
        name: p.author.name || p.author.username,
        username: `@${p.author.username}`,
        avatar: p.author.avatar || p.author.username.charAt(0).toUpperCase(),
        online: p.author.online
      },
      content: p.content,
      image: p.image,
      likes: p._count.likes,
      comments: p._count.comments,
      shares: 0,
      time: new Date(p.createdAt).toLocaleDateString(),
      isLiked: false,
      isSaved: false
    }))
  } catch (err) {
    console.error('Postlarni yuklashda xatolik:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchPosts)

const modals = useModals()

const loadMore = async () => {
  // In real app: append paginated results
  // For now we just re-fetch or do nothing if all loaded
}

const searchQuery = ref('')
const selectedTab = ref('hamma')
const tabs = [
  { id: 'hamma', label: 'Hamma' },
  { id: 'valorant', label: 'Valorant' },
  { id: 'cs2', label: 'CS2' },
  { id: 'pubg', label: 'PUBG' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Search & Tabs -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex gap-1 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="selectedTab = tab.id"
          class="px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap"
          :class="selectedTab === tab.id ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-card text-muted-foreground hover:text-foreground border border-border'"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Feed -->
    <div class="space-y-4">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
      
      <InfiniteScroll :loading="isLoading" @load="loadMore">
        <div v-if="isLoading" class="flex justify-center py-4">
          <div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </InfiniteScroll>
    </div>
  </div>
</template>