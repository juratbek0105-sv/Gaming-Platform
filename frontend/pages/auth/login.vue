<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const showPassword = ref(false)
const isLoading = ref(false)
const isSuccess = ref(false)
const touched = reactive({ email: false, password: false })

const errors = computed(() => ({
  email: touched.email && !isValidEmail(form.email) ? 'To\'g\'ri email manzil kiriting' : '',
  password: touched.password && form.password.length < 6 ? 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak' : '',
}))

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
const isValid = computed(() => isValidEmail(form.email) && form.password.length >= 6)

const router = useRouter()
const { login } = useAuth()
const handleLogin = async () => {
  touched.email = true
  touched.password = true
  if (!isValid.value) return
  isLoading.value = true
  
  try {
    await login({ email: form.email, password: form.password })
    isSuccess.value = true
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (err: any) {
    alert(err.data?.message || 'Kirishda xatolik yuz berdi')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight text-foreground">Kirish</h1>
      <p class="text-muted-foreground mt-2 text-[15px]">O'yin olamiga kirish uchun hisobingizga kiring</p>
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
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="#5865F2">
          <path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.618-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.028C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.11 13.11 0 01-1.872-.892.077.077 0 01-.008-.128c.125-.094.25-.192.372-.292a.074.074 0 01.078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.1.247.198.373.292a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.892.076.076 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 00-.031-.03z"/>
        </svg>
        Discord
      </Button>
    </div>

    <!-- Divider -->
    <div class="relative my-6">
      <Separator />
      <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">yoki</span>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleLogin" class="space-y-4">
      <!-- Email -->
      <div class="space-y-1.5">
        <Label for="email">Email</Label>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="gamer@jamoa.uz"
            class="pl-10 h-11"
            :class="errors.email ? 'border-red-500/50 focus:ring-red-500/30' : ''"
            autocomplete="email"
            @blur="touched.email = true"
          />
        </div>
        <p v-if="errors.email" class="text-xs text-red-400 mt-0.5 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          {{ errors.email }}
        </p>
      </div>

      <!-- Password -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between">
          <Label for="password">Parol</Label>
          <NuxtLink to="/auth/forgot-password" class="text-xs text-violet-400 hover:text-violet-300 transition-colors">
            Parolni unutdingizmi?
          </NuxtLink>
        </div>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <Input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="pl-10 pr-10 h-11"
            :class="errors.password ? 'border-red-500/50 focus:ring-red-500/30' : ''"
            autocomplete="current-password"
            @blur="touched.password = true"
          />
          <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" @click="showPassword = !showPassword">
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" x2="23" y1="1" y2="23"/></svg>
          </button>
        </div>
        <p v-if="errors.password" class="text-xs text-red-400 mt-0.5 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          {{ errors.password }}
        </p>
      </div>

      <!-- Remember -->
      <div class="flex items-center gap-2">
        <Checkbox id="remember" v-model="form.remember" />
        <Label for="remember" class="text-sm text-muted-foreground font-normal cursor-pointer">Meni eslab qol</Label>
      </div>

      <!-- Submit -->
      <Button
        type="submit"
        size="lg"
        class="w-full h-11 transition-all"
        :class="isSuccess ? 'bg-emerald-500 hover:bg-emerald-500' : 'bg-violet-600 hover:bg-violet-500'"
        :disabled="isLoading || isSuccess"
      >
        <template v-if="isLoading">
          <svg class="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          Kirish...
        </template>
        <template v-else-if="isSuccess">
          <svg class="w-5 h-5 mr-2 animate-in zoom-in duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          Muvaffaqiyatli!
        </template>
        <template v-else>
          Kirish
        </template>
      </Button>
    </form>

    <!-- Sign up -->
    <p class="text-center text-sm text-muted-foreground mt-6">
      Hisobingiz yo'qmi?
      <NuxtLink to="/auth/signup" class="text-violet-400 hover:text-violet-300 font-medium transition-colors ml-1">Ro'yxatdan o'ting</NuxtLink>
    </p>
  </div>
</template>