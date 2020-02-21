FROM node:lts-slim
RUN apt update && apt install git pgloader libsqlite3-dev mysql-client -y
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
CMD ["npm", "run", "start"]