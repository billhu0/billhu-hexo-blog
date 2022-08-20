---
title: Flash Android 12 on Pixel 3
date: 2022-06-27 11:32:00
description: Flash official android, or lineageOS, pixel expericnce, etc, on Google Pixel 3.
categories: 
- Android
tags:
- Android
---

### How to flash Google official package?

- OTA ROM: [https://developers.google.com/android/ota#blueline](https://developers.google.com/android/ota#blueline)  (Upgrade only. Cannot downgrade. Do not unzip the downloaded zip file.)

- Factory ROM: [https://developers.google.com/android/images#blueline](https://developers.google.com/android/images#blueline)  (Can upgrade or downgrade. Can unzip the downloaded file to get `boot.img`, etc. `flash_all.sh/bat` is included.)

To flash official ROM, download factory ROM above, enter bootloader on the phone, and directly execute `flash_all.sh`.


### How to flash LineageOS

Download recovery and ROM for LineageOS: [https://download.lineageos.org/blueline](https://download.lineageos.org/blueline)

Download the 'recovery' and flash to 'boot'

```sh
fastboot flash boot xxx.img
```

Then reboot to recovery, do a factory reset first, and then select 'sideload adb', then on the computer, flash with 'adb sideload' command:

```sh
adb sideload xxx.zip   # LineageOS ROM
adb sideload xxx.zip   # (optional) GApps
```

Note that, you must flash GApps instantly after flash LineageOS. You should not flash LineageOS first, boot, then enter recovery to flash GApps.

> lineageos instructions: https://wiki.lineageos.org/devices/blueline/install
>
> lineageos gapps instructions: https://wiki.lineageos.org/gapps


### Flash magisk

Get `boot.img`, patch with magisk, and flash the patched image with `fastboot flash boot xxx.img`.

### Flash GSI

Reboot to bootloader first. 

```sh
adb reboot bootloader
```

In bootloader, flash `vbmeta`.

```sh
fastboot devices    # make sure you have connected
fastboot --disable-verification flash vbmeta vbmeta.img
```

Note that some devices (e.g. Pixel 5) requires `fastboot --disable-verity --disable-verification flash vbmeta xxx.img` to disable vbmeta verification.

Then reboot to `fastbootd`. (Note that, despite `bootloader` and `fastbootd` share the same `fastboot` command, they are different modes)

```sh
fastboot reboot fastboot
```

Erase the system, and flash it.

```sh
fastboot erase system
fastboot flash system system.img
```

If an error `Not enough space to resize partition` occurs, remove some unnecessary partitions...

```sh
fastboot delete-logical-partition product_a
fastboot delete-logical-partition product_b
```

and try `fastboot flash system system.img` again.

Finally, erase and boot!

```sh
fastboot -w    # optional
fastboot reboot
```

> Reference: 
>
> 不使用 TWRP，为你的 Pixel 设备刷入 Android 12 和 Magisk： https://daily.elepover.com/2021/05/19/android-s/index.html
>
> pixel刷机lineage教程 - 掘金:  https://juejin.cn/post/7039276486120964126