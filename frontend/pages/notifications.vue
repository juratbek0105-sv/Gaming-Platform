<script setup lang="ts">
definePageMeta({ layout: 'default' })

const activeFilter = ref('all')
const notifications = reactive([
  { id: 1, type: 'like', user: { name: 'Jasur Karimov', gradient: 'from-emerald-400 to-teal-500' }, message: "postingizga like bosdi", time: '5 daqiqa', read: false },
  { id: 2, type: 'follow', user: { name: 'Sardor Aliyev', gradient: 'from-orange-400 to-red-500' }, message: "sizni kuzata boshladi", time: '12 daqiqa', read: false },
  { id: 3, type: 'comment', user: { name: 'Nilufar Tech', gradient: 'from-pink-400 to-rose-500' }, message: "postingizga izoh qoldirdi: \"Zo'r o'yin! Omad tilaymiz 🔥\"", time: '1 soat', read: false },
  { id: 4, type: 'tournament', user: null, message: "Valorant Championship UZ 2026 turniri boshlandi!", time: '2 soat', read: true },
  { id: 5, type: 'group_invite', user: { name: 'Diyor Rashidov', gradient: 'from-blue-400 to-cyan-500' }, message: "sizni CS2 Pro League guruhiga taklif qildi", time: '3 soat', read: true },
  { id: 6, type: 'like', user: { name: 'Bobur Umarov', gradient: 'from-amber-400 to-yellow-500' }, message: "postingizga like bosdi", time: '5 soat', read: true },
  { id: 7, type: 'comment', user: { name: 'Jasur Karimov', gradient: 'from-emerald-400 to-teal-500' }, message: "izohingizga javob berdi: \"Ha, to'g'ri aytasiz!\"", time: '6 soat', read: true },
  { id: 8, type: 'follow', user: { name: 'Bobur Umarov', gradient: 'from-amber-400 to-yellow-500' }, message: "sizni kuzata boshladi", time: 'kecha', read: true },
  { id: 9, type: 'tournament', user: null, message: "CS2 Major Toshkent turnirida ro'yxatdan o'tish muddati tugayapti!", time: 'kecha', read: true },
  { id: 10, type: 'system', user: null, message: "Profilingizni to'ldiring — o'yin akkauntlaringizni ulang", time: '2 kun', read: true },
  { id: 11, type: 'like', user: { name: 'Sardor Aliyev', gradient: 'from-orange-400 to-red-500' }, message: "postingizga like bosdi", time: '3 kun', read: true },
  { id: 12, type: 'group_invite', user: { name: 'Nilufar Tech', gradient: 'from-pink-400 to-rose-500' }, message: "sizni Pro Streamers UZ guruhiga taklif qildi", time: '4 kun', read: true },
])

const iconMap: Record<string, { svg: string; color: string }> = {
  like: { color: 'text-rose-400 bg-rose-500/15', svg: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>' },
  comment: { color: 'text-sky-400 bg-sky-500/15', svg: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>' },
  follow: { color: 'text-violet-400 bg-violet-500/15', svg: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/>' },
  group_invite: { color: 'text-emerald-400 bg-emerald-500/15', svg: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
  tournament: { color: 'text-amber-400 bg-amber-500/15', svg: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>' },
  system: { color: 'text-muted-foreground bg-accent', svg: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>' },
}

const filteredNotifications = computed(() =>
  activeFilter.value === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications
)

const markAllRead = () => {
  notifications.forEach(n => n.read = true)
}

const markRead = (n: any) => {
  n.read = true
}

const unreadCount = computed(() => notifications.filter(n => !n.read).length)
</script>

<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-foreground flex items-center gap-2">
          Bildirishnomalar
          <span v-if="unreadCount > 0" class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">{{ unreadCount }}</span>
        </h1>
      </div>
      <button
        v-if="unreadCount > 0"
        class="text-xs text-violet-400 hover:underline"
        @click="markAllRead"
      >
        Barchasini o'qilgan deb belgilash
      </button>
    </div>

    <!-- Filter -->
    <div class="flex gap-2">
      <button
        v-for="f in [{ key: 'all', label: 'Hammasi' }, { key: 'unread', label: `O'qilmagan (${unreadCount})` }]"
        :key="f.key"
        class="px-4 py-1.5 rounded-lg text-xs font-medium border transition-all"
        :class="activeFilter === f.key ? 'bg-primary border-primary text-primary-foreground' : 'border-border text-muted-foreground hover:text-foreground'"
        @click="activeFilter = f.key"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- Notifications List -->
    <div v-if="filteredNotifications.length > 0" class="space-y-1">
      <TransitionGroup name="notif-list" tag="div" class="space-y-1">
        <div
          v-for="n in filteredNotifications"
          :key="n.id"
          class="flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer"
          :class="n.read ? 'border-transparent hover:bg-card' : 'border-border bg-card/50 hover:bg-card'"
          @click="markRead(n)"
        >
          <!-- Icon or Avatar -->
          <div class="relative shrink-0">
            <UserAvatar
              v-if="n.user"
              :name="n.user.name"
              :gradient="n.user.gradient"
              size="md"
            />
            <div
              v-else
              class="w-9 h-9 rounded-full flex items-center justify-center"
              :class="iconMap[n.type].color"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="iconMap[n.type].svg" />
            </div>
            <!-- Type icon badge on avatar -->
            <div
              v-if="n.user"
              class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              :class="iconMap[n.type].color"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" v-html="iconMap[n.type].svg" />
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <p class="text-sm text-foreground leading-snug">
              <span v-if="n.user" class="font-semibold">{{ n.user.name }}</span>
              {{ ' ' + n.message }}
            </p>
            <p class="text-[11px] text-muted-foreground mt-0.5">{{ n.time }} oldin</p>
          </div>

          <!-- Unread dot -->
          <div v-if="!n.read" class="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
        </div>
      </TransitionGroup>
    </div>

    <EmptyState
      v-if="filteredNotifications.length === 0"
      title="Bildirishnomalar yo'q"
      description="Yangi bildirishnomalar kelganda bu yerda ko'rinadi."
    />
  </div>
</template>

<style scoped>
.notif-list-enter-active,
.notif-list-leave-active {
  transition: all 0.3s ease;
}
.notif-list-enter-from,
.notif-list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
