FROM node:18-alpine
WORKDIR /user/src/app
COPY . .

EXPOSE 19211

RUN npm install
RUN npm install dotenv
RUN npm run build
CMD ["npm", "run", "start:prod"]
