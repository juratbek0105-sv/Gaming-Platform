<script setup lang="ts">
import { type HTMLAttributes, inject, type Ref } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  value: string
}>()

const tabs = inject<{
  activeTab: Ref<string>
  setActiveTab: (val: string) => void
}>('tabs')!
</script>

<template>
  <button
    type="button"
    :class="cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      tabs.activeTab.value === value
        ? 'bg-background text-foreground shadow-sm'
        : 'hover:text-foreground/80',
      props.class,
    )"
    @click="tabs.setActiveTab(value)"
  >
    <slot />
  </button>
</template>