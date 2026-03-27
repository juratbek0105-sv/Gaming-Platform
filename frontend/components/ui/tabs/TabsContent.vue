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
  <div
    v-if="tabs.activeTab.value === value"
    :class="cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      props.class,
    )"
  >
    <slot />
  </div>
</template>