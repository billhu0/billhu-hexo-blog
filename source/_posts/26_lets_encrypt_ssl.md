---
title: Deploy free SSL certificates for all your nginx websites
date: 2022-04-04 21:39:18
description: Deploy free SSL certificates issued by 'Let's Encrypt' for all of your sites, automatically, and renew certificates with a simple command.
tags: 
- nginx 
categories: 
- nginx
---

{% note info %}
**Offical websites for reference**

"Let's Encrypt" page: [https://letsencrypt.org/getting-started/](https://letsencrypt.org/getting-started/)

"Certbot" application: [https://certbot.eff.org/instructions](https://certbot.eff.org/instructions)

{% endnote %}


## Step 1. Install certbot and corresponding plugins

Execute the following in terminal to get `certbot`

```shell
sudo apt install certbot -y
```

If you would like to configure nginx after that, install `python3-certbot-nginx` additionally, otherwise an error 'The requested nginx plugin does not appear to be installed' may happen.

```shell
sudo apt install python3-certbot-nginx
```

## Step 2. Run certbot

### Either get and install your certificates automatically ...

Run the following command to get a certificate and have certbot automatically edit your nginx configuration, all in one single step.

```
sudo certbot --nginx
```

certbot will read your nginx configurations at `/etc/nginx/`, list all your http sites, and after a certificate is applied, it will change configurations (modify `listen 80` to `listen 443 ssl`, and use 301 to redirect http requests to https-enabled site).

Follow the prompts on screen, and everything is done.

### Or, just get a certificate

To only apply for a certificate, and do the nginx configuration modifications by hand, use the following command.

```shell
sudo certbot certonly --nginx
```

After you have set up properly, visit your website to check if a lock icon appears in the URL bar of your browser.

## How to renew the certificates?

The free certificates are only valid for 90-days, but can be renewed for unlimited times. The certbot packages come with a cron job or systemd timer which will renew the certificates automatically before they expire.

You can test automatica renewal for your certificates by running this command

```shell
sudo certbot renew --dry-run
```

To renew, use 

```shell
sudo certbot renew
```
