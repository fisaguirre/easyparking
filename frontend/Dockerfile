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
#RUN npm install --save react-timer-hook
#RUN npm i @react-google-maps/api
#RUN npm install @date-io/date-fns date-fns
#RUN npm i react-qr-code

# add app
COPY . ./

#EXPOSE 3456

# start app
CMD ["npm", "start"]