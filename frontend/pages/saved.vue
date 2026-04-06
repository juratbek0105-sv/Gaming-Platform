<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { success } = useToast()
const gameFilter = ref<string | null>(null)

const savedPosts = reactive([
  {
    id: 1,
    user: { name: 'Jasur Karimov', username: '@jasur_pro', gradient: 'from-emerald-400 to-teal-500' },
    content: "Bugun #Valorant turnirida jamoamiz bilan finalga chiqdik! Ertaga final bo'ladi, bizga omad tilang! 🎮",
    time: '2 soat oldin', likes: 48, comments: 12, liked: true, saved: true, game: 'Valorant',
  },
  {
    id: 2,
    user: { name: 'Sardor Aliyev', username: '@sardor_gg', gradient: 'from-orange-400 to-red-500' },
    content: "#CS2 da yangi update juda zo'r bo'libdi. Inferno mapida o'zgarishlar katta. Kim sinab ko'rdi?",
    time: '4 soat oldin', likes: 32, comments: 28, liked: false, saved: true, game: 'CS2',
  },
  {
    id: 3,
    user: { name: 'Diyor Rashidov', username: '@diyor_rush', gradient: 'from-blue-400 to-cyan-500' },
    content: "#PUBG Mobile turnir natijalari:\n1. Team Phoenix - 142 ochko\n2. Team Dragon - 128 ochko\nBarcha ishtirokchilarga rahmat! #esports",
    time: '8 soat oldin', likes: 67, comments: 19, liked: false, saved: true, game: 'PUBG',
  },
  {
    id: 4,
    user: { name: 'Nilufar Tech', username: '@nilu_gamer', gradient: 'from-pink-400 to-rose-500' },
    content: "Yangi streaming setup tayyor bo'ldi! RTX 4080 + 240Hz monitor. Bugun kechqurun birinchi stream bo'ladi! #streaming",
    time: '1 kun oldin', likes: 95, comments: 34, liked: false, saved: true, game: null,
  },
])

const filteredPosts = computed(() => {
  if (!gameFilter.value) return savedPosts
  return savedPosts.filter(p => p.game === gameFilter.value)
})

const unsave = (post: any) => {
  post.saved = false
  const idx = savedPosts.findIndex(p => p.id === post.id)
  if (idx !== -1) savedPosts.splice(idx, 1)
  success("Post saqlangan ro'yxatdan olib tashlandi")
}

const toggleLike = (post: any) => {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}
</script>

<template>
  <div class="space-y-4">
    <!-- Header -->
    <div>
      <h1 class="text-xl font-bold text-foreground">Saqlangan</h1>
      <p class="text-sm text-muted-foreground mt-0.5">Siz saqlagan postlar bu yerda saqlanadi</p>
    </div>

    <!-- Game filter chips -->
    <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <button
        v-for="g in ['Barchasi', 'Valorant', 'CS2', 'PUBG']"
        :key="g"
        class="shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all"
        :class="(g === 'Barchasi' && !gameFilter) || gameFilter === g
          ? 'bg-primary border-primary text-primary-foreground'
          : 'border-border text-muted-foreground hover:text-foreground'"
        @click="gameFilter = g === 'Barchasi' ? null : g"
      >
        {{ g }}
      </button>
    </div>

    <!-- Posts -->
    <div v-if="filteredPosts.length > 0" class="space-y-4">
      <PostCard
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
        @like="toggleLike"
        @save="unsave"
        @delete="unsave"
      />
    </div>

    <EmptyState
      v-if="filteredPosts.length === 0"
      title="Hali hech narsa saqlanmagan"
      description="Feed da postlarni saqlang — ular bu yerda paydo bo'ladi."
    >
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-muted-foreground/50"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
      </template>
    </EmptyState>

    <Toast />
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
