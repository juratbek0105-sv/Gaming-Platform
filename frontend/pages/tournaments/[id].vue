<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const { success } = useToast()
const id = Number(route.params.id)

const tournamentsDB: Record<number, any> = {
  1: {
    id: 1, name: 'Valorant Championship UZ 2026', game: 'Valorant', format: '5v5',
    startDate: '2026-04-15', startTime: '14:00', participants: 24, maxParticipants: 32,
    prize: "5,000,000 so'm", status: 'open', organizer: 'JAMOA Esports',
    description: "O'zbekistondagi eng yirik Valorant turniri! 32 ta jamoa ishtirokida bo'lib o'tadigan ushbu musobaqa iqtidorli geymerlarga o'z mahoratlarini namoyon etish imkonini beradi.",
    rules: ['Har bir jamoa 5 o\'yinchidan iborat', "O'yinlar Competitive mode'da o'tkaziladi", 'Match schedule e\'lon qilinganidan keyin 15 daqiqa kechikish — texnik mag\'lubiyat', 'Smurfing va cheat qat\'iyan man etiladi'],
    schedule: [
      { round: 'Ro\'yxatdan o\'tish', date: '10 Aprel - 14 Aprel', status: 'open' },
      { round: 'Ro\'yxatdan o\'tish', date: '10 Aprel - 14 Aprel', status: 'open' },
      { round: 'Guruh bosqichi', date: '15 Aprel - 20 Aprel', status: 'upcoming' },
      { round: 'Ro\'yxat bosqichi', date: '21 Aprel - 23 Aprel', status: 'upcoming' },
      { round: 'Yarim final', date: '24 Aprel', status: 'upcoming' },
      { round: 'Final', date: '25 Aprel', status: 'upcoming' },
    ],
    registered: false,
    prizes: [{ place: '1-o\'rin', amount: "3,000,000 so'm", icon: '🥇' }, { place: '2-o\'rin', amount: "1,500,000 so'm", icon: '🥈' }, { place: '3-o\'rin', amount: "500,000 so'm", icon: '🥉' }],
    teams: [
      { name: 'Team Phoenix', members: 5, status: 'confirmed' },
      { name: 'Team Dragon', members: 5, status: 'confirmed' },
      { name: 'Shadow Squad', members: 5, status: 'confirmed' },
      { name: 'Wolf Pack', members: 5, status: 'pending' },
    ],
  },
  2: {
    id: 2, name: 'CS2 Major Toshkent', game: 'CS2', format: '5v5',
    startDate: '2026-04-20', startTime: '12:00', participants: 16, maxParticipants: 16,
    prize: "3,000,000 so'm", status: 'started', organizer: 'Pro Gaming UZ',
    description: "CS2 Toshkent Major turniri boshlandi! 16 ta eng kuchli jamoa ishtirokida.",
    rules: ['Har bir jamoa 5 o\'yinchidan iborat', 'GOTV orqali kuzatish taqiqlanadi', 'Coaching ruxsati bor'],
    registered: false,
    prizes: [{ place: "1-o'rin", amount: "2,000,000 so'm", icon: '🥇' }, { place: "2-o'rin", amount: "700,000 so'm", icon: '🥈' }, { place: "3-o'rin", amount: "300,000 so'm", icon: '🥉' }],
    schedule: [{ round: 'Guruh bosqichi', date: '20-23 Aprel', status: 'started' }, { round: 'Yarim final', date: '24 Aprel', status: 'upcoming' }, { round: 'Final', date: '25 Aprel', status: 'upcoming' }],
    teams: [{ name: 'Pro Team Alpha', members: 5, status: 'confirmed' }, { name: 'Team Victory', members: 5, status: 'confirmed' }],
  },
}

const notFound = !tournamentsDB[id]
const t = reactive(notFound ? {} : { ...tournamentsDB[id] })
const activeTab = ref('overview')

const formatDate = (d: string) => new Date(d).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })

const statusLabel: Record<string, string> = { open: "Ro'yxatdan o'tish ochiq", started: 'Boshlangan', upcoming: 'Tez kunda', finished: 'Tugagan' }
const statusVariant: Record<string, string> = { open: 'success', started: 'info', upcoming: 'warning', finished: 'default' }

const register = () => {
  if (t.registered) return
  t.registered = true
  t.participants = (t.participants as number) + 1
  success("Turnirga ro'yxatdan o'tdingiz! 🎮")
}
</script>

<template>
  <!-- 404 -->
  <div v-if="notFound" class="flex flex-col items-center justify-center py-24 text-center">
    <h1 class="text-2xl font-bold text-foreground mb-2">Turnir topilmadi</h1>
    <p class="text-muted-foreground text-sm mb-6">Bu turnir mavjud emas yoki tugagan.</p>
    <button class="px-5 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" @click="$router.push('/tournaments')">
      Turnirlar sahifasiga qaytish
    </button>
  </div>

  <div v-else class="space-y-5">
    <!-- Header -->
    <div
      class="relative h-40 rounded-2xl overflow-hidden"
      :class="t.game === 'Valorant' ? 'bg-gradient-to-r from-red-900/60 to-rose-800/40' :
              t.game === 'CS2' ? 'bg-gradient-to-r from-amber-900/60 to-orange-800/40' :
              'bg-gradient-to-r from-violet-900/60 to-indigo-800/40'"
    >
      <div class="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
      <div class="absolute bottom-4 left-5 right-5">
        <div class="flex items-end justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <Badge :variant="statusVariant[t.status] as any">{{ statusLabel[t.status] }}</Badge>
              <Badge>{{ t.game }}</Badge>
              <Badge variant="default">{{ t.format }}</Badge>
            </div>
            <h1 class="text-xl font-bold text-foreground">{{ t.name }}</h1>
            <p class="text-sm text-muted-foreground">{{ t.organizer }}</p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-[11px] text-muted-foreground mb-0.5">Mukofot fondi</p>
            <p class="text-lg font-bold text-amber-400">{{ t.prize }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-3 gap-3">
      <div class="bg-card border border-border rounded-xl p-3 text-center">
        <p class="text-[11px] text-muted-foreground mb-1">Qatnashchilar</p>
        <p class="text-base font-bold text-foreground">{{ t.participants }}/{{ t.maxParticipants }}</p>
        <div class="mt-1.5 h-1 bg-accent rounded-full overflow-hidden">
          <div class="h-full rounded-full" :class="t.participants >= t.maxParticipants ? 'bg-red-500' : 'bg-violet-500'" :style="{ width: `${(t.participants / t.maxParticipants) * 100}%` }" />
        </div>
      </div>
      <div class="bg-card border border-border rounded-xl p-3 text-center">
        <p class="text-[11px] text-muted-foreground mb-1">Sana</p>
        <p class="text-sm font-semibold text-foreground">{{ formatDate(t.startDate) }}</p>
      </div>
      <div class="bg-card border border-border rounded-xl p-3 text-center">
        <p class="text-[11px] text-muted-foreground mb-1">Vaqt</p>
        <p class="text-sm font-semibold text-foreground">{{ t.startTime }}</p>
      </div>
    </div>

    <!-- Register Button -->
    <div v-if="t.status === 'open'" class="flex gap-3">
      <button
        class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
        :class="t.registered
          ? 'border border-border text-muted-foreground'
          : 'bg-primary text-primary-foreground hover:bg-primary/90'"
        :disabled="t.registered || t.participants >= t.maxParticipants"
        @click="register"
      >
        {{ t.registered ? "✅ Ro'yxatga olindingiz" : t.participants >= t.maxParticipants ? 'Ro\'yxat to\'ldi' : "Ro'yxatdan o'tish" }}
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex items-center gap-1 border-b border-border">
      <button
        v-for="tab in [{ key: 'overview', label: 'Umumiy' }, { key: 'prizes', label: 'Mukofotlar' }, { key: 'schedule', label: 'Jadval' }, { key: 'teams', label: `Jamoalar (${t.teams?.length})` }]"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="relative px-4 py-2.5 text-sm font-medium transition-colors"
        :class="activeTab === tab.key ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'"
      >
        {{ tab.label }}
        <div v-if="activeTab === tab.key" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
      </button>
    </div>

    <!-- Overview Tab -->
    <div v-if="activeTab === 'overview'" class="space-y-4">
      <div class="bg-card border border-border rounded-xl p-4">
        <h3 class="text-sm font-semibold text-foreground mb-2">Turnir haqida</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">{{ t.description }}</p>
      </div>
      <div class="bg-card border border-border rounded-xl p-4">
        <h3 class="text-sm font-semibold text-foreground mb-3">Qoidalar</h3>
        <ul class="space-y-2">
          <li v-for="(rule, i) in t.rules" :key="i" class="flex items-start gap-2 text-sm text-muted-foreground">
            <span class="mt-1 w-4 h-4 rounded-full bg-violet-500/15 text-violet-400 flex items-center justify-center text-[10px] font-bold shrink-0">{{ Number(i) + 1 }}</span>
            {{ rule }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Prizes Tab -->
    <div v-if="activeTab === 'prizes'" class="space-y-3">
      <div
        v-for="p in t.prizes"
        :key="p.place"
        class="flex items-center gap-4 bg-card border border-border rounded-xl p-4"
      >
        <span class="text-3xl">{{ p.icon }}</span>
        <div>
          <p class="text-sm font-semibold text-foreground">{{ p.place }}</p>
          <p class="text-base font-bold text-amber-400">{{ p.amount }}</p>
        </div>
      </div>
    </div>

    <!-- Schedule Tab -->
    <div v-if="activeTab === 'schedule'" class="space-y-2">
      <div
        v-for="s in t.schedule"
        :key="s.round"
        class="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3"
      >
        <div>
          <p class="text-sm font-medium text-foreground">{{ s.round }}</p>
          <p class="text-xs text-muted-foreground mt-0.5">{{ s.date }}</p>
        </div>
        <Badge :variant="statusVariant[s.status] as any">{{ statusLabel[s.status] }}</Badge>
      </div>
    </div>

    <!-- Teams Tab -->
    <div v-if="activeTab === 'teams'" class="space-y-2">
      <div
        v-for="team in t.teams"
        :key="team.name"
        class="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3"
      >
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center text-sm font-bold text-violet-400">{{ team.name.charAt(0) }}</div>
          <div>
            <p class="text-sm font-medium text-foreground">{{ team.name }}</p>
            <p class="text-xs text-muted-foreground">{{ team.members }} o'yinchi</p>
          </div>
        </div>
        <Badge :variant="team.status === 'confirmed' ? 'success' : 'warning'">{{ team.status === 'confirmed' ? 'Tasdiqlangan' : 'Kutilmoqda' }}</Badge>
      </div>
    </div>

    <Toast />
  </div>
</template>
