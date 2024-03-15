FROM node:16-alpine 
WORKDIR /app 
COPY . /app 
RUN npm install 
RUN npm run build 
EXPOSE 5001 
CMD  ["npm", "start"]