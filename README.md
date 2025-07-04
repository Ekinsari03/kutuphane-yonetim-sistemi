# Kütüphane Yönetim Sistemi

Modern bir kütüphane yönetim sistemi. Kullanıcılar kitapları görüntüleyebilir, mesajlaşabilir ve profillerini yönetebilir. Admin kullanıcılar ise sistemi tam olarak yönetebilir.

## 🚀 Özellikler

### 🔐 Kimlik Doğrulama
- Kullanıcı kayıt ve giriş sistemi
- Rol tabanlı yetkilendirme (User/Admin)
- Güvenli şifre hashleme (bcrypt)
- NextAuth.js ile session yönetimi

### 👥 Kullanıcı Özellikleri
- **Profil Yönetimi**: Biyografi, konum ve profil fotoğrafı
- **Kitap Görüntüleme**: Tüm kitapları kategori bazında görüntüleme
- **Mesajlaşma**: Diğer kullanıcılarla mesajlaşma
- **Responsive Tasarım**: Mobil uyumlu modern arayüz

### 👨‍💼 Admin Özellikleri
- **Kullanıcı Yönetimi**: Kullanıcıları listeleme, silme, rol değiştirme
- **Kitap Yönetimi**: Kitap ekleme, düzenleme, silme
- **Kategori Yönetimi**: Kategori ekleme ve silme
- **Dashboard**: Sistem istatistikleri

## 🛠️ Teknolojiler

- **Framework**: Next.js 15 (App Router)
- **Veritabanı**: SQLite + Prisma ORM
- **Kimlik Doğrulama**: NextAuth.js
- **Stil**: Tailwind CSS
- **Dil**: TypeScript

## 📦 Kurulum

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd library-app
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Veritabanını oluşturun:**
```bash
npx prisma migrate dev --name init
```

4. **Örnek verileri yükleyin:**
```bash
npm run db:seed
```

5. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 🔑 Test Hesapları

Seed script'i çalıştırdıktan sonra aşağıdaki test hesaplarını kullanabilirsiniz:

### Admin Hesabı
- **Email**: admin@kutuphane.com
- **Şifre**: admin123

### Kullanıcı Hesabı
- **Email**: user@kutuphane.com
- **Şifre**: user123

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── admin/             # Admin paneli sayfaları
│   ├── api/               # API route'ları
│   ├── auth/              # Kimlik doğrulama sayfaları
│   ├── books/             # Kitap sayfaları
│   ├── messages/          # Mesaj sayfaları
│   └── profile/           # Profil sayfaları
├── components/            # React bileşenleri
│   └── admin/             # Admin bileşenleri
├── lib/                   # Yardımcı kütüphaneler
└── types/                 # TypeScript tip tanımları
```

## 🗄️ Veritabanı Şeması

### Tablolar
- **User**: Kullanıcı bilgileri ve roller
- **Profile**: Genişletilmiş profil bilgileri
- **Book**: Kitap bilgileri
- **Category**: Kitap kategorileri
- **Message**: Kullanıcı mesajları

### İlişkiler
- User ↔ Profile (1:1)
- User ↔ Message (1:N)
- Category ↔ Book (1:N)
- User ↔ Book (1:N - kitapları ekleyen admin)

## 🔧 Geliştirme

### Veritabanı Değişiklikleri
```bash
# Yeni migration oluştur
npx prisma migrate dev --name your-migration-name

# Prisma Client'ı yeniden oluştur
npx prisma generate

# Veritabanını sıfırla
npx prisma migrate reset
```

### Linting ve Formatting
```bash
# Linting
npm run lint

# Build
npm run build
```

## 🎯 Kullanım Senaryoları

### Normal Kullanıcı
1. Kayıt olun veya giriş yapın
2. Profil bilgilerinizi güncelleyin
3. Kitap koleksiyonunu inceleyin
4. Diğer kullanıcılarla mesajlaşın

### Admin Kullanıcı
1. Admin hesabıyla giriş yapın
2. Admin Panel'e erişin
3. Kategoriler oluşturun
4. Kitaplar ekleyin
5. Kullanıcıları yönetin

## 📝 Notlar

- Sistem güvenliği için şifreler bcrypt ile hashlenir
- Admin kullanıcılar kendi rollerini değiştiremez
- Mesajlaşma sistemi gerçek zamanlı değildir
- Kategori silinmeden önce o kategorideki kitaplar silinmeli

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
