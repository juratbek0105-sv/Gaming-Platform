<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const form = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' })
const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)
const isLoading = ref(false)
const isSuccess = ref(false)

const strength = computed(() => {
  const p = form.newPassword
  if (!p) return { score: 0, label: '', color: '' }
  let s = 0
  if (p.length >= 8) s++; if (/[A-Z]/.test(p)) s++; if (/[0-9]/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++; if (p.length >= 12) s++
  const m: Record<number, { label: string; color: string }> = { 1: { label: 'Juda zaif', color: 'bg-red-500' }, 2: { label: 'Zaif', color: 'bg-orange-500' }, 3: { label: "O'rtacha", color: 'bg-yellow-500' }, 4: { label: 'Yaxshi', color: 'bg-emerald-500' }, 5: { label: 'Kuchli', color: 'bg-emerald-400' } }
  return { score: s, ...(m[s] || { label: '', color: '' }) }
})
const matched = computed(() => form.confirmPassword.length > 0 && form.newPassword === form.confirmPassword)
const mismatched = computed(() => form.confirmPassword.length > 0 && form.newPassword !== form.confirmPassword)

const handleUpdate = async () => {
  isLoading.value = true
  setTimeout(() => { isLoading.value = false; isSuccess.value = true }, 1500)
}
</script>

<template>
  <div>
    <div v-if="isSuccess">
      <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      </div>
      <h1 class="text-3xl font-bold tracking-tight text-foreground mb-2">Parol yangilandi!</h1>
      <p class="text-muted-foreground text-[15px] mb-8">Parolingiz muvaffaqiyatli o'zgartirildi.</p>
      <NuxtLink to="/auth/login">
        <Button class="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white font-semibold">Davom etish</Button>
      </NuxtLink>
    </div>

    <div v-else>
      <div class="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-violet-400"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg>
      </div>
      <h1 class="text-3xl font-bold tracking-tight text-foreground mb-2">Parolni yangilash</h1>
      <p class="text-muted-foreground text-[15px] mb-8">Hisobingiz xavfsizligi uchun parolni o'zgartiring</p>

      <form @submit.prevent="handleUpdate" class="space-y-4">
        <!-- Current -->
        <div class="space-y-2">
          <Label for="current">Joriy parol</Label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <Input id="current" v-model="form.currentPassword" :type="showCurrent ? 'text' : 'password'" placeholder="Joriy parolingiz" class="pl-10 pr-10 h-11" required autocomplete="current-password" />
            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" @click="showCurrent = !showCurrent">
              <svg v-if="!showCurrent" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" x2="23" y1="1" y2="23"/></svg>
            </button>
          </div>
        </div>

        <Separator />

        <!-- New -->
        <div class="space-y-2">
          <Label for="new">Yangi parol</Label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg>
            <Input id="new" v-model="form.newPassword" :type="showNew ? 'text' : 'password'" placeholder="Yangi kuchli parol" class="pl-10 pr-10 h-11" required autocomplete="new-password" />
            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" @click="showNew = !showNew">
              <svg v-if="!showNew" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" x2="23" y1="1" y2="23"/></svg>
            </button>
          </div>
          <div v-if="form.newPassword" class="space-y-1.5">
            <div class="flex gap-1"><div v-for="i in 5" :key="i" class="h-1 flex-1 rounded-full transition-all duration-500" :class="i <= strength.score ? strength.color : 'bg-muted'" /></div>
            <p class="text-[11px] text-muted-foreground">{{ strength.label }}</p>
          </div>
        </div>

        <!-- Confirm -->
        <div class="space-y-2">
          <Label for="confirm">Yangi parolni tasdiqlang</Label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            <Input id="confirm" v-model="form.confirmPassword" :type="showConfirm ? 'text' : 'password'" placeholder="Yangi parolni qayta kiriting" class="pl-10 pr-10 h-11" required autocomplete="new-password" />
            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" @click="showConfirm = !showConfirm">
              <svg v-if="!showConfirm" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" x2="23" y1="1" y2="23"/></svg>
            </button>
          </div>
          <p v-if="mismatched" class="text-[11px] text-red-400">Parollar mos kelmayapti</p>
          <p v-if="matched" class="text-[11px] text-emerald-400 flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Parollar mos keldi</p>
        </div>

        <Button type="submit" size="lg" class="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white font-semibold" :disabled="isLoading || !matched || !form.currentPassword">
          <svg v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          {{ isLoading ? 'Yangilanmoqda...' : 'Parolni yangilash' }}
        </Button>
      </form>

      <div class="mt-6">
        <NuxtLink to="/auth/login" class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-violet-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Orqaga qaytish
        </NuxtLink>
      </div>
    </div>
  </div>
</template>