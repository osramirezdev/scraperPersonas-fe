FROM node as build

LABEL maintainer="Oscar Ramirez <osramirezdev@gmail.com> (https://yocreativo.com/)"

WORKDIR /app

ENV PATH /node_modules/.bin:$PATH
COPY package*.json .
RUN npm i --silent
COPY . ./

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]