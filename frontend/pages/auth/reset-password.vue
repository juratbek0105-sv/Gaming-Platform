<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const form = reactive({ password: '', confirmPassword: '' })
const showPassword = ref(false)
const showConfirm = ref(false)
const isLoading = ref(false)
const isSuccess = ref(false)

const strength = computed(() => {
  const p = form.password
  if (!p) return { score: 0, label: '', color: '' }
  let s = 0
  if (p.length >= 8) s++; if (/[A-Z]/.test(p)) s++; if (/[0-9]/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++; if (p.length >= 12) s++
  const m: Record<number, { label: string; color: string }> = { 1: { label: 'Juda zaif', color: 'bg-red-500' }, 2: { label: 'Zaif', color: 'bg-orange-500' }, 3: { label: "O'rtacha", color: 'bg-yellow-500' }, 4: { label: 'Yaxshi', color: 'bg-emerald-500' }, 5: { label: 'Kuchli', color: 'bg-emerald-400' } }
  return { score: s, ...(m[s] || { label: '', color: '' }) }
})
const matched = computed(() => form.confirmPassword.length > 0 && form.password === form.confirmPassword)
const mismatched = computed(() => form.confirmPassword.length > 0 && form.password !== form.confirmPassword)

const handleReset = async () => {
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
      <p class="text-muted-foreground text-[15px] mb-8">Yangi parolingiz muvaffaqiyatli o'rnatildi.</p>
      <NuxtLink to="/auth/login">
        <Button class="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white font-semibold">Tizimga kirish</Button>
      </NuxtLink>
    </div>

    <div v-else>
      <div class="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-violet-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
      </div>
      <h1 class="text-3xl font-bold tracking-tight text-foreground mb-2">Yangi parol o'rnatish</h1>
      <p class="text-muted-foreground text-[15px] mb-8">Yangi kuchli parol yarating</p>

      <form @submit.prevent="handleReset" class="space-y-4">
        <div class="space-y-2">
          <Label for="password">Yangi parol</Label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <Input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Kuchli parol yarating" class="pl-10 pr-10 h-11" required autocomplete="new-password" />
            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" x2="23" y1="1" y2="23"/></svg>
            </button>
          </div>
          <div v-if="form.password" class="space-y-1.5">
            <div class="flex gap-1"><div v-for="i in 5" :key="i" class="h-1 flex-1 rounded-full transition-all duration-500" :class="i <= strength.score ? strength.color : 'bg-muted'" /></div>
            <p class="text-[11px] text-muted-foreground">{{ strength.label }}</p>
          </div>
        </div>

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
          <p v-if="matched" class="text-[11px] text-emerald-400 flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Parollar mos keldi</p>
        </div>

        <Button type="submit" size="lg" class="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white font-semibold" :disabled="isLoading || !matched">
          <svg v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          {{ isLoading ? "O'rnatilmoqda..." : "Yangi parolni o'rnatish" }}
        </Button>
      </form>
    </div>
  </div>
</template>