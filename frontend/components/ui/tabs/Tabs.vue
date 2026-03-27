<script setup lang="ts">
import { type HTMLAttributes, provide, ref, watch } from 'vue'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  modelValue?: string
  defaultValue?: string
}>(), {
  defaultValue: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const activeTab = ref(props.modelValue || props.defaultValue)

watch(() => props.modelValue, (val) => {
  if (val !== undefined) activeTab.value = val
})

const setActiveTab = (val: string) => {
  activeTab.value = val
  emit('update:modelValue', val)
}

provide('tabs', { activeTab, setActiveTab })
</script>

<template>
  <div :class="cn('', props.class)">
    <slot />
  </div>
</template>