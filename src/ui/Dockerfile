FROM node:12.18.3
WORKDIR /usr/src/ui
COPY package*.json ./
RUN npm install
COPY . .

# EXPOSE 4300
VOLUME ["/usr/src/ui"]
CMD [ "npm", "start" ]
