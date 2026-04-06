<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | null
  id?: string
  label?: string
  accept?: string
  maxSize?: number // in MB
  autoUpload?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'change', 'uploaded'])

const fileInput = ref<HTMLInputElement | null>(null)
const preview = ref<string | null>(props.modelValue || null)
const isDragging = ref(false)
const isUploading = ref(false)
const { error, success } = useToast()
const { post } = useApi()

const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    isUploading.value = true
    const config = useRuntimeConfig()
    const apiBase = (config.public.apiBase as string) || 'http://localhost:5000/api'
    const token = useCookie('auth_token')
    
    // We use native fetch here because $fetch/useApi with FormData can be tricky with multipart headers
    const res = await fetch(`${apiBase}/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`
      },
      body: formData
    })

    if (!res.ok) throw new Error('Yuklashda xatolik')
    
    const data = await res.json()
    const fullUrl = `${config.public.apiBase.replace('/api', '')}${data.url}`
    
    preview.value = fullUrl
    emit('update:modelValue', fullUrl)
    emit('uploaded', fullUrl)
    success("Rasm muvaffaqiyatli yuklandi")
  } catch (err) {
    error("Rasmni yuklashda xatolik yuz berdi")
    console.error(err)
  } finally {
    isUploading.value = false
  }
}

const handleFile = (file: File) => {
  if (props.maxSize && file.size > props.maxSize * 1024 * 1024) {
    error(`Fayl hajmi juda katta. Maksimal ${props.maxSize}MB ruxsat etiladi.`)
    return
  }

  if (props.autoUpload) {
    uploadFile(file)
  } else {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      preview.value = result
      emit('update:modelValue', result)
      emit('change', file)
    }
    reader.readAsDataURL(file)
  }
}

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.[0]) {
    handleFile(target.files[0])
  }
}

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer?.files?.[0]) {
    handleFile(e.dataTransfer.files[0])
  }
}

const clear = () => {
  preview.value = null
  emit('update:modelValue', null)
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" :for="id" class="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
      {{ label }}
    </label>
    
    <div 
      class="group relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all overflow-hidden bg-accent/20 cursor-pointer"
      :class="[
        isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/30 hover:bg-accent/40',
        preview ? 'h-48' : 'h-32',
        isUploading ? 'opacity-50 pointer-events-none' : ''
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
      @click="fileInput?.click()"
    >
      <input 
        ref="fileInput"
        type="file" 
        class="hidden" 
        :accept="accept || 'image/*'"
        @change="onFileChange"
      >
      
      <template v-if="preview">
        <img :src="preview" class="absolute inset-0 w-full h-full object-cover" alt="Preview">
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            type="button"
            class="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all"
            @click.stop="fileInput?.click()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
          </button>
          <button 
            type="button"
            class="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 backdrop-blur-md transition-all"
            @click.stop="clear"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          </button>
        </div>
      </template>
      
      <div v-else-if="isUploading" class="flex flex-col items-center gap-2">
         <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
         <p class="text-xs text-muted-foreground">Yuklanmoqda...</p>
      </div>

      <div v-else class="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors p-4 text-center">
        <div class="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-1 group-hover:bg-primary/20 group-hover:text-primary transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </div>
        <p class="text-[13px] font-medium">Rasm yuklash yoki tashlang</p>
        <p class="text-[11px] opacity-60">Maksimal {{ maxSize || 5 }}MB gacha</p>
      </div>
    </div>
  </div>
</template>
