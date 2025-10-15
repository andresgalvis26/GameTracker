# ==========================
# 1️⃣ Etapa de compilación
# ==========================
FROM node:22 AS builder

# Definimos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos package.json y package-lock.json para aprovechar la caché
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Si tienes TypeScript, aquí podrías compilar:
# RUN npm run build

# ==========================
# 2️⃣ Etapa de ejecución
# ==========================
#FROM node:22-slim AS runner
FROM gcr.io/distroless/nodejs22:nonroot

# Definimos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos solo los archivos necesarios desde la etapa de compilación
COPY --from=builder /usr/src/app ./

# Exponemos el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para iniciar la aplicación
#CMD ["npm", "start"]
CMD ["app.js"]

