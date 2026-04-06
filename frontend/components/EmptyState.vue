<script setup lang="ts">
interface Props {
  icon?: string
  title: string
  description?: string
  ctaLabel?: string
  ctaAction?: () => void
}
defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div class="w-16 h-16 rounded-2xl bg-accent/50 flex items-center justify-center mb-5">
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-muted-foreground/50">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
        </svg>
      </slot>
    </div>
    <h3 class="text-base font-semibold text-foreground mb-1.5">{{ title }}</h3>
    <p v-if="description" class="text-sm text-muted-foreground max-w-xs leading-relaxed">{{ description }}</p>
    <button
      v-if="ctaLabel"
      class="mt-5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      @click="ctaAction"
    >
      {{ ctaLabel }}
    </button>
  </div>
</template>
