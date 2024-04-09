FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g ts-node
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

