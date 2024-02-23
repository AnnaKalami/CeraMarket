FROM node
ENV DATABASE_URL=postgres://postgres:postgres@31.129.49.27:5432/ceram
ENV NODE_ENV production
WORKDIR /application
COPY ./client/dist ./dist
COPY ./server/package.json . 
COPY ./server/package-lock.json .

RUN npm ci
COPY ./server .
EXPOSE 80
CMD ["npm", "start"]