# JAMOA — Frontend Ishlar Ro'yxati

> Bu fayl FAQAT frontend (UI/UX) tomondan qilinishi kerak bo'lgan ishlarni o'z ichiga oladi.
> Backend, API, database ishlari bu yerda yo'q — ular TASKS.md da.

---

## HOLAT XULOSASI

| Sahifa | Holat |
|--------|-------|
| Auth (login, signup, forgot, reset, update) | UI tayyor, funksional emas |
| Feed (index.vue) | UI tayyor, mock data |
| Profil (profile.vue) | UI tayyor, mock data |
| Profil/[username] | UI tayy<br/>or, mock data |
| Guruhlar | Placeholder ("Tez kunda...") |
| Turnirlar | Placeholder ("Tez kunda...") |
| Xabarlar | Placeholder ("Tez kunda...") |
| Bildirishnomalar | Placeholder ("Tez kunda...") |
| Saqlangan | Placeholder ("Tez kunda...") |
| Sozlamalar | Mavjud emas |
| Qidiruv | Mavjud emas |
| 404 sahifa | Mavjud emas |

---

## 1. UMUMIY KOMPONENTLAR YARATISH (Asosiy — barchasi uchun kerak)

Bu komponentlar barcha sahifalarda qayta-qayta ishlatiladi. Boshqa ishlarga kirishdan oldin shu komponentlarni yaratish kerak.

### 1.1 Post kartasi — `components/PostCard.vue`
- [ ] index.vue va profile.vue da post karta kodi takrorlanmoqda — umumiy komponent qilish
- [ ] Props: user, content, time, likes, comments, liked, saved, game
- [ ] Like/unlike, saqlash, izoh tugmalari
- [ ] Post menyusi (3 nuqta) — tahrirlash, o'chirish, report
- [ ] Rasm/media ko'rsatish qobiliyati
- [ ] Post content da hashtag (#) va mention (@) ni rangli qilish
- [ ] Vaqtni "2 daqiqa oldin", "3 soat oldin" formatda ko'rsatish (hozir "2s", "4s" — noto'g'ri)

### 1.2 Avatar komponent — `components/UserAvatar.vue`
- [ ] Hozir har joyda gradient div bilan qo'lda yozilgan — umumiy komponent qilish
- [ ] Props: name, avatar, gradient, size (sm/md/lg), online
- [ ] Haqiqiy rasm qo'llab-quvvatlash (agar rasm bo'lsa — rasm, bo'lmasa — bosh harf)
- [ ] Online indikator (yashil nuqta)

### 1.3 Toast/Bildirishnoma — `components/Toast.vue`
- [ ] Muvaffaqiyat (yashil), xato (qizil), ogohlantirish (sariq), info (ko'k)
- [ ] Avtomatik yopilish (3-5 soniya)
- [ ] Qo'lda yopish tugmasi
- [ ] Ekran o'ng yuqorisida ko'rinishi
- [ ] Composable: `useToast()` — `toast.success("Post yaratildi")`

### 1.4 Modal/Dialog — `components/Modal.vue`
- [ ] Overlay (qoraytirilgan fon)
- [ ] Yopish tugmasi (X) va Escape tugmasi bilan yopish
- [ ] Turli o'lchamlar (sm, md, lg, full)
- [ ] Animatsiya (fade in/out, scale)
- [ ] Slot: header, body, footer

### 1.5 Confirm Dialog — `components/ConfirmDialog.vue`
- [ ] "Ishonchingiz komilmi?" modali
- [ ] O'chirish, chiqish kabi xavfli amallar uchun
- [ ] "Bekor qilish" va "Tasdiqlash" tugmalari
- [ ] Destructive variant (qizil tugma)

### 1.6 Skeleton Loader — `components/Skeleton.vue`
- [ ] Post skeleton (avatar + matn chiziqlar)
- [ ] Profil skeleton
- [ ] Ro'yxat skeleton
- [ ] Shimmer animatsiya effekti

### 1.7 Empty State — `components/EmptyState.vue`
- [ ] Katta ikon + sarlavha + tavsif
- [ ] "Hech narsa topilmadi" holati
- [ ] CTA tugma (ixtiyoriy) — masalan "Birinchi post yarating"

### 1.8 Infinite Scroll — `components/InfiniteScroll.vue`
- [ ] Sahifa pastiga yetganda avtomatik yuklash
- [ ] Loading indikator (spinner)
- [ ] "Barchasi yuklandi" xabari
- [ ] Composable: `useInfiniteScroll()`

### 1.9 Image Upload — `components/ImageUpload.vue`
- [ ] Drag & drop rasm yuklash
- [ ] Fayl tanlash tugmasi
- [ ] Rasm preview
- [ ] Hajm cheklovi ko'rsatish (masalan "Max 5MB")
- [ ] Yuklanish progress bar
- [ ] Rasm o'chirish (X tugma)

### 1.10 Badge komponent — `components/Badge.vue`
- [ ] Rang variatlari: default, success, warning, danger, info
- [ ] O'lchamlar: sm, md
- [ ] Ishlatish: o'yin nomi, rank, role, online status

---

## 2. FEED SAHIFASI YAXSHILASH (`pages/index.vue`)

### 2.1 Post yaratish bo'limi
- [ ] Rasm biriktirish tugmasini ishga tushirish (hozir tugma bor, bosilganda hech narsa bo'lmaydi)
- [ ] Emoji tugmasini ishga tushirish (hozir tugma bor, ishlamaydi)
- [ ] O'yin tegi tanlash dropdown qo'shish (Valorant, CS2, PUBG, ...)
- [ ] Rasm preview ko'rsatish (tanlangandan keyin)
- [ ] Belgilar cheklovi va hisoblagich (masalan 500 ta belgi)
- [ ] Yangi post yaratilganda smooth animatsiya bilan feed ga qo'shilishi

### 2.2 Post karta yaxshilash
- [ ] **Izoh bo'limi** — izoh tugmasiga bosganda izohlar ochilishi kerak:
  - [ ] Izohlar ro'yxati (post ostida ochiladi yoki modal)
  - [ ] Izoh yozish input
  - [ ] Izohga like bosish
  - [ ] Izohni o'chirish (o'ziniki)
  - [ ] "Ko'proq ko'rsatish" tugmasi (3+ izoh bo'lsa)
- [ ] **Ulashish tugmasi** — bosganda:
  - [ ] Link nusxalash
  - [ ] Yoki native share dialog (mobil)
- [ ] **3 nuqta menyu** — bosganda dropdown:
  - [ ] O'z postini tahrirlash
  - [ ] O'z postini o'chirish (confirm dialog bilan)
  - [ ] Boshqa postni report qilish
  - [ ] Boshqa foydalanuvchini bloklash
- [ ] Post kontentda rasm bo'lsa ko'rsatish
- [ ] Post kontentda URL bo'lsa link qilish (clickable)
- [ ] Post kontentda hashtag bo'lsa rangli qilib ko'rsatish
- [ ] Post kontentda @mention bo'lsa profil linkiga aylantirish
- [ ] Like animatsiya (yurak kattalashib-kichiklashishi)

### 2.3 Feed filtrlash
- [ ] Header dagi tablarni "Hammasi", "Kuzatilganlar", "Mashhur" qilib o'zgartirish
- [ ] O'yin bo'yicha filtrlash chips (Valorant, CS2, PUBG, Barchasi)
- [ ] Filtrlash animatsiyasi (content o'zgarganda)

### 2.4 Feed UX
- [ ] Pull-to-refresh (yuqoriga tortib yangilash) — mobil uchun
- [ ] Skeleton loader (feed yuklanayotganda)
- [ ] Empty state (hech post yo'q bo'lsa)
- [ ] "Yangi postlar bor" banner (yuqorida ko'rinadi, bosganda yuqoriga scroll)
- [ ] Scroll position eslab qolish (sahifadan ketib qaytganda)

---

## 3. PROFIL SAHIFASI YAXSHILASH (`pages/profile.vue`)

### 3.1 Profil header
- [ ] Cover/banner rasmi qo'shish (profil yuqorisida katta rasm)
- [ ] Avatar rasm yuklash imkoniyati (hozir faqat gradient bosh harf)
- [ ] "Profilni tahrirlash" tugmasiga modal bog'lash:
  - [ ] Ism o'zgartirish
  - [ ] Bio o'zgartirish (textarea, belgilar cheklovi)
  - [ ] Avatar o'zgartirish (rasm yuklash)
  - [ ] Cover rasm o'zgartirish
  - [ ] Joylashuv o'zgartirish
  - [ ] Jamoa nomi o'zgartirish
  - [ ] Rol o'zgartirish
- [ ] 3 nuqta menyu — bosganda: "Profilni ulashish", "Sozlamalar"

### 3.2 Statistika tabi
- [ ] O'yin qo'shish/o'chirish imkoniyati
- [ ] O'yin akkauntini ulash UI (Steam ID, Riot ID, PUBG ID kiritish)
- [ ] Rank ikonlari qo'shish (hozir faqat matn: "Immortal 2", "Global Elite")
- [ ] Win rate grafik (progress bar yaxshiroq animatsiya bilan)
- [ ] O'yin taqqoslash (2 ta o'yinni yonma-yon)

### 3.3 O'yinlar tarixi tabi
- [ ] Pagination yoki infinite scroll (hozir faqat 4 ta match ko'rinadi)
- [ ] Filtrlash — o'yin bo'yicha (faqat Valorant, faqat CS2)
- [ ] Filtrlash — natija bo'yicha (faqat g'alaba, faqat mag'lubiyat)
- [ ] Match detallari — bosganda kengayib ochilishi (ko'proq ma'lumot)

### 3.4 Postlar tabi
- [ ] PostCard komponentini ishlatish (takrorlangan kodni tozalash)
- [ ] Pagination yoki infinite scroll
- [ ] Post yo'q bo'lsa empty state

### 3.5 Yangi tablar
- [ ] **Media tabi** — foydalanuvchi joylagan rasmlar galereyasi
- [ ] **Kuzatuvchilar/Kuzatilganlar** — ro'yxat yoki alohida sahifa

---

## 4. BOSHQA FOYDALANUVCHI PROFILI (`pages/profile/[username].vue`)

- [ ] Username topilmasa — chiroyli 404 sahifa ko'rsatish (hozir fallback bo'sh profil ko'rsatadi)
- [ ] **"Kuzatish" tugmasi** — bosganda:
  - [ ] Matn o'zgarishi: "Kuzatish" → "Kuzatilmoqda"
  - [ ] Tugma rangi o'zgarishi (violet → outline)
  - [ ] Follower soni +1/-1 o'zgarishi
- [ ] **"Xabar" tugmasi** — bosganda messages sahifasiga yoki chat modal ochish
- [ ] Kontekst menyu (3 nuqta) qo'shish:
  - [ ] Profilni ulashish
  - [ ] Bloklash
  - [ ] Report qilish
- [ ] Har foydalanuvchi uchun alohida o'yin statistikasi (hozir hammaga bir xil)
- [ ] Har foydalanuvchi uchun alohida match tarixi (hozir hammaga bir xil)

---

## 5. GURUHLAR SAHIFASI (`pages/groups.vue`) — TO'LIQ YARATISH

### 5.1 Asosiy sahifa
- [ ] Sahifa sarlavhasi va tavsifi
- [ ] **Tablar:** "Mening guruhlarim", "Barcha guruhlar", "Tavsiya etilganlar"
- [ ] **"Guruh yaratish" tugmasi** (o'ng yuqorida)
- [ ] **Guruh kartasi komponenti** — `components/GroupCard.vue`:
  - [ ] Guruh rasmi/avatar
  - [ ] Guruh nomi
  - [ ] A'zolar soni
  - [ ] O'yin turi badge (Valorant, CS2, ...)
  - [ ] Ochiq/Yopiq badge
  - [ ] Qisqa tavsif
  - [ ] "Qo'shilish" tugmasi
- [ ] Guruhlar grid layout (2-3 ustun)
- [ ] Qidiruv input (guruhlar ichida)
- [ ] O'yin bo'yicha filtrlash chips
- [ ] Skeleton loader
- [ ] Empty state ("Hali guruh yo'q")
- [ ] Mock data — kamida 6-8 ta soxta guruh

### 5.2 Guruh yaratish modal
- [ ] Guruh nomi input
- [ ] Guruh tavsifi textarea
- [ ] O'yin tanlash dropdown
- [ ] Ochiq/Yopiq radio
- [ ] Guruh rasmi yuklash
- [ ] Maksimal a'zolar soni
- [ ] "Yaratish" tugmasi

### 5.3 Guruh ichki sahifasi — `pages/groups/[id].vue`
- [ ] Guruh haqida ma'lumot (header)
  - [ ] Guruh rasmi va nomi
  - [ ] A'zolar soni, o'yin, yaratilgan sana
  - [ ] "Qo'shilish/Chiqish" tugmasi
  - [ ] "Sozlamalar" tugmasi (admin uchun)
- [ ] **Tablar:** "Feed", "A'zolar", "Haqida"
- [ ] Feed tab — guruh ichidagi postlar (PostCard bilan)
- [ ] A'zolar tab — a'zolar ro'yxati (avatar, ism, rol)
- [ ] Haqida tab — to'liq tavsif, qoidalar
- [ ] Post yaratish (guruh ichida)
- [ ] Mock data

---

## 6. TURNIRLAR SAHIFASI (`pages/tournaments.vue`) — TO'LIQ YARATISH

### 6.1 Asosiy sahifa
- [ ] Sahifa sarlavhasi
- [ ] **Tablar:** "Faol", "Kelgusi", "Tugagan"
- [ ] **Turnir kartasi komponenti** — `components/TournamentCard.vue`:
  - [ ] Turnir rasmi/banner
  - [ ] Turnir nomi
  - [ ] O'yin turi badge
  - [ ] Sana va vaqt
  - [ ] Qatnashchilar soni / limit (masalan "24/32")
  - [ ] Mukofot fondi (masalan "500,000 so'm")
  - [ ] Status badge: "Ro'yxatdan o'tish ochiq", "Boshlangan", "Tugagan"
  - [ ] Format badge: "5v5", "1v1", "Battle Royale"
  - [ ] "Ro'yxatdan o'tish" tugmasi
- [ ] Turnirlar grid layout
- [ ] O'yin bo'yicha filtrlash
- [ ] Status bo'yicha filtrlash
- [ ] Qidiruv
- [ ] Skeleton loader
- [ ] Empty state
- [ ] Mock data — kamida 4-6 ta soxta turnir

### 6.2 Turnir ichki sahifasi — `pages/tournaments/[id].vue`
- [ ] Turnir banner (katta rasm)
- [ ] Turnir ma'lumotlari:
  - [ ] Nomi, o'yin, format
  - [ ] Boshlanish sanasi va vaqti
  - [ ] Qatnashchilar soni
  - [ ] Mukofot fondi
  - [ ] Tashkilotchi
- [ ] **Tablar:** "Ma'lumot", "Qatnashchilar", "Bracket", "Natijalar"
- [ ] Ma'lumot tab — qoidalar, tavsif, mukofotlar
- [ ] Qatnashchilar tab — ro'yxatdan o'tgan jamoalar/o'yinchilar
- [ ] Bracket tab — turnir daraxtini ko'rsatish (bracket vizualizatsiya)
  - [ ] Oddiy bracket layout (2 ustunli, chiziqlar bilan)
  - [ ] Har bir o'yin: jamoa1 vs jamoa2 + natija
- [ ] Natijalar tab — yakuniy joylar jadvali (1-chi, 2-chi, 3-chi)
- [ ] "Ro'yxatdan o'tish" tugmasi va forma
- [ ] Mock data

---

## 7. XABARLAR SAHIFASI (`pages/messages.vue`) — TO'LIQ YARATISH

### 7.1 Layout
- [ ] 2 panelli dizayn:
  - [ ] Chap panel — suhbatlar ro'yxati (300px kenglik)
  - [ ] O'ng panel — tanlangan suhbat (qolgan joy)
- [ ] Mobilda — avval suhbatlar ro'yxati, bosganda chat ochiladi
- [ ] Responsive: lg da yonma-yon, md/sm da ketma-ket

### 7.2 Suhbatlar ro'yxati (chap panel)
- [ ] "Yangi xabar" tugmasi
- [ ] Qidiruv input
- [ ] Suhbat elementi:
  - [ ] Foydalanuvchi avatar + ism
  - [ ] Oxirgi xabar matnidan qisqa ko'rsatish
  - [ ] Vaqt (5 daqiqa oldin, kecha, ...)
  - [ ] O'qilmagan xabarlar soni badge
  - [ ] Online status indikator
- [ ] Tanlangan suhbat highlighting
- [ ] Mock data — 5-6 ta suhbat

### 7.3 Chat oynasi (o'ng panel)
- [ ] Header: foydalanuvchi avatar + ism + online status + "..." menyu
- [ ] Xabarlar maydoni:
  - [ ] Yuboruvchi xabarlari (o'ng tomonda, binafsha rang)
  - [ ] Qabul qiluvchi xabarlari (chap tomonda, qorong'i rang)
  - [ ] Xabar vaqti
  - [ ] Xabar guruhlash (ketma-ket bir xil foydalanuvchidan)
  - [ ] Sana ajratuvchi ("Bugun", "Kecha", "15-mart")
- [ ] Xabar yozish maydoni (pastda):
  - [ ] Textarea (auto-resize)
  - [ ] Emoji tugmasi
  - [ ] Rasm biriktirish tugmasi
  - [ ] "Yuborish" tugmasi (yoki Enter)
- [ ] Bo'sh holat — "Suhbat tanlang" xabari
- [ ] Mock data — har suhbatda 5-10 ta soxta xabar

### 7.4 Yangi suhbat boshlash
- [ ] Foydalanuvchi qidirish modal
- [ ] Foydalanuvchi tanlash
- [ ] Birinchi xabarni yozish

---

## 8. BILDIRISHNOMALAR SAHIFASI (`pages/notifications.vue`) — TO'LIQ YARATISH

### 8.1 Bildirishnomalar ro'yxati
- [ ] Sahifa sarlavhasi + "Barchasini o'qilgan deb belgilash" tugmasi
- [ ] **Bildirishnoma kartasi** — turlariga qarab:
  - [ ] **Like** — "[Ism] postingizga like bosdi" + yurak ikon (qizil)
  - [ ] **Izoh** — "[Ism] postingizga izoh qoldirdi" + izoh ikon (ko'k)
  - [ ] **Follow** — "[Ism] sizni kuzata boshladi" + odam ikon (binafsha)
  - [ ] **Guruh taklif** — "[Ism] sizni [guruh] ga taklif qildi" + guruh ikon (yashil)
  - [ ] **Turnir** — "[Turnir nomi] boshlandi!" + kubok ikon (sariq)
  - [ ] **Tizim** — "Profilingizni to'ldiring" + tizim ikon (kulrang)
- [ ] Har bir bildirishnomada:
  - [ ] Foydalanuvchi avatar (agar shaxs bildirishnomasi bo'lsa)
  - [ ] Ikon (bildirishnoma turiga qarab)
  - [ ] Matn
  - [ ] Vaqt ("5 daqiqa oldin", "2 soat oldin", "kecha")
  - [ ] O'qilmagan — fon rangi biroz farqli
  - [ ] Bosganda — tegishli sahifaga o'tish
- [ ] O'qilmagan / Hammasi filtrlash
- [ ] Skeleton loader
- [ ] Empty state ("Bildirishnomalar yo'q")
- [ ] Mock data — 10-15 ta turli bildirishnoma

---

## 9. SAQLANGAN POSTLAR SAHIFASI (`pages/saved.vue`) — TO'LIQ YARATISH

- [ ] Sahifa sarlavhasi
- [ ] Saqlangan postlar ro'yxati (PostCard komponentini ishlatish)
- [ ] O'yin bo'yicha filtrlash chips
- [ ] Postni saqlangan ro'yxatdan olib tashlash (bookmark tugmasi bilan)
- [ ] Skeleton loader
- [ ] Empty state ("Hali hech narsa saqlanmagan. Feed da postlarni saqlang!")
- [ ] Mock data — 3-4 ta saqlangan post

---

## 10. SOZLAMALAR SAHIFASI (`pages/settings.vue`) — YANGI YARATISH

### 10.1 Layout
- [ ] Chap panel — sozlamalar menyu (navigatsiya)
- [ ] O'ng panel — tanlangan bo'lim kontenti
- [ ] Mobilda — menyu, bosganda bo'lim ochiladi

### 10.2 Bo'limlar
- [ ] **Profil** — ism, bio, avatar, cover, joylashuv, jamoa, rol
- [ ] **Akkaunt** — email o'zgartirish, parol o'zgartirish (/auth/update-password ga link)
- [ ] **O'yin akkauntlari** — Steam, Riot, PUBG ID ulash
- [ ] **Bildirishnomalar** — qaysi turlarni olish (toggle switchlar)
- [ ] **Maxfiylik** — profil ochiq/yopiq, kim xabar yuborishi mumkin
- [ ] **Ko'rinish** — dark/light mode toggle (hozir faqat dark)
- [ ] **Akkauntni o'chirish** — qizil bo'lim, confirm dialog bilan

---

## 11. QIDIRUV (`components/SearchModal.vue`) — YANGI YARATISH

- [ ] Header dagi qidiruv tugmasiga modal bog'lash
- [ ] Katta qidiruv input (fokus avtomatik)
- [ ] Ctrl+K / Cmd+K bilan ochish
- [ ] Escape bilan yopish
- [ ] **Qidiruv natijalari bo'limlari:**
  - [ ] Foydalanuvchilar (avatar + ism + username)
  - [ ] Postlar (kontent snippet)
  - [ ] Guruhlar (nomi + a'zolar soni)
  - [ ] Turnirlar (nomi + sana)
- [ ] So'nggi qidiruvlar (tarix)
- [ ] "Natija topilmadi" holati
- [ ] Debounce — har harfda emas, 300ms kutib qidirish
- [ ] Mock data — natijalar

---

## 12. XATO VA YORDAMCHI SAHIFALAR

### 12.1 404 sahifa — `pages/[...slug].vue` yoki `error.vue`
- [ ] Chiroyli dizayn — gaming uslubida
- [ ] Katta "404" raqami
- [ ] "Sahifa topilmadi" xabari
- [ ] "Bosh sahifaga qaytish" tugmasi
- [ ] Animatsiya (ixtiyoriy)

### 12.2 Loading sahifa
- [ ] App yuklanayotganda ko'rinadigan splash screen
- [ ] JAMOA logotipi + spinner
- [ ] `app.vue` da `<NuxtLoadingIndicator />` qo'shish

---

## 13. DEFAULT LAYOUT YAXSHILASH (`layouts/default.vue`)

### 13.1 Sidebar navigatsiya
- [ ] Hozir Feed active bo'lganda sidebar da "Feed" active ko'rinmaydi — tuzatish
  - Sabab: `isActive(link.to) && (link.label === 'Feed' || link.to !== '/')` logikasi noto'g'ri
- [ ] Xabarlar va Bildirishnomalar yonida o'qilmagan soni badge qo'shish
- [ ] "Trendlar" bo'limiga hash linklar qo'shish (bosganda filtrlangan feed)
- [ ] "Tavsiya etilganlar" bo'limiga "Hammasi" tugmasi
- [ ] "Tavsiya etilganlar" — har bir foydalanuvchi yonida "Kuzatish" tugma

### 13.2 Mobil navigatsiya
- [ ] **Bottom Navigation Bar** — mobil uchun pastki navigatsiya:
  - [ ] Feed, Guruhlar, Turnirlar, Xabarlar, Profil
  - [ ] Active ikon highlighting
  - [ ] Safe area padding (notchli telefonlar uchun)
- [ ] **Hamburger menyu** — mobilda sidebar ochish (slide-in)
- [ ] Header da mobil uchun logo ko'rsatish (hozir faqat lg da logo bor)

### 13.3 Header
- [ ] Qidiruv tugmasiga SearchModal bog'lash
- [ ] Bildirishnomalar tugmasiga o'qilmagan soni ko'rsatish (hozir statik qizil nuqta)
- [ ] Xabarlar tugmasiga o'qilmagan soni ko'rsatish

### 13.4 O'ng Sidebar (ixtiyoriy — katta ekranlar uchun)
- [ ] xl ekranlarda o'ng sidebar qo'shish (feed yonida):
  - [ ] "Kim yangi" — eng so'nggi ro'yxatdan o'tganlar
  - [ ] "Faol turnirlar" — qisqa ro'yxat
  - [ ] "Mashhur postlar" — top 3

---

## 14. PROFILE LAYOUT YAXSHILASH (`layouts/profile.vue`)

- [ ] Mobil versiyani yaxshilash — header tugmalar juda kichik
- [ ] "Orqaga" tugma qo'shish (profil sahifasidan feed ga qaytish)
- [ ] Header navigatsiyada "Xabarlar" va "Saqlangan" ham qo'shish

---

## 15. AUTH SAHIFALARI YAXSHILASH

### 15.1 Login (`pages/auth/login.vue`)
- [ ] Email format validatsiya (@ belgisi, domen)
- [ ] Parol minimal uzunlik tekshirish (kamida 6 belgi)
- [ ] Xato xabarlarni input ostida ko'rsatish (hozir hech narsa ko'rsatilmaydi)
- [ ] Submit dan keyin login sahifasiga redirect emas, feed ga o'tish (hozir to'g'ri)

### 15.2 Signup (`pages/auth/signup.vue`)
- [ ] Username validatsiya:
  - [ ] Faqat harflar, raqamlar, _ (maxsus belgilar yo'q)
  - [ ] Minimal 3 belgi, maksimal 20 belgi
  - [ ] Xato xabar: "Faqat harflar, raqamlar va _ ishlatish mumkin"
- [ ] Email format validatsiya
- [ ] Parol minimal talablar matn sifatida ko'rsatish
- [ ] Signup muvaffaqiyatli bo'lgandan keyin — redirect qayerga? (hozir hech qayerga)

### 15.3 Auth layout (`layouts/auth.vue`)
- [ ] Mobil versiyada logo va forma spacing yaxshilash
- [ ] Testimonial bo'limini dynamic qilish (bir nechta quote, almashib turadi)

---

## 16. ANIMATSIYALAR VA MIKRO-INTERAKSIYALAR

- [ ] Sahifa o'tish animatsiyalari — `<NuxtPage>` ga transition qo'shish
- [ ] Like tugmasiga press animatsiya (yurak kattalashadi + particles)
- [ ] Tab o'zgarishda content fade animatsiya
- [ ] Skeleton shimmer effekti
- [ ] Button hover da scale effekt (1.02x)
- [ ] Modal ochilish/yopilish — fade + scale animatsiya
- [ ] Post paydo bo'lishda slide-up animatsiya
- [ ] Infinite scroll loading spinner animatsiya
- [ ] Dropdown ochilishda smooth animatsiya
- [ ] Follow tugma holatlar o'tishi (smooth color transition)

---

## 17. DARK/LIGHT MODE

- [ ] Light mode ranglar palitasi yaratish (`tailwind.css` da)
- [ ] Mode almashtirgich qo'shish (sozlamalar yoki header da)
- [ ] `useColorMode()` composable (VueUse dan)
- [ ] Tizim sozlamasiga moslashtirish (prefers-color-scheme)
- [ ] Barcha sahifalarni light mode da tekshirish

---

## 18. SEO VA META

- [ ] `nuxt.config.ts` da global meta taglar
- [ ] Har sahifada `useHead()` bilan title/description
- [ ] OG taglar (ijtimoiy tarmoqlarda ulashish uchun)
- [ ] Favicon qo'shish (JAMOA logotipi)
- [ ] PWA manifest (`nuxt-pwa` modul)
- [ ] robots.txt
- [ ] sitemap.xml

---

## ISHLASH TARTIBI (TAVSIYA)

**1-bosqich — Asos komponentlar:**
PostCard, UserAvatar, Toast, Modal, Skeleton, EmptyState, Badge

**2-bosqich — Mavjud sahifalarni yaxshilash:**
Feed (izohlar, menyu, filtrlash), Profil (tahrirlash modal), Layout (mobil nav, qidiruv)

**3-bosqich — Yangi sahifalar:**
Bildirishnomalar → Saqlangan → Qidiruv → Sozlamalar

**4-bosqich — Katta sahifalar:**
Xabarlar → Guruhlar → Turnirlar

**5-bosqich — Polish:**
Animatsiyalar, Dark/Light mode, SEO, 404 sahifa

---

> Jami: **~200+ ta frontend vazifa**
> Har bir bo'limda mock data ishlatiladi — backend tayyor bo'lganda API ga almashtiriladi.