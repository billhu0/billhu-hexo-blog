---
title: Docker 
date: 2022-04-19 09:44:18
description: The basic concepts, the installation, and the usage of Docker (on Linux)
tags: 
- docker
- Linux
- nginx
categories: 
- docker
---

## Official website and docs

[https://docs.docker.com](https://docs.docker.com)

## What is docker

> Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications.

In short, docker behaves similar to virtual machines, except that it is extremely lightweight compared to the former one. 


### Three import concepts

- **Image**: Image is similar to the ISO file of an virtual machine, which includes a readonly filesystem. Image provides a runtime environment which all application needs in order to run. 
  
  For example, an ubuntu image is a template environment including the ubuntu operating system. If we install Apache software on it, that image can be called an Apache image.

- **Container**: You can run several **containers** (virtual machines) in a computer, each in an isolated environment. A container behaves like a lightweight sandbox. You can regard it as a simple linux system environment (including process space, user space, network space, and the applications running inside it). 
    
    Container is the instantiate application created by an image. You can create, start, stop, or delete a container, without affecting your host system. You can choose whether to share some network ports, files or so on between your host machine and the containers.

    Note that the image itself is readonly. When you start a container using an image, docker creates a writable layer on the top of the image, while the image itself is still readonly.
  
- **Repository**: Like a code repo, the image repository is where the docker stores the centralized images. 

    Note the difference between **Repository** and **Registry**: 
    
    - The registry is the space to store repositories, generally consists of multiple repos. 
    - The Repository is the space to store images. 
    - Normally each repository stores a single kind of images, distinguished by tags. For example, the ubuntu registry stores multiple versions (18.04, 20.04, etc) of ubuntu images.

## Uninstall docker

To remove previous docker installations and configurations, e.g., the old version of docker, you can do the following:

```
sudo apt remove docker docker-engine docker.io containerd runc
```

It's OK if none of these packages are installed. 

The contents of `/var/lib/docker/`, including docker images, containers, etc, are preserved. If you want to remove them, use 

```
sudo apt purge docker-ce docker-ce-cli containerd.io
sudo rm -rf /var/lib/docker /var/lib/containerd
```

You still need to manually delete any modified configurations after that.

## Install docker

There're several ways to install docker. You can install it via `apt`, or a `deb` file, or the script.

### Install using the convenience script

```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

{% note info %}
To use Aliyun mirror, execute `sudo sh get-docker.sh --mirror Aliyun`
{% endnote %}

Wait until the installation finishes. On debian or ubuntu, the docker service is automatically started after the installation. To make it start at system boot, use the following;

```
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

### (Optional) Manage docker as a non-root user

The docker daemon requires to be run as root because it binds a Unix socket instead of a TCP port, which is only owned by user root. That's why the installation script and docker itself needs to be executed by `sudo`. If you don't want to preface the docker command with sudo, you can create a usergroup called docker and add users to it.

```
sudo groupadd docker
sudo usermod -aG docker $USER
```

Log out and log in to make sure the group membership is re-evaluated. You can also try `newgrp docker` to activate the changes to groups.

### Verify that docker is installed and functioning 

```
docker --version
```
The output should look similar to 

![](27_docker/docker_version.png)

Then, 
```
docker run hello-world
```

If you see the output of hello-world, the docker is functioning well. This command does the following steps:

- First, check if you have an image called `hello-world` locally. No local image was found. 
- Then it looks the docker hub (the default source is 'hub.docker.com') to see if there's an online image called `hello-world`. It found that image, and pull (download) it, equivalent to `docker pull hello-world`.
- Finally it starts a container with the image, and the executable files inside the container produces the output what you see on the terminal screen.

## Usage of docker containers

### Download (pull) an image

Taking ubuntu image as an example. We can use `docker pull ubuntu` to get the ubuntu image. Note that every repository have multiple images separated by tags. Without entering a tag, it uses `latest` by default.

```
docker pull ubuntu
```

After that, list the images to check if we have downloaded
```
docker images
```

To remove an image, use
```
docker rmi xxx
```

### Run a container using an image

As we have downloaded ubuntu image just now, we want to start it in a container. We can use the following 
```
docker run -it ubuntu:latest /bin/bash
```

Here the `-i` means 'interactive': open and keeping 'stdout'; `-t` means creating a pseudo-tty, in order to let us execute bash inside the container and 'use' the terminal of it.

If we use `exit` to exit the container, the container will be exited instead of running in the background. If we want the container to keep running, use `ctrl+p`, `ctrl+q` to exit, and the status of the container will be `up`.

Besides that, `docker run` command have a lot of acceptable arguments such as 

- `-d`: detached, running in the background. Nothing will be output to the terminal. Instead, all 'stdout' will be redirected to a log, which you can see with `docker logs CONTAINER_NAME/CONTAINER_ID1

### Manage containers

- View all running containers
    ```
    docker ps
    ```
    View all containers
    ```
    docker ps -a
    ```


- Start, stop or Restart a container:
    ```
    docker start/stop/restart CONTAINER_NAME/CONTAINER_ID
    ```

- Go inside a container after start it in the background 
    ```
    docker attach CONTAINER_NAME/CONTAINER_ID
    ```

- Remove a container
    ```
    docker rm CONTAINER_NAME/CONTAINER_ID
    ```

## Some interesting docker images 

### Install gitlab using docker

**Step1**: pull gitlab's docker image

```
docker pull gitlab/gitlab-ce
```
**Step2**: run gitlab

```
docker run --detach \
  --hostname gitlab.example.com \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/logs:/var/log/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest
```

The meaning of the command is as follows:

- `--name gitlab `: the container name 
- `--restart always`: always let the container running, to let the container start at system boot
- `--publish 443:443 --publish 80:80 --publish 22:22`: Map network ports
    You may want to use another port than 80, 443, as it might be occupied by another service like nginx or apache. Change to `--publish HOST_PORT:CONTAINER_PORT` to map port HOST_PORT of the host to CONTAINER_PORT in the container (e.g. `--publish 20080:80`).
- `--volume /srv/gitlab/config:/etc/gitlab`: map gitlab config, log, and data directories
- `gitlab/gitlab-ce:latest`: the image you need to run

**Step3**: Check the container status 

Use
```
docker container ls
```
to list all containers, which should have the gitlab container you have just created. The status `starting` means it is initializing. Wait it until the status become `healthy`.

After the initialization is complete, visit `http://your_ip:HOST_PORT` and you should see the gitlab login page.

**Step 4**: Modify user root's password

The default (and the admin) user is 'root' in gitlab, and the default password is a randomly generated long string. We have to go into the gitlab container and modify the password.

Use `docker ps` to see the gitlab container ID, and use (replace `ce539268a90c` with the container ID)
```
docker exec -it ce539268a90c bash
```
to enter the terminal of the container.

Then, inside the container, execute
```sh
cd /opt/gitlab/bin
gitlab-rails console  # this may take some time
```
and you should see the following
![](27_docker/docker_gitlab_console.png)

After that, find the root user by entering
```
u=User.where(id:1).first
```
and change its password by entering
```sql
u.password='12345678'
u.password_confirmation='12345678'
u.save
```
and the password is changed.
![](27_docker/docker_gitlab_password2.png)


### Install qduOJ using docker 

```
git clone -b 2.0 https://github.com/QingdaoU/OnlineJudgeDeploy.git
cd OnlineJudgeDeploy
```

Before continuing, make sure the 80 and 443 port are not occupied by other processes. Otherwise, use another port (and you make want to reverse proxy it using nginx).

In the end of `docker-compose.yml`, modify `ports` contents. For example, if you want to use the host's 10000 and 10001 port, use 
```yml
ports:
  - "0.0.0.0:10000:8000"
  - "0.0.0.0:10001:1443"
```

Then 
```
docker compose up -d 
```
and wait until the container status (see with `docker ps -a`) becomes 'healthy'.

### Install umami to statistic your website visits

The easiest way to configure umami is to install it by docker. You don't need to install database (mysql, mariadb, ...), nor do you need to fight with npm (`npm install`, `npm run build`).

What you need is 
```
git clone https://github.com/mikecao/umami.git
docker compose up -d
```

And umami is installed. Visit 3000 port to see the umami page. The default username is `admin` and passwd is `umami`.

Just a reminder: when inserting the tracking code into your html, avoid embedding http content into https website. Obtain an SSL cert to your umami website to make it https.

