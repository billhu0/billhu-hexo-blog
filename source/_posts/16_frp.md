---
title: (macOS/Linux/Windows) How to use frp for NAT-penetration
date: 2022-02-08 21:11:00
description: Pre-requisite：You need a server with a public IP address to do this.
categories: 
- Cross Platform
- NAT
tags:
- Linux
- frp
---

## What is `frp`?

In general, our devices' connected to the Internet does not have a public IP address. We cannot visit our local devices without using a NAT-penetration tool.

There are some NAT-penetration tools (like cpolar), but free tools are generally unstable, while high-quality tools comes with a high price. If you have a device with a public IP address (such as a server), you can use **frp** to penetrate the NAT.

Frp is a reverse proxy which can forward a port of your local server to a public server.

{% note danger %}
**Pre-requisite**: You will need a server with a public IP address.
{% endnote %}

## Step1. Download `frp`

`frp` requires the configuration of both the client-side and server-side. First, download `frp` according to your system architecture. In general, a linux server is `amd64`, Intel mac is `darwin_amd64`, M1-series mac is `darwin_arm64`, and arm linux devices including raspberry-pi runs `arm` or `arm64`. 

Frp project address：[https://github.com/fatedier/frp/releases](https://github.com/fatedier/frp/releases)

![](16_frp/frp_github项目.png)


## Step2. Configure server-side.

Extract what we downloaded, and we can see some files: (The 「s」in 'frps' stands for 'server', and 「c」 stands for 'client')

![](16_frp/frp解压.png)

We need to focus on `frps` and `frps.ini`. 

The public server only requires setting the `bind_port` under the `[common]` tag inside the `frps.ini` file. The value is `7000` by default, which defines that our server will listen for clients from this port.

```ini
[common]
bind_port = 7000
```

{% note warning %}
Remember to allow connections from port `7000` if there's a firewall.
{% endnote %}

After that, start the `frps` service by using 
```shell
./frps -c ./frps.ini
```
{% note success %}
You may use `screen` or some other commands to keep `frps` running in the background.
{% endnote %}

## Step3. Configure client-side local server.

You need to configure the public server address (IP or domain name), port, and all the local addresses that you want to forward. 

Edit `frpc.ini` file. First, define the server information under the `[common]` flag like:
```ini
[common]
server_addr = 12.34.56.78  # Your server's public IP
server_port = 7000  # Your server's listening port
```

Then, add some services to forward. For instance, if you want to forward localhost ssh port (127.0.0.1:22), then you can use the following code:
```ini
[ssh_myself] 
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 10000
```
This means that, the name of this service is `ssh_myself` (you can add serveral services in one file, but they cannot share names), and `127.0.0.1` port `22` will be forwarded to the server's `10000` port. You can access local ssh by `ssh user@serverIP -p 10000` through the public Internet.

The same thing can be done to forward a website. For example, if you have deployed a website locally whose local IP is `http://192.168.31.111:8080`, you can use the following to forward it:
```ini
[test]     # 远程连接到内网其它设备指定端口
type = tcp
local_ip = 192.168.31.222
local_port = 8080
remote_port = 10002
```
and then you can use `http://public_ip:10002` to access this website from public internet.

If you want to forward http, consider:
```ini
[web]
type = http
local_port = 8080
local_ip = 127.0.0.1
custom_domains =  # domain name or public IP here
remotr_port=8080
```

After that, start `frpc` service by using 
```shell
./frpc -c ./frpc.ini
```
{% note success %}
Again, you can use `screen` or some other commands to keep `frpc` running in the background.
{% endnote %}

After a successful connection between client-side and server-side, both can receive corresponding log messages, indicating the connection is successful.

![The prompt that client-side has established a connection to the server](16_frp/frpc输出.png)

