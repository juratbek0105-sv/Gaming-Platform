# JAMOA — O'yin Platformasi

**JAMOA** — O'zbek geymerlar uchun mo'ljallangan zamonaviy gaming hamjamiyat platformasi. Platforma o'yinchilarni bir joyga to'plab, jamoalar tuzish, turnirlar o'tkazish va bir-biri bilan muloqot qilish imkonini beradi.

---

## Texnologiyalar

| Qatlam | Texnologiya |
|--------|-------------|
| Framework | [Nuxt 3](https://nuxt.com/) (Vue 3) |
| Til | TypeScript 5.7+ |
| Styling | Tailwind CSS 3.4 |
| UI Komponentlar | [shadcn-nuxt](https://www.shadcn-vue.com/) (Radix Vue asosida) |
| Ikonlar | Lucide Vue Next |
| Utilitalar | VueUse Core |
| Shriftlar | Inter, Space Grotesk |

---

## Loyiha Tuzilishi

```
Game Platform/
├── frontend/
│   ├── pages/                    # Sahifalar (fayl asosidagi routing)
│   │   ├── index.vue             # Bosh sahifa — Yangiliklar lentasi
│   │   ├── profile.vue           # Joriy foydalanuvchi profili
│   │   ├── profile/[username].vue # Dinamik foydalanuvchi profili
│   │   ├── groups.vue            # Guruhlar
│   │   ├── tournaments.vue       # Turnirlar
│   │   ├── messages.vue          # Xabarlar
│   │   ├── notifications.vue     # Bildirishnomalar
│   │   ├── saved.vue             # Saqlangan postlar
│   │   └── auth/                 # Autentifikatsiya sahifalari
│   │       ├── login.vue         # Kirish
│   │       ├── signup.vue        # Ro'yxatdan o'tish
│   │       ├── forgot-password.vue
│   │       ├── reset-password.vue
│   │       └── update-password.vue
│   ├── layouts/                  # Layoutlar
│   │   ├── default.vue           # Asosiy layout (sidebar bilan)
│   │   ├── auth.vue              # Auth sahifalari uchun layout
│   │   └── profile.vue           # Profil sahifasi uchun layout
│   ├── components/ui/            # shadcn-nuxt UI komponentlari
│   │   ├── button/
│   │   ├── card/
│   │   ├── checkbox/
│   │   ├── dropdown/
│   │   ├── input/
│   │   ├── label/
│   │   ├── separator/
│   │   └── tabs/
│   ├── lib/utils.ts              # Yordamchi funksiyalar
│   ├── assets/css/tailwind.css   # Tailwind CSS sozlamalari
│   ├── nuxt.config.ts            # Nuxt konfiguratsiyasi
│   ├── tailwind.config.ts        # Tailwind konfiguratsiyasi
│   ├── app.vue                   # Ildiz komponent
│   ├── package.json              # Bog'liqliklar
│   └── tsconfig.json             # TypeScript konfiguratsiyasi
└── README.md
```

---

## Asosiy Funksiyalar

### Amalga oshirilgan

- **Yangiliklar lentasi** — Postlarni ko'rish, like bosish, izoh qoldirish, saqlash
- **Foydalanuvchi profillari** — O'yin statistikasi, so'nggi o'yinlar tarixi, K/D nisbati, darajalar
- **Autentifikatsiya** — Kirish, ro'yxatdan o'tish, parolni tiklash, parol kuchlilik indikatori
- **O'yinchi qidirish** — Tavsiya etilgan o'yinchilar paneli
- **Trend o'yinlar** — Mashhur o'yinlar va mavzular
- **Dark mode** — To'q ko'k-binafsha rangli dizayn
- **Responsive dizayn** — Mobil va desktop versiyalar
- **Qo'llab-quvvatlanadigan o'yinlar** — Valorant, CS2, PUBG Mobile

### Ishlab chiqilmoqda

- Guruhlar va jamoalar
- Turnirlar tizimi
- Real-time xabar almashish
- Bildirishnomalar
- Saqlangan postlar

---

## O'rnatish va Ishga Tushirish

### Talablar

- **Node.js** 18+
- **npm** yoki **yarn** yoki **pnpm**

### Qadamlar

```bash
# 1. Repozitoriyani klonlash
git clone <repo-url>
cd "Game Platform/frontend"

# 2. Bog'liqliklarni o'rnatish
npm install

# 3. Development serverni ishga tushirish
npm run dev
```

Brauzerda `http://localhost:3000` manzilida ochiladi.

### Boshqa buyruqlar

```bash
# Production uchun build
npm run build

# Statik sayt generatsiya qilish
npm run generate

# Build qilingan saytni ko'rish
npm run preview
```

---

## Dizayn Tizimi

### Ranglar palitasi (Dark Mode)

| Rang | Qiymat | Ishlatilishi |
|------|--------|-------------|
| Background | `hsl(240 10% 3.9%)` | Asosiy fon |
| Foreground | `hsl(0 0% 98%)` | Matn rangi |
| Primary | `hsl(263.4 70% 50.4%)` | Binafsha — asosiy rang |
| Accent | `hsl(240 5% 13%)` | Ikkinchi darajali elementlar |

### Gradient avatarlar

Har bir foydalanuvchiga noyob gradient ranglar juftligi tayinlanadi:
Emerald, Orange, Red, Blue, Pink, Amber kombinatsiyalari.

---

## Loyiha Arxitekturasi

```
┌─────────────────────────────────────────────┐
│                   Nuxt 3                     │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │  Pages   │  │ Layouts  │  │Components │  │
│  │ (Router) │  │          │  │ (shadcn)  │  │
│  └────┬─────┘  └────┬─────┘  └─────┬─────┘  │
│       │              │              │         │
│       └──────────────┼──────────────┘         │
│                      │                        │
│              ┌───────┴───────┐                │
│              │  Composables  │                │
│              │  & Utilities  │                │
│              └───────────────┘                │
│                                               │
│  ┌──────────────────────────────────────────┐│
│  │         Tailwind CSS + Dark Theme        ││
│  └──────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

- **Pages** — Nuxt 3 fayl asosidagi routing orqali avtomatik marshrutlash
- **Layouts** — Sahifa turlari uchun umumiy qobiqlar (auth, default, profile)
- **Components** — shadcn-nuxt orqali qayta ishlatiladigan UI komponentlar
- **Composables** — VueUse va maxsus kompozitsiya funksiyalari

---

## Mock Ma'lumotlar

Hozirda platforma frontend prototip sifatida ishlaydi. Oldindan yaratilgan foydalanuvchilar:

| Username | Ism | Ixtisoslik |
|----------|-----|-----------|
| `jasur_pro` | Jasur Karimov | — |
| `sardor_gg` | Sardor Aliyev | — |
| `nilu_gamer` | Nilufar Tech | — |
| `diyor_rush` | Diyor Rashidov | — |
| `bobur_aim` | Bobur Umarov | — |

Profil sahifalarini ko'rish: `/profile/jasur_pro`, `/profile/sardor_gg` va h.k.

---

## Kelajakdagi Rejalar

- [ ] Backend API (Node.js/Express yoki Python/Django)
- [ ] Ma'lumotlar bazasi integratsiyasi (PostgreSQL/MongoDB)
- [ ] Haqiqiy autentifikatsiya (JWT + OAuth — Google, Discord)
- [ ] Real-time chat (WebSocket)
- [ ] Fayl yuklash (avatar, post rasmlari)
- [ ] Turnir tizimi
- [ ] Guruhlar va jamoalar funksionali
- [ ] Bildirishnomalar tizimi
- [ ] CI/CD pipeline
- [ ] Docker konteynerizatsiya
- [ ] Deploy (Vercel / Railway / VPS)

---

## Muallif

**Aziz Bekmurodov** — Full-stack Developer

---

## Litsenziya

Bu loyiha shaxsiy foydalanish uchun mo'ljallangan.