FROM node:14
WORKDIR /src/app

# Copy the package.json to workdir
COPY package.json ./

RUN npm install

COPY ./ /usr/src/app/

EXPOSE 3000

# Generate build
RUN npm run build

CMD [ "node", "index.js" ]