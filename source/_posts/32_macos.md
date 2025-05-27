---
title: My macOS Config
date: 2024-07-25 11:32:00
description: It's something Only Apple Can Do!
sticky: 101
categories: 
- macOS
tags:
- macOS
---

For my new M2 MacBook Air.

## Terminal

![](32_macos/iterm2.webp)

### Install 'oh-my-zsh' and plugins

- Install Xcode from App Store, OR install Xcode Commandline Tools using the following command

  ```sh
  xcode-select --install
  ```

- Install oh-my-zsh (Official website: [ohmyz.sh](https://ohmyz.sh))

  ```sh
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  ```

  Note: , use Clash and the following shortcuts to proxy your terminal.

  ```sh
  # proxy, created on 2024.07.23
  enableproxy() {
      export https_proxy=http://127.0.0.1:7890;
      export http_proxy=http://127.0.0.1:7890;
      export all_proxy=socks5://127.0.0.1:7890;
      git config --global http.proxy http://127.0.0.1:7890;
      git config --global https.proxy https://127.0.0.1:7890;
  }
  disableproxy() {
      unset http_proxy;
      unset https_proxy;
      unset all_proxy;
      git config --global --unset http.proxy;
      git config --global --unset https.proxy;
  }
  ```

- Install plugins. 

  zsh-syntax-highlighting

  ```sh
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
  ```

  Then, to enable these plugins, open `~/.zshrc` and modify the line `plugins=(git)` to 

  ```sh
  plugins=(git zsh-syntax-highlighting)
  ```

  You may also enable some built-in useful plugins

  ```sh
  plugins=(git zsh-syntax-highlighting colored-man-pages extract sudo z)
  ```
  
  

{% fold info @oh-my-zsh 国内一件安装并配置镜像源脚本（已失效） %}

```shell
zsh -c "$(curl -fsSL 'https://api.host.mintimate.cn/fileHost/public/download/1P0R')"
```

{% endfold %}

### iTerm2 

![](32_macos/iterm2.png)

Download iTerm2: [https://iterm2.com](https://iterm2.com)

{% fold info @My Detailed Theme Config %}

- Install iTerm2 and **set as default terminal**.
- Settings --> Appearance --> General ---> **Theme = Minimal**.
- Settings --> Profiles --> Colors --> Color Presets --> Solarized Dark High Contrast (Download from [here](https://github.com/mbadolato/iTerm2-Color-Schemes/blob/master/schemes/Solarized%20Dark%20Higher%20Contrast.itermcolors) and import it). 
- Settings --> Profiles --> Window --> **Transparency = 13, Keep background colors opaque = true, Blur = 13, Columns = 115**.
- Install MesloLGS-NF Font (download from [here](https://github.com/romkatv/dotfiles-public/tree/master/.local/share/fonts/NerdFonts)) and use that font: Settings --> Profiles --> Text --> **Set Font to MesloLGS-NF**, size = 15.
- Settings --> Profiles --> Terminal --> Turn on "**Unlimited scrollback**".
- Settings --> Advanced --> Search for "**Scroll wheel sends arrow keys when in alternate screen mode**" and turn it on.

{% endfold %}



## Install HomeBrew

如果需要使用国内源，append the following to the end of `~/.zshrc`

```shell
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
export HOMEBREW_NO_AUTO_UPDATE=true
```

then install homebrew with 

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

国内镜像

```shell
/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/Homebrew/install@HEAD/install.sh)"
brew update
```

> Reference: [Homebrew 源使用帮助 - USTC Mirror Help](https://mirrors.ustc.edu.cn/help/brew.git.html)



## In order to run cracked applications

- Allow apps downloaded from 'Anywhere'. 

  ```shell
  sudo spctl --master-disable
  ```

  Then in Settings --> Privacy & Security, you can see the option "Anywhere".

  ![](32_macos/spctl-master-disable.webp)

- Turn off SIP protection. 

  In recovery mode (For Intel Mac, press and hold 'command+R' after pressing power-on button; For Apple Silicon Mac, press and hold the power button until entering startup menu). 

  ```shell
  csrutil disable
  ```

  This can prevent some annoying problems, such as `XprotectService` consuming your CPU after downloading some files, or your Mac refuses to open some unknown applications. But this will increase the risk your system being infected. **Do with caution!**

- sudo without password. **Do with caution! Dangerous!**

  ```shell
  visudo
  ```

  Modify the line `%admin  ALL = (ALL) ALL` to 

  ```shell
  %admin  ALL = (ALL) NOPASSWD:ALL
  ```



## GUI

- Modify launchpad icon layout

  You can modify the row number and column number the launchpad displays. 

  ```shell
  defaults write com.apple.dock springboard-rows -int 5
  defaults write com.apple.dock springboard-columns -int 10
  killall Dock
  ```

  To restore default, use

  ```shell
  defaults write com.apple.dock springboard-rows Default 
  defaults write com.apple.dock springboard-columns Default 
  killall Dock
  ```

- Finder settings

  Finder --> Settings --> Turn on "Show all filename extensions"

  ![](32_macos/finder-settings.webp)

- Safari

  Settings --> General --> Turn off "Open Safe files after downloading". 

  这样的话safari下载压缩包完成后就不会自动解压了

  Settings --> Advanced --> Turn on "Show features for web developers". 启用safari的DevTools。

  ![](32_macos/safari-openSafeFilesAfterDownload.webp)

- 如果使用非苹果键盘想互换command和option按键（windows和alt按键）：

  Settings --> Keyboard --> Keyboard Shortcuts --> Modifier Keys

  ![](32_macos/modifier-keys.webp)

  非苹果键盘没有地球仪键，可能没法切换输入法，可在Input sources中把切换输入法快捷键设置成control+空格.

  ![](32_macos/input-source-shortcut.webp)
  
- Hot corners 触发角

  Settings --> Desktop & Dock --> Hot corners (at the bottom)

  ![](32_macos/hot corners.webp)

## CLI-related miscellaneous things

- Make `jpg` (instead of `png`) the default screenshot filetype. This can significantly reduce screenshot size.

    ```shell
    defaults write com.apple.screencapture type jpg
    ```
    
- Make `~/Library/` a visible folder.

    ```shell
    chflags nohidden ~/Library
    ```

- Modify Hostname

    Go to Settings, General, Sharing, scroll to the bottom.
    
    ![](32_macos/modify-hostname.webp)
    
- Turn off 'powernap' and 'tcpkeealive'. This disables wifi connection at system sleep to save battery power, but may result in features like 'Find My Mac' not to function properly. Do with caution!

    ```shell
    sudo pmset -a powernap 0
    sudo pmset -a tcpkeepalive 0
    ```

- Fast Key Repeat Rate

  In Settings, Keyboard, set Key repeat rate to the highest.

  ![](32_macos/key-repeat-rate.webp)
  
- Trackpad-related

  Settings --> Trackpad --> Point&Click --> Turn on "Tap to click".

  Settings --> Trackpad --> More Gestures --> App Exposé, choose "Swipe Down with Three Features"
  
- Vim

  Write to `~/.vimrc`

  ```
  set modelines=0    " CVE-2007-2438
  
  set nocompatible   " Use Vim defaults instead of 100% vi compatibility
  set backspace=2    " more powerful backspacing
  
  " Don't write backup file if vim is being called by "crontab -e"
  au BufWrite /private/tmp/crontab.* set nowritebackup nobackup
  " Don't write backup file if vim is being called by "chpass"
  au BufWrite /private/etc/pw.* set nowritebackup nobackup
  
  let skip_defaults_vim=1
  
  syntax on
  
  set tabstop=4
  set softtabstop=4
  set shiftwidth=4
  set ruler
  set nu
  
  ```
  
  

## Useful GUI Software

- **Parallels Desktop**: 能运行Windows 11 ARM, Ubuntu ARM等虚拟机

  不免费，可能需要破解版: [link](https://www.luoxx.top/archives/pd-18-active?cid=162)

- **MOS**: A lightweight tool used to let your mouse on macOS behave like Windows.

  开源软件，官网: [mos.caldis.me](https://mos.caldis.me)

  Turn on "Launch on Login".

  有些软件滑动起来会很怪（甚至完全没法用），如Adobe Acrobat、Blender等，可以添加exception, 对这些软件单独关闭 Smooth Scrolling.

  

  ![](32_macos/mos.webp)

- **Rectangle**: Window manager.

  开源的窗口管理器

  [https://github.com/rxhanson/Rectangle](https://github.com/rxhanson/Rectangle)

- **Crossover**: with the help of Apple Game Porting Toolkit (GPTK), it allows you to run Windows games on your mac. 能够转译运行Windows上的DirectX游戏。

  不免费，可能需要破解版。



## Useful Command Line Software

- **Asitop**: power measuring tool for Apple Silicon.

  Install with python and pip.

  ```shell
  /usr/bin/python3 -m pip install asitop
  ```

  

  ![](32_macos/asitop.webp)

- **Smartctl**: a tool to view your hard disk usage.

  ````sh
  brew install smartmontools
  ````
  
  Run with `smartctl -a disk0`.
  
  ![](32_macos/smartctl.webp)



