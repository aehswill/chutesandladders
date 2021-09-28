FROM node:current
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["npm", "start"]
