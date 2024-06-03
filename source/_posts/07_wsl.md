---
title: "How to install WSL?"
date: 2021-10-21 23:11:00
description: "How did I install WSL, and what errors did I encountered?"
catagories:
- Windows
tags:
- windows
- Linux
- WSL
---


## Step1. Upgrade Windows if needed.

Make sure you have upgraded to Windows 10 version **2004** or insider preview **19041** or higher. Older versions of Windows does not support WSL2.

{% note info %}
Press Win+R, execute `winver` to check your windows 10/11 version number.
{% endnote %}


## Step2. Start installing.

In Cmd(administrator) or Powershell(administrator) , run 

```shell
wsl --install
```

Then, open Microsoft Store, and search for `Ubuntu 20.04` and download.

Launch it after the download is complete. You will see a command window with 'installing...'.


### Possible error code and solution:

####  `0xc03a011a`:

1. Find `C:\Users\YOUR_USER_NAME\AppData\Local\Packages` in file explorer, where `YOUR_USER_NAME` is your username.
2. Find the folder begin with `CanonicalGroupLimited.Ubuntu18.04onWindows`, right click on it, click 'properties', click 'advanced'
3. Deselect "压缩内容以节省磁盘空间"
4. Click "Confirm" and try to install again

#### `0x80370102`:

{% note success %}
If you are installing wsl on a **Mac** using bootcamp windows, and got this error, you should enter macOS first, and reboot to windows from 'startup disk' in 'system preferences' (instead of entering windows directly after pressing the power on button). After you have entered windows, go to task manager -> performance -> CPU, and make sure 'virtualization' is 'on'.
{% endnote %}


1. Check if you have enabled VT virtualization: In "Task manager" -> "Performance" -> "CPU", check if "virtualization" is on. If not, enter BIOS and enable this feature.
2. Check if corresponding windows features are enabled: Press win+Q and search for "enable or disable windows features"
   - Windows10：Make sure `Hyper-V`, `Virtual Machine Platform`, `Windows Subsystem for Linux` are enabled.
   - Windows11：Make sure `Windows subsystem for linux` is enabled.
3. 打开Powershell(管理员)，执行以下命令：

```powershell
# Enable "Windows subsystem for linux"
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
# Enable "Virtual Machine Platform"
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
# Install linux kernal update 
https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.ms
```



## Step 3: Enjoy

After the installation is complete, you can see the terminal of ubuntu.

You can access the terminal of WSL ubuntu by entering 

```shell
wsl
```

in cmd or terminal.
