<script setup lang="ts">
const modelValue = defineModel<boolean>()
const emit = defineEmits(['created'])

const { post: apiPost } = useApi()
const { success, error } = useToast()
const auth = useAuth()

const content = ref('')
const images = ref<string[]>([])
const isSubmitting = ref(false)

const handleCreate = async () => {
  if (!content.value.trim()) return
  isSubmitting.value = true
  
  try {
    await apiPost('/posts', {
      content: content.value,
      image: images.value[0] || null
    })
    success("Post muvaffaqiyatli yaratildi! ✨")
    content.value = ''
    images.value = []
    modelValue.value = false
    emit('created')
  } catch (err) {
    error("Post yaratishda xatolik yuz berdi")
  } finally {
    isSubmitting.value = false
  }
}

const onImageUploaded = (url: string) => {
  images.value = [url]
}
</script>

<template>
  <Modal v-model="modelValue" title="Yangi post yaratish">
    <div class="space-y-4">
      <div class="flex gap-3">
        <UserAvatar v-if="auth.user.value" :name="auth.user.value.name || auth.user.value.username" size="md" />
        <div class="flex-1">
          <textarea
            v-model="content"
            placeholder="Nimalar yangiliklar, gamer?"
            class="w-full min-h-[120px] bg-transparent text-foreground placeholder:text-muted-foreground/50 border-none focus:ring-0 resize-none text-base"
          />
        </div>
      </div>

      <!-- Image Preview -->
      <div v-if="images.length > 0" class="relative group rounded-xl overflow-hidden border border-border">
        <img :src="images[0]" class="w-full h-48 object-cover" />
        <button
          class="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          @click="images = []"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <!-- Footer Actions -->
      <div class="flex items-center justify-between pt-4 border-t border-border">
        <div class="flex gap-1">
           <ImageUpload :auto-upload="true" @uploaded="onImageUploaded">
             <template #trigger>
               <button class="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
               </button>
             </template>
           </ImageUpload>
        </div>

        <button
          class="px-6 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
          :disabled="!content.trim() || isSubmitting"
          @click="handleCreate"
        >
          {{ isSubmitting ? 'Yaratilmoqda...' : 'Ulashish' }}
        </button>
      </div>
    </div>
  </Modal>
</template>
