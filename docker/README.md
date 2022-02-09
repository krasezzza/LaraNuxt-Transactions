# Dockernetes 

## Everything you need to run a local "kubnernetes cluster". 

[![DockerCompose](http://dl80e4vz47amg.cloudfront.net/rnd/docker-compose.png)](https://docs.docker.com/) 

With docker compose, we can run multiple containers in a isolated environment to simulate a kubernetes cluster. 

## Requirements

- Docker and Docker Compose 

- A GIT client 

- A CPU that supports and has enabled virtualization. 

- All project directories to be under one root directory as they are in GitLab. 

## Features 

- Allows us to run all our microservices on a local environment. 

- Resolves the issue of version mismatches on different environments. 

- Provides an equivalent to the cluster environment for accurate development and testing. 

- Standardized development. 

## Info 

Docker Engine is an open-source containerization technology for building and containerizing your applications. Docker Engine acts as a client-server application with: 

- A server with a long-running daemon process dockerd. 

- APIs which specify interfaces that programs can use to talk to and instruct the Docker daemon. 

- A command line interface (CLI) client docker. 

The CLI uses Docker APIs to control or interact with the Docker daemon through scripting or direct CLI commands. Many other Docker applications use the underlying API and CLI. The daemon creates and manage Docker objects, such as images, containers, networks, and volumes. 

Please see [Docker Architecture](https://docs.docker.com/get-started/overview/#docker-architecture) (2 minutes read time) for a general understanding of how docker works before you continue. 

## Installation 

- [Docker for Windows](https://docs.docker.com/docker-for-windows/install/) When asked chosse the WSL 2 backend. All other default settings are recommended. This installation includes docker-compose. 

- [Docker for Mac](https://docs.docker.com/docker-for-mac/install/) requires no special configuration. Default settings are recommended. This installation includes docker-compose. 

- The linux installations differ in settings and components. Please reffer to the official documentation for your linux distro. Note that docker-compose does not usually come as a component in linux packages. You'll have to install it separately. 

- When configuring your GIT client, make sure "white spacing" and "end of line" are configured to Linux Formatting - LF: 

```sh
git config --global core.autocrlf false

git config --global core.eol lf
``` 

- Create a "root" project directory that will contain all the microservices' projects and _git clone_ them inside. 
- You can use this bash script to download all the project repos. *NOTE: GitBASH, an SSH-Key and a cofigured ssh-agent required*:  
[[Download "clone-repos.sh"](https://gitlab.next-it.bg/gitlab-master-group/dreso/dockernetes/-/raw/master/clone-repos.sh?inline=false)]
[[View in GitLab "clone-repos.sh"](https://gitlab.next-it.bg/gitlab-master-group/dreso/dockernetes/-/blob/master/clone-repos.sh)]

[![project root](http://dl80e4vz47amg.cloudfront.net/rnd/dreso-project-root.png)](https://docs.docker.com/) 

## Running docker-compose 

 - Before you run your local docker-compose environment, please modify the env.dev.dist file to ```env.dev``` and populate it with your necessary variables. You may need to ask the DevOps for SNS and SQS details.

 - To start docker-compose, first run Docker. _Windows Default: "C:\Program Files\Docker\Docker\Docker Desktop.exe"_ 

You will notice that the first time it runs it will take some time for Docker to start. 

Open a command prompt (cmd.exe) and navigate to the dockernetes project directory. 

Run [docker-compose build](https://docs.docker.com/compose/reference/build/): 

```sh
docker-compose build
``` 

This will check the [docker-compose.yaml](https://docs.docker.com/compose/) file in the dockernetes project directory for any containers that require a "build" directive and begin building them. This process will pull all necessary container images for the "build" process from [docker hub](https://hub.docker.com/search?q=&type=image). 

Run [docker-compose up](https://docs.docker.com/compose/reference/up/): 

```sh
docker-compose up
``` 

This will start all containers in the docker-compose.yaml file. This process will pull the rest of the container images from [docker hub](https://hub.docker.com/search?q=&type=image). 

Once started, the command prompt window will become attached to the "dockernetes" live log output. You can monitor all events transpiring within the running containers. 

On the first run, it is expected to have errors as some containers might start before their required databases are up. We'll need to restart docker-compose. To do that pres "CTRL C" when the cmd window is on focus. 

This will effectively stop the running containers. Restart the containers by running docker-compose up again. 

```sh
docker-compose up
``` 

 - Visit [localhost](http://localhost/) to access the frontend. 

After you are finished run [docker-compose down](https://docs.docker.com/compose/reference/down/) to not only stop but also prevent the containers from automatically starting. 

```sh
docker-compose down
``` 
