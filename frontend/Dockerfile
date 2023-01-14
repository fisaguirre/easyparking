# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install
#RUN npm install react-router-dom bootswatch
#RUN npm install --save react-toastify
#RUN npm install react-icons --save
#RUN npm install react-hook-form

# add app
COPY . ./

# start app
CMD ["npm", "start"]