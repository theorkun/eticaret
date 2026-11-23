# VELOUR — Moda ve Aksesuar

Türkçe, mobil ekranlara uyarlanan bir e-ticaret konsept mağazası.

## Çalıştırma

`index.html` dosyasını tarayıcıda açın. Paket kurulumu veya derleme gerekmez.
Yerel sunucu kullanmak için bu klasörde `python -m http.server 8080` komutunu çalıştırıp `http://localhost:8080` adresini açabilirsiniz.

## Özellikler

- Ürün kataloğu, kategori filtreleri, arama ve fiyat sıralaması
- Ürün detayları ve beden seçimi
- Tarayıcıda saklanan favoriler ve sepet
- Sepette adet değiştirme, ürün kaldırma ve sipariş özeti
- Mobil menü ve farklı ekran boyutlarına uyarlanan düzen

## Dosyalar

- `index.html`: Sayfa yapısı
- `style.css`: Tasarım ve ekran uyarlamaları
- `app.js`: Örnek ürünler ve alışveriş etkileşimleri
- `assets/`: Projeye dahil edilmiş örnek görseller

## Kapsam

Bu sürüm tasarım ve etkileşim prototipidir. Gerçek ödeme alınmaz, sipariş oluşturulmaz ve bülten adresleri kaydedilmez. Gerçek satış için sunucu, stok, ödeme ve teslimat hizmetleri bağlanmalıdır. Ürünler, fiyatlar ve hizmet koşulları örnektir.

Sepet ve favoriler `localStorage` üzerinden aynı tarayıcıda saklanır. Yazı tipleri Google Fonts üzerinden yüklenir; internet bağlantısı yoksa sistem yazı tipleri kullanılır. Örnek fotoğraflar Unsplash kaynaklıdır.

JavaScript sözdizimi ve alışveriş mantığı kontrolleri tamamlandı. Tarayıcı aracı kullanılamadığı için bu sürümün görsel tarayıcı doğrulaması tamamlanmadı.
