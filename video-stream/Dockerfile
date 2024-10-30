## Docker Image:
##  Node.js project - npm dependencies - videos files

FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /usr/src/app
WORKDIR /usr/src/app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

#COPY package*.json ./

## cmd for install dependencies for automated environments CI/CD
#RUN npm ci --omit=dev
FROM base
COPY --from=prod-deps /usr/src/app/node_modules /usr/src/app/node_modules
COPY ./src ./src
COPY ./videos ./videos

CMD [ "npm", "start" ]