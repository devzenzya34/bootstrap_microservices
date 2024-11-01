# _BOOTOSTRAPPING MICROSERVICES_
**_Source: Bootstrapping Microservices, Second Edition by Ashley Davis_**
## References:
    - https://github.com/bootstrapping-microservices-2nd-edition
    - https://rapidfullstackdevelopment.com/


## Create individual microservices

* 1- Create a nodejs project: `npm init -y` and customize package.json
* 2- Install Express for HTTP server and launch: `pnpm start` or use nodemon to manage server
* 3- Add route for stream video
* 4- Configure Microservice using environment variable file
* 5- Set up for environment production: `pnpm install --omit=dev` (avoid dev dependencies)

## Package and publish microservices using Docker
### Build and Publish your first microservice using Docker (feat/publish branch)

* 1- Create Dockerfile
* 2- Package and Build image: `docker build -t video-stream .`
* 3- Run image: `docker run -d -p 3000:3000 -e PORT=3000 video-stream` \
    to debug container `docker exec -it <container id> /bin/bash` \
    to stop container `docker container stop <container id>`
* 4- Test container: `curl http://localhost:3000/videos`
* 5- Use Microsoft Azure Portal to deploy in a private containerRegistry
    in a custom resources group \
    **_Don't forget to enable user adminitrator keys_**
* 6- Push image to container registry: `docker push <container registry name>:<image name>` \
**login**: `docker login <container registry url> --username <username> --password <password>` \
**tag**: `docker tag <image name> <container registry url>:<image name>:latest` \
**push**: `docker push <container registry url>:<image name>:<tag>` \
      verify it in services/repository

## Develop a microservices app on local computer using Docker Compose and manage data
### Docker Compose - Azure Storage - Storage-blob - MongoDb 

* 1- Create docker-compose.yml and run `docker-compose up -d --build`
* 2- Open the app on local computer: `http://localhost:4000/videos`
* 3- Using Azure Storage and create a new container to host a second microservice
* 4- Create a storage account on azure portal ( videostorage34 ) and upload video file on the cloud storage
* 5- Launch app with npm and check if file if reachable at `http://localhost:3000/videos?path=sample_video.mp4`
* 6- Create a new container on Azure Storage and upload a video file on the cloud storage
* 7- Update docker-compose.yml to use the new container
* 8- Update the video stream microservice to use the new container
* 9- Test the app with the new video on `http://localhost:4000/videos?path=sample_video.mp4`
* 10- Add Database to the microservice **(MongoDb)**
use it in development environment - load some fixture data (db-fixture folder) - test for local environment at `http://localhost:4002/videos?id=<video id>`


### 4-Test code, microservices, and application JEST and PAYWRIGHT
### 5-Integrate thrid-party servers ( MongoDb and RabbitMq)
### 6-Build communication between microservices using HTTP and RabbitMQ
### 7-Manage Data
### 8-Deploy microservices on a production cluster with kubernetes
### 9-Create a production infrastructure using Terraform
### 10-Create a CI/CD pipeline that deploys application code on a Github Repository
