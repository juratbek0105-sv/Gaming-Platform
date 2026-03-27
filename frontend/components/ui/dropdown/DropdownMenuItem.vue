<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: string
  destructive?: boolean
}>()

const dropdown = inject<{ close: () => void }>('dropdown')!

const handleClick = () => {
  dropdown.close()
}
</script>

<template>
  <button
    @click="handleClick"
    :class="cn(
      'flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors cursor-pointer',
      destructive
        ? 'text-red-400 hover:bg-destructive/10'
        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
      props.class,
    )"
  >
    <slot />
  </button>
</template>