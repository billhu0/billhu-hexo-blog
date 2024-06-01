---
title: Configure Oh-my-zsh on Git Bash (Windows)
date: 2024-03-19 02:26:30
tags:
- Windows
categories: 
- Code
---


## Step 1. Download the latest MSYS2 zsh package

... from the [link (https://packages.msys2.org/package/zsh?repo=msys&variant=x86_64)](https://packages.msys2.org/package/zsh?repo=msys&variant=x86_64).

The filename should look similar to `zsh-5.9-2-x86_64.pkg.tar.zst`.

## Step 2. Extract and merge

Extract the archive and copy the contents (including the `/etc` and `/usr` folders) into `C:\Program Files\Git`. Merge the folders. 

## Step 3. Open Git Bash and start zsh

Open Git Bash and Execute `zsh`. Configure as prompted.

```
autoload -U zsh-newuser-install
zsh-newuser-install -f
```

- To configure the history, enter `1`, change the values if you like by `1`-`3`, and then enter `0`.

- To configure the completion, enter `2` to “Use the new completion system”, and then enter `0`.

- Enter `0` to save the settings.

## Step 4. Setting zsh as the default shell

... by appending the following into `~/.bashrc`:

```
if [ -t 1 ]; then
  exec zsh
fi
```

For further configuration and beautify, consider {% post_link 20_ubuntu-config %}

{% note info %}
Reference: [link](https://dominikrys.com/posts/zsh-in-git-bash-on-windows/)
{% endnote %}
