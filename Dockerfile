# Menggunakan image Node.js sebagai dasar
FROM node:latest

# Buat directori kerja didalam image
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install Dependensi Aplikasi
RUN npm install

# Salin seluruh code sumber aplikasi
COPY ..

# Expose port yang akan di gunakan oleh aplikasi
EXPOSE 3000

# Menjalakan apliaksi ketika container dijalankan
CMD ["npm", "start"]
