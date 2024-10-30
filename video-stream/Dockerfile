## Docker Image:
##  Node.js project - npm dependencies - videos files

FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

## cmd for install dependencies for automated environments CI/CD
RUN pnpm ci --omit=dev

COPY ./src ./src
COPY ./videos ./videos

CMD pnpm start