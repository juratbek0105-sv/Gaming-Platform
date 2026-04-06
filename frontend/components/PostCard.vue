<script setup lang="ts">
const { post: initialPost } = defineProps<{ post: any }>()
const emit = defineEmits(['updated'])

const { post: apiPost, get } = useApi()
const { success, error } = useToast()
const auth = useAuth()

const post = ref({ ...initialPost })
const showComments = ref(false)
const newComment = ref('')
const commentsList = ref<any[]>([])
const isCommentsLoading = ref(false)
const likeAnimating = ref(false)

const handleLike = async () => {
  if (!auth.isAuthenticated.value) return navigateTo('/auth/login')
  
  try {
    likeAnimating.value = true
    const res: any = await apiPost(`/posts/${post.value.id}/like`, {})
    post.value.isLiked = res.liked
    post.value.likes += res.liked ? 1 : -1
    setTimeout(() => likeAnimating.value = false, 400)
  } catch (err) {
    error("Like bosishda xatolik")
  }
}

const fetchComments = async () => {
  if (commentsList.value.length > 0 || !showComments.value) return
  
  try {
    isCommentsLoading.value = true
    // Note: We need a backend route for this, let's assume it's part of post or separate
    // For now we just implement the addComment part as requested
  } finally {
    isCommentsLoading.value = false
  }
}

const addComment = async () => {
  if (!auth.isAuthenticated.value) return navigateTo('/auth/login')
  if (!newComment.value.trim()) return

  try {
    const res: any = await apiPost(`/posts/${post.value.id}/comment`, { content: newComment.value })
    commentsList.value.unshift({
      ...res,
      user: {
        name: res.author.name || res.author.username,
        username: `@${res.author.username}`,
        avatar: res.author.avatar
      }
    })
    post.value.comments++
    newComment.value = ''
    success("Izoh qo'shildi")
  } catch (err) {
    error("Izoh qoldirishda xatolik")
  }
}

const copyLink = () => {
  navigator.clipboard.writeText(`${window.location.origin}/post/${post.value.id}`)
  success('Havola nusxalandi!')
}
</script>

<template>
  <div class="rounded-xl border border-border bg-card p-4 hover:border-border/80 transition-colors">
    <!-- Post Header -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-2.5">
        <NuxtLink :to="`/profile/${post.user.username.replace('@', '')}`">
          <UserAvatar
            :name="post.user.name"
            :avatar="post.user.avatar"
            size="md"
          />
        </NuxtLink>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <NuxtLink
              :to="`/profile/${post.user.username.replace('@', '')}`"
              class="text-sm font-medium text-foreground hover:underline"
            >
              {{ post.user.name }}
            </NuxtLink>
          </div>
          <p class="text-[11px] text-muted-foreground">{{ post.user.username }} · {{ post.time }}</p>
        </div>
      </div>
    </div>

    <!-- Post Content -->
    <p class="text-sm text-foreground/80 leading-relaxed whitespace-pre-line mb-3">{{ post.content }}</p>

    <!-- Post Image -->
    <div v-if="post.image" class="mb-3 rounded-lg overflow-hidden border border-border">
      <img :src="post.image" class="w-full max-h-96 object-cover" alt="Post rasmi" />
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between pt-2 border-t border-border/50">
      <div class="flex items-center gap-0.5">
        <!-- Like -->
        <button
          class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all"
          :class="post.isLiked ? 'text-rose-400 bg-rose-500/10' : 'text-muted-foreground hover:text-foreground hover:bg-accent'"
          @click="handleLike"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            :fill="post.isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2"
            class="transition-transform"
            :class="likeAnimating ? 'scale-125' : 'scale-100'"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          {{ post.likes }}
        </button>

        <!-- Comment -->
        <button
          class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors"
          :class="showComments ? 'text-sky-400 bg-sky-500/10' : 'text-muted-foreground hover:text-foreground hover:bg-accent'"
          @click="showComments = !showComments; fetchComments()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
          {{ post.comments }}
        </button>

        <!-- Share -->
        <button
          class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          @click="copyLink"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
        </button>
      </div>
    </div>

    <!-- Comments Section -->
    <Transition name="comments">
      <div v-if="showComments" class="mt-3 pt-3 border-t border-border/50 space-y-3">
        <!-- Write comment -->
        <div class="flex gap-2">
          <UserAvatar v-if="auth.user.value" :name="auth.user.value.name || auth.user.value.username" size="sm" />
          <UserAvatar v-else name="?" size="sm" />
          <div class="flex-1 flex gap-2">
            <input
              v-model="newComment"
              placeholder="Izoh yozing..."
              class="flex-1 bg-accent/50 rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-border"
              @keydown.enter="addComment"
            />
            <button
              class="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 transition-colors shrink-0"
              :disabled="!newComment.trim()"
              @click="addComment"
            >
              Yuborish
            </button>
          </div>
        </div>

        <!-- Comments list -->
        <div v-if="commentsList.length > 0" class="space-y-2.5">
          <div v-for="c in commentsList" :key="c.id" class="flex gap-2">
            <UserAvatar :name="c.user.name" size="sm" />
            <div class="flex-1 bg-accent/30 rounded-lg px-3 py-2">
              <div class="flex items-center justify-between mb-0.5">
                <span class="text-xs font-medium text-foreground">{{ c.user.name }}</span>
              </div>
              <p class="text-xs text-foreground/70 leading-snug">{{ c.content }}</p>
            </div>
          </div>
        </div>
        <div v-else-if="isCommentsLoading" class="text-center py-2">
           <div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.comments-enter-active,
.comments-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.comments-enter-from,
.comments-leave-to {
  opacity: 0;
  max-height: 0;
}
.comments-enter-to,
.comments-leave-from {
  max-height: 500px;
}
</style>
