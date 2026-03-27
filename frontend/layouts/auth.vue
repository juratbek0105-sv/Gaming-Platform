<template>
  <div class="min-h-screen flex bg-background">
    <!-- Left: Sidebar Image -->
    <div class="hidden lg:flex lg:w-[55%] xl:w-[50%] relative overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950" />

      <!-- Pattern overlay -->
      <div class="absolute inset-0 opacity-[0.04]" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 40px 40px;" />

      <!-- Gradient orbs -->
      <div class="absolute top-[15%] right-[10%] w-[350px] h-[350px] rounded-full bg-violet-600/20 blur-[120px]" />
      <div class="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] rounded-full bg-indigo-600/15 blur-[100px]" />
      <div class="absolute top-[60%] right-[30%] w-[200px] h-[200px] rounded-full bg-fuchsia-600/10 blur-[80px]" />

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
        <!-- Top badges -->
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.08] text-white/70 backdrop-blur-sm border border-white/[0.06]">
            Turnirlar
          </span>
          <span class="px-3 py-1.5 rounded-full text-[11px] font-medium bg-violet-500/20 text-violet-300 backdrop-blur-sm border border-violet-500/20">
            Jamoalar
          </span>
          <span class="px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.08] text-white/70 backdrop-blur-sm border border-white/[0.06]">
            Reyting
          </span>
        </div>

        <!-- Center illustration -->
        <div class="flex-1 flex items-center justify-center py-10">
          <div class="relative w-full max-w-[380px]">
            <!-- Gaming controller card -->
            <div class="relative bg-white/[0.05] backdrop-blur-md border border-white/[0.08] rounded-3xl p-10 text-center">
              <!-- Controller icon -->
              <div class="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-900/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="6" x2="10" y1="11" y2="11" /><line x1="8" x2="8" y1="9" y2="13" />
                  <line x1="15" x2="15.01" y1="12" y2="12" /><line x1="18" x2="18.01" y1="10" y2="10" />
                  <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
                </svg>
              </div>

              <h2 class="text-white text-2xl font-bold mb-3">O'yin olamiga xush kelibsiz</h2>
              <p class="text-white/40 text-sm leading-relaxed mb-8">
                Jamoangizni tuzing, turnirda qatnashing va eng yaxshi gamerlar bilan raqobatlashing
              </p>

              <!-- Stats -->
              <div class="grid grid-cols-3 gap-4">
                <div class="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                  <p class="text-2xl font-bold text-white">2K+</p>
                  <p class="text-[11px] text-white/40 mt-0.5">Gamerlar</p>
                </div>
                <div class="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                  <p class="text-2xl font-bold text-violet-400">150+</p>
                  <p class="text-[11px] text-white/40 mt-0.5">Jamoalar</p>
                </div>
                <div class="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                  <p class="text-2xl font-bold text-indigo-400">50+</p>
                  <p class="text-[11px] text-white/40 mt-0.5">Turnirlar</p>
                </div>
              </div>
            </div>

            <!-- Floating elements -->
            <div class="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-fuchsia-500/30 to-violet-500/30 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center animate-bounce" style="animation-duration: 3s;">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" class="opacity-80"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <div class="absolute -bottom-3 -left-3 w-16 h-16 bg-gradient-to-br from-indigo-500/30 to-blue-500/30 rounded-xl backdrop-blur-sm border border-white/10 flex items-center justify-center animate-bounce" style="animation-duration: 4s; animation-delay: 0.5s;">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" class="opacity-80"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </div>
          </div>
        </div>

        <!-- Bottom testimonial -->
        <div class="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5">
          <p class="text-white/60 text-sm leading-relaxed italic">
            "Jamoa platformasi orqali jamoamizni topdik va birinchi turnirda g'olib bo'ldik!"
          </p>
          <div class="flex items-center gap-3 mt-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">A</div>
            <div>
              <p class="text-white/80 text-xs font-medium">Aziz Bekmurodov</p>
              <p class="text-white/30 text-[11px]">Pro Gamer, Team Phoenix</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Form -->
    <div class="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 xl:px-28">
      <div class="w-full max-w-[420px] mx-auto">
        <!-- Logo -->
        <NuxtLink to="/" class="inline-flex items-center gap-3 mb-10 group">
          <div class="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center group-hover:bg-violet-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="6" x2="10" y1="11" y2="11" /><line x1="8" x2="8" y1="9" y2="13" />
              <line x1="15" x2="15.01" y1="12" y2="12" /><line x1="18" x2="18.01" y1="10" y2="10" />
              <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
            </svg>
          </div>
          <span class="font-display text-xl font-bold tracking-wide text-white">JAMOA</span>
        </NuxtLink>

        <slot />
      </div>
    </div>
  </div>
</template>