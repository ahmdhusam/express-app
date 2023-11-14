FROM node as Builder

WORKDIR /app

COPY package*.json .

RUN yarn

COPY . .

RUN yarn start:build

FROM node as Runner

WORKDIR /app

COPY package*.json .

RUN yarn --prod

COPY --from=Builder /app/dist ./dist

EXPOSE 3000

CMD [ "yarn", "start"]



