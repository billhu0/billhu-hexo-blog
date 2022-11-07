---
title: ssh-keygen 是什么？
date: 2022-02-05 12:38:00
description: ssh-keygen可以用来生成ssh的秘钥和公钥。通常可以用来自动登录远程服务器，这样可以省去每次ssh时手动输入密码的麻烦；以及使用SSH协议访问git仓库。
categories: 
- Code
- Linux
tags:
- ssh
- Linux
---

## What is `ssh-keygen`

`ssh-keygen` 可以用来生成ssh的秘钥和公钥。通常可以用来自动登录远程服务器，这样可以省去每次ssh时手动输入密码的麻烦；以及使用SSH协议访问git仓库。而且因为公钥的长度一般比你的密码长得多，所以安全性也会更高。

## How to use `ssh-keygen` for remote login

### Step 1: Create an SSH key pair locally

<div class="note note-info">
<p>如果你之前做过这一步（`~/.ssh`目录下已有`id_rsa.pub`文件），可以跳过这一步。</p>
</div>

在**本地**机器的终端，直接执行这个`ssh-keygen`命令即可（linux/macOS/Windows Terminal都支持这个命令）

```sh
ssh-keygen
```

系统会询问你要把文件保存在哪里，**可以直接一路回车**，默认位置是 `~/.ssh`，会在这个目录下生成两个文件: `id_rsa` (private key) 和 `id_rsa.pub` (public key)。

![](14_ssh_keygen/ssh-keygen运行效果.png)


> 大部分网上的教程会让你执行这个命令
>
> ```shell
> ssh-keygen -t rsa -C "xxx@xxxx.com"
> ```
>
> 其实这和直接`ssh-keygen`是一样的，`"xxxx@xxxx.com"`只是生成的ssh key的名称，为了方便辨识的字符串，并非要求或规定一定是某个邮箱地址。
>



### Step 2: Send the public key to remote server

上面生成的那两个文件中，private key 就保存在本地机器上，public key要添加到remote host，让remote端认识你这个公钥。

<div class="note note-warning">
<p>Windows用户请不要使用Linux和macOS的操作方法，请往下看</p>
</div>

- Linux & macOS

在Linux和macOS上，可以直接用 **`ssh-copy-id`**命令（注意把`USERNAME@HOSTIP`替换成你的远程主机用户名和ip）

```shell
ssh-copy-id -i ~/.ssh/id_rsa.pub USERNAME@HOSTIP
```

把本地生成的public key拷贝到远程主机上。这个命令会自动给远程主机的`~/.ssh`, `~/.ssh/authorized_keys`设置合适的权限并把本地公钥复制过去。

执行这个命令的过程中系统会询问远程服务器的密码，正常输入即可，整个过程会提示以下内容：

![](14_ssh_keygen/ssh-copy-id运行效果.png)



接下来就可以直接在本地ssh到远程主机了，不再需要手动输入密码。远程主机会允许所有拥有与这个public key对应的private key的用户连接。

- Windows

在Windows Powershell上可能不支持 `ssh-copy-id` 命令，需要手动修改远程服务器的`~/.ssh/authorized_keys`文件，方法是：

打开本地电脑的 `~/.ssh/id_rsa.pub` 文件，并复制其中的内容 (可以使用 `cat ~/.ssh/id_rsa.pub` 命令)，

然后粘贴到远程主机的`~/.ssh/authorized_keys`文件内容中。



### 备注：

网上的很多文章说：

> 可以使用scp等工具将公钥`id_rsa.pub`拷贝到远程服务器的目录下，并使用以下命令
>
> ```sh
> cat id_rsa.pub >> ~/.ssh/authorized_keys
> ```
>
> 添加到服务器的`~/.ssh/authorized_keys`中。

但是这样做我感觉不太好，你首先要复制一份文件过去，可能会比较麻烦。而且第二步容易受文件权限影响（`authorized_keys`的权限必须是600或更小，`ssh/`的owner必须是ssh登录用户而非root，否则会失败）。上面的`ssk-copy-id`则不会有这些小问题.

**除非**你用的是Windows Powershell，不支持`ssh-copy-id`命令，才需要手动修改`~/.ssh/authorized_keys`文件。
