<script setup lang="ts">
// 404 page
const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
    <div class="relative mb-8">
      <div class="text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-b from-violet-400 to-violet-600/30 leading-none select-none">
        404
      </div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-24 h-24 rounded-2xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-violet-400">
            <line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/>
            <line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/>
            <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>
          </svg>
        </div>
      </div>
    </div>
    <h1 class="text-2xl font-bold text-foreground mb-2">Sahifa topilmadi</h1>
    <p class="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
      Siz qidirgan sahifa mavjud emas yoki o'chirib tashlangan. Bosh sahifaga qayting.
    </p>
    <div class="flex items-center gap-3">
      <button
        class="px-5 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
        @click="router.push('/')"
      >
        Bosh sahifaga qaytish
      </button>
      <button
        class="px-5 py-2.5 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
        @click="router.back()"
      >
        Orqaga
      </button>
    </div>
  </div>
</template>
