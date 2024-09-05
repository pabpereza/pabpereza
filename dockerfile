# Usar una imagen base de Node.js
FROM node:18

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

# Exponer el puerto en el que la aplicación se ejecuta
EXPOSE 3000

# Definir el comando para iniciar la aplicación
CMD ["npm", "run", "serve"]