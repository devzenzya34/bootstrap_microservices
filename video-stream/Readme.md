# The first microservice video stream app
Source: Bootstrapping Microservices, Second Edition by Ashley Davis

## Create a video stream microservice
1- Create a nodejs project: `npm init -y` and customize package.json
    
2- Install Express for HTTP server and launch: `pnpm start` or use nodemon to manage server

3- Add route for stream video

4- Configure Microservice using environment variable file

5- Set up for environment production: `pnpm install --omit=dev` (avoid dev dependencies)

## Publish video stream microservice
### build and publish your first microservice using Docker (feat/publish branch)

1- Create Dockerfile

2- Package and Build image: `docker build -t video-stream .`

3- Run image: `docker run -p 3000:3000 video-stream`