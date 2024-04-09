FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g ts-node
COPY . .
RUN npm run build
RUN npm run generate
EXPOSE 3000
CMD ["npm", "run", "dev"]

