---
title: HomeBridge on raspberry pi
date: 2021-09-13 17:09:49
categories: 
- Raspi&Arduino
tags: 
- Linux
- RaspberryPi
- HomeBridge
- HomeKit
---

### Install Homebridge

#### Method 1: Install HomeBridge ISO directly

github address：`https://github.com/homebridge/homebridge-raspbian-image/releases`

*<!-- more -->*

#### Method 2: Install manually

In Terminal, execute the following：

```shell
curl -sL https://deb.nodesource.com/setup_12.x | sudo bash - 
# setup repo

sudo apt-get install -y nodejs gcc g++ make python
# You may execute `sudo apt-get upgrade` before this step
# `-y` means to ignore the confirmation

node -v
# see the nodejs version you have just installed

sudo npm i -g npm
# upgrade npm

sudo npm install -g --unsafe-perm homebridge homebridge-config-ui-x
# Add --registry https://registry.npm.taobao.org to use 淘宝npm镜像 if its too slow

sudo hb-service install --user homebridge
# hb-service can set homebridge as a service, 
# and can start automatically at system startup.
# It will create a user 'homebridge' to run the service.
# The config file is located at /var/lib/homebridge/config.json
# Remember the ip address displayed;
# default username 'admin', passwd 'admin'

```

### Control the power supply of USB port using HomeKit

In Terminal, install 'uhubctl'

```shell
sudo apt install libusb-1.0-0-dev
git clone https://github.com/mvp/uhubctl
cd uhubctl
make
sudo make install
```

Command to control the power supply:

```shell
sudo uhubctl -l 1-1 -p 2 -a on  # turn power on
sudo uhubctl -l 1-1 -p 2 -a off # turn power off
```

Then we need to solve the permission problem by configuring 'udev USB' permission. (Otherwise, we have to run uhubctl as `root`, but by default HomeBridge service will not run as root.)

1. Run `sudo uhubctl`, see the VID of the port we need to control. (Or find it in [uhubctl docs](https://github.com/mvp/uhubctl#compatible-usb-hubs).

2. Add the following udev rule to file `/etc/udev/rules.d/52-usb.rules`. Don't forget to replace the VID.

   - On raspi 3B+ :

     ```none
     SUBSYSTEM=="usb", ATTR{idVendor}=="0424", MODE="0666"
     ```

   - On raspi 4 (one for USB2 and one for USB3) :

     ```none
     SUBSYSTEM=="usb", ATTR{idVendor}=="2109", MODE="0666"
     SUBSYSTEM=="usb", ATTR{idVendor}=="1d6b", MODE="0666"
     ```

3. To let udev rules function correctly, execute:

   ```shell
   sudo udevadm trigger --attr-match=subsystem=usb
   ```

4. Test the following command without using `sudo` to check if you can control USB power supply:

   ```bash
   uhubctl -l 1-1 -p 2 -a on  # turn power on
   uhubctl -l 1-1 -p 2 -a off # turn power off
   ```

Then, install plugin 'Script2' in HomeBridge

Enter config and add the following:

```json
"accessories": [
    {
        "accessory": "Script2",
        "name": "LED Light",
        "on": "uhubctl -l 1-1 -p 2 -a on",
        "off": "uhubctl -l 1-1 -p 2 -a off",
        "state": "uhubctl -l 1-1 -p 2 2>/dev/null | grep -c 'power'",
        "on_value": "1"
    }
]
```





### Get the token of MJ (米家) devices

`https://www.home-assistant.io/integrations/xiaomi_miio#xiaomi-cloud-tokens-extractor-1`

github address： `https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor/blob/master`





### HomeKit Camera (No success)

bilibili video demo：

`https://b23.tv/vu977y`

```
把吃灰的树莓派利用起来，DIY一个支持原生HomeKit的摄像头。还可以自定义分辨率，码率，帧率。如果家里有家庭中枢，还可以进行外网访问。
https://bit.ly/2VTjtZJ
http://homebridge.local
https://bit.ly/2VT0cIn
https://bit.ly/3jTC8wR
```

Github repo address memtioned:

`https://github.com/Sunoo/homebridge-camera-ffmpeg`

`https://sunoo.github.io/homebridge-camera-ffmpeg/configs/Raspberry-Pi-with-Camera-Module.html`



Step1. Install HomeBridge system

Start raspi (no need to connect keyboard, mouse, HDMI port), wait a while and connect the wifi named `HomeBridge WIFI Setup` after it appears. Enter the wifi keyboard (If raspi fails to detect your wifi, just wait a while and try again).

The default username and password (if you want to ssh connect to your pi) is `pi` and `raspberry`

2 Install HomeBridge Plugin `Camera FFMpeg`

3 Create a service

```shell
sudo apt install v4l2loopback-dkms

Edit /boot/config.txt and change gpu_mem=128 to gpu_mem=256 (or use raspi-config)
```

Create the file `/etc/systemd/system/camera-loopback.service`

```shell
[Unit]
Description=Set up loopback cameras

[Service]
ExecStartPre=/sbin/modprobe v4l2loopback devices=2
ExecStart=/usr/local/bin/ffmpeg -f video4linux2 -input_format yuv420p -video_size 1280x720 -i /dev/video0 -codec copy -f v4l2 /dev/video1
Restart=always
RestartSec=2

[Install]
WantedBy=default.target
```

Activate with `sudo systemctl enable camera-loopback` 

and start with `sudo systemctl start camera-loopback`

4 Edit `config.json` of HomeBridge

Add to the `platforms`:

```json
        {
            "name": "Camera FFmpeg",
            "cameras": [
                {
                    "name": "Raspberry Pi Camera",
                    "manufacturer": "Edddd",
                    "model": "RPI HomeKit Camera",
                    "serialNumber": "12345678",
                    "unbridge": true,
                    "videoConfig": {
                        "source": "-f video4linux2 -i /dev/video1",
                        "maxStreams": 1,
                        "maxWidth": 1280,
                        "maxHeight": 720,
                        "maxFPS": 30,
                        "maxBitrate": 1000,
                        "forceMax": true,
                        "vcodec": "h264_omx"
                    }
                }
            ],
            "platform": "Camera-ffmpeg"
        }
```

