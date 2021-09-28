FROM mcr.microsoft.com/appsvc/node:10-lts

ENV HOST 0.0.0.0
ENV PORT 8080
EXPOSE 8080

COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["npm", "start"]
