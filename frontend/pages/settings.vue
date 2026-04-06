<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { get, put } = useApi()
const { success, error: toastError } = useToast()
const auth = useAuth()

const activeSection = ref('profile')
const isLoading = ref(true)
const showDeleteConfirm = ref(false)

const profile = reactive({
  name: '',
  bio: '',
  avatar: '',
  banner: '',
  location: '',
  team: '',
  role: '',
})

const fetchProfile = async () => {
  try {
    isLoading.value = true
    const data: any = await get('/users/profile')
    Object.assign(profile, {
      name: data.name || '',
      bio: data.bio || '',
      avatar: data.avatar || '',
      banner: data.banner || '',
      location: data.location || '',
      team: data.team || '',
      role: data.role || '',
    })
  } catch (err) {
    console.error('Profilni yuklashda xatolik:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchProfile)

const saveProfile = async () => {
  try {
    await put('/users/profile', profile)
    success("Profil muvaffaqiyatli saqlandi! ✨")
    // Update global auth user if needed
    if (auth.user.value) {
      auth.user.value.name = profile.name
      auth.user.value.avatar = profile.avatar
    }
  } catch (err) {
    toastError("Xatolik yuz berdi")
  }
}

const onAvatarUploaded = (url: string) => {
  profile.avatar = url
}

const onBannerUploaded = (url: string) => {
  profile.banner = url
}

const sections = [
  { key: 'profile', label: 'Profil', icon: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/>' },
  { key: 'account', label: 'Akkaunt', icon: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>' },
  { key: 'danger', label: "Akkaunt o'chirish", icon: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>' },
]
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-6 min-h-[calc(100vh-8rem)]">
    <!-- Left menu -->
    <div class="hidden sm:flex flex-col gap-1 w-52 shrink-0">
      <button
        v-for="s in sections"
        :key="s.key"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
        :class="[
          activeSection === s.key ? 'bg-violet-500/10 text-violet-400' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
          s.key === 'danger' ? 'mt-4 text-red-400 hover:bg-red-500/10 hover:text-red-400' : ''
        ]"
        @click="activeSection = s.key"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="s.icon" />
        {{ s.label }}
      </button>
    </div>

    <!-- Content panel -->
    <div class="flex-1 min-w-0">
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Profile Section -->
      <div v-else-if="activeSection === 'profile'" class="space-y-6">
        <h2 class="text-base font-semibold text-foreground">Profil sozlamalari</h2>
        
        <div class="space-y-6">
          <!-- Banner Upload -->
          <div class="space-y-2">
            <label class="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">Banner</label>
            <ImageUpload v-model="profile.banner" :auto-upload="true" @uploaded="onBannerUploaded" accept="image/*" :max-size="5" />
          </div>

          <!-- Avatar Upload -->
          <div class="space-y-2">
            <label class="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">Avatar</label>
            <div class="flex items-center gap-4">
              <UserAvatar :name="profile.name || 'User'" :avatar="profile.avatar" size="lg" />
              <div class="flex-1">
                <ImageUpload :auto-upload="true" @uploaded="onAvatarUploaded" accept="image/*" :max-size="2" />
              </div>
            </div>
          </div>

          <div class="bg-card border border-border rounded-xl p-5 space-y-4">
            <div>
              <label class="text-xs font-medium text-muted-foreground mb-1.5 block">Ism va Familiya</label>
              <input v-model="profile.name" class="w-full bg-accent/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-border" />
            </div>
            <div>
              <label class="text-xs font-medium text-muted-foreground mb-1.5 block">Bio</label>
              <textarea v-model="profile.bio" rows="3" class="w-full bg-accent/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-border resize-none" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-medium text-muted-foreground mb-1.5 block">Joylashuv</label>
                <input v-model="profile.location" class="w-full bg-accent/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-border" />
              </div>
              <div>
                <label class="text-xs font-medium text-muted-foreground mb-1.5 block">Jamoa nomi</label>
                <input v-model="profile.team" class="w-full bg-accent/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-border" />
              </div>
            </div>
            <div>
              <label class="text-xs font-medium text-muted-foreground mb-1.5 block">Rol</label>
              <input v-model="profile.role" class="w-full bg-accent/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-border" />
            </div>
            <button class="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20" @click="saveProfile">
              Saqlash
            </button>
          </div>
        </div>
      </div>

      <!-- Danger Zone -->
      <div v-else-if="activeSection === 'danger'" class="space-y-6">
        <h2 class="text-base font-semibold text-red-400">Xavfli zona</h2>
        <div class="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
          <h3 class="text-sm font-semibold text-red-400 mb-1">Akkauntni o'chirish</h3>
          <p class="text-xs text-muted-foreground mb-4">Bu amal qaytarib bo'lmaydi. Barcha ma'lumotlaringiz o'chib ketadi.</p>
          <button
            class="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-500 transition-colors"
            @click="showDeleteConfirm = true"
          >
            Akkauntni o'chirish
          </button>
        </div>
      </div>
    </div>

    <ConfirmDialog
      v-model="showDeleteConfirm"
      title="Akkauntni o'chirasizmi?"
      message="Bu amal qaytarib bo'lmaydi. Barcha postlar, kuzatuvchilar va ma'lumotlar o'chib ketadi."
      confirm-label="Ha, o'chirish"
      :destructive="true"
    />

    <Toast />
  </div>
</template>
