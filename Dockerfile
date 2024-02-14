FROM node
ENV NODE_ENV production
ENV DATABASE_URL postgres://postgres:postgres@127.0.0.1:5432/CeraMarket
WORKDIR /application
COPY package.json .
COPY packaje-lock.json .
RUN npm ci
COPY . .
EXPOSE 3000
CMD [ 'npm', 'start' ]