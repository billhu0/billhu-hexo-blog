---
title: Homebrew USTC source
date: 2022-02-08 20:11:00
description: Install and configure Homebrew with USTC source and turn off homebrew auto-update.
categories: 
- macOS
tags:
- macOS
- brew
---

## Install Homebrew or Switch to USTC source

Add the following to your shell's environment path. For instance, if you use bash, add to the `~/.bashrc` file. If you use 'zsh' and 'oh-my-zsh', add to `~/.zshrc` file.

```shell
export HOMEBREW_NO_AUTO_UPDATE=true
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
```

Then run the homebrew install script. (If you have already installed and only needs to change the source, just skip the following line)

```shell
/bin/bash -c "$(curl -fsSL https://github.com/Homebrew/install/raw/HEAD/install.sh)"
```

After that, restart your terminal or execute the following to reload the environment.

```shell
exec zsh
```

And then

```shell
brew update
brew upgrade
```

The first time `brew update` might take a bit long time since it needs to download all the package list data. Be patient. The speed will become fast once the initial `brew update` is complete.
