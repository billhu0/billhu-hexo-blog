---
title: Install SSL certificate on Nginx
date: 2022-02-21 23:27:12
description: Install SSL certificate on Nginx to enable https for your website. 
tags: 
- Cross Platform
- nginx 
categories: 
- Cross Platform
- nginx
---

## Step 1. Get an SSL certificate

{% note info %}
It is necessary to get an SSL certificate before you can enable https. Additionally, SSL certificates are issued to domain names (rather than IP addresses), so **you have to own a domain** before continuing. 
{% endnote %}

You can get a free SSL certificate for your domain name at tencent cloud, Aliyun and so on.

After you get the certificate, you can get an archive with several files in it
  - `example.com.crt`: This is the certificate file, where `crt` is the file extension name of `pem` files (so don't worry if you have only `pem` file but no `crt` file)
  - `example.com.key`: This is the private key of the certificate. **NEVER** share it with others! (If you did not select 'create CSR automatically' when requesting a certificate, you don't get this file)
  - `example.com.pem`: This is the certificate file, which is a Base64 encoded plain text file.

We need to focus on the `key` file and `pem` file. Upload the two files to your server. You can use `scp` or some other file transfer tools to do this. 

## Step 2. Configuration on nginx

{% note warning %}
Default configuration files path may vary on different nginx versions.
{% endnote %}

The nginx configuration is generally stored in `/etc/nginx/` in which the most important file is `nginx.conf`. 

Inside `nginx.conf`, it might 'include' some other files. For example, there might be these sentences in this file

```
include /etc/nginx/modules-enabled/*.conf;
include /etc/nginx/conf.d/*.conf;
include /etc/nginx/sites-enabled/*;
```

It is suggested to place your personal sites' configuration files in `/etc/nginx/sites-enabled/` or `/etc/nginx/conf.d/` to make it convinent to manage. 

Create a file in `sites-enabled/` (you may name it `example.com` for convinence).

```
sudo vim /etc/nginx/sites-enabled/example.com
```

and write the following things to it 

```
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name example.com;  # change this to your domain
    root /var/www/html;       # change this to your directory
    index index.html index.htm;
    ssl_certificate  /etc/nginx/cert/example.com.pem;    # change ..
    ssl_certificate_key /etc/nginx/cert/example.com.key; # change ..
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
        index index.html index.htm;
    }
}
```

{% note danger %}
New versions of nginx prohibited the use of `listen 443; ssl on;`. Use `listen 443 ssl;` instead.
{% endnote %}

At the same time, you may need to redirect http requests to https visits. You can use a '301' redirect to do this. Add the following:

```
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

Finally, test the configuration

```shell
sudo nginx -t
```
{% note warning %}
If you get an error or warning, check the error logs and correct them.
{% endnote %}

and restart nginx to make effect.

```shell
sudo service nginx restart
```