# Resmi Node imajını kullan
FROM node:18-alpine

# Çalışma dizini oluştur
WORKDIR /app

# Paket dosyalarını kopyala ve yükle
COPY package.json package-lock.json ./
RUN npm install

# Proje dosyalarını kopyala
COPY . .

# Next.js için production build
RUN npm run build

# Uygulamayı başlatmak için port aç
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"]
