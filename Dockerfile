FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm i nodemon -g
COPY . /app
CMD nodemon --exec babel-node /app/api/index.js
EXPOSE 8081
