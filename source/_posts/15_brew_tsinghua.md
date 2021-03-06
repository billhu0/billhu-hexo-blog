---
title: Homebrew 配置中科大源
date: 2022-02-08 20:11:00
description: 使用中科大源安装配置 Homebrew，并关闭homebrew自动更新
categories: 
- macOS
tags:
- macOS
- brew
---

## Install Homebrew

Add the following to your shell's environment path.

```shell
export HOMEBREW_NO_AUTO_UPDATE=true
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
```

For instance, if you use bash, add to the `~/.bashrc` file. If you use 'zsh' and 'oh-my-zsh', add to `~/.zshrc` file.

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
