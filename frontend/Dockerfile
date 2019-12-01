FROM node:lts-alpine
RUN apk update && apk add git && npm install -g @vue/cli
WORKDIR /app
COPY package*.json /app/
RUN npm install && npm rebuild node-sass
COPY . /app
CMD ["npm", "run", "serve"]