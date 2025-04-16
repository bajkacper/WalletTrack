FROM --platform=$BUILDPLATFORM node:18 as builder

WORKDIR /app

RUN npm install -g @angular/cli@17

COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit --progress=false

COPY . .

RUN ng build --configuration production

FROM nginx:alpine as production

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/angular-sandbox/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
