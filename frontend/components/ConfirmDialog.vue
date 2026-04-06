<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: 'Ishonchingiz komilmi?',
  confirmLabel: 'Tasdiqlash',
  cancelLabel: 'Bekor qilish',
  destructive: false,
})
const emit = defineEmits<{
  'update:modelValue': [boolean]
  'confirm': []
}>()
</script>

<template>
  <Modal
    :model-value="modelValue"
    size="sm"
    :title="title"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <p v-if="message" class="text-sm text-muted-foreground leading-relaxed">{{ message }}</p>
    <slot />
    <template #footer>
      <button
        class="px-4 py-2 rounded-lg text-sm font-medium border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        @click="$emit('update:modelValue', false)"
      >
        {{ cancelLabel }}
      </button>
      <button
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="destructive
          ? 'bg-red-600 text-white hover:bg-red-500'
          : 'bg-primary text-primary-foreground hover:bg-primary/90'"
        @click="$emit('confirm'); $emit('update:modelValue', false)"
      >
        {{ confirmLabel }}
      </button>
    </template>
  </Modal>
</template>
