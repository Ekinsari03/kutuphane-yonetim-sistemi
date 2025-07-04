# GitHub'a Proje Yükleme Yönergeleri

Bu dokümanda, Kütüphane Yönetim Sistemi projesini GitHub'a nasıl yükleyeceğinize dair adım adım yönergeler bulacaksınız.

## 🚀 Hızlı Başlangıç

### 1. GitHub Repository Oluşturma

1. **GitHub'a giriş yapın**: https://github.com
2. **Yeni repository oluşturun**:
   - "New repository" butonuna tıklayın
   - Repository adı: `kutuphane-yonetim-sistemi` (veya istediğiniz isim)
   - Açıklama: `Next.js ile geliştirilmiş modern kütüphane yönetim sistemi`
   - Public veya Private seçin
   - **README.md eklemeyiniz** (zaten mevcutta var)
   - **.gitignore eklemeyiniz** (zaten mevcutta var)
   - License seçebilirsiniz (MIT önerisi)

### 2. Yerel Git Ayarları

Proje dizininde aşağıdaki komutları çalıştırın:

```bash
# Proje dizinine gidin
cd c:\library-app

# Git kullanıcı bilgilerini ayarlayın (ilk kez kullanıyorsanız)
git config --global user.name "Adınız Soyadınız"
git config --global user.email "email@example.com"

# Uzak repository'yi ekleyin (GitHub'da oluşturduğunuz repo URL'si)
git remote add origin https://github.com/KULLANICI_ADINIZ/kutuphane-yonetim-sistemi.git

# Mevcut branch'i main olarak ayarlayın
git branch -M main
```

### 3. Proje Dosyalarını Yükleme

```bash
# Tüm dosyaları staging area'ya ekleyin
git add .

# İlk commit'i oluşturun
git commit -m "🎉 İlk commit: Kütüphane Yönetim Sistemi

- Next.js 15 ile modern web uygulaması
- Prisma ORM ile SQLite veritabanı
- NextAuth.js ile güvenli kimlik doğrulama
- Tailwind CSS ile responsive tasarım
- Admin paneli ve kullanıcı yönetimi
- Mesajlaşma sistemi
- Kitap ve kategori yönetimi
- Profil yönetimi ve avatar sistemi"

# GitHub'a yükleyin
git push -u origin main
```

## 🔧 Env Dosyası Güvenliği

⚠️ **Önemli**: `.env` dosyası hassas bilgiler içerir ve GitHub'a yüklenmemelidir.

### Güvenlik Kontrolleri:

1. **`.gitignore` dosyasını kontrol edin**:
```bash
# .gitignore dosyasında bu satırların olduğundan emin olun:
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

2. **Env örnek dosyası oluşturun**:
```bash
# .env.example dosyası oluşturun
cp .env .env.example
```

3. **Hassas bilgileri temizleyin**:
`.env.example` dosyasını düzenleyip gerçek değerler yerine örnek değerler yazın:
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Application
NODE_ENV="development"
```

## 📝 README.md Güncelleme

Projenizin README.md dosyasını güncelleyin:

```bash
# README.md dosyasını düzenleyin
notepad README.md
```

Aşağıdaki içeriği ekleyin:

```markdown
# 🏛️ Kütüphane Yönetim Sistemi

Modern web teknolojileri kullanılarak geliştirilmiş kapsamlı bir dijital kütüphane yönetim sistemi.

## 🚀 Özellikler

- **Kullanıcı Yönetimi**: Kayıt, giriş, profil yönetimi
- **Kitap Yönetimi**: Kitap ekleme, düzenleme, silme
- **Kategori Sistemi**: Kitap kategorileri oluşturma ve yönetme
- **Mesajlaşma**: Kullanıcılar arası mesajlaşma
- **Admin Paneli**: Sistem yönetimi ve kullanıcı kontrolü
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

## 🛠️ Teknolojiler

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: SQLite, Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Password Hashing**: bcrypt

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar
1. Projeyi klonlayın
2. Bağımlılıkları yükleyin
3. Veritabanını ayarlayın
4. Uygulamayı başlatın

Detaylı kurulum talimatları için [KURULUM.md](KURULUM.md) dosyasını inceleyiniz.

## 🎯 Demo

Canlı demo: [link buraya]

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
```

## 🔄 Güncellemeler için Git Komutları

Gelecekte proje güncellemeleri için:

```bash
# Değişiklikleri kontrol edin
git status

# Değişiklikleri ekleyin
git add .

# Commit mesajı ile kaydedin
git commit -m "✨ Yeni özellik: [özellik açıklaması]"

# GitHub'a gönderin
git push origin main
```

## 📊 Git Commit Mesaj Formatı

Düzenli commit mesajları için emoji kullanın:

```bash
# Yeni özellik
git commit -m "✨ Yeni özellik: kullanıcı avatar sistemi"

# Hata düzeltme
git commit -m "🐛 Düzeltme: çıkış sayfası yönlendirme hatası"

# Dokümantasyon
git commit -m "📝 Dokümantasyon: kurulum talimatları"

# Performans
git commit -m "⚡ Performans: veritabanı sorgu optimizasyonu"

# Güvenlik
git commit -m "🔒 Güvenlik: şifre hashleme iyileştirmesi"

# Refactoring
git commit -m "♻️ Refactor: API route'ları yeniden düzenleme"
```

## 🏷️ Sürüm Etiketleme

Sürüm yayınları için:

```bash
# Sürüm etiketi oluşturun
git tag -a v1.0.0 -m "🎉 İlk stabil sürüm"

# Etiketleri GitHub'a gönderin
git push origin --tags
```

## 🚨 Yaygın Hatalar ve Çözümleri

### 1. "Repository already exists" hatası
```bash
# Mevcut remote'u kontrol edin
git remote -v

# Yanlış remote varsa kaldırın
git remote remove origin

# Doğru remote'u ekleyin
git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADI.git
```

### 2. "Permission denied" hatası
```bash
# SSH key oluşturun (eğer yoksa)
ssh-keygen -t ed25519 -C "your_email@example.com"

# SSH key'i GitHub'a ekleyin
# Veya HTTPS kullanın ve token ile giriş yapın
```

### 3. "Merge conflict" hatası
```bash
# Değişiklikleri çekin
git pull origin main

# Conflict'leri manuel olarak çözün
# Sonra commit edin
git add .
git commit -m "🔀 Merge conflict çözüldü"
git push origin main
```

## 📞 Yardım

Sorun yaşadığınızda:
1. Git dokümantasyonunu inceleyin: https://git-scm.com/docs
2. GitHub yardım sayfasına başvurun: https://docs.github.com
3. Proje geliştirici ile iletişime geçin

---

**Not**: Bu yönergeler Windows PowerShell için optimizedir. macOS/Linux kullanıcıları bash komutları kullanabilir.
