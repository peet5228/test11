FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
EXPOSE 3000
<<<<<<< HEAD
CMD ["npm","run","dev","--","--","host","0.0.0.0"]
=======
CMD ["npm","run","dev","--","--host","0.0.0"]
>>>>>>> 5b54cb74962ba41ef173a12edd8136d37e14d82c
