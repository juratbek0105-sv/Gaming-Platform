<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: string
  align?: 'start' | 'end' | 'center'
}>()

const dropdown = inject<{ isOpen: Ref<boolean>; close: () => void }>('dropdown')!

const alignClass = {
  start: 'left-0',
  end: 'right-0',
  center: 'left-1/2 -translate-x-1/2',
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0 scale-95 translate-y-1"
    enter-to-class="opacity-100 scale-100 translate-y-0"
    leave-active-class="transition duration-100 ease-in"
    leave-from-class="opacity-100 scale-100 translate-y-0"
    leave-to-class="opacity-0 scale-95 translate-y-1"
  >
    <div
      v-if="dropdown.isOpen.value"
      :class="cn(
        'absolute z-50 mt-2 min-w-[200px] rounded-lg border border-border bg-popover p-1 shadow-xl',
        alignClass[props.align || 'end'],
        props.class,
      )"
    >
      <slot />
    </div>
  </Transition>
</template>