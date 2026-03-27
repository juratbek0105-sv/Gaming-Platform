<script setup lang="ts">
definePageMeta({ layout: 'profile' })

const activeTab = ref('posts')

const user = reactive({
  name: 'Aziz Bekmurodov',
  username: '@azizbeco',
  avatar: 'A',
  bio: "Valorant IGL | CS2 enthusiast. Jamoa platformasi asoschisi.",
  location: "Toshkent, O'zbekiston",
  joinedDate: 'Fevral 2026',
  role: 'IGL / Sniper',
  team: 'Team Phoenix',
  online: true,
  stats: { posts: 142, followers: 1284, following: 356 },
})

const gameStats = reactive([
  { game: 'Valorant', hours: 2840, winRate: 68, kd: 1.8, rank: 'Immortal 2' },
  { game: 'CS2', hours: 1920, winRate: 62, kd: 1.5, rank: 'Global Elite' },
  { game: 'PUBG', hours: 860, winRate: 45, kd: 2.1, rank: 'Conqueror' },
])

const recentMatches = reactive([
  { game: 'Valorant', map: 'Ascent', result: "G'alaba", score: '13-7', kda: '24/8/6', time: '2s oldin', won: true },
  { game: 'Valorant', map: 'Haven', result: "G'alaba", score: '13-11', kda: '19/14/9', time: '4s oldin', won: true },
  { game: 'CS2', map: 'Mirage', result: "Mag'lubiyat", score: '14-16', kda: '22/18/4', time: '6s oldin', won: false },
  { game: 'Valorant', map: 'Bind', result: "G'alaba", score: '13-5', kda: '28/5/3', time: '1 kun', won: true },
])

const userPosts = reactive([
  { id: 1, content: "Bugun Valorant turnirida jamoamiz bilan finalga chiqdik! Ertaga final bo'ladi, bizga omad tilang!", time: '2 soat oldin', likes: 48, comments: 12, liked: true },
  { id: 2, content: "Yangi streaming setup tayyor bo'ldi! RTX 4090 + 360Hz monitor. Bugun kechqurun birinchi stream bo'ladi!", time: '1 kun oldin', likes: 95, comments: 34, liked: false },
  { id: 3, content: "5 ta clutch ketma-ket! Bugungi o'yin hayotimning eng yaxshi o'yini bo'ldi.", time: '3 kun oldin', likes: 124, comments: 41, liked: false },
])

const toggleLike = (post: any) => {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}
</script>

<template>
  <div class="space-y-8">
    <!-- Profile Header -->
    <div class="flex flex-col sm:flex-row gap-6 items-start">
      <!-- Avatar -->
      <div class="relative">
        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
          {{ user.avatar }}
        </div>
        <div v-if="user.online" class="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-background" />
      </div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h1 class="text-xl font-semibold text-white">{{ user.name }}</h1>
            <p class="text-[13px] text-white/30 mt-0.5">{{ user.username }}</p>
          </div>
          <div class="flex gap-2">
            <button class="px-4 py-1.5 rounded-lg text-[13px] font-medium bg-violet-600 text-white hover:bg-violet-500 transition-colors">
              Profil tahrirlash
            </button>
            <button class="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.08] text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>
          </div>
        </div>

        <p class="text-[13px] text-white/50 mt-3 leading-relaxed max-w-lg">{{ user.bio }}</p>

        <!-- Meta -->
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

        <!-- Stats -->
        <div class="flex items-center gap-5 mt-4">
          <span class="text-[13px]">
            <span class="font-semibold text-white">{{ user.stats.posts }}</span>
            <span class="text-white/25 ml-1">post</span>
          </span>
          <span class="text-[13px]">
            <span class="font-semibold text-white">{{ user.stats.followers.toLocaleString() }}</span>
            <span class="text-white/25 ml-1">kuzatuvchi</span>
          </span>
          <span class="text-[13px]">
            <span class="font-semibold text-white">{{ user.stats.following }}</span>
            <span class="text-white/25 ml-1">kuzatilgan</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div>
      <div class="flex items-center gap-1 border-b border-white/[0.06] mb-6">
        <button
          v-for="tab in [
            { key: 'posts', label: 'Postlar' },
            { key: 'games', label: 'Statistika' },
            { key: 'matches', label: 'O\'yinlar' },
          ]"
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
        <div
          v-for="post in userPosts"
          :key="post.id"
          class="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.03] transition-colors"
        >
          <div class="flex items-center gap-2.5 mb-2.5">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-[11px] font-semibold">A</div>
            <div>
              <span class="text-[13px] font-medium text-white/80">{{ user.name }}</span>
              <span class="text-[11px] text-white/20 ml-2">{{ post.time }}</span>
            </div>
          </div>
          <p class="text-[13px] text-white/50 leading-relaxed mb-3">{{ post.content }}</p>
          <div class="flex items-center gap-0.5">
            <button
              class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] transition-colors"
              :class="post.liked ? 'text-rose-400' : 'text-white/20 hover:text-white/50'"
              @click="toggleLike(post)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" :fill="post.liked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              {{ post.likes }}
            </button>
            <button class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] text-white/20 hover:text-white/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              {{ post.comments }}
            </button>
          </div>
        </div>
      </div>

      <!-- Game Stats Tab -->
      <div v-if="activeTab === 'games'" class="space-y-3">
        <div
          v-for="g in gameStats"
          :key="g.game"
          class="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
        >
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
              <div class="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div class="h-full bg-violet-500/60 rounded-full" :style="{ width: g.winRate + '%' }" />
              </div>
            </div>
            <div>
              <p class="text-[11px] text-white/25 mb-1">K/D</p>
              <p class="text-[15px] font-semibold text-white">{{ g.kd }}</p>
            </div>
            <div>
              <p class="text-[11px] text-white/25 mb-1">Rank</p>
              <p class="text-[15px] font-semibold text-white">{{ g.rank }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Matches Tab -->
      <div v-if="activeTab === 'matches'">
        <div class="rounded-xl border border-white/[0.06] overflow-hidden">
          <div class="hidden sm:grid grid-cols-6 gap-4 px-4 py-2.5 bg-white/[0.02] text-[11px] text-white/20 uppercase tracking-wider font-medium border-b border-white/[0.04]">
            <span>O'yin</span>
            <span>Map</span>
            <span>Natija</span>
            <span>Hisob</span>
            <span>K/D/A</span>
            <span class="text-right">Vaqt</span>
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
  </div>
</template>