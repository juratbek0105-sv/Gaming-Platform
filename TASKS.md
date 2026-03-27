# JAMOA — Barcha Ishlar Ro'yxati

> Loyihaning hozirgi holati: UI prototip tayyor, backend yo'q, barcha ma'lumotlar mock (soxta).
> Quyida frontend tomondan qilinishi kerak bo'lgan BARCHA ishlar keltirilgan.

---

## 1. AUTENTIFIKATSIYA TIZIMI

### 1.1 Login sahifasi (`pages/auth/login.vue`)
- [ ] Haqiqiy API ga so'rov yuborish (email + password)
- [ ] JWT tokenni qabul qilib, cookie/localStorage ga saqlash
- [ ] Login xatolarini ko'rsatish (noto'g'ri email/parol)
- [ ] Email format validatsiyasi qo'shish
- [ ] Google OAuth integratsiyasi (hozir tugma bor, ishlamaydi)
- [ ] Discord OAuth integratsiyasi (hozir tugma bor, ishlamaydi)
- [ ] "Meni eslab qol" (Remember me) funksionalini ishga tushirish
- [ ] Login qilgandan keyin oldingi sahifaga qaytarish (redirect)

### 1.2 Signup sahifasi (`pages/auth/signup.vue`)
- [ ] Haqiqiy API ga ro'yxatdan o'tish so'rovi yuborish
- [ ] Username band yoki yo'qligini tekshirish (real-time)
- [ ] Email band yoki yo'qligini tekshirish
- [ ] Email format validatsiyasi
- [ ] Parol minimal talablarini server tomondan tekshirish
- [ ] Xato xabarlarni ko'rsatish (username band, email band, server xatosi)
- [ ] Ro'yxatdan o'tgandan keyin email tasdiqlash sahifasiga yo'naltirish
- [ ] Email tasdiqlash sahifasi yaratish (hozir yo'q)
- [ ] Google OAuth bilan ro'yxatdan o'tish
- [ ] Discord OAuth bilan ro'yxatdan o'tish

### 1.3 Parol tiklash (`pages/auth/forgot-password.vue`, `reset-password.vue`)
- [ ] Haqiqiy API ga email yuborish
- [ ] Serverdan kelgan xatolarni ko'rsatish (email topilmadi)
- [ ] Reset token ni URL dan o'qish
- [ ] Token yaroqliligini tekshirish
- [ ] Haqiqiy parolni o'zgartirish API chaqiruvi
- [ ] Muvaffaqiyatdan keyin login sahifasiga yo'naltirish

### 1.4 Parolni yangilash (`pages/auth/update-password.vue`)
- [ ] Joriy parolni server orqali tekshirish
- [ ] Yangi parolni saqlash API chaqiruvi
- [ ] Xato holatlarni ko'rsatish

### 1.5 Auth middleware
- [ ] Nuxt middleware yaratish — himoyalangan sahifalarga kirishni bloklash
- [ ] Token yaroqliligini tekshirish (muddati o'tganmi?)
- [ ] Token yangilash (refresh token) mexanizmi
- [ ] Auth holatini global boshqarish (Pinia store yoki composable)
- [ ] Logout funksiyasi — tokenni o'chirish, login sahifasiga yo'naltirish

---

## 2. STATE MANAGEMENT (Holat boshqaruvi)

### 2.1 Pinia store yaratish
- [ ] Pinia o'rnatish va sozlash
- [ ] `useAuthStore` — foydalanuvchi auth holati (token, user ma'lumotlari, isLoggedIn)
- [ ] `useUserStore` — joriy foydalanuvchi profili
- [ ] `usePostStore` — postlar holati (feed, foydalanuvchi postlari)
- [ ] `useNotificationStore` — bildirishnomalar soni va ro'yxati
- [ ] `useMessageStore` — xabarlar holati
- [ ] Store larni sahifalarga ulash (hozir har sahifada alohida reactive data bor)

---

## 3. API INTEGRATSIYA

### 3.1 HTTP client sozlash
- [ ] `useFetch` yoki `$fetch` uchun base URL sozlash
- [ ] Auth token ni har bir so'rovga avtomatik qo'shish (interceptor)
- [ ] 401 xatoda avtomatik logout qilish
- [ ] Global xato ko'rsatish tizimi (toast/notification)
- [ ] Loading holatlarini boshqarish

### 3.2 API composable'lar yaratish
- [ ] `useApi()` — asosiy HTTP wrapper
- [ ] `useAuth()` — login, signup, logout, refresh
- [ ] `usePosts()` — postlar CRUD
- [ ] `useUsers()` — foydalanuvchi ma'lumotlari
- [ ] `useComments()` — izohlar
- [ ] `useMessages()` — xabarlar
- [ ] `useNotifications()` — bildirishnomalar
- [ ] `useGroups()` — guruhlar
- [ ] `useTournaments()` — turnirlar
- [ ] `useSearch()` — qidiruv

---

## 4. BOSH SAHIFA — Feed (`pages/index.vue`)

### 4.1 Post yaratish
- [ ] Post yaratish API ga ulash
- [ ] Rasm/media yuklash imkoniyati qo'shish
- [ ] O'yin tegi tanlash (dropdown yoki avtomatik aniqlash)
- [ ] Post yaratilgandan keyin feed ni yangilash
- [ ] Xato bo'lsa xabar ko'rsatish

### 4.2 Feed ro'yxati
- [ ] API dan postlarni yuklash
- [ ] Infinite scroll (cheksiz pastga yuklash) yoki pagination
- [ ] Pull-to-refresh (yangilash uchun tortish)
- [ ] Skeleton loader (yuklanayotganda soxta karta ko'rsatish)
- [ ] Bo'sh holat — "Hech narsa yo'q" xabari

### 4.3 Post interaksiyalar
- [ ] Like/unlike — API ga ulash
- [ ] Like soni real-time yangilanishi
- [ ] Izoh yozish funksiyasi (hozir faqat son ko'rinadi)
- [ ] Izohlar ro'yxatini ochish (modal yoki sahifa ichida)
- [ ] Izoh yozish formasi
- [ ] Izohni o'chirish
- [ ] Post saqlash/olib tashlash — API ga ulash
- [ ] Post ulashish funksiyasi (link nusxalash yoki share API)
- [ ] Post o'chirish (o'z postini)
- [ ] Post tahrirlash (o'z postini)
- [ ] Postni report qilish

### 4.4 Feed filtrlash
- [ ] O'yin bo'yicha filtrlash (Valorant, CS2, PUBG, ...)
- [ ] "Eng yangi" / "Mashhur" / "Kuzatilganlar" tablari
- [ ] Hashtag bo'yicha filtrlash

---

## 5. PROFIL SAHIFASI (`pages/profile.vue`, `pages/profile/[username].vue`)

### 5.1 O'z profilim
- [ ] API dan foydalanuvchi ma'lumotlarini yuklash
- [ ] "Profilni tahrirlash" tugmasini ishga tushirish
- [ ] Profil tahrirlash modal/sahifa yaratish:
  - [ ] Ism o'zgartirish
  - [ ] Bio o'zgartirish
  - [ ] Avatar o'zgartirish (rasm yuklash)
  - [ ] Joylashuv o'zgartirish
  - [ ] Jamoa nomi o'zgartirish
- [ ] Avatar rasmini yuklash va crop qilish
- [ ] Cover/banner rasmi qo'shish
- [ ] O'yin akkauntlarini ulash (Steam, Riot, PUBG ID)

### 5.2 Boshqa foydalanuvchi profili
- [ ] Username bo'yicha API dan ma'lumot olish
- [ ] Foydalanuvchi topilmasa 404 sahifa ko'rsatish
- [ ] Follow/Unfollow funksiyasi — API ga ulash
- [ ] "Xabar yuborish" tugmasini ishga tushirish
- [ ] Bloklash funksiyasi
- [ ] Report qilish funksiyasi

### 5.3 Profil tablari
- [ ] **Postlar** — API dan foydalanuvchi postlarini yuklash (pagination bilan)
- [ ] **O'yin statistikasi** — API dan haqiqiy statistika olish
- [ ] **O'yinlar tarixi** — API dan match tarixini yuklash (pagination bilan)
- [ ] **Followers/Following** ro'yxati sahifasi yoki modali yaratish

---

## 6. GURUHLAR SAHIFASI (`pages/groups.vue`) — To'liq yaratish kerak

### 6.1 Guruhlar ro'yxati
- [ ] Guruhlar sahifasi UI dizayni
- [ ] Guruhlar kartasi komponenti (nomi, rasm, a'zolar soni, turi)
- [ ] "Mening guruhlarim" tab
- [ ] "Barcha guruhlar" tab
- [ ] "Tavsiya etilgan guruhlar" tab
- [ ] Guruhlarni qidirish
- [ ] Guruhlarni filtrlash (o'yin turi bo'yicha)
- [ ] Infinite scroll yoki pagination

### 6.2 Guruh yaratish
- [ ] "Guruh yaratish" tugmasi va formasi
- [ ] Guruh nomi, tavsifi, rasmi, o'yin turi
- [ ] Ochiq/yopiq guruh tanlash
- [ ] Guruh yaratish API chaqiruvi

### 6.3 Guruh sahifasi (ichki)
- [ ] `pages/groups/[id].vue` sahifa yaratish
- [ ] Guruh haqida ma'lumot (nomi, tavsifi, a'zolar, admin)
- [ ] Guruh postlari (feed)
- [ ] A'zolar ro'yxati
- [ ] Guruhga qo'shilish/chiqish
- [ ] Guruh sozlamalari (admin uchun)
- [ ] A'zolarni boshqarish (admin uchun)

---

## 7. TURNIRLAR SAHIFASI (`pages/tournaments.vue`) — To'liq yaratish kerak

### 7.1 Turnirlar ro'yxati
- [ ] Turnirlar sahifasi UI dizayni
- [ ] Turnir kartasi komponenti (nomi, o'yin, sana, mukofot, status)
- [ ] "Faol turnirlar" tab
- [ ] "Kelgusi turnirlar" tab
- [ ] "Tugagan turnirlar" tab
- [ ] Turnirlarni qidirish
- [ ] O'yin turi bo'yicha filtrlash
- [ ] Status bo'yicha filtrlash (ro'yxatdan o'tish ochiq, boshlangan, tugagan)

### 7.2 Turnir sahifasi (ichki)
- [ ] `pages/tournaments/[id].vue` sahifa yaratish
- [ ] Turnir haqida to'liq ma'lumot
- [ ] Qatnashchilar/jamoalar ro'yxati
- [ ] Turnir jadvali (bracket)
- [ ] Natijalar jadvali
- [ ] Ro'yxatdan o'tish formasi
- [ ] Turnir qoidalari
- [ ] Mukofotlar haqida ma'lumot

### 7.3 Turnir yaratish (admin uchun)
- [ ] Turnir yaratish formasi
- [ ] O'yin tanlash, format (1v1, 5v5), sana, vaqt
- [ ] Qatnashchilar limiti
- [ ] Mukofot fondi kiritish
- [ ] Turnir qoidalarini yozish

---

## 8. XABARLAR SAHIFASI (`pages/messages.vue`) — To'liq yaratish kerak

### 8.1 Chat ro'yxati
- [ ] Xabarlar sahifasi UI dizayni (2 panelli: chat list + chat window)
- [ ] Suhbatlar ro'yxati (oxirgi xabar, vaqt, o'qilmagan soni)
- [ ] Suhbatlarni qidirish
- [ ] Yangi suhbat boshlash
- [ ] O'qilmagan xabarlar indikatori

### 8.2 Chat oynasi
- [ ] Xabarlar ko'rsatish (bubble dizayn)
- [ ] Xabar yozish va yuborish
- [ ] Rasm/fayl yuborish
- [ ] Emoji tanlash
- [ ] Xabar vaqti ko'rsatish
- [ ] "Yozmoqda..." indikatori
- [ ] Xabarni o'chirish
- [ ] Infinite scroll (eski xabarlarni yuklash)

### 8.3 Real-time
- [ ] WebSocket ulanish (Socket.io yoki native WS)
- [ ] Yangi xabarlarni real-time qabul qilish
- [ ] Online/offline status real-time yangilanishi
- [ ] Typing indicator real-time
- [ ] Xabar yuborildi/o'qildi belgilari

---

## 9. BILDIRISHNOMALAR SAHIFASI (`pages/notifications.vue`) — To'liq yaratish kerak

### 9.1 Bildirishnomalar ro'yxati
- [ ] Bildirishnomalar sahifasi UI dizayni
- [ ] Bildirishnoma kartasi (turi, matn, vaqt, o'qilgan/o'qilmagan)
- [ ] Bildirishnoma turlari:
  - [ ] Yangi follower
  - [ ] Postga like
  - [ ] Postga izoh
  - [ ] Guruhga taklif
  - [ ] Turnir boshlandi
  - [ ] Yangi xabar
- [ ] Barchasini o'qilgan deb belgilash
- [ ] Bildirishnomani o'chirish
- [ ] Bildirishnomaga bosganda tegishli sahifaga o'tish
- [ ] Infinite scroll yoki pagination

### 9.2 Real-time bildirishnomalar
- [ ] WebSocket orqali yangi bildirishnomalarni qabul qilish
- [ ] Header dagi bildirishnoma soni real-time yangilanishi (hozir statik qizil nuqta)
- [ ] Browser push notification (ixtiyoriy)

---

## 10. SAQLANGAN POSTLAR (`pages/saved.vue`) — To'liq yaratish kerak

- [ ] Saqlangan postlar sahifasi UI dizayni
- [ ] API dan saqlangan postlarni yuklash
- [ ] Postni saqlash/olib tashlash
- [ ] Saqlangan postlarni o'yin bo'yicha filtrlash
- [ ] Bo'sh holat — "Hech narsa saqlanmagan"
- [ ] Pagination yoki infinite scroll

---

## 11. QIDIRUV TIZIMI

- [ ] Qidiruv modali yoki sahifasi yaratish (header dagi tugma hozir ishlamaydi)
- [ ] Foydalanuvchilarni qidirish
- [ ] Postlarni qidirish
- [ ] Guruhlarni qidirish
- [ ] Turnirlarni qidirish
- [ ] Hashtaglar bo'yicha qidirish
- [ ] Qidiruv natijalari sahifasi
- [ ] Qidiruv tarixini saqlash (ixtiyoriy)
- [ ] Debounce bilan real-time qidiruv

---

## 12. DEFAULT LAYOUT YAXSHILASH (`layouts/default.vue`)

### 12.1 Sidebar
- [ ] Trending hashtaglarni API dan yuklash (hozir hardcoded)
- [ ] Hashtagga bosganda filtrlangan feed ko'rsatish
- [ ] Tavsiya etilgan foydalanuvchilarni API dan yuklash (hozir hardcoded)
- [ ] "Ko'proq ko'rsatish" tugmasi
- [ ] Sidebar ni mobilda ham ochish imkoniyati (hamburger menu)

### 12.2 Header
- [ ] Qidiruv tugmasini ishga tushirish
- [ ] Bildirishnomalar sonini API dan olish
- [ ] Xabarlar sonini API dan olish
- [ ] Mobil responsive navigatsiyani yaxshilash

### 12.3 Foydalanuvchi menyu
- [ ] Logout ni haqiqiy qilish (token o'chirish, redirect)
- [ ] "Sozlamalar" sahifasiga yo'naltirish
- [ ] Profil sahifasiga to'g'ri yo'naltirish

---

## 13. SOZLAMALAR SAHIFASI — Yangi yaratish kerak

- [ ] `pages/settings.vue` sahifa yaratish
- [ ] Profil sozlamalari (ism, bio, avatar, joylashuv)
- [ ] Akkaunt sozlamalari (email, parol o'zgartirish)
- [ ] Bildirishnoma sozlamalari (qaysi turlarni olish)
- [ ] Maxfiylik sozlamalari (profil ochiq/yopiq)
- [ ] O'yin akkauntlarini ulash (Steam, Riot, PUBG)
- [ ] Tilni o'zgartirish (ixtiyoriy)
- [ ] Mavzu (dark/light mode) almashtirish
- [ ] Akkauntni o'chirish

---

## 14. UI/UX YAXSHILASHLAR

### 14.1 Umumiy komponentlar yaratish
- [ ] Toast/Snackbar komponenti (muvaffaqiyat, xato, ogohlantirish xabarlari)
- [ ] Modal/Dialog komponenti
- [ ] Skeleton loader komponenti (yuklanish holati)
- [ ] Empty state komponenti (bo'sh ro'yxat)
- [ ] Error state komponenti (xato holati)
- [ ] Avatar komponenti (rasm + fallback harflar)
- [ ] Badge komponenti (online, rank, role)
- [ ] Infinite scroll komponenti
- [ ] Image upload + crop komponenti
- [ ] Confirm dialog komponenti (o'chirishdan oldin tasdiqlash)

### 14.2 Formalar
- [ ] Form validatsiya tizimi (VeeValidate yoki Zod + custom)
- [ ] Xato xabarlarni input ostida ko'rsatish
- [ ] Server xatolarini form ga ulash

### 14.3 Responsive dizayn
- [ ] Mobil versiyani sinchiklab tekshirish va tuzatish
- [ ] Tablet versiyasini optimallashtirish
- [ ] Mobil navigatsiya (bottom navigation bar)
- [ ] Touch gesturelar (swipe to go back, pull to refresh)

### 14.4 Animatsiyalar
- [ ] Sahifa o'tish animatsiyalari (page transitions)
- [ ] Like animatsiyasi (heart bounce)
- [ ] Skeleton shimmer effekti
- [ ] Scroll animatsiyalar (fade in on scroll)

---

## 15. PERFORMANCE VA OPTIMALLASHTIRISH

- [ ] Rasmlarni lazy load qilish
- [ ] Komponentlarni lazy import qilish
- [ ] Meta taglar qo'shish (SEO)
- [ ] OG taglar (ijtimoiy tarmoqlarda ulashish uchun)
- [ ] Favicon va PWA manifest
- [ ] Error boundary qo'shish (xato bo'lganda sahifa buzilmasin)
- [ ] 404 sahifa yaratish (`pages/[...slug].vue` yoki `error.vue`)
- [ ] Loading sahifa (app yuklanayotganda)

---

## 16. XAVFSIZLIK

- [ ] XSS himoya — foydalanuvchi kiritgan matnni sanitize qilish
- [ ] CSRF himoya
- [ ] Rate limiting (frontend tomondan)
- [ ] Input sanitizatsiya (barcha formalarda)
- [ ] File upload validatsiyasi (tur, hajm cheklovi)
- [ ] Auth token xavfsiz saqlash (httpOnly cookie afzal)

---

## 17. TESTLASH

- [ ] Vitest o'rnatish va sozlash
- [ ] Komponentlar uchun unit testlar
- [ ] Composable lar uchun testlar
- [ ] Store lar uchun testlar
- [ ] E2E testlar (Playwright yoki Cypress)
- [ ] Auth flow testi
- [ ] Post CRUD testi
- [ ] Profil tahrirlash testi

---

## 18. DEPLOY VA DevOps

- [ ] Environment variables sozlash (.env fayl)
- [ ] Production build tekshirish
- [ ] Vercel/Netlify/Railway ga deploy
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Domain ulash
- [ ] SSL sertifikat

---

## PRIORITET BO'YICHA TARTIB

Agar ketma-ket ishlash kerak bo'lsa, tavsiya etiladigan tartib:

1. **Pinia store** va **API client** sozlash (asos)
2. **Autentifikatsiya** to'liq ishga tushirish (login, signup, middleware)
3. **Feed** — postlarni API ga ulash (yaratish, like, izoh)
4. **Profil** — tahrirlash, avatar yuklash, follow/unfollow
5. **Bildirishnomalar** sahifasi
6. **Saqlangan postlar** sahifasi
7. **Qidiruv** tizimi
8. **Xabarlar** sahifasi (WebSocket bilan)
9. **Guruhlar** sahifasi
10. **Turnirlar** sahifasi
11. **Sozlamalar** sahifasi
12. **UI yaxshilashlar** (toast, skeleton, animatsiyalar)
13. **Testlash**
14. **Deploy**

---

> Jami: **~180+ ta vazifa** — Frontend to'liq production-ready bo'lishi uchun.