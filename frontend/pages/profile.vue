<script setup lang="ts">
definePageMeta({ layout: 'profile' })

const { success } = useToast()
const activeTab = ref('posts')
const showEditModal = ref(false)

const user = reactive({
  name: 'Aziz Bekmurodov',
  username: '@azizbeco',
  avatar: 'A',
  cover: null as string | null,
  bio: "Valorant IGL | CS2 enthusiast. Jamoa platformasi asoschisi.",
  location: "Toshkent, O'zbekiston",
  joinedDate: 'Fevral 2026',
  role: 'IGL / Sniper',
  team: 'Team Phoenix',
  online: true,
  stats: { posts: 142, followers: 1284, following: 356 },
})

// Edit form (separate from user so changes can be cancelled)
const editForm = reactive({ ...user })
const openEdit = () => {
  Object.assign(editForm, user)
  showEditModal.value = true
}
const saveEdit = () => {
  Object.assign(user, {
    name: editForm.name,
    bio: editForm.bio,
    location: editForm.location,
    team: editForm.team,
    role: editForm.role,
  })
  showEditModal.value = false
  success('Profil yangilandi!')
}

const gameStats = reactive([
  { game: 'Valorant', hours: 2840, winRate: 68, kd: 1.8, rank: 'Immortal 2' },
  { game: 'CS2', hours: 1920, winRate: 62, kd: 1.5, rank: 'Global Elite' },
  { game: 'PUBG', hours: 860, winRate: 45, kd: 2.1, rank: 'Conqueror' },
])

const recentMatches = reactive([
  { game: 'Valorant', map: 'Ascent', result: "G'alaba", score: '13-7', kda: '24/8/6', time: '2 soat', won: true },
  { game: 'Valorant', map: 'Haven', result: "G'alaba", score: '13-11', kda: '19/14/9', time: '4 soat', won: true },
  { game: 'CS2', map: 'Mirage', result: "Mag'lubiyat", score: '14-16', kda: '22/18/4', time: '6 soat', won: false },
  { game: 'Valorant', map: 'Bind', result: "G'alaba", score: '13-5', kda: '28/5/3', time: '1 kun', won: true },
])

const userPosts = reactive([
  { id: 1, user: { name: 'Aziz Bekmurodov', username: '@azizbeco', gradient: 'from-violet-500 to-indigo-500' }, content: "Bugun #Valorant turnirida jamoamiz bilan finalga chiqdik! Ertaga final bo'ladi, bizga omad tilang!", time: '2 soat oldin', likes: 48, comments: 12, liked: true, saved: false, game: 'Valorant' },
  { id: 2, user: { name: 'Aziz Bekmurodov', username: '@azizbeco', gradient: 'from-violet-500 to-indigo-500' }, content: "Yangi streaming setup tayyor bo'ldi! RTX 4090 + 360Hz monitor. Bugun kechqurun birinchi stream bo'ladi!", time: '1 kun oldin', likes: 95, comments: 34, liked: false, saved: false, game: null },
  { id: 3, user: { name: 'Aziz Bekmurodov', username: '@azizbeco', gradient: 'from-violet-500 to-indigo-500' }, content: "5 ta clutch ketma-ket! Bugungi o'yin hayotimning eng yaxshi o'yini bo'ldi. #clutch #Valorant", time: '3 kun oldin', likes: 124, comments: 41, liked: false, saved: false, game: 'Valorant' },
])

const toggleLike = (post: any) => { post.liked = !post.liked; post.likes += post.liked ? 1 : -1 }
const toggleSave = (post: any) => { post.saved = !post.saved }
const deletePost = (post: any) => {
  const idx = userPosts.findIndex(p => p.id === post.id)
  if (idx !== -1) userPosts.splice(idx, 1)
  success("Post o'chirildi")
}
</script>

<template>
  <div class="space-y-6">
    <!-- Cover & Avatar Section -->
    <div class="relative">
      <!-- Cover Image -->
      <div 
        class="h-40 sm:h-52 rounded-2xl overflow-hidden bg-accent/30 border border-border group relative cursor-pointer"
        @click="openEdit"
      >
        <img v-if="user.cover" :src="user.cover" class="w-full h-full object-cover" alt="Cover">
        <div v-else class="w-full h-full bg-gradient-to-br from-violet-500/10 to-indigo-500/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-muted-foreground/30"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </div>
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div class="px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground border border-border">Muqovani o'zgartirish</div>
        </div>
      </div>
      
      <!-- Avatar (Overlapping) -->
      <div class="absolute -bottom-10 left-6">
        <div class="relative group cursor-pointer" @click.stop="openEdit">
          <div class="w-24 h-24 rounded-full border-4 border-background bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden shadow-xl">
            <span v-if="!user.avatar" class="opacity-0">A</span>
            <span v-else>{{ user.avatar }}</span>
          </div>
          <div v-if="user.online" class="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full ring-2 ring-background shadow-sm" />
          <div class="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Spacer for overlapped avatar -->
    <div class="h-6"></div>

    <!-- Profile Info Area -->
    <div class="flex flex-col sm:flex-row gap-6 items-start px-2">
      <!-- Info Container -->
      <div class="flex-1 min-w-0">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-foreground tracking-tight">{{ user.name }}</h1>
            <p class="text-[14px] text-muted-foreground mt-0.5">{{ user.username }}</p>
          </div>
          <div class="flex gap-2.5">
            <button
              class="px-5 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
              @click="openEdit"
            >
              Profilni tahrirlash
            </button>
            <NuxtLink to="/settings" class="w-9 h-9 rounded-xl flex items-center justify-center border border-border bg-accent/30 text-muted-foreground hover:text-foreground hover:bg-accent transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            </NuxtLink>
          </div>
        </div>

        <p class="text-[13px] text-white/50 mt-3 leading-relaxed max-w-lg">{{ user.bio }}</p>

        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[12px] text-white/25">
          <span class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            {{ user.location }}
          </span>
          <span class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            {{ user.team }}
          </span>
          <span>{{ user.role }}</span>
          <span>{{ user.joinedDate }}dan beri</span>
        </div>

        <div class="flex items-center gap-5 mt-4">
          <span class="text-[13px]"><span class="font-semibold text-white">{{ user.stats.posts }}</span><span class="text-white/25 ml-1">post</span></span>
          <span class="text-[13px]"><span class="font-semibold text-white">{{ user.stats.followers.toLocaleString() }}</span><span class="text-white/25 ml-1">kuzatuvchi</span></span>
          <span class="text-[13px]"><span class="font-semibold text-white">{{ user.stats.following }}</span><span class="text-white/25 ml-1">kuzatilgan</span></span>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div>
      <div class="flex items-center gap-1 border-b border-white/[0.06] mb-6">
        <button
          v-for="tab in [{ key: 'posts', label: 'Postlar' }, { key: 'games', label: 'Statistika' }, { key: 'matches', label: 'O\'yinlar' }]"
          :key="tab.key"
          @click="activeTab = tab.key"
          class="relative px-4 py-2.5 text-[13px] font-medium transition-colors"
          :class="activeTab === tab.key ? 'text-white' : 'text-white/30 hover:text-white/60'"
        >
          {{ tab.label }}
          <div v-if="activeTab === tab.key" class="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 rounded-full" />
        </button>
      </div>

      <!-- Posts Tab -->
      <div v-if="activeTab === 'posts'" class="space-y-3">
        <PostCard
          v-for="post in userPosts"
          :key="post.id"
          :post="post"
          @like="toggleLike"
          @save="toggleSave"
          @delete="deletePost"
        />
      </div>

      <!-- Game Stats Tab -->
      <div v-if="activeTab === 'games'" class="space-y-3">
        <div v-for="g in gameStats" :key="g.game" class="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-[14px] font-semibold text-white">{{ g.game }}</h3>
              <p class="text-[11px] text-white/25 mt-0.5">{{ g.rank }}</p>
            </div>
            <span class="text-[11px] text-white/20">{{ g.hours.toLocaleString() }} soat</span>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <p class="text-[11px] text-white/25 mb-1">G'alaba</p>
              <p class="text-[15px] font-semibold text-white">{{ g.winRate }}%</p>
              <div class="mt-1.5 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div class="h-full bg-violet-500/70 rounded-full transition-all duration-700" :style="{ width: g.winRate + '%' }" />
              </div>
            </div>
            <div><p class="text-[11px] text-white/25 mb-1">K/D</p><p class="text-[15px] font-semibold text-white">{{ g.kd }}</p></div>
            <div><p class="text-[11px] text-white/25 mb-1">Rank</p><p class="text-[13px] font-semibold text-white">{{ g.rank }}</p></div>
          </div>
        </div>
      </div>

      <!-- Matches Tab -->
      <div v-if="activeTab === 'matches'">
        <div class="rounded-xl border border-white/[0.06] overflow-hidden">
          <div class="hidden sm:grid grid-cols-6 gap-4 px-4 py-2.5 bg-white/[0.02] text-[11px] text-white/20 uppercase tracking-wider font-medium border-b border-white/[0.04]">
            <span>O'yin</span><span>Map</span><span>Natija</span><span>Hisob</span><span>K/D/A</span><span class="text-right">Vaqt</span>
          </div>
          <div
            v-for="(m, i) in recentMatches"
            :key="i"
            class="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 px-4 py-3 items-center border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
          >
            <span class="text-[13px] font-medium text-white/70">{{ m.game }}</span>
            <span class="text-[13px] text-white/30 hidden sm:block">{{ m.map }}</span>
            <span class="text-[13px] font-medium" :class="m.won ? 'text-emerald-400/80' : 'text-red-400/80'">{{ m.result }}</span>
            <span class="text-[13px] text-white/40 hidden sm:block">{{ m.score }}</span>
            <span class="text-[13px] text-white/30 font-mono hidden sm:block">{{ m.kda }}</span>
            <span class="text-[11px] text-white/20 text-right">{{ m.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <Modal v-model="showEditModal" title="Profilni tahrirlash" size="md">
      <div class="space-y-6 max-h-[60vh] overflow-y-auto px-1 pr-3 scrollbar-thin">
        <div class="space-y-4">
          <ImageUpload v-model="editForm.cover" label="Muqova surati" :max-size="5" />
          
          <div>
            <label class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Ism va Familiya</label>
            <input v-model="editForm.name" class="w-full h-11 bg-accent/30 border border-border rounded-xl px-4 text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner" placeholder="To'liq ismingizni kiriting" />
          </div>
          
          <div>
            <label class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Bio <span class="text-muted-foreground/40 font-normal">({{ editForm.bio?.length || 0 }}/160)</span></label>
            <textarea
              v-model="editForm.bio"
              rows="3"
              maxlength="160"
              class="w-full bg-accent/30 border border-border rounded-xl px-4 py-3 text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner resize-none"
              placeholder="O'zingiz haqingizda qisqacha..."
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Joylashuv</label>
              <input v-model="editForm.location" class="w-full h-11 bg-accent/30 border border-border rounded-xl px-4 text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner" placeholder="Toshkent, O'zbekiston" />
            </div>
            <div>
              <label class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Jamoa</label>
              <input v-model="editForm.team" class="w-full h-11 bg-accent/30 border border-border rounded-xl px-4 text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner" placeholder="Team Phoenix" />
            </div>
          </div>
          
          <div>
            <label class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Rol</label>
            <input v-model="editForm.role" class="w-full h-11 bg-accent/30 border border-border rounded-xl px-4 text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner" placeholder="IGL / Sniper" />
          </div>
        </div>
      </div>
      <template #footer>
        <button class="px-4 py-2 rounded-lg text-sm font-medium border border-border text-muted-foreground hover:bg-accent transition-colors" @click="showEditModal = false">
          Bekor qilish
        </button>
        <button class="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" @click="saveEdit">
          Saqlash
        </button>
      </template>
    </Modal>

    <Toast />
  </div>
</template>