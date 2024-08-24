# Usar una imagen base de Node
FROM node:18 AS build

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir el proyecto
RUN npm run build --prod

# Usar una imagen base de Nginx para servir el contenido
FROM nginx:alpine

# Copiar los archivos construidos a la carpeta de Nginx
COPY --from=build /app/dist/joke_haven_web /usr/share/nginx/html

# Exponer el puerto en el que Nginx estará escuchando
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
