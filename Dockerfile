from node:20 as base

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
COPY package*.json ./

RUN npm install
RUN npm install concurrently
# If building for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .
RUN npm run build

FROM base as production

ENV NODE_PATH=./dist
ENV NODE_ENV production
RUN npm prune --production
RUN npm run build

EXPOSE 3000
