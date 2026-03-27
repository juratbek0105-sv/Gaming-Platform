<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const menuRef = ref<HTMLElement>()

const toggle = () => { isOpen.value = !isOpen.value }
const close = () => { isOpen.value = false }

provide('dropdown', { isOpen, toggle, close })

const handleClickOutside = (e: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    close()
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div ref="menuRef" class="relative">
    <slot />
  </div>
</template>