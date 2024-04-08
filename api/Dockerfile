FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g ts-node
COPY . .
CMD ["npm", "run", "dev"]
