<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const { success } = useToast()
const id = Number(route.params.id)

const groupsDB: Record<number, any> = {
  1: {
    id: 1, name: 'Valorant Uzbekistan', game: 'Valorant', members: 342, joined: false,
    description: "O'zbekistondagi barcha Valorant o'yinchilar uchun asosiy guruh. Turnirlar, postlar, strategiyalar va jamoa toplash.",
    banner: null, isPublic: true, admin: 'Aziz Bekmurodov',
    posts: [
      { id: 1, user: { name: 'Jasur Karimov', username: '@jasur_pro', gradient: 'from-emerald-400 to-teal-500' }, content: "Yangi weekly tournament e'loni! Shanba kuni 14:00 da. Ro'yxatdan o'ting 👇", time: '2 soat oldin', likes: 45, comments: 12, liked: false, saved: false, game: 'Valorant' },
      { id: 2, user: { name: 'Sardor Aliyev', username: '@sardor_gg', gradient: 'from-orange-400 to-red-500' }, content: "Yangi patch notesni ko'rdingizmi? #Valorant agentlar balansi o'zgardi!", time: '5 soat oldin', likes: 28, comments: 16, liked: false, saved: false, game: 'Valorant' },
    ],
    members_list: [
      { name: 'Jasur Karimov', username: '@jasur_pro', gradient: 'from-emerald-400 to-teal-500', role: 'Admin' },
      { name: 'Sardor Aliyev', username: '@sardor_gg', gradient: 'from-orange-400 to-red-500', role: 'Moderator' },
      { name: 'Diyor Rashidov', username: '@diyor_rush', gradient: 'from-blue-400 to-cyan-500', role: 'A\'zo' },
      { name: 'Bobur Umarov', username: '@bobur_aim', gradient: 'from-amber-400 to-yellow-500', role: "A'zo" },
      { name: 'Nilufar Tech', username: '@nilu_gamer', gradient: 'from-pink-400 to-rose-500', role: "A'zo" },
    ],
  },
  2: {
    id: 2, name: 'CS2 Pro League', game: 'CS2', members: 218, joined: true,
    description: "CS2 professional o'yinchilar va puxta geymerlarga mo'ljallangan guruh. Matchmaking, scrim va turnir tashkillari.",
    banner: null, isPublic: true, admin: 'Sardor Aliyev',
    posts: [
      { id: 1, user: { name: 'Sardor Aliyev', username: '@sardor_gg', gradient: 'from-orange-400 to-red-500' }, content: "Bu hafta scrim bo'ladi! CS2 kimlar bor? DM yuboring #CS2", time: '1 soat oldin', likes: 18, comments: 8, liked: false, saved: false, game: 'CS2' },
    ],
    members_list: [
      { name: 'Sardor Aliyev', username: '@sardor_gg', gradient: 'from-orange-400 to-red-500', role: 'Admin' },
      { name: 'Aziz Bekmurodov', username: '@azizbeco', gradient: 'from-violet-500 to-indigo-500', role: "A'zo" },
    ],
  },
}

const notFound = !groupsDB[id]
const group = reactive(notFound ? {} : { ...groupsDB[id] })
const activeTab = ref('posts')

const toggleJoin = () => {
  group.joined = !group.joined
  group.members += group.joined ? 1 : -1
  success(group.joined ? `${group.name} guruhiga qo'shildingiz!` : "Guruhdan chiqdingiz")
}

const toggleLike = (post: any) => { post.liked = !post.liked; post.likes += post.liked ? 1 : -1 }
const toggleSave = (post: any) => { post.saved = !post.saved }
</script>

<template>
  <!-- 404 -->
  <div v-if="notFound" class="flex flex-col items-center justify-center py-24 text-center">
    <h1 class="text-2xl font-bold text-foreground mb-2">Guruh topilmadi</h1>
    <p class="text-muted-foreground text-sm mb-6">Bu guruh mavjud emas yoki o'chirilgan.</p>
    <button class="px-5 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" @click="$router.push('/groups')">
      Guruhlar sahifasiga qaytish
    </button>
  </div>

  <div v-else class="space-y-5">
    <!-- Banner / Header -->
    <div
      class="relative h-36 rounded-2xl overflow-hidden"
      :class="group.game === 'Valorant' ? 'bg-gradient-to-r from-red-900/60 to-rose-800/40' :
              group.game === 'CS2' ? 'bg-gradient-to-r from-amber-900/60 to-orange-800/40' :
              'bg-gradient-to-r from-violet-900/60 to-indigo-800/40'"
    >
      <div class="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      <div class="absolute bottom-4 left-5 flex items-end gap-4">
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black border-2 border-white/20"
          :class="group.game === 'Valorant' ? 'bg-red-600' : group.game === 'CS2' ? 'bg-amber-600' : 'bg-violet-600'"
        >
          {{ group.name.charAt(0) }}
        </div>
        <div>
          <h1 class="text-xl font-bold text-foreground">{{ group.name }}</h1>
          <p class="text-sm text-muted-foreground">{{ group.members.toLocaleString() }} a'zo · {{ group.isPublic ? 'Ochiq guruh' : 'Yopiq guruh' }}</p>
        </div>
      </div>
      <!-- Actions -->
      <div class="absolute top-4 right-4 flex gap-2">
        <button
          class="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
          :class="group.joined ? 'border border-border text-muted-foreground hover:text-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/90'"
          @click="toggleJoin"
        >
          {{ group.joined ? "Guruhdan chiqish" : "Qo'shilish" }}
        </button>
      </div>
    </div>

    <!-- Description -->
    <p class="text-sm text-muted-foreground leading-relaxed">{{ group.description }}</p>

    <!-- Tabs -->
    <div class="flex items-center gap-1 border-b border-border">
      <button
        v-for="tab in [{ key: 'posts', label: 'Postlar' }, { key: 'members', label: `A'zolar (${group.members_list?.length})` }, { key: 'about', label: 'Haqida' }]"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="relative px-4 py-2.5 text-sm font-medium transition-colors"
        :class="activeTab === tab.key ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'"
      >
        {{ tab.label }}
        <div v-if="activeTab === tab.key" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
      </button>
    </div>

    <!-- Posts Tab -->
    <div v-if="activeTab === 'posts'" class="space-y-4">
      <PostCard
        v-for="post in group.posts"
        :key="post.id"
        :post="post"
        @like="toggleLike"
        @save="toggleSave"
      />
      <EmptyState v-if="!group.posts?.length" title="Hali post yo'q" description="Bu guruhda hali hech narsa joylashtirilmagan." />
    </div>

    <!-- Members Tab -->
    <div v-if="activeTab === 'members'" class="space-y-1">
      <div
        v-for="m in group.members_list"
        :key="m.username"
        class="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-accent/50 transition-colors"
      >
        <NuxtLink :to="`/profile/${m.username.replace('@', '')}`">
          <UserAvatar :name="m.name" :gradient="m.gradient" size="md" />
        </NuxtLink>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-foreground">{{ m.name }}</p>
          <p class="text-xs text-muted-foreground">{{ m.username }}</p>
        </div>
        <Badge :variant="m.role === 'Admin' ? 'valorant' : m.role === 'Moderator' ? 'info' : 'default'">{{ m.role }}</Badge>
      </div>
    </div>

    <!-- About Tab -->
    <div v-if="activeTab === 'about'" class="bg-card border border-border rounded-xl p-5 space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div><p class="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">O'yin</p><Badge>{{ group.game }}</Badge></div>
        <div><p class="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">A'zolar</p><p class="text-sm font-medium text-foreground">{{ group.members }}</p></div>
        <div><p class="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Admin</p><p class="text-sm text-foreground">{{ group.admin }}</p></div>
        <div><p class="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Turi</p><p class="text-sm text-foreground">{{ group.isPublic ? 'Ochiq' : 'Yopiq' }}</p></div>
      </div>
    </div>

    <Toast />
  </div>
</template>
