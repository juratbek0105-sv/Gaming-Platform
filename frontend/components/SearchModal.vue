<script setup lang="ts">
const modelValue = defineModel<boolean>({ default: false })
const query = ref('')
const recentSearches = ref(['Jasur Karimov', 'Valorant Championship', 'CS2 Pro League', 'bobur_aim'])

// Debounced query
const debouncedQuery = ref('')
let debounceTimer: ReturnType<typeof setTimeout>
watch(query, (v) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => { debouncedQuery.value = v }, 300)
})

// Mock results
const users = [
  { name: 'Jasur Karimov', username: '@jasur_pro', gradient: 'from-emerald-400 to-teal-500' },
  { name: 'Sardor Aliyev', username: '@sardor_gg', gradient: 'from-orange-400 to-red-500' },
  { name: 'Nilufar Tech', username: '@nilu_gamer', gradient: 'from-pink-400 to-rose-500' },
]
const groups = [
  { name: 'Valorant Uzbekistan', members: 342 },
  { name: 'CS2 Pro League', members: 218 },
]
const tournaments = [
  { name: 'Valorant Championship UZ 2026', date: '15 Aprel' },
  { name: 'CS2 Major Toshkent', date: '20 Aprel' },
]

const filteredUsers = computed(() => debouncedQuery.value ? users.filter(u => u.name.toLowerCase().includes(debouncedQuery.value.toLowerCase()) || u.username.includes(debouncedQuery.value.toLowerCase())) : [])
const filteredGroups = computed(() => debouncedQuery.value ? groups.filter(g => g.name.toLowerCase().includes(debouncedQuery.value.toLowerCase())) : [])
const filteredTournaments = computed(() => debouncedQuery.value ? tournaments.filter(t => t.name.toLowerCase().includes(debouncedQuery.value.toLowerCase())) : [])
const hasResults = computed(() => filteredUsers.value.length + filteredGroups.value.length + filteredTournaments.value.length > 0)

const inputRef = ref<HTMLInputElement | null>(null)

watch(modelValue, (v) => {
  if (v) nextTick(() => inputRef.value?.focus())
  else { query.value = '' }
})

// Keyboard shortcut
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      modelValue.value = true
    }
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})

const addToRecent = (term: string) => {
  if (!recentSearches.value.includes(term)) {
    recentSearches.value.unshift(term)
    if (recentSearches.value.length > 5) recentSearches.value.pop()
  }
}

const close = () => { modelValue.value = false }
</script>

<template>
  <Teleport to="body">
    <Transition name="search-modal">
      <div v-if="modelValue" class="fixed inset-0 z-[2000] flex items-start justify-center pt-20 px-4" @click.self="close">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close" />
        <div class="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          <!-- Search Input -->
          <div class="flex items-center gap-3 px-4 py-3 border-b border-border">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground shrink-0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              ref="inputRef"
              v-model="query"
              placeholder="Qidirish... (foydalanuvchi, post, guruh, turnir)"
              class="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
            <div class="flex items-center gap-1">
              <kbd class="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border text-[10px] text-muted-foreground">Esc</kbd>
              <button class="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors" @click="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          </div>

          <!-- Results / Recent -->
          <div class="max-h-96 overflow-y-auto p-2">
            <!-- Recent searches (when empty) -->
            <div v-if="!debouncedQuery" class="p-2">
              <p class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">So'nggi qidiruvlar</p>
              <button
                v-for="s in recentSearches"
                :key="s"
                class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                @click="query = s"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
                {{ s }}
              </button>
            </div>

            <!-- Search results -->
            <div v-else-if="hasResults" class="space-y-3 p-1">
              <!-- Users -->
              <div v-if="filteredUsers.length">
                <p class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1">Foydalanuvchilar</p>
                <NuxtLink
                  v-for="u in filteredUsers"
                  :key="u.username"
                  :to="`/profile/${u.username.replace('@', '')}`"
                  class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                  @click="close"
                >
                  <UserAvatar :name="u.name" :gradient="u.gradient" size="sm" />
                  <div>
                    <p class="text-sm font-medium text-foreground">{{ u.name }}</p>
                    <p class="text-[11px] text-muted-foreground">{{ u.username }}</p>
                  </div>
                </NuxtLink>
              </div>
              <!-- Groups -->
              <div v-if="filteredGroups.length">
                <p class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1">Guruhlar</p>
                <NuxtLink
                  v-for="g in filteredGroups"
                  :key="g.name"
                  to="/groups"
                  class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                  @click="close"
                >
                  <div class="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-foreground">{{ g.name }}</p>
                    <p class="text-[11px] text-muted-foreground">{{ g.members }} a'zo</p>
                  </div>
                </NuxtLink>
              </div>
              <!-- Tournaments -->
              <div v-if="filteredTournaments.length">
                <p class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1">Turnirlar</p>
                <NuxtLink
                  v-for="t in filteredTournaments"
                  :key="t.name"
                  to="/tournaments"
                  class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                  @click="close"
                >
                  <div class="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-foreground">{{ t.name }}</p>
                    <p class="text-[11px] text-muted-foreground">{{ t.date }}</p>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <!-- No results -->
            <div v-else class="py-8 text-center">
              <p class="text-sm text-muted-foreground">«{{ debouncedQuery }}» bo'yicha natija topilmadi</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.search-modal-enter-active,
.search-modal-leave-active {
  transition: all 0.2s ease;
}
.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}
.search-modal-enter-from .relative,
.search-modal-leave-to .relative {
  transform: translateY(-12px) scale(0.97);
}
</style>
