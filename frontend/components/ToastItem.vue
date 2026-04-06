<script setup lang="ts">
import type { Toast } from '~/composables/useToast'

interface Props {
  toast: Toast
}
defineProps<Props>()

const { remove } = useToast()

const icons = {
  success: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`,
  error: `<circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/>`,
  warning: `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>`,
  info: `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>`,
}

const colorMap = {
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  error: 'border-red-500/30 bg-red-500/10 text-red-400',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  info: 'border-sky-500/30 bg-sky-500/10 text-sky-400',
}
</script>

<template>
  <div
    class="flex items-start gap-3 w-full max-w-sm rounded-xl border bg-card/90 backdrop-blur-sm p-4 shadow-xl animate-in slide-in-from-right-5 fade-in-0 duration-300"
    :class="colorMap[toast.type]"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0 mt-0.5" v-html="icons[toast.type]" />
    <p class="flex-1 text-sm text-foreground leading-snug">{{ toast.message }}</p>
    <button
      class="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
      @click="remove(toast.id)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  </div>
</template>
