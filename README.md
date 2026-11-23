# Rabüs — Moda ve Aksesuar

Türkçe, mobil ekranlara uyarlanan bir e-ticaret konsept mağazası.

GitHub Pages: https://theorkun.github.io/eticaret/

Rabüs tasarımı; markaya özel bordo kampanya görseli, serif marka yazısı, görselli kategori bağlantıları, ferah ürün kartları ve mobil ekranlara uyarlanan bir sayfa düzeni içerir.

## Çalıştırma

`index.html` dosyasını tarayıcıda açın. Paket kurulumu veya derleme gerekmez.
Yerel sunucu kullanmak için bu klasörde `python -m http.server 8080` komutunu çalıştırıp `http://localhost:8080` adresini açabilirsiniz.

## Özellikler

- Ürün kataloğu, kategori filtreleri, arama ve fiyat sıralaması
- Ürün detayları ve beden seçimi
- Tarayıcıda saklanan favoriler ve sepet
- Sepette adet değiştirme, ürün kaldırma ve sipariş özeti
- Kart bilgisi istemeyen üç adımlı deneme ödeme akışı: teslimat, ödeme senaryosu ve sonuç
- Örnek teslimat bilgileri, örnek kargo ücretleri ve başarılı/başarısız sonuçları yeniden deneme
- Mobil menü ve farklı ekran boyutlarına uyarlanan düzen

## Dosyalar

- `index.html`: Sayfa yapısı
- `style.css`: Tasarım ve ekran uyarlamaları
- `app.js`: Örnek ürünler ve alışveriş etkileşimleri
- `checkout.css`: Deneme ödeme ekranı ve mobil düzeni
- `assets/`: Projeye dahil edilmiş örnek görseller

## Kapsam

Bu sürüm tasarım ve etkileşim prototipidir. Gerçek ödeme alınmaz, sipariş oluşturulmaz ve bülten adresleri kaydedilmez. Gerçek satış için sunucu, stok, ödeme ve teslimat hizmetleri bağlanmalıdır. Ürünler, fiyatlar ve hizmet koşulları örnektir.

## Deneme ödeme akışı

Sepete ürün ekleyin, sepeti açıp **Deneme ödemesine geç** düğmesine basın. Teslimat formunda **Örnek bilgilerle doldur** seçeneğini kullanabilirsiniz. Gerçek kişisel bilgi veya kart bilgisi girmeniz gerekmez. Standart kargo 2.500 TL altında örnek 69,90 TL, bu tutar ve üzerinde ücretsizdir; hızlı kargo örnek 149,90 TL'dir.

İkinci adımda başarılı veya başarısız deneme senaryosunu seçin. Sonuç ekranındaki `DEMO-RBS-…` referansı gerçek bir sipariş numarası değildir. Deneme sonunda sepet korunur. Teslimat bilgileri yalnızca bellekte tutulur; sunucuya gönderilmez, localStorage'a yazılmaz ve ekran kapatılınca silinir. Hiçbir ödeme kuruluşuna bağlantı kurulmaz.

Sepet ve favoriler `localStorage` üzerinden aynı tarayıcıda saklanır. Önceki sürümdeki geçerli kayıtlar yeni Rabüs anahtarlarına aktarılır. Yazı tipleri Google Fonts üzerinden yüklenir; internet bağlantısı yoksa sistem yazı tipleri kullanılır. Ürün fotoğrafları Unsplash kaynaklıdır. Rabüs kampanya görseli yerleşik ImageGen aracıyla üretildi; kullanılan istem ve dosya bilgisi [görsel notlarında](assets/IMAGE-NOTES.md) bulunur.

JavaScript sözdizimi ve alışveriş mantığı kontrolleri tamamlandı. Tarayıcı aracı kullanılamadığı için bu sürümün görsel tarayıcı doğrulaması tamamlanmadı.
