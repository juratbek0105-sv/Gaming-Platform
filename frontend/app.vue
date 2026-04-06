<script setup lang="ts">
const { fetchMe } = useAuth()
onMounted(fetchMe)
</script>

<template>
  <NuxtLayout>
    <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
    <Toast />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>