<script setup lang="ts">
import { inject, type Ref } from 'vue'

const dropdown = inject<{ isOpen: Ref<boolean>; toggle: () => void }>('dropdown')!
</script>

<template>
  <div @click="dropdown.toggle()" class="cursor-pointer">
    <slot />
  </div>
</template>