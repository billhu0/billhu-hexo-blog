---
title: "Install Windows 11 on Intel Mac (bootcamp)"
date: 2023-08-14 18:20:41
description: 1
hide: true
categories: 
- Code
tags:
- Code
---



{% note warning %}

This article is only suitable for Intel-based Macs. Macs with M-chips are not compatible. 

We will use BootCamp and Rufus to create a USB bootable installation. 

{% endnote %}

{% note info %}

Many installation methods involves manually replacing or deleting vertification files to skip the TPM check, which might be cumbersome as it requires both unpacking and repackaging the image. Fortuately, Rufus can do that step for us automatically, which directly creates a verification-skipped image.

{% endnote %}

## Step 1. Download Win11 ISO

The first step is to download the official Windows 11 image. 

## Step 2. Create Installation Media

Next we need to create an installation media with the downloaded ISO. Note that we may not be able to create 
