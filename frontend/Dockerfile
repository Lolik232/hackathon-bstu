FROM node:20.5-alpine
WORKDIR /app
COPY package.json  ./

ENV PATH /app/node_modules/.bin:$PATH
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./
# нужен ли?
EXPOSE 3000

CMD [ "npm", "start" ]