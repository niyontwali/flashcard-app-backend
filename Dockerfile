FROM node:16-alpine

WORKDIR /app

# Copy the current directory to the container root directory (.) so that the Dockerfile can be used from the host machine too. This is necessary for the Dockerfile to be used from the host machine. This is also necessary for the Dockerfile to be used from the host machine. 
COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]

