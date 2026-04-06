<script setup lang="ts">
interface Props {
  modelValue: boolean
  size?: 'sm' | 'md' | 'lg' | 'full'
  title?: string
  hideClose?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  hideClose: false,
})
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const close = () => emit('update:modelValue', false)

// Close on Escape
onMounted(() => {
  const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && props.modelValue) close() }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  full: 'max-w-5xl',
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[1000] flex items-center justify-center p-4"
        @click.self="close"
      >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close" />
        <!-- Panel -->
        <div
          class="relative w-full rounded-2xl border border-border bg-card shadow-2xl"
          :class="sizeMap[size]"
        >
          <!-- Header -->
          <div v-if="title || !hideClose" class="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 v-if="title" class="text-base font-semibold text-foreground">{{ title }}</h2>
            <button
              v-if="!hideClose"
              class="ml-auto w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              @click="close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <!-- Body -->
          <div class="px-6 py-5">
            <slot />
          </div>
          <!-- Footer -->
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-border flex items-center justify-end gap-2">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from :deep(.relative),
.modal-leave-to :deep(.relative) {
  transform: scale(0.95);
}
</style>
