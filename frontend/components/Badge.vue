<script setup lang="ts">
interface Props {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'valorant' | 'cs2' | 'pubg'
  size?: 'sm' | 'md'
}
withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm',
})

const variantMap = {
  default: 'bg-violet-500/15 text-violet-400 border border-violet-500/20',
  success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  danger: 'bg-red-500/15 text-red-400 border border-red-500/20',
  info: 'bg-sky-500/15 text-sky-400 border border-sky-500/20',
  valorant: 'bg-red-500/15 text-red-400 border border-red-500/20',
  cs2: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  pubg: 'bg-orange-500/15 text-orange-400 border border-orange-500/20',
}

const sizeMap = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-md font-medium"
    :class="[variantMap[variant], sizeMap[size]]"
  >
    <slot />
  </span>
</template>
