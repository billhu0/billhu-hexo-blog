---
title: 如何安装WSL
date: 2021-10-21 23:11:00
description: 记录一下我安装WSL的过程，以及遇到的一些报错
catagories:
- windows
tags:
- windows
- Linux
- WSL
---



# How to install WSL on Windows

## Step1. Upgrade Windows if needed.

确保升级到 Windows 10 版本 2004 或 内部版本 19041 及以上，或 Windows 11。更老的版本不支持 WSL 2。

<div class="note note-info">
<p>查看Windows 10/11 版本号：按下Win+R键，执行<code>winver</code>命令</p>
</div>


## Step2. Start to install.

In cmd(administrator) or powershell(administrator) , run 

```shell
wsl --install
```

Then, open Microsoft Store, and search for `Ubuntu 20.04` and download.

Launch it after the download is complete. You will see a command window with 'installing...'.

### 部分报错代码及解决方法：

####  `0xc03a011a`报错：

1. 在资源管理器中找到`C:\Users\YOUR_USER_NAME\AppData\Local\Packages`，其中`YOUR_USER_NAME`是你的用户名
2. 找到以 `CanonicalGroupLimited.Ubuntu18.04onWindows` 开头的那个文件夹，右键，点击“属性”，“高级”
3. 取消勾选“压缩内容以节省磁盘空间“
4. 点击“确定”，然后再次尝试安装

#### `0x80370102`报错：

<div class="note note-success">
<p>如果你在mac上的bootcamp windows中安装wsl，并出现了这一步报错，请先进入macOS并从”系统偏好设置“中的”启动磁盘“重启进入windows（不要直接开机进入windows）。进入windows后，打开任务管理器 -> 性能 -> CPU，确保”虚拟化“是开启状态，再进行下一步。</p>
</div>

1. 检查是否开启了VT虚拟化：在“任务管理器”->“性能”->"CPU"中查看“虚拟化”是否已开启，如果没有开启，需要进入BIOS开启这个功能
2. 检查一些相关的windows功能是否已开启：按住win+Q键搜索“启用或关闭windows功能”
   - Windows10：确保打开`Hyper-V`, `Virtual Machine Platform`, `Windows Subsystem for Linux`三项
   - Windows11：确保打开`适用于Linux的Windows子系统`一项
3. 打开Powershell(管理员)，执行以下命令：

```powershell
# 启用"适用于Linux的Windows子系统“
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
# 启用”虚拟机平台“
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
# 下载Linux内核更新包
https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.ms
```



## Step 3: Enjoy

After the installation is complete, you can see the terminal of ubuntu.

You can access the terminal of WSL ubuntu by entering 

```shell
wsl
```

in cmd or terminal.
