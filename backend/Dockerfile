FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ build-base sqlite-dev

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN mkdir -p /app/data /app/uploads && chown -R node:node /app/data /app/uploads

ENV PORT=3000
EXPOSE 3000

CMD [ "node", "server.js" ]