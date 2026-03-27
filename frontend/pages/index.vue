<script setup lang="ts">
definePageMeta({ layout: 'default' })

const newPost = ref('')
const isPosting = ref(false)

const handlePost = () => {
  if (!newPost.value.trim()) return
  isPosting.value = true
  setTimeout(() => {
    posts.unshift({
      id: Date.now(),
      user: { name: 'Aziz Bekmurodov', username: '@azizbeco', avatar: 'A', gradient: 'from-violet-500 to-indigo-500' },
      content: newPost.value,
      time: 'Hozir',
      likes: 0,
      comments: 0,
      liked: false,
      saved: false,
      game: null,
    })
    newPost.value = ''
    isPosting.value = false
  }, 400)
}

const posts = reactive([
  {
    id: 1,
    user: { name: 'Jasur Karimov', username: '@jasur_pro', avatar: 'J', gradient: 'from-emerald-400 to-teal-500' },
    content: "Bugun Valorant turnirida jamoamiz bilan finalga chiqdik! Ertaga final bo'ladi, bizga omad tilang!",
    time: '2s', likes: 48, comments: 12, liked: true, saved: false, game: 'Valorant',
  },
  {
    id: 2,
    user: { name: 'Sardor Aliyev', username: '@sardor_gg', avatar: 'S', gradient: 'from-orange-400 to-red-500' },
    content: "CS2 da yangi update juda zo'r bo'libdi. Inferno mapida o'zgarishlar katta. Kim sinab ko'rdi?",
    time: '4s', likes: 32, comments: 28, liked: false, saved: true, game: 'CS2',
  },
  {
    id: 3,
    user: { name: 'Nilufar Tech', username: '@nilu_gamer', avatar: 'N', gradient: 'from-pink-400 to-rose-500' },
    content: "Yangi streaming setup tayyor bo'ldi! RTX 4080 + 240Hz monitor. Bugun kechqurun birinchi stream bo'ladi, kanalga obuna bo'ling!",
    time: '6s', likes: 95, comments: 34, liked: false, saved: false, game: null,
  },
  {
    id: 4,
    user: { name: 'Diyor Rashidov', username: '@diyor_rush', avatar: 'D', gradient: 'from-blue-400 to-cyan-500' },
    content: "PUBG Mobile turnir natijalari:\n\n1. Team Phoenix - 142 ochko\n2. Team Dragon - 128 ochko\n3. Team Shadow - 115 ochko\n\nBarcha ishtirokchilarga rahmat!",
    time: '8s', likes: 67, comments: 19, liked: false, saved: false, game: 'PUBG',
  },
  {
    id: 5,
    user: { name: 'Bobur Umarov', username: '@bobur_aim', avatar: 'B', gradient: 'from-amber-400 to-yellow-500' },
    content: "5 ta clutch ketma-ket! Bugungi o'yin hayotimning eng yaxshi o'yini bo'ldi. Replay videoni tez orada joylashtiraman.",
    time: '12s', likes: 124, comments: 41, liked: true, saved: false, game: 'Valorant',
  },
])

const toggleLike = (post: any) => {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

const toggleSave = (post: any) => {
  post.saved = !post.saved
}

const gameColor: Record<string, string> = {
  Valorant: 'text-red-400',
  CS2: 'text-amber-400',
  PUBG: 'text-orange-400',
}
</script>

<template>
  <div class="space-y-4">
    <!-- Create Post -->
    <div class="rounded-xl border border-border bg-card p-4">
      <div class="flex gap-3">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
          A
        </div>
        <div class="flex-1">
          <textarea
            v-model="newPost"
            placeholder="Nima yangilik bor?"
            rows="2"
            class="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none leading-relaxed"
          />
          <div class="flex items-center justify-between mt-2 pt-2 border-t border-border">
            <div class="flex items-center gap-0.5">
              <button class="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              </button>
              <button class="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
              </button>
            </div>
            <button
              class="px-4 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              :disabled="!newPost.trim() || isPosting"
              @click="handlePost"
            >
              Joylash
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Posts -->
    <div
      v-for="post in posts"
      :key="post.id"
      class="rounded-xl border border-border bg-card p-4 hover:border-border/80 transition-colors"
    >
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-2.5">
          <NuxtLink :to="`/profile/${post.user.username.replace('@', '')}`">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-semibold hover:opacity-80 transition-opacity" :class="post.user.gradient">
              {{ post.user.avatar }}
            </div>
          </NuxtLink>
          <div>
            <div class="flex items-center gap-2">
              <NuxtLink :to="`/profile/${post.user.username.replace('@', '')}`" class="text-sm font-medium text-foreground hover:underline">
                {{ post.user.name }}
              </NuxtLink>
              <span v-if="post.game" class="text-[11px] font-medium" :class="gameColor[post.game] || 'text-primary'">{{ post.game }}</span>
            </div>
            <p class="text-[11px] text-muted-foreground">{{ post.user.username }} · {{ post.time }}</p>
          </div>
        </div>
        <button class="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground/50 hover:text-muted-foreground hover:bg-accent transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>

      <p class="text-sm text-foreground/80 leading-relaxed whitespace-pre-line mb-3">{{ post.content }}</p>

      <div class="flex items-center justify-between pt-2 border-t border-border/50">
        <div class="flex items-center gap-0.5">
          <button
            class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors"
            :class="post.liked ? 'text-rose-400 bg-rose-500/10' : 'text-muted-foreground hover:text-foreground hover:bg-accent'"
            @click="toggleLike(post)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" :fill="post.liked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            {{ post.likes }}
          </button>
          <button class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
            {{ post.comments }}
          </button>
          <button class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
          </button>
        </div>
        <button
          class="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
          :class="post.saved ? 'text-amber-400' : 'text-muted-foreground/50 hover:text-muted-foreground hover:bg-accent'"
          @click="toggleSave(post)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" :fill="post.saved ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>