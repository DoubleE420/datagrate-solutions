FROM node:lts-alpine
RUN apk update && apk add git
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
CMD ["npm", "run", "start"]