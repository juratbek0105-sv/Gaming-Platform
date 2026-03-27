<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const email = ref('')
const isLoading = ref(false)
const isSent = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  setTimeout(() => { isLoading.value = false; isSent.value = true }, 1500)
}
</script>

<template>
  <div>
    <!-- Success -->
    <div v-if="isSent">
      <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      </div>
      <h1 class="text-3xl font-bold tracking-tight text-foreground mb-2">Xabar yuborildi!</h1>
      <p class="text-muted-foreground text-[15px] mb-8">
        <span class="text-violet-400">{{ email }}</span> manziliga tiklash havolasi yuborildi. Pochtangizni tekshiring.
      </p>
      <div class="space-y-3">
        <Button class="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white font-semibold" @click="isSent = false; email = ''">
          Qayta yuborish
        </Button>
        <NuxtLink to="/auth/login">
          <Button variant="ghost" class="w-full h-11 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Loginga qaytish
          </Button>
        </NuxtLink>
      </div>
    </div>

    <!-- Form -->
    <div v-else>
      <div class="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-violet-400"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 9.33-2.5"/></svg>
      </div>
      <h1 class="text-3xl font-bold tracking-tight text-foreground mb-2">Parolni tiklash</h1>
      <p class="text-muted-foreground text-[15px] mb-8">Email manzilingizni kiriting, tiklash havolasini yuboramiz</p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <Input id="email" v-model="email" type="email" placeholder="gamer@jamoa.uz" class="pl-10 h-11" required autocomplete="email" />
          </div>
        </div>

        <Button type="submit" size="lg" class="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white font-semibold" :disabled="isLoading">
          <svg v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          {{ isLoading ? 'Yuborilmoqda...' : 'Tiklash havolasini yuborish' }}
        </Button>
      </form>

      <div class="mt-6">
        <NuxtLink to="/auth/login" class="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-violet-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Loginga qaytish
        </NuxtLink>
      </div>
    </div>
  </div>
</template>