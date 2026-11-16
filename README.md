# Auth0 ile Güvenli Oturum Yönetimi

Bu proje, Auth0 ile kimlik doğrulama, NextAuth.js v4 ile JWT tabanlı oturum yönetimi ve Next.js middleware ile korunan rota erişimi sunan bir Next.js uygulamasıdır.

## Kullanılan Teknolojiler

- Next.js 15.5.29 ve App Router
- NextAuth.js 4.24.15
- Auth0
- TypeScript
- Tailwind CSS 4
- npm

## Ön Koşullar

- Node.js 20 veya üzeri
- npm
- Bir Auth0 hesabı ve tenant
- Auth0 üzerinde `Regular Web Application` türünde bir uygulama

## Kurulum

Projeyi klonladıktan sonra geliştirme dalına geçin ve bağımlılıkları kilit dosyasından kurun:

```powershell
git checkout dev/v1.0.0
npm ci
```

Örnek ortam dosyasını yerel ayarlar için kopyalayın:

```powershell
Copy-Item .env.example .env.local
```

`.env.local` dosyasında aşağıdaki değişkenleri kendi bilgilerinizle doldurun:

| Değişken | Açıklama |
| --- | --- |
| `NEXTAUTH_URL` | Yerel geliştirmede `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Oturum güvenliği için güçlü ve rastgele bir değer |
| `AUTH0_CLIENT_ID` | Auth0 uygulamasının Client ID değeri |
| `AUTH0_CLIENT_SECRET` | Auth0 uygulamasının Client Secret değeri |
| `AUTH0_ISSUER` | Auth0 tenant adresi, örneğin `https://tenant-name.auth0.com` |

Gerçek kimlik bilgilerini `.env.example`, README veya Git geçmişine eklemeyin. `.env.local` ve `.env` dosyaları Git tarafından yok sayılır.

## Auth0 Ayarları

Auth0 Dashboard üzerinden uygulamanızın türünü `Regular Web Application` olarak ayarlayın.

Allowed Callback URLs alanına şu adresi ekleyin:

```text
http://localhost:3000/api/auth/callback/auth0
```

`AUTH0_ISSUER`, Auth0 uygulama ayarlarındaki domain ile eşleşmelidir. Değeri `https://` ile yazın ve sonuna `/` eklemeyin.

## Uygulamayı Çalıştırma

Geliştirme sunucusunu başlatın:

```powershell
npm run dev
```

Ardından `http://localhost:3000` adresini açın.

Temel rotalar:

- `/`: Uygulamanın ana sayfası
- `/login`: Auth0 giriş akışını başlatan sayfa
- `/dashboard`: Oturum gerektiren korumalı sayfa
- `/api/auth/*`: NextAuth.js API uçları

## Mimari

Auth0 kimlik doğrulama sağlayıcısı olarak kullanılır. NextAuth.js, başarılı girişten sonra oturumu `jwt` stratejisiyle yönetir. Oturum bilgisi uygulama süreç belleğinde tutulmaz.

`src/middleware.ts`, yalnızca `/dashboard` ve alt rotalarına gelen istekleri denetler. Oturumu olmayan kullanıcılar, güvenli bir uygulama içi dönüş adresiyle `/login` sayfasına yönlendirilir. Dashboard sayfası middleware kontrolüne ek olarak sunucu tarafında da oturumu doğrular.

Auth yapılandırması ile App Router `GET` ve `POST` handler'ları ayrı dosyalarda tutulur.

## Çıkış Davranışı

Çıkış düğmesi NextAuth.js tarafından yönetilen uygulama oturumunu sonlandırır ve kullanıcıyı `/login` sayfasına yönlendirir.

Bu işlem Auth0 üzerindeki SSO oturumunu sonlandırmaz. Auth0 oturumu hâlâ açıksa kullanıcı daha sonra yeniden giriş yaptığında parola ekranı gösterilmeden uygulamaya dönebilir. Uygulama, Auth0 tarafında da çıkış yapıldığı iddiasında bulunmaz.

## Test

Otomatik kontrolleri çalıştırın:

```powershell
npm run lint
npx tsc --noEmit
npm run build
git diff --check
```

Tarayıcıda temel akışı doğrulayın:

1. Gizli pencerede `http://localhost:3000/dashboard` adresini açın.
2. `/login?callbackUrl=%2Fdashboard` adresine yönlendirildiğinizi doğrulayın.
3. Auth0 ile giriş yapın ve `/dashboard` sayfasına döndüğünüzü kontrol edin.
4. Dashboard üzerinde adınızın veya e-posta adresinizin gösterildiğini doğrulayın.
5. Sayfayı yenileyin ve oturumun devam ettiğini kontrol edin.
6. Çıkış yapın ve `/login` sayfasına döndüğünüzü doğrulayın.
7. Çıkıştan sonra `/dashboard` adresini yeniden açın ve giriş sayfasına yönlendirildiğinizi kontrol edin.
8. Auth0 girişini iptal ederek anlaşılır Türkçe hata mesajı ve tekrar deneme seçeneğinin gösterildiğini doğrulayın.

Auth0 sağlayıcı yapılandırmasını kontrol etmek için uygulama çalışırken `http://localhost:3000/api/auth/providers` adresini açabilirsiniz.
