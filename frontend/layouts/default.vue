<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: 'Feed', to: '/' },
  { label: 'Guruhlar', to: '/groups' },
  { label: 'Turnirlar', to: '/tournaments' },
]

const sidebarLinks = [
  { label: 'Feed', icon: 'feed', to: '/' },
  { label: 'Guruhlar', icon: 'group', to: '/groups' },
  { label: 'Turnirlar', icon: 'tournament', to: '/tournaments' },
  { label: 'Xabarlar', icon: 'message', to: '/messages' },
  { label: 'Bildirishnomalar', icon: 'bell', to: '/notifications' },
  { label: 'Saqlangan', icon: 'bookmark', to: '/saved' },
]

const isActive = (path: string) => route.path === path

const user = reactive({
  name: 'Aziz Bekmurodov',
  username: '@azizbeco',
  avatar: 'A',
  role: 'Pro Gamer',
})
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <!-- Left Sidebar -->
    <aside class="hidden lg:flex flex-col w-[260px] shrink-0 bg-sidebar border-r border-border h-screen sticky top-0">
      <!-- Logo -->
      <div class="h-14 flex items-center px-5">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="6" x2="10" y1="11" y2="11" /><line x1="8" x2="8" y1="9" y2="13" />
              <line x1="15" x2="15.01" y1="12" y2="12" /><line x1="18" x2="18.01" y1="10" y2="10" />
              <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
            </svg>
          </div>
          <span class="font-display text-base font-bold tracking-wide text-foreground">JAMOA</span>
        </NuxtLink>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        <NuxtLink
          v-for="link in sidebarLinks"
          :key="link.to + link.label"
          :to="link.to"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="isActive(link.to) && (link.label === 'Feed' || link.to !== '/') ? 'bg-violet-500/10 text-violet-400' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'"
        >
          <svg v-if="link.icon === 'feed'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <svg v-if="link.icon === 'group'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <svg v-if="link.icon === 'tournament'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          <svg v-if="link.icon === 'message'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
          <svg v-if="link.icon === 'bell'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          <svg v-if="link.icon === 'bookmark'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          {{ link.label }}
        </NuxtLink>

        <!-- Divider -->
        <div class="h-px bg-border my-3 mx-1"></div>

        <!-- Trends -->
        <p class="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Trendlar</p>
        <div class="px-3 py-1.5 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
          <p class="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">#Valorant_Championship</p>
          <p class="text-[11px] text-muted-foreground/50 mt-0.5">1.2K post</p>
        </div>
        <div class="px-3 py-1.5 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
          <p class="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">#CS2_Major_2026</p>
          <p class="text-[11px] text-muted-foreground/50 mt-0.5">856 post</p>
        </div>
        <div class="px-3 py-1.5 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
          <p class="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">#Mobile_Legends_Cup</p>
          <p class="text-[11px] text-muted-foreground/50 mt-0.5">643 post</p>
        </div>

        <!-- Divider -->
        <div class="h-px bg-border my-3 mx-1"></div>

        <!-- Suggested -->
        <p class="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Tavsiya etilgan</p>
        <NuxtLink to="/profile/jasur_pro" class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors group">
          <div class="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-[10px] font-semibold">J</div>
          <div class="flex-1 min-w-0">
            <p class="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate">Jasur Pro</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/profile/sardor_gg" class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors group">
          <div class="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-[10px] font-semibold">S</div>
          <div class="flex-1 min-w-0">
            <p class="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate">Sardor GG</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/profile/diyor_rush" class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors group">
          <div class="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-[10px] font-semibold">D</div>
          <div class="flex-1 min-w-0">
            <p class="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate">Diyor Rush</p>
          </div>
        </NuxtLink>
      </nav>

      <!-- User bottom -->
      <div class="px-3 py-3 border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger class="w-full">
            <div class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
                {{ user.avatar }}
              </div>
              <div class="flex-1 min-w-0 text-left">
                <p class="text-[13px] font-medium text-foreground truncate">{{ user.name }}</p>
                <p class="text-[11px] text-muted-foreground">{{ user.username }}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground shrink-0"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" class="min-w-[200px]">
            <DropdownMenuItem @click="$router.push('/profile')">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem @click="$router.push('/settings')">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              Sozlamalar
            </DropdownMenuItem>
            <DropdownMenuItem @click="$router.push('/saved')">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
              Saqlangan
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem :destructive="true" @click="$router.push('/auth/login')">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              Chiqish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>

    <!-- Main Area -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Header -->
      <header class="sticky top-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur-xl flex items-center px-6">
        <!-- Center nav tabs -->
        <nav class="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
            :class="isActive(item.to) ? 'bg-violet-500/10 text-violet-400' : 'text-muted-foreground hover:text-foreground'"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Right actions -->
        <div class="flex items-center gap-1.5 ml-auto">
          <button class="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <button class="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <button class="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
          </button>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 max-w-[640px] w-full mx-auto px-6 py-6">
        <slot />
      </main>
    </div>
  </div>
</template>