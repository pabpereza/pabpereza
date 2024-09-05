# Usar una imagen base de Node.js
FROM node:18 as builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los requisitos de la aplicación al contenedor
COPY package.json .

# Instalar las dependencias
RUN yarn install

# Copiar el resto de los archivos al contenedor
COPY . .

# Construir el sitio de Docusaurus
RUN yarn build

RUN ls -la

# Usar una imagen base de Nginx para servir el sitio estático
FROM nginx:alpine

# Copiar el sitio estático al contenedor de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80


