<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
})

const showPassword = ref(false)
const showConfirm = ref(false)
const isLoading = ref(false)

const strength = computed(() => {
  const p = form.password
  if (!p) return { score: 0, label: '', color: '' }
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  if (p.length >= 12) s++
  const map: Record<number, { label: string; color: string }> = {
    1: { label: 'Juda zaif', color: 'bg-red-500' },
    2: { label: 'Zaif', color: 'bg-orange-500' },
    3: { label: "O'rtacha", color: 'bg-yellow-500' },
    4: { label: 'Yaxshi', color: 'bg-emerald-500' },
    5: { label: 'Kuchli', color: 'bg-emerald-400' },
  }
  return { score: s, ...(map[s] || { label: '', color: '' }) }
})

const matched = computed(() => form.confirmPassword.length > 0 && form.password === form.confirmPassword)
const mismatched = computed(() => form.confirmPassword.length > 0 && form.password !== form.confirmPassword)

const handleSignup = async () => {
  isLoading.value = true
  setTimeout(() => { isLoading.value = false }, 1500)
}
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight text-foreground">Ro'yxatdan o'tish</h1>
      <p class="text-muted-foreground mt-2 text-[15px]">Yangi hisob yarating va jamoaga qo'shiling</p>
    </div>

    <!-- Social -->
    <div class="grid grid-cols-2 gap-3 mb-6">
      <Button variant="outline" class="h-11 gap-2.5 text-[13px] font-medium">
        <svg class="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google
      </Button>
      <Button variant="outline" class="h-11 gap-2.5 text-[13px] font-medium">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.618-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.028C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.11 13.11 0 01-1.872-.892.077.077 0 01-.008-.128c.125-.094.25-.192.372-.292a.074.074 0 01.078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.1.247.198.373.292a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.892.076.076 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 00-.031-.03z"/></svg>
        Discord
      </Button>
    </div>

    <div class="relative my-6">
      <Separator />
      <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">yoki</span>
    </div>

    <form @submit.prevent="handleSignup" class="space-y-4">
      <!-- Username -->
      <div class="space-y-2">
        <Label for="username">Gamer nomi</Label>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
          <Input id="username" v-model="form.username" type="text" placeholder="ProGamer_2026" class="pl-10 h-11" required autocomplete="username" />
        </div>
      </div>

      <!-- Email -->
      <div class="space-y-2">
        <Label for="email">Email</Label>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <Input id="email" v-model="form.email" type="email" placeholder="gamer@jamoa.uz" class="pl-10 h-11" required autocomplete="email" />
        </div>
      </div>

      <!-- Password -->
      <div class="space-y-2">
        <Label for="password">Parol</Label>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <Input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Kuchli parol yarating" class="pl-10 pr-10 h-11" required autocomplete="new-password" />
          <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" @click="showPassword = !showPassword">
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" x2="23" y1="1" y2="23"/></svg>
          </button>
        </div>
        <div v-if="form.password" class="space-y-1.5">
          <div class="flex gap-1">
            <div v-for="i in 5" :key="i" class="h-1 flex-1 rounded-full transition-all duration-500" :class="i <= strength.score ? strength.color : 'bg-muted'" />
          </div>
          <p class="text-[11px] text-muted-foreground">{{ strength.label }}</p>
        </div>
      </div>

      <!-- Confirm -->
      <div class="space-y-2">
        <Label for="confirm">Parolni tasdiqlang</Label>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
          <Input id="confirm" v-model="form.confirmPassword" :type="showConfirm ? 'text' : 'password'" placeholder="Parolni qayta kiriting" class="pl-10 pr-10 h-11" required autocomplete="new-password" />
          <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" @click="showConfirm = !showConfirm">
            <svg v-if="!showConfirm" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" x2="23" y1="1" y2="23"/></svg>
          </button>
        </div>
        <p v-if="mismatched" class="text-[11px] text-red-400">Parollar mos kelmayapti</p>
        <p v-if="matched" class="text-[11px] text-emerald-400 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Parollar mos keldi
        </p>
      </div>

      <!-- Terms -->
      <div class="flex items-start gap-2 pt-1">
        <Checkbox id="terms" v-model="form.agreeTerms" class="mt-0.5" />
        <Label for="terms" class="text-sm text-muted-foreground font-normal leading-relaxed cursor-pointer">
          <NuxtLink to="#" class="text-violet-400 hover:text-violet-300">Foydalanish shartlari</NuxtLink>
          va
          <NuxtLink to="#" class="text-violet-400 hover:text-violet-300">Maxfiylik siyosati</NuxtLink>ga roziman
        </Label>
      </div>

      <Button type="submit" size="lg" class="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white font-semibold" :disabled="isLoading || !form.agreeTerms">
        <svg v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
        {{ isLoading ? "Yaratilmoqda..." : "Hisob yaratish" }}
      </Button>
    </form>

    <p class="text-center text-sm text-muted-foreground mt-6">
      Hisobingiz bormi?
      <NuxtLink to="/auth/login" class="text-violet-400 hover:text-violet-300 font-medium transition-colors ml-1">Tizimga kiring</NuxtLink>
    </p>
  </div>
</template>