<script setup lang="ts">
definePageMeta({ layout: 'profile' })

const route = useRoute()
const username = route.params.username as string

const activeTab = ref('posts')

const usersDB: Record<string, any> = {
  jasur_pro: {
    name: 'Jasur Karimov', username: '@jasur_pro', avatar: 'J', gradient: 'from-emerald-400 to-teal-500',
    bio: "Valorant IGL | Team Phoenix Captain. 3x Tournament Champion.",
    location: "Samarqand", joinedDate: 'Mart 2026', role: 'IGL / Duelist', team: 'Team Phoenix', online: true,
    stats: { posts: 89, followers: 2340, following: 178 },
  },
  sardor_gg: {
    name: 'Sardor Aliyev', username: '@sardor_gg', avatar: 'S', gradient: 'from-orange-400 to-red-500',
    bio: "CS2 Professional Sniper | AWP Master.",
    location: "Buxoro", joinedDate: 'Yanvar 2026', role: 'Sniper / Entry', team: 'Team Dragon', online: false,
    stats: { posts: 56, followers: 1890, following: 245 },
  },
  nilu_gamer: {
    name: 'Nilufar Tech', username: '@nilu_gamer', avatar: 'N', gradient: 'from-pink-400 to-rose-500',
    bio: "Streamer & Content Creator. Gaming setup reviews.",
    location: "Toshkent", joinedDate: 'Dekabr 2025', role: 'Streamer', team: null, online: true,
    stats: { posts: 234, followers: 5670, following: 412 },
  },
  diyor_rush: {
    name: 'Diyor Rashidov', username: '@diyor_rush', avatar: 'D', gradient: 'from-blue-400 to-cyan-500',
    bio: "PUBG Mobile Pro Player | Tournament Organizer.",
    location: "Namangan", joinedDate: 'Aprel 2026', role: 'Rusher / IGL', team: 'Team Shadow', online: false,
    stats: { posts: 178, followers: 3450, following: 289 },
  },
  bobur_aim: {
    name: 'Bobur Umarov', username: '@bobur_aim', avatar: 'B', gradient: 'from-amber-400 to-yellow-500',
    bio: "Aim God | Valorant Duelist. 5 clutch king.",
    location: "Andijon", joinedDate: 'May 2026', role: 'Duelist', team: 'Team Phoenix', online: true,
    stats: { posts: 45, followers: 890, following: 134 },
  },
}

const fallback = {
  name: username, username: `@${username}`, avatar: username.charAt(0).toUpperCase(), gradient: 'from-gray-400 to-gray-500',
  bio: '', location: "O'zbekiston", joinedDate: '2026', role: 'Gamer', team: null, online: false,
  stats: { posts: 0, followers: 0, following: 0 },
}

const user = reactive(usersDB[username] || fallback)

const gameStats = reactive([
  { game: 'Valorant', hours: 1420, winRate: 58, kd: 1.4, rank: 'Diamond' },
  { game: 'CS2', hours: 890, winRate: 52, kd: 1.2, rank: 'DMG' },
])

const recentMatches = reactive([
  { game: 'Valorant', map: 'Ascent', result: "G'alaba", score: '13-9', kda: '20/10/5', time: '3s oldin', won: true },
  { game: 'CS2', map: 'Dust2', result: "Mag'lubiyat", score: '12-16', kda: '18/20/3', time: '5s oldin', won: false },
  { game: 'Valorant', map: 'Split', result: "G'alaba", score: '13-4', kda: '25/6/8', time: '1 kun', won: true },
])

const userPosts = reactive([
  { id: 1, content: "Bugun ajoyib o'yin bo'ldi! Jamoamiz juda yaxshi o'ynadi.", time: '2 soat oldin', likes: 32, comments: 8, liked: false },
  { id: 2, content: "Yangi strategiya ishlab chiqdik, keyingi turnirda sinab ko'ramiz.", time: '1 kun oldin', likes: 54, comments: 15, liked: false },
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
      <div class="relative">
        <div class="w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-2xl font-bold" :class="user.gradient">
          {{ user.avatar }}
        </div>
        <div v-if="user.online" class="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-background" />
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h1 class="text-xl font-semibold text-white">{{ user.name }}</h1>
            <p class="text-[13px] text-white/30 mt-0.5">{{ user.username }}</p>
          </div>
          <div class="flex gap-2">
            <button class="px-4 py-1.5 rounded-lg text-[13px] font-medium bg-violet-600 text-white hover:bg-violet-500 transition-colors">
              Kuzatish
            </button>
            <button class="px-4 py-1.5 rounded-lg text-[13px] font-medium border border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-colors">
              Xabar
            </button>
          </div>
        </div>

        <p v-if="user.bio" class="text-[13px] text-white/50 mt-3 leading-relaxed max-w-lg">{{ user.bio }}</p>

        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[12px] text-white/25">
          <span class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            {{ user.location }}
          </span>
          <span v-if="user.team" class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            {{ user.team }}
          </span>
          <span>{{ user.role }}</span>
          <span>{{ user.joinedDate }}dan beri</span>
        </div>

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

      <!-- Posts -->
      <div v-if="activeTab === 'posts'" class="space-y-3">
        <div
          v-for="post in userPosts"
          :key="post.id"
          class="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.03] transition-colors"
        >
          <div class="flex items-center gap-2.5 mb-2.5">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-[11px] font-semibold" :class="user.gradient">{{ user.avatar }}</div>
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

      <!-- Game Stats -->
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

      <!-- Matches -->
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