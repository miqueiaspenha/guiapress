FROM node:14.17.3-stretch-slim

WORKDIR /user/app/public/assets
COPY package*.json ./
RUN npm install && npm audit fix

WORKDIR /user/app
COPY package*.json ./
RUN npm install && npm audit fix

COPY . .
EXPOSE 8080

CMD ["npm", "start"]
