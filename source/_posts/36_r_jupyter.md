---
title: "Use R language in jupyter notebook"
date: 2022-10-12 10:48:00
description: Install R kernal and use R language in jupyter notebook
categories: 
- R
tags:
- R
---



Step 1. Install R

```sh
brew install R	
```

Step 2. Install jupyter kernal inside R

Type `R` to enter the R interactive terminal, then execute 

```R
install.packages('IRkernel')
```

When the installation is complete, the program will output the location of the downloaded packages. For example: 

![](36_r_jupyter/downloaded packages.jpg)

Copy the location and in shell

```sh
jupyter kernelspec install /path/to/packages
```

Step 3.

Enter R interactive terminal again, and 

```R
IRkernel::installspec(user = FALSE)		
```

Now you should be able to select R kernal inside jupyter notebook.