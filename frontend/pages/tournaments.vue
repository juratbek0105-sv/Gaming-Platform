<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { get, post: apiPost } = useApi()
const auth = useAuth()
const { success, error } = useToast()

const searchQuery = ref('')
const isLoading = ref(true)
const tournaments = ref<any[]>([])

const fetchTournaments = async () => {
  try {
    isLoading.value = true
    const data: any = await get('/community/tournaments')
    tournaments.value = data
  } catch (err) {
    console.error('Turnirlarni yuklashda xatolik:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchTournaments)

const filteredTournaments = computed(() => {
  let list = tournaments.value
  if (searchQuery.value.trim()) {
    list = list.filter(t => t.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }
  return list
})

const joinTournament = async (t: any) => {
  if (!auth.isAuthenticated.value) return navigateTo('/auth/login')
  
  try {
    const res: any = await apiPost('/community/tournaments/join', { tournamentId: t.id })
    t._count.participants++
    success(res.message)
  } catch (err: any) {
    error(err.data?.message || "Ro'yxatdan o'tishda xatolik")
  }
}

const formatDate = (date: string) => {
  const d = new Date(date)
  return d.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-xl font-bold text-foreground">Turnirlar</h1>
      <p class="text-sm text-muted-foreground mt-0.5">Raqobatingizni tekshirib ko'ring — ishtirok eting!</p>
    </div>

    <!-- Search -->
    <div class="relative">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input
        v-model="searchQuery"
        placeholder="Turnir qidirish..."
        class="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-border"
      />
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="space-y-4">
       <div v-for="i in 3" :key="i" class="h-48 rounded-xl bg-card border border-border animate-pulse" />
    </div>

    <!-- Tournament Grid -->
    <div v-else-if="filteredTournaments.length > 0" class="grid grid-cols-1 gap-4">
      <div
        v-for="t in filteredTournaments"
        :key="t.id"
        class="rounded-xl border border-border bg-card overflow-hidden hover:border-border/80 transition-all"
      >
        <div class="h-24 bg-gradient-to-r from-violet-900/60 to-indigo-900/40 p-4 flex flex-col justify-end">
           <h3 class="text-base font-bold text-foreground">{{ t.name }}</h3>
           <Badge class="w-fit" variant="success">Ochiq</Badge>
        </div>

        <div class="p-4">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <div>
              <p class="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">O'yin</p>
              <Badge variant="default">{{ t.game }}</Badge>
            </div>
            <div>
              <p class="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Sana</p>
              <p class="text-xs font-medium text-foreground">{{ formatDate(t.startDate) }}</p>
            </div>
            <div>
              <p class="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Mukofot</p>
              <p class="text-xs font-semibold text-amber-400">{{ t.prize }}</p>
            </div>
          </div>

          <div class="mb-4">
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-muted-foreground">Qatnashchilar</span>
              <span class="font-medium text-foreground">{{ t._count.participants }}/{{ t.maxParticipants }}</span>
            </div>
            <div class="h-1.5 bg-accent rounded-full overflow-hidden">
              <div
                class="h-full bg-violet-500 rounded-full transition-all"
                :style="{ width: `${(t._count.participants / t.maxParticipants) * 100}%` }"
              />
            </div>
          </div>

          <div class="flex gap-2">
            <NuxtLink
              :to="`/tournaments/${t.id}`"
              class="flex-1 py-2 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors text-center"
            >
              Batafsil
            </NuxtLink>
            <button
              class="flex-1 py-2 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              @click="joinTournament(t)"
            >
              Ro'yxatdan o'tish
            </button>
          </div>
        </div>
      </div>
    </div>

    <EmptyState
      v-else
      title="Turnirlar topilmadi"
      description="Bu bo'limda hozircha turnirlar yo'q."
    />
  </div>
</template>
