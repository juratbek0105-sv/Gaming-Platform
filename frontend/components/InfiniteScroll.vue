<script setup lang="ts">
const props = defineProps<{
  loading?: boolean
  disabled?: boolean
  manual?: boolean
}>()

const emit = defineEmits(['load'])
const observerTarget = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (props.manual) return

  observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.isIntersecting && !props.loading && !props.disabled) {
      emit('load')
    }
  }, {
    rootMargin: '100px',
  })

  if (observerTarget.value) {
    observer.observe(observerTarget.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="py-10 flex flex-col items-center justify-center">
    <div ref="observerTarget" class="h-1 w-full" />
    
    <template v-if="loading">
      <div class="flex items-center gap-3 text-muted-foreground">
        <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-sm font-medium">Yuklanmoqda...</span>
      </div>
    </template>
    
    <template v-else-if="disabled">
      <p class="text-sm text-muted-foreground/50 italic">Barcha ma'lumotlar yuklandi</p>
    </template>
    
    <template v-else-if="manual">
      <button 
        class="px-6 py-2 rounded-xl text-sm font-medium bg-accent hover:bg-accent/80 transition-colors"
        @click="emit('load')"
      >
        Yana yuklash
      </button>
    </template>
  </div>
</template>
