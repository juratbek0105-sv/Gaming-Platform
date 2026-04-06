<script setup lang="ts">
definePageMeta({ layout: 'default' })

interface Message {
  id: number
  from: 'me' | 'them'
  text: string
  time: string
}

interface Conversation {
  id: number
  user: { name: string; username: string; gradient: string; online: boolean }
  lastMessage: string
  time: string
  unread: number
  messages: Message[]
}

const conversations = reactive<Conversation[]>([
  {
    id: 1,
    user: { name: 'Jasur Karimov', username: '@jasur_pro', gradient: 'from-emerald-400 to-teal-500', online: true },
    lastMessage: "Ertaga o'ynashimiz mumkin", time: '5 daq', unread: 2,
    messages: [
      { id: 1, from: 'them', text: "Salom! Qalaysan?", time: '10:30' },
      { id: 2, from: 'me', text: "Yaxshi, rahmat! Sen qalaysan?", time: '10:31' },
      { id: 3, from: 'them', text: "Men ham yaxshiman. Bu kecha Valorant o'ynadingmi?", time: '10:32' },
      { id: 4, from: 'me', text: "Ha, 5 ta clutch qildim! Ajoyib o'yin bo'ldi 🔥", time: '10:35' },
      { id: 5, from: 'them', text: "Zo'r! Ertaga o'ynashimiz mumkin", time: '10:40' },
      { id: 6, from: 'them', text: "Ertalab 10da bo'sh bo'lasanmi?", time: '10:41' },
    ],
  },
  {
    id: 2,
    user: { name: 'Sardor Aliyev', username: '@sardor_gg', gradient: 'from-orange-400 to-red-500', online: false },
    lastMessage: "CS2 da match qilamizmi?", time: '1 soat', unread: 0,
    messages: [
      { id: 1, from: 'me', text: "Salom Sardor! CS2 da match qilamizmi?", time: '09:00' },
      { id: 2, from: 'them', text: "Albatta! Qachon?", time: '09:15' },
      { id: 3, from: 'me', text: "Kecha kechqurun 20:00 da?", time: '09:16' },
      { id: 4, from: 'them', text: "Kelishib oldik!", time: '09:20' },
    ],
  },
  {
    id: 3,
    user: { name: 'Nilufar Tech', username: '@nilu_gamer', gradient: 'from-pink-400 to-rose-500', online: true },
    lastMessage: "Stream link joylading?", time: '2 soat', unread: 1,
    messages: [
      { id: 1, from: 'them', text: "Salom! Bugun stream bo'ladimi?", time: '08:00' },
      { id: 2, from: 'me', text: "Ha! Kechqurun 21:00 da", time: '08:05' },
      { id: 3, from: 'them', text: "Stream link joylading?", time: '08:10' },
    ],
  },
  {
    id: 4,
    user: { name: 'Diyor Rashidov', username: '@diyor_rush', gradient: 'from-blue-400 to-cyan-500', online: false },
    lastMessage: "Turnir natijalari joylandimi?", time: 'kecha', unread: 0,
    messages: [
      { id: 1, from: 'them', text: "Salom! Turnir natijalari joylandimi?", time: 'kecha 16:00' },
      { id: 2, from: 'me', text: "Ha, feedback sahifada bor", time: 'kecha 16:30' },
    ],
  },
  {
    id: 5,
    user: { name: 'Bobur Umarov', username: '@bobur_aim', gradient: 'from-amber-400 to-yellow-500', online: false },
    lastMessage: "GG! Keyingi safar yutamiz", time: '2 kun', unread: 0,
    messages: [
      { id: 1, from: 'me', text: "GG WP! Yaxshi o'yin bo'ldi", time: '2 kun oldin' },
      { id: 2, from: 'them', text: "GG! Keyingi safar yutamiz", time: '2 kun oldin' },
    ],
  },
])

const selectedId = ref<number | null>(1)
const selectedConv = computed(() => conversations.find(c => c.id === selectedId.value))
const newMessage = ref('')
const messagesRef = ref<HTMLElement | null>(null)

const selectConv = (id: number) => {
  selectedId.value = id
  const c = conversations.find(c => c.id === id)
  if (c) c.unread = 0
}

const sendMessage = () => {
  if (!newMessage.value.trim() || !selectedConv.value) return
  selectedConv.value.messages.push({
    id: Date.now(),
    from: 'me',
    text: newMessage.value,
    time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
  })
  selectedConv.value.lastMessage = newMessage.value
  selectedConv.value.time = 'Hozir'
  newMessage.value = ''
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

const totalUnread = computed(() => conversations.reduce((s, c) => s + c.unread, 0))
</script>

<template>
  <div class="h-[calc(100vh-8rem)] flex rounded-xl border border-border bg-card overflow-hidden">
    <!-- Left Panel - Conversation List -->
    <div class="w-full sm:w-72 shrink-0 border-r border-border flex flex-col" :class="selectedId ? 'hidden sm:flex' : 'flex'">
      <!-- Header -->
      <div class="p-4 border-b border-border">
        <h2 class="text-sm font-semibold text-foreground mb-2">Xabarlar</h2>
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input placeholder="Qidirish..." class="w-full bg-accent/50 rounded-lg pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none" />
        </div>
      </div>
      <!-- List -->
      <div class="flex-1 overflow-y-auto">
        <button
          v-for="conv in conversations"
          :key="conv.id"
          class="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors"
          :class="selectedId === conv.id ? 'bg-violet-500/10' : ''"
          @click="selectConv(conv.id)"
        >
          <UserAvatar :name="conv.user.name" :gradient="conv.user.gradient" :online="conv.user.online" size="md" />
          <div class="flex-1 min-w-0 text-left">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-foreground truncate">{{ conv.user.name }}</p>
              <span class="text-[10px] text-muted-foreground shrink-0 ml-1">{{ conv.time }}</span>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <p class="text-xs text-muted-foreground truncate">{{ conv.lastMessage }}</p>
              <span v-if="conv.unread" class="ml-1 shrink-0 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-bold">{{ conv.unread }}</span>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Right Panel - Chat -->
    <div class="flex-1 flex flex-col min-w-0" :class="selectedId ? 'flex' : 'hidden sm:flex'">
      <template v-if="selectedConv">
        <!-- Chat Header -->
        <div class="flex items-center gap-3 px-4 py-3 border-b border-border">
          <button class="sm:hidden mr-1 text-muted-foreground hover:text-foreground" @click="selectedId = null">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <UserAvatar :name="selectedConv.user.name" :gradient="selectedConv.user.gradient" :online="selectedConv.user.online" size="md" />
          <div>
            <p class="text-sm font-semibold text-foreground">{{ selectedConv.user.name }}</p>
            <p class="text-[11px]" :class="selectedConv.user.online ? 'text-emerald-400' : 'text-muted-foreground'">
              {{ selectedConv.user.online ? 'Online' : 'Oflayn' }}
            </p>
          </div>
        </div>

        <!-- Messages -->
        <div ref="messagesRef" class="flex-1 overflow-y-auto p-4 space-y-3">
          <div
            v-for="msg in selectedConv.messages"
            :key="msg.id"
            class="flex"
            :class="msg.from === 'me' ? 'justify-end' : 'justify-start'"
          >
            <div class="flex flex-col gap-0.5 max-w-[70%]">
              <div
                class="px-3.5 py-2 rounded-2xl text-sm leading-snug"
                :class="msg.from === 'me'
                  ? 'bg-violet-600 text-white rounded-br-sm'
                  : 'bg-accent text-foreground rounded-bl-sm'"
              >
                {{ msg.text }}
              </div>
              <p class="text-[10px] text-muted-foreground" :class="msg.from === 'me' ? 'text-right' : 'text-left'">{{ msg.time }}</p>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="px-4 py-3 border-t border-border flex items-end gap-2">
          <button class="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </button>
          <textarea
            v-model="newMessage"
            placeholder="Xabar yozing..."
            rows="1"
            class="flex-1 bg-accent/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none resize-none"
            @keydown.enter.prevent="sendMessage"
          />
          <button
            class="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-colors shrink-0"
            :disabled="!newMessage.trim()"
            @click="sendMessage"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
      </template>

      <!-- Empty state when no conv selected -->
      <div v-else class="flex-1 flex items-center justify-center">
        <EmptyState title="Suhbat tanlang" description="Chap paneldan suhbat tanlang yoki yangi suhbat boshlang." />
      </div>
    </div>
  </div>
</template>
