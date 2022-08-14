---
title: Deploy hexo to your personal server
date: 2022-02-19 13:50:00
categories: hexo
description: Deploy hexo to your personal server, using git and nginx.
tags:
- Linux
- hexo
- nginx
---

## Preamble

{% note danger %}
**Note that** you should first make sure that `hexo server` works fine.

If you haven't configured hexo before, check this article first: 
{% post_link 06_hexo %}
{% endnote %}

You can use hexo to build your own website and blog, and then deploy it using `github pages`, `vercel` or some other static website hosting services easily. To increase flexibility and stability for your website, you can also deploy hexo to your server.

## Step 1. Init a git repository on the server

{% note success %}
Many tutorials will tell you to create a user named 'git', disable its shell access, and modify `sudoers` list. But these steps are actually unnecessary. You can directly configure the server with your normal user (`$USER`).
{% endnote %}


### Create a git repository

<div class="note note-warning">
<p>In this tutorial, files are placed in <code>/var/www/hexo/</code> and <code>/var/repo/blog.git</code>, which you can change it to whatever you want, flexibly.</p>
</div>

In `/var/repo`, create an empty git repository `blog.git`: 

```shell
sudo mkdir -p /var/repo
sudo chown -R $USER:$USER /var/repo/ # Give access to this dir.
cd /var/repo
git init --bare blog.git               # init an empty git repo.
```

### Configure git-hooks

Edit the file `blog.git/hooks/post-update` (if it's not present, create one)

```shell
vim /var/repo/blog.git/hooks/post-update
```

and then write the following script to it 

```shell
#!/bin/bash
git --work-tree=/var/www/hexo --git-dir=/var/repo/blog.git checkout -f
```

Then, add executable permission to it:

```shell
chmod +x /var/repo/blog.git/hooks/post-update
chown -R $USER:$USER /var/repo/blog.git/hooks/post-update
```

Create `/var/www/hexo/` directory and change owner:

```shell
sudo mkdir -p /var/www/hexo/
chown -R $USER:$USER /var/www/hexo/
```

<div class="note note-info">
<p>You can use <code>git clone YourUserName@IP:/var/repo/blog.git</code> to test the git ssh connection. </p>
</div>

After configuring git-hooks, each time you push something to `blog.git`, it will execute the script, storing contents in `/var/www/hexo/`. 

## Step 2: Configure hexo locally

In your local hexo `_config.yml`, change the 'deploy' settings to the follows:

```yml
deploy:
  type: git
  repository: YourUserName@<IP>:/var/repo/blog.git
  branch: master
```

{% note primary %}
If you want to use another git ssh port (port 22 by default), you can use the following:
```yml
deploy:
  type: git
  repository:
    site: ssh://YourUserName@<IP>:<port_number>/var/repo/blog.git
  branch: master
```
{% endnote %}


## Step 3: Configure nginx on the server

First, make sure `nginx` is installed and started. 

Now the generated static website should be present in the server's `var/www/hexo/` directory. The only thing we need now is to configure nginx, making it pointing to this directory.

Edit the file:

```shell
sudo vim /etc/nginx/sites-enabled/default
```

and modifying it to

```conf
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        root /var/www/hexo;

        server_name _;
        location / {
                try_files $uri $uri/ =404;
        }
}
```

<div class="note note-info">
<p>Normally you only need to find the line <code>root /var/xxx</code> and modify it. </p>
</div>

