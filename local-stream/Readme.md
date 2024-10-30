# **The first microservice video stream app**
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

3- Run image: `docker run -d -p 3000:3000 -e PORT=3000 video-stream` \
    to debug container `docker exec -it <container id> /bin/bash` \
    to stop container `docker container stop <container id>` \

4- Test container: `curl http://localhost:3000/videos`

5- Use Microsoft Azure Portal to deploy in a private containerRegistry
    in a custom resources group \
    **_Don't forget to enable user adminitrator keys_**

6- Push image to container registry: `docker push <container registry name>:<image name>` \ 
    . login: `docker login <container registry url> --username <username> --password <password>` \
    . tag: `docker tag <image name> <container registry url>:<image name>:latest` \
    . push: `docker push <container registry url>:<image name>:<tag>` \
    verify it in services/repository

## Data Management
### Docker Compose - Azure Storage - Storage-blob - MongoDb 

1- Create docker-compose.yml and run `docker-compose up -d --build`

2- Open the app on local computer: `http://localhost:4000/videos`

3- Using Azure Storage and create a new container to host a second microservice \
Create a storage account on azure portal ( videostorage34 )\