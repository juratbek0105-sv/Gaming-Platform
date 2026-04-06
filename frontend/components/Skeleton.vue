<script setup lang="ts">
interface Props {
  type?: 'post' | 'profile' | 'list' | 'text'
  count?: number
}
withDefaults(defineProps<Props>(), {
  type: 'post',
  count: 3,
})
</script>

<template>
  <!-- Post Skeleton -->
  <div v-if="type === 'post'" class="space-y-3">
    <div v-for="i in count" :key="i" class="rounded-xl border border-border bg-card p-4 space-y-3">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full skeleton-shimmer" />
        <div class="space-y-1.5 flex-1">
          <div class="h-3.5 w-32 rounded skeleton-shimmer" />
          <div class="h-2.5 w-20 rounded skeleton-shimmer" />
        </div>
      </div>
      <div class="space-y-2">
        <div class="h-3 rounded skeleton-shimmer" />
        <div class="h-3 w-4/5 rounded skeleton-shimmer" />
        <div class="h-3 w-3/5 rounded skeleton-shimmer" />
      </div>
      <div class="flex gap-2 pt-1">
        <div class="h-7 w-14 rounded-md skeleton-shimmer" />
        <div class="h-7 w-14 rounded-md skeleton-shimmer" />
      </div>
    </div>
  </div>

  <!-- Profile Skeleton -->
  <div v-else-if="type === 'profile'" class="space-y-6">
    <div class="flex gap-4 items-start">
      <div class="w-20 h-20 rounded-full skeleton-shimmer shrink-0" />
      <div class="flex-1 space-y-2 pt-1">
        <div class="h-5 w-40 rounded skeleton-shimmer" />
        <div class="h-3.5 w-24 rounded skeleton-shimmer" />
        <div class="h-3 w-full rounded skeleton-shimmer mt-3" />
        <div class="h-3 w-3/4 rounded skeleton-shimmer" />
      </div>
    </div>
  </div>

  <!-- List Skeleton -->
  <div v-else-if="type === 'list'" class="space-y-2">
    <div v-for="i in count" :key="i" class="flex items-center gap-3 p-3 rounded-lg">
      <div class="w-10 h-10 rounded-full skeleton-shimmer shrink-0" />
      <div class="flex-1 space-y-1.5">
        <div class="h-3.5 w-32 rounded skeleton-shimmer" />
        <div class="h-3 w-20 rounded skeleton-shimmer" />
      </div>
    </div>
  </div>

  <!-- Text Skeleton -->
  <div v-else class="space-y-2">
    <div v-for="i in count" :key="i" class="h-3 rounded skeleton-shimmer" :style="{ width: i === count ? '60%' : '100%' }" />
  </div>
</template>

<style scoped>
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    hsl(var(--accent) / 0.5) 25%,
    hsl(var(--accent) / 0.8) 50%,
    hsl(var(--accent) / 0.5) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
