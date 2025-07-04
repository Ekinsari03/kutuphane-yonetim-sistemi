# Kütüphane Yönetim Sistemi - Proje Raporu

---

## 📋 Proje Konusu ve Amacı

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş kapsamlı bir **dijital kütüphane yönetim sistemi**dir. Projenin temel amacı, geleneksel kütüphane işlemlerini dijital ortama taşıyarak hem kullanıcılar hem de yöneticiler için verimli bir platform sunmaktır.

### Çözülen Problemler:
- **Kitap Yönetimi**: Fiziksel kitap kayıtlarının dijital ortamda tutulması
- **Kullanıcı Yönetimi**: Kütüphane üyelerinin sistematik takibi
- **Mesajlaşma**: Kullanıcılar arası iletişim imkanı
- **Rol Tabanlı Erişim**: Admin ve normal kullanıcı ayrımı ile güvenli erişim
- **Kategori Yönetimi**: Kitapların sistematik sınıflandırılması

### Hedef Kitle:
- Kütüphane yöneticileri (Admin kullanıcılar)
- Kütüphane üyeleri (Normal kullanıcılar)
- Kitap araştırmacıları

---

## 🚀 Planlama ve Geliştirme Süreci

### Planlama Aşaması:
1. **Gereksinim Analizi**: Kütüphane sisteminin ihtiyaçları belirlendi
2. **Teknoloji Seçimi**: Modern web teknolojileri tercih edildi
3. **Veritabanı Tasarımı**: İlişkisel veritabanı yapısı planlandı
4. **UI/UX Tasarımı**: Kullanıcı dostu arayüz tasarlandı

### Geliştirme Süreci:
1. **Proje Kurulumu** (1. Gün)
   - Next.js projesi oluşturuldu
   - Gerekli paketler yüklendi
   - Temel yapılandırmalar yapıldı

2. **Veritabanı Katmanı** (2. Gün)
   - Prisma ORM kuruldu
   - Veritabanı şeması tasarlandı
   - Migration ve seed işlemleri yapıldı

3. **Kimlik Doğrulama** (3. Gün)
   - NextAuth.js entegrasyonu
   - Kayıt/giriş sayfaları
   - Güvenlik katmanı

4. **Temel Sayfalar** (4-5. Gün)
   - Ana sayfa, kitaplar, profil sayfaları
   - Navigasyon sistemi
   - Responsive tasarım

5. **Admin Paneli** (6-7. Gün)
   - Kullanıcı yönetimi
   - Kitap yönetimi
   - Kategori yönetimi

6. **Mesajlaşma Sistemi** (8. Gün)
   - Kullanıcılar arası mesajlaşma
   - Mesaj listeleme ve gönderme

7. **Test ve İyileştirme** (9-10. Gün)
   - Hata giderme
   - Performans optimizasyonu
   - Kullanıcı deneyimi iyileştirmeleri

---

## 🔧 Modüller ve İşlevleri

### 1. **Kimlik Doğrulama Modülü**
- **Dosyalar**: `src/app/login/`, `src/app/register/`, `src/lib/auth.ts`
- **İşlevler**: Kullanıcı kayıt, giriş, çıkış işlemleri
- **Güvenlik**: Şifre hashleme, JWT token yönetimi

### 2. **Kullanıcı Yönetimi Modülü**
- **Dosyalar**: `src/app/users/`, `src/app/profile/`, `src/components/ProfileForm.tsx`
- **İşlevler**: Profil görüntüleme, düzenleme, kullanıcı arama
- **Özellikler**: Avatar sistemi, profil bilgileri

### 3. **Kitap Yönetimi Modülü**
- **Dosyalar**: `src/app/books/`, `src/components/BooksList.tsx`
- **İşlevler**: Kitap listeleme, arama, filtreleme
- **Özellikler**: Kategori bazlı gruplandırma, detay görüntüleme

### 4. **Mesajlaşma Modülü**
- **Dosyalar**: `src/app/messages/`, `src/components/MessageList.tsx`, `src/components/SendMessageForm.tsx`
- **İşlevler**: Mesaj gönderme, alma, listeleme
- **Özellikler**: Kullanıcılar arası iletişim

### 5. **Admin Paneli Modülü**
- **Dosyalar**: `src/app/admin/`, `src/components/admin/`
- **İşlevler**: Sistem yönetimi, kullanıcı kontrolü
- **Özellikler**: Rol tabanlı erişim, CRUD işlemleri

### 6. **Kategori Yönetimi Modülü**
- **Dosyalar**: `src/app/admin/categories/`, `src/components/admin/CategoryManagement.tsx`
- **İşlevler**: Kategori ekleme, silme, düzenleme
- **Özellikler**: Kitap kategorileri yönetimi

---

## 🏗️ Kodlama Yapısı

### Proje Mimarisi:
```
library-app/
├── prisma/                 # Veritabanı şeması ve konfigürasyonu
│   ├── schema.prisma      # Veritabanı modelleri
│   ├── seed.js           # Örnek veri oluşturma
│   └── migrations/       # Veritabanı migration dosyaları
├── src/
│   ├── app/              # Next.js App Router sayfaları
│   │   ├── admin/        # Admin paneli sayfaları
│   │   ├── api/          # API route'ları
│   │   ├── books/        # Kitap sayfaları
│   │   ├── messages/     # Mesaj sayfaları
│   │   ├── profile/      # Profil sayfaları
│   │   └── users/        # Kullanıcı sayfaları
│   ├── components/       # React bileşenleri
│   │   ├── admin/        # Admin bileşenleri
│   │   └── ui/           # UI bileşenleri
│   ├── lib/              # Yardımcı kütüphaneler
│   │   ├── auth.ts       # NextAuth konfigürasyonu
│   │   └── prisma.ts     # Prisma client
│   └── types/            # TypeScript tip tanımlamaları
├── .env                  # Çevre değişkenleri
└── middleware.ts         # Next.js middleware (yetkilendirme)
```

### Kullanılan Teknolojiler:

#### Frontend:
- **Next.js 15.3.4**: React framework (App Router)
- **React 19**: UI kütüphanesi
- **TypeScript**: Tip güvenliği
- **Tailwind CSS 4**: Styling framework

#### Backend:
- **Next.js API Routes**: Backend API'ler
- **Prisma 6.11.1**: ORM (Object-Relational Mapping)
- **SQLite**: Veritabanı

#### Kimlik Doğrulama:
- **NextAuth.js 4.24.11**: Authentication library
- **bcrypt 6.0.0**: Şifre hashleme

#### Geliştirme Araçları:
- **ESLint**: Kod kalitesi
- **Turbopack**: Hızlı geliştirme

### Veritabanı Yapısı:

```sql
-- 5 Ana Tablo
User (id, name, email, password, role, createdAt)
Book (id, title, author, description, categoryId, createdById)
Category (id, name)
Message (id, fromId, toId, content, createdAt)
Profile (id, userId, bio, avatarUrl, location)

-- İlişkiler
User ↔ Profile (1:1)
User ↔ Message (1:N)
Category ↔ Book (1:N)
User ↔ Book (1:N)
```

---

## 📚 Kazanımlar ve Değerlendirme

### Teknik Kazanımlar:
1. **Full-Stack Geliştirme**: Next.js ile hem frontend hem backend geliştirme
2. **Modern React**: Hooks, Server Components, Client Components
3. **Veritabanı Yönetimi**: Prisma ORM ile ilişkisel veritabanı işlemleri
4. **Kimlik Doğrulama**: NextAuth.js ile güvenli authentication
5. **TypeScript**: Tip güvenliği ve geliştirici deneyimi
6. **Responsive Design**: Tailwind CSS ile modern UI tasarımı

### Karşılaşılan Zorluklar:
1. **Server/Client Component Ayrımı**: Next.js 13+ App Router'da component yapısı
2. **Prisma İlişkileri**: Karmaşık veritabanı ilişkilerinin kurulması
3. **NextAuth Konfigürasyonu**: Custom signout sayfası entegrasyonu
4. **State Management**: Client ve server state yönetimi
5. **TypeScript Hataları**: Tip uyumsuzluklarının çözülmesi

### Çözüm Stratejileri:
- **Dokümantasyon İnceleme**: Resmi dökümanlardan faydalanma
- **Incremental Development**: Adım adım geliştirme
- **Error Handling**: Detaylı hata yönetimi
- **Testing**: Her özellik için test yapma

### Genel Değerlendirme:
Proje başarıyla tamamlanmış ve tüm hedeflenen özellikler implemente edilmiştir. Modern web teknolojileri kullanılarak, ölçeklenebilir ve maintainable bir sistem geliştirilmiştir.

---

## ⚙️ Bileşenlerin Genel İşleyişi

### 1. **Ana Sayfa (Homepage)**
```typescript
// src/app/page.tsx
- Server Component olarak çalışır
- Session kontrolü yapar
- Kategorileri Prisma ile getirir
- Dinamik navigasyon menüsü oluşturur
- Responsive tasarım ile kullanıcı karşılar
```

### 2. **Kimlik Doğrulama Sistemi**
```typescript
// src/lib/auth.ts
- NextAuth.js konfigürasyonu
- Credentials Provider kullanır
- bcrypt ile şifre doğrulama
- JWT token yönetimi
- Custom sign-in/sign-out sayfaları
```

### 3. **Kitap Yönetimi**
```typescript
// src/app/books/page.tsx
- Server Component
- Prisma ile kitap ve kategori verileri
- Filtreleme ve arama özellikleri
- Kategori bazlı gruplandırma
- Sayfalama desteği
```

### 4. **Mesajlaşma Sistemi**
```typescript
// src/app/messages/page.tsx
- Hybrid (Server + Client) Component
- Mesaj listesi server-side render
- Mesaj gönderme client-side
- Real-time değil, sayfa yenileme bazlı
- Kullanıcı seçimi dropdown'u
```

### 5. **Admin Paneli**
```typescript
// src/app/admin/
- Middleware ile korumalı
- Role-based access control (RBAC)
- CRUD işlemleri için API routes
- Kullanıcı, kitap, kategori yönetimi
- Bulk işlemler desteği
```

### 6. **Profil Sistemi**
```typescript
// src/app/profile/
- Server + Client Components
- Avatar sistemi (harfli/renkli)
- Profil düzenleme formu
- Kullanıcı bilgileri güncelleme
- Güvenli form validation
```

### 7. **Middleware ve Güvenlik**
```typescript
// src/middleware.ts
- Route koruması
- Role tabanlı erişim
- Session kontrolü
- Redirect yönetimi
- Admin route koruması
```

### 8. **API Routes**
```typescript
// src/app/api/
- RESTful API endpoints
- Prisma ile veritabanı işlemleri
- Error handling
- Input validation
- Response standardizasyonu
```

### Teknik Öne Çıkan Özellikler:

1. **Server-Side Rendering**: SEO dostu ve performanslı
2. **Client-Side Interactions**: Dinamik kullanıcı deneyimi
3. **Type Safety**: TypeScript ile güvenli kod
4. **Database Relations**: Karmaşık ilişkiler yönetimi
5. **Authentication Flow**: Güvenli kimlik doğrulama
6. **Role-Based Access**: Granular yetkilendirme
7. **Responsive Design**: Mobil uyumlu tasarım
8. **Error Handling**: Kapsamlı hata yönetimi

---

## 🎯 Sonuç

Bu proje, modern web geliştirme teknolojilerini kullanarak kapsamlı bir kütüphane yönetim sistemi oluşturmayı başarmıştır. Tüm belirlenen gereksinimler yerine getirilmiş, bonus özellikler eklenmiş ve kullanıcı dostu bir arayüz tasarlanmıştır.

**Proje GitHub Repository**: *link adresi buraya ekinnnnnnnnnnnnnnnnnnnn!!!!!*

---

**Geliştirici**: Ekin SARI
**Tarih**: 25 Ağustos 2025
**Versiyon**: 1.0.0
