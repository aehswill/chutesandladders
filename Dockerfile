FROM node:lastest
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["npm", "start"]
