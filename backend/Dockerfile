FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /myapp
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3333
CMD ["npm", "start"]



# sudo docker image ls 
# sudo docker run -v /media/mostafa/Dev/courseWork/NodeJs:/myapp  -it -p 3333:3333 1b8b31618270