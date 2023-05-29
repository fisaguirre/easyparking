FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
RUN npm run build
FROM nginx:stable-alpine
COPY --from=0 /app/build /usr/share/nginx/html
