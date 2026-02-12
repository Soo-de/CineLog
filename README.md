# 🎬 CineLog — Kişisel Film & Dizi Arşivi

> İzlediğiniz film ve dizileri arşivleyin, puanlayın, etiketleyin ve etkileyici sahneleri fotoğraflarıyla birlikte kaydedin. CineLog, sinema tutkunları için tasarlanmış modern ve şık bir kişisel arşiv uygulamasıdır.

---

## 📸 Ekran Görüntüleri

### 🏠 Ana Sayfa — Hero Alanı
Uygulamaya ilk girişte karşılayan karanlık temalı hero bölümü ve arşiv istatistikleri.

![Ana Sayfa — Hero](images/Home1.png)

### 🎞️ Ana Sayfa — Film Kartları
Arşivdeki filmler etkileyici kartlar halinde listelenir. Her kartta kapak fotoğrafı, puan, kategori, etiketler ve kısa değerlendirme görüntülenir.

![Ana Sayfa — Film Kartı](images/Home2.png)

### 📺 Ana Sayfa — Dizi Kartları
Diziler de aynı premium tasarımla listelenir; medya türü, puan ve etiketler bir bakışta görülür.

![Ana Sayfa — Dizi Kartı](images/Home3.png)

### 🔍 Arama & Filtreleme
Başlığa göre arama yapılabilir. Arama sonucu bulunamazsa kullanıcıya bilgilendirme mesajı gösterilir.

![Arama](images/Search.png)

### ➕ Yeni İçerik Ekleme
Film veya dizi eklemek için kapsamlı bir form: başlık, tür, kapak fotoğrafı, puan slider'ı, kategoriler, etiketler ve etkileyici sahne galerisi.

![Yeni Ekleme](images/Create.png)

### ✏️ İçerik Düzenleme
Mevcut içeriklerin tüm bilgileri düzenlenebilir. Seçili kategoriler ve etiketler formda önceden işaretli olarak gelir.

![Düzenleme](images/Update.png)

### 📄 Film Detay — Üst Bölüm
Detay sayfasında kapak fotoğrafı, puan, arşive eklenme tarihi, istatistikler (sahne, etiket, kategori sayıları) ve etiket rozetleri görüntülenir.

![Detay Üst](images/Detail1.png)

### 📄 Film Detay — Alt Bölüm
Değerlendirme metni ve etkileyici sahneler galerisi (fotoğraf + yorum) detay sayfasının alt kısmında yer alır.

![Detay Alt](images/Detail2.png)

### 🗑️ Silme Onayı
İçerik silinmeden önce kullanıcıya onay modalı gösterilir; yanlışlıkla silme işlemi engellenir.

![Silme Onayı](images/DeleteWarning.png)

---

## 🚀 Kullanılan Teknolojiler

| Teknoloji | Versiyon | Açıklama |
|---|---|---|
| **React** | v19 | Bileşen tabanlı kullanıcı arayüzü kütüphanesi |
| **Vite** | v7 | Hızlı geliştirme ortamı ve build aracı |
| **Tailwind CSS** | v4 | Utility-first CSS framework |
| **React Router** | v7 | SPA sayfa yönlendirme (client-side routing) |
| **Framer Motion** | v12 | Animasyonlar, geçiş efektleri ve gesture desteği |
| **Lucide React** | — | Hafif ve modern SVG ikon kütüphanesi |
| **UUID** | v13 | Benzersiz ID üretimi (`crypto.randomUUID`) |

### Veri Yönetimi

- **LocalStorage API** — Tüm veriler tarayıcıda kalıcı olarak saklanır
- **Custom Hook (`useLocalStorage`)** — State ve LocalStorage senkronizasyonu tek bir hook ile yönetilir
- Backend veya veritabanı gerektirmez, tamamen client-side çalışır

---

## ✨ Özellikler

### CRUD İşlemleri

| İşlem | Sayfa | Açıklama |
|---|---|---|
| ➕ **Ekleme (Create)** | `AddMovie.jsx` | Yeni film/dizi ekleme — başlık, kapak fotoğrafı, puan, kategori, etiket, değerlendirme ve sahne |
| 📋 **Listeleme (Read)** | `Home.jsx` | Tüm içerikleri galeri formatında listeleme, arama ve filtreleme |
| ✏️ **Güncelleme (Update)** | `EditMovie.jsx` | Mevcut içeriklerin tüm bilgilerini düzenleme |
| 🗑️ **Silme (Delete)** | `MovieDetail.jsx` | Onay modalı ile güvenli silme işlemi |

### Detaylı Özellik Listesi

- 🎨 **Premium UI Tasarımı** — Glassmorphism, gradient efektler, mor tema renk paleti
- 📱 **Responsive Tasarım** — Mobil, tablet ve masaüstü uyumlu
- 🔍 **Arama & Filtreleme** — Başlığa göre arama, kategoriye/etikete/medya türüne göre filtreleme
- ⭐ **Puanlama Sistemi** — 1-10 arası 0.5 hassasiyetinde slider ile puanlama
- 🏷️ **Etiket Sistemi** — Hazır etiketler + özel etiket ekleme (Başyapıt, Tekrar İzlenir, Ağlattı 😭 vb.)
- 📂 **Kategori Sistemi** — 14 farklı film/dizi kategorisi (Aksiyon, Komedi, Dram, Korku, Bilim Kurgu vb.)
- 🎬 **Sahne Galerisi** — Etkileyici sahneleri fotoğraf + yorum ile kaydetme
- 📺 **Film & Dizi Desteği** — Her iki medya türü için ayrı filtreleme
- 🖼️ **Kapak Fotoğrafı** — Dosyadan yükleme ve önizleme
- ✨ **Animasyonlar** — Sayfa geçişleri, kart animasyonları ve hover efektleri (Framer Motion)
- 🔒 **Silme Onayı** — Yanlışlıkla silmeyi önleyen onay modalı

---

## 📁 Proje Yapısı

```
cinelog/
├── public/                    # Statik dosyalar
├── src/
│   ├── Components/            # Yeniden kullanılabilir UI bileşenleri
│   │   ├── FilterBar.jsx      # Arama çubuğu ve filtre paneli
│   │   ├── MovieCard.jsx      # Film/dizi kartı bileşeni
│   │   ├── RatingDisplay.jsx  # Yıldız/puan gösterimi
│   │   ├── SceneGallery.jsx   # Sahne galerisi bileşeni
│   │   └── TagBadge.jsx       # Etiket rozeti bileşeni
│   │
│   ├── Pages/                 # Sayfa bileşenleri (route'lara karşılık gelir)
│   │   ├── Home.jsx           # Ana sayfa — listeleme, arama, filtreleme
│   │   ├── AddMovie.jsx       # Yeni film/dizi ekleme formu
│   │   ├── EditMovie.jsx      # Mevcut içerik düzenleme formu
│   │   └── MovieDetail.jsx    # İçerik detay sayfası
│   │
│   ├── Interfaces/            # Veri modelleri ve sabitler
│   │   ├── MovieModel.js      # Film veri yapısı (INITIAL_MOVIE_FORM)
│   │   └── constants.js       # Sabit değerler (GENRES, TAGS, MEDIA_TYPES)
│   │
│   ├── hooks/                 # Özel React hook'ları
│   │   └── useLocalStorage.js # LocalStorage + CRUD işlemleri hook'u
│   │
│   ├── App.jsx                # Ana uygulama — route tanımları
│   ├── main.jsx               # Giriş noktası — React DOM render
│   └── index.css              # Global stiller, tema değişkenleri, bileşen stilleri
│
├── index.html                 # HTML şablonu
├── vite.config.js             # Vite yapılandırması
├── package.json               # Proje bağımlılıkları ve script'ler
└── README.md
```

---

## 🛠️ Kurulum ve Çalıştırma

### Gereksinimler

- [Node.js](https://nodejs.org/) (v18 veya üzeri)
- npm (Node.js ile birlikte gelir)

### Adımlar

```bash
# 1. Projeyi klonlayın
git clone https://github.com/Soo-de/CineLog.git

# 2. Proje dizinine gidin
cd CineLog/cinelog

# 3. Bağımlılıkları yükleyin
npm install

# 4. Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde açılır.

### Diğer Komutlar

```bash
# Production build oluşturma
npm run build

# Build önizleme
npm run preview

# Kod kalitesi kontrolü (ESLint)
npm run lint
```

---

## 🌐 Netlify ile Yayına Alma

1. `npm run build` komutuyla production build oluşturun
2. [Netlify](https://www.netlify.com/) hesabınıza giriş yapın
3. "Add new site" → "Deploy manually" seçin
4. Oluşan `dist` klasörünü sürükleyip bırakın
5. Siteniz yayında! 🎉

---

## 📄 Sayfa Rotaları

| Rota | Sayfa | Açıklama |
|---|---|---|
| `/` | Home | Ana sayfa — tüm içeriklerin listesi |
| `/add` | AddMovie | Yeni film/dizi ekleme formu |
| `/movie/:id` | MovieDetail | Film/dizi detay sayfası |
| `/edit/:id` | EditMovie | İçerik düzenleme formu |

---

## 🧩 Bileşen Detayları

### `useLocalStorage` Hook — Veri Yönetimi

Tüm CRUD işlemleri `useMovies()` hook'u üzerinden yönetilir:

| Fonksiyon | İşlev |
|---|---|
| `addMovie(movie)` | Yeni film/dizi ekler, otomatik ID ve tarih atar |
| `updateMovie(id, updates)` | Mevcut filmi günceller |
| `deleteMovie(id)` | Filmi siler |
| `getMovie(id)` | ID'ye göre tek film getirir |
| `addScene(movieId, scene)` | Filme sahne ekler |
| `deleteScene(movieId, sceneId)` | Filmden sahne siler |

### Veri Modeli (`MovieModel.js`)

```javascript
{
    title: '',           // Film/dizi başlığı
    mediaType: 'Film',   // 'Film' veya 'Dizi'
    coverImage: '',      // Base64 kapak fotoğrafı
    rating: 7,           // 1-10 arası puan
    genres: [],          // Kategori listesi
    tags: [],            // Etiket listesi
    generalReview: '',   // Genel değerlendirme metni
    scenes: [],          // Etkileyici sahne listesi
    id: '',              // Otomatik UUID
    createdAt: ''        // Otomatik ISO tarih
}
```





<p align="center">
  <b>CineLog</b> ile izlediğiniz her anı kaydedin. 🎬✨
</p>
