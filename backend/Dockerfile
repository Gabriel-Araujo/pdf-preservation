FROM node:22
LABEL authors="Gabriel S. C. Araujo"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
ENV PORT=5000

CMD ["npm", "run", "start:prod"]

#CMD ["npm", "run", "start:migrate:prod"]

EXPOSE 5000