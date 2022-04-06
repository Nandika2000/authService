FROM node:lts
EXPOSE 3000
WORKDIR /app1
COPY package.json /app1/package.json
COPY package-lock.json /app1/package-lock.json
RUN npm install
COPY . /app1
ENTRYPOINT ["npm", "start"]