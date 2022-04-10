# Stage 1
# pull node from alpine
FROM node:14.15.0-alpine as node

# Maintainer Labels
LABEL project="Electricity Billing"
LABEL maintainer="Bahor"

# define app working directory
WORKDIR /usr/src/app

# copy dependancies file from local
COPY package*.json ./

# copy project files to our image
COPY . .

# install node packages for the portal
RUN npm install

CMD ["npm", "run", "start"]

# build the project
# RUN yarn build --stats-json --source-map=false --aot

# Stage 2
# Install the load balancer nginx from alpine
FROM nginx:1.13.12-alpine

# copy the nginx configurations to the deocker image
COPY ./nginx.conf /etc/nginx/conf.d/default.conf


#Aftermath
#========================================
#Prepare
#cd admin-portal && yarn install && ng build --delete-output-path --configuration=uat --optimization --progress --aot --build-optimizer

#Build
#docker build -t zeguru/vuka-admin-portal:rc9 .

#Push
#docker push zeguru/vuka-admin-portal:rc9
