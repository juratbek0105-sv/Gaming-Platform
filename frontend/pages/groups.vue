<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { get, post: apiPost } = useApi()
const auth = useAuth()
const { success, error } = useToast()

const activeTab = ref('all')
const searchQuery = ref('')
const isLoading = ref(true)
const groups = ref<any[]>([])

const fetchGroups = async () => {
  try {
    isLoading.value = true
    const data: any = await get('/community/groups')
    groups.value = data.map((g: any) => ({
      ...g,
      gradient: 'from-violet-500 to-indigo-500', // Default for now
      avatar: g.name.charAt(0).toUpperCase(),
      joined: false // We would need a backend check for this in real app
    }))
  } catch (err) {
    console.error('Guruhlarni yuklashda xatolik:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchGroups)

const filteredGroups = computed(() => {
  let list = groups.value
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(g => g.name.toLowerCase().includes(q) || (g.description || '').toLowerCase().includes(q))
  }
  return list
})

const toggleJoin = async (group: any) => {
  if (!auth.isAuthenticated.value) return navigateTo('/auth/login')
  
  try {
    const res: any = await apiPost('/community/groups/join', { groupId: group.id })
    group.joined = true
    group._count.members++
    success(res.message)
  } catch (err: any) {
    error(err.data?.message || "Guruhga qo'shilishda xatolik")
  }
}

const gameVariant = (game: string | null | undefined) => {
  if (game === 'Valorant') return 'valorant'
  if (game === 'CS2') return 'cs2'
  if (game === 'PUBG') return 'pubg'
  return 'default'
}
</script>

<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-foreground">Guruhlar</h1>
        <p class="text-sm text-muted-foreground mt-0.5">Gaming jamoalari va hamjamiyatlarga qo'shiling</p>
      </div>
    </div>

    <!-- Search -->
    <div class="relative">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
      <input
        v-model="searchQuery"
        placeholder="Guruhlarni qidirish..."
        class="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-border"
      />
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
       <div v-for="i in 4" :key="i" class="h-32 rounded-xl bg-card border border-border animate-pulse" />
    </div>

    <!-- Groups Grid -->
    <div v-else-if="filteredGroups.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div
        v-for="group in filteredGroups"
        :key="group.id"
        class="rounded-xl border border-border bg-card p-4 hover:border-border/80 transition-all group"
      >
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-lg font-bold shrink-0">
            {{ group.avatar }}
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-semibold text-foreground truncate">{{ group.name }}</h3>
            <div class="flex items-center gap-2 mt-0.5 mb-2">
              <span class="text-[11px] text-muted-foreground">{{ group._count.members }} a'zo</span>
            </div>
            <p class="text-xs text-muted-foreground leading-snug line-clamp-2">{{ group.description }}</p>
          </div>
        </div>
        <div class="flex gap-2 mt-3">
          <button
            class="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
            :class="group.joined
              ? 'border border-border text-muted-foreground cursor-default opacity-50'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'"
            :disabled="group.joined"
            @click="toggleJoin(group)"
          >
            {{ group.joined ? "A'zosiz" : "Qo'shilish" }}
          </button>
          <NuxtLink
            :to="`/groups/${group.id}`"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            Ko'rish
          </NuxtLink>
        </div>
      </div>
    </div>

    <EmptyState
      v-else
      title="Guruhlar topilmadi"
      description="Sizning qidiruvingizdek guruh yo'q."
    />
  </div>
</template>
