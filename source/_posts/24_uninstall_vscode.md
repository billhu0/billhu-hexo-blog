---
title: Uninstall Vscode on macOS
date: 2021-10-17 19:24:01
description: Uninstall vscode and remove all vscode plugins and configs
tags: 
- vscode
categories: 
- vscode
---


- Delete settings and configurations

    ```shell
    rm -rf $HOME/Library/Application\ Support/Code/
    ```

- Delete plugins

    ```shell
    rm -rf $HOME/.vscode/
    ```

- And then delete 'vscode.app' from 'Applications'

