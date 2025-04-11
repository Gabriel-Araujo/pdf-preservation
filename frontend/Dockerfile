FROM node:22
LABEL authors="Gabriel S. C. Araujo"

WORKDIR /usr/src/front/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 3000