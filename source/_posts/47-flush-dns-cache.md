---
title: "[macOS/Linux/Windows] How to flush DNS cache"
date: 2024-06-19 07:02:18
tags:
---

# [macOS/Linux/Windows] How to flush DNS cache

## macOS

```shell
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

## Windows

Open cmd (administrator), then 

```powershell
ipconfig /flushdns
```

## Ubuntu Linux

- For Ubuntu 17.04 and higher (18.04)

    ```shell
    sudo systemd-resolve --flush-caches
    ```

- For Ubuntu 22.04 and higher

    ```
    sudo resolvectl flush-caches
    ```

