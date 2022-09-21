FROM node:14

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["./ops/docker/docker-entrypoint.sh"]