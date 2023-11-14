FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt

CMD ["npm", "start"]
