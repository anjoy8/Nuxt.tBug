FROM node
MAINTAINER Nuxt.tBug
ENV NODE_ENV=production
COPY . .
WORKDIR /app
EXPOSE 80
RUN echo 'build tibug image successful!!'
RUN cnpm run build
CMD ["cnpm", "start"]