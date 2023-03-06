FROM node:16.13.0

RUN apt-get update && \
  apt-get install -y \
  neofetch \
  ffmpeg && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .
RUN npm install 

COPY . .
EXPOSE 5000

CMD ["pm2-runtime", "index.js"]`
