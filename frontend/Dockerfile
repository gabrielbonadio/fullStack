# Usa a mesma versão do Node do backend
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]