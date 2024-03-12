FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt

RUN npm install -g prisma

RUN prisma generate

CMD ["npm", "start"]
