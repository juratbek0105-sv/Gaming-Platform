<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const username = route.params.username as string
const { get, post } = useApi()
const { success, error } = useToast()
const auth = useAuth()

const isLoading = ref(true)
const user = ref<any>(null)
const activeTab = ref('posts')
const posts = ref<any[]>([])

const fetchProfile = async () => {
  try {
    isLoading.value = true
    const data: any = await get(`/users/${username}`)
    user.value = data
    // Fetch user's posts
    const postsData: any = await get(`/posts?username=${username}`)
    posts.value = postsData
  } catch (err: any) {
    console.error('Profil yuklanmadi:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchProfile)

const toggleFollow = async () => {
  if (!auth.isAuthenticated.value) return navigateTo('/auth/login')
  // In real app: call follow API
  // user.value.following = !user.value.following
  success("Kuzatish funksiyasi tez orada ishga tushadi")
}

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  success("Profil havolasi nusxalandi 🔗")
}
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center py-24">
    <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>

  <div v-else-if="!user" class="flex flex-col items-center justify-center py-24 text-center">
    <div class="w-20 h-20 rounded-full bg-accent/30 flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
    </div>
    <h1 class="text-2xl font-bold text-foreground mb-2">Gamer topilmadi</h1>
    <p class="text-muted-foreground mb-6">Bunday foydalanuvchi mavjud emas yoki nomi noto'g'ri kiritilgan</p>
    <button class="px-5 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" @click="$router.push('/')">
      Bosh sahifaga qaytish
    </button>
  </div>

  <div v-else class="space-y-6">
    <!-- Cover & Avatar Section -->
    <div class="relative">
      <div class="h-40 sm:h-52 rounded-2xl overflow-hidden bg-accent/30 border border-border">
        <img v-if="user.cover" :src="user.cover" class="w-full h-full object-cover" alt="Cover">
        <div v-else class="w-full h-full bg-gradient-to-br from-violet-500/10 to-indigo-500/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-muted-foreground/30"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </div>
      </div>
      
      <div class="absolute -bottom-10 left-6">
        <div class="relative">
          <div class="w-24 h-24 rounded-full border-4 border-background bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden shadow-xl">
             <template v-if="user.avatar">
               <img v-if="user.avatar.startsWith('http')" :src="user.avatar" class="w-full h-full object-cover" />
               <span v-else>{{ user.avatar }}</span>
             </template>
             <span v-else>{{ user.username.charAt(0).toUpperCase() }}</span>
          </div>
          <div v-if="user.online" class="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full ring-2 ring-background shadow-sm" />
        </div>
      </div>

      <div class="absolute bottom-4 right-4 flex gap-2">
         <DropdownMenu>
          <DropdownMenuTrigger>
            <button class="w-9 h-9 rounded-xl bg-background/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-background/80 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="copyLink">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              Havolani nushalash
            </DropdownMenuItem>
            <DropdownMenuItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
              Hisobot berish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <div class="h-6"></div>

    <div class="flex flex-col sm:flex-row gap-6 items-start px-2">
      <div class="flex-1 min-w-0">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-foreground tracking-tight">{{ user.name || user.username }}</h1>
            <p class="text-[14px] text-muted-foreground mt-0.5">@{{ user.username }}</p>
          </div>
          <div class="flex gap-2.5">
            <button
              v-if="auth.user.value?.id !== user.id"
              class="px-6 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 border border-border"
              @click="toggleFollow"
            >
              Kuzatish
            </button>
            <button v-else class="px-6 py-2 rounded-xl text-sm font-semibold bg-accent/50 text-muted-foreground border border-border hover:bg-accent" @click="$router.push('/settings')">
              Profilni tahrirlash
            </button>
          </div>
        </div>

        <p class="mt-4 text-[14px] text-muted-foreground leading-relaxed max-w-xl">{{ user.bio || 'Hali bio qo\'shilmagan' }}</p>

        <div class="flex gap-5 mt-6">
          <div class="flex items-center gap-1.5">
            <span class="text-sm font-bold text-foreground">{{ user._count?.followers || 0 }}</span>
            <span class="text-[13px] text-muted-foreground">Kuzatuvchilar</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="text-sm font-bold text-foreground">{{ user._count?.following || 0 }}</span>
            <span class="text-[13px] text-muted-foreground">Kuzatilmoqda</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs/Content -->
    <div>
      <div class="flex items-center gap-1 border-b border-white/[0.06] mb-6">
        <button
          v-for="tab in [{ key: 'posts', label: 'Postlar' }, { key: 'games', label: 'Statistika' }]"
          :key="tab.key"
          @click="activeTab = tab.key"
          class="relative px-4 py-2.5 text-[13px] font-medium transition-colors"
          :class="activeTab === tab.key ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'"
        >
          {{ tab.label }}
          <div v-if="activeTab === tab.key" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
        </button>
      </div>

      <div v-if="activeTab === 'posts'" class="space-y-4">
        <PostCard v-for="post in posts" :key="post.id" :post="post" @updated="fetchProfile" />
        <div v-if="posts.length === 0" class="text-center py-12 text-muted-foreground">
          <p>Hali postlar yo'q</p>
        </div>
      </div>
    </div>
  </div>
</template>