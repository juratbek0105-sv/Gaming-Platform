<script setup lang="ts">
interface Props {
  name: string
  avatar?: string | null
  gradient?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  online?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  gradient: 'from-violet-500 to-indigo-500',
  size: 'md',
  online: false,
})

const sizeMap = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-12 h-12 text-sm',
  xl: 'w-20 h-20 text-2xl',
}

const dotSizeMap = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
}

const initial = computed(() => props.name?.charAt(0)?.toUpperCase() || '?')
</script>

<template>
  <div class="relative inline-block shrink-0">
    <div
      v-if="avatar"
      class="rounded-full bg-cover bg-center"
      :class="sizeMap[size]"
      :style="{ backgroundImage: `url(${avatar})` }"
    />
    <div
      v-else
      class="rounded-full bg-gradient-to-br flex items-center justify-center text-white font-semibold"
      :class="[sizeMap[size], gradient]"
    >
      {{ initial }}
    </div>
    <span
      v-if="online"
      class="absolute bottom-0 right-0 rounded-full bg-emerald-400 ring-2 ring-background"
      :class="dotSizeMap[size]"
    />
  </div>
</template>
