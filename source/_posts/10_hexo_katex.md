---
title: How to allow hexo render LaTeX formulas correctly
date: 2022-01-16 18:38:00
description: Inserting LaTeX formulas in your hexo blog and render it correctly, using KaTeX renderer.
math: true
categories: 
- hexo
tags:
- hexo
- LaTeX
---

## How to render $\LaTeX$ formulas in hexo blog (theme ‘fluid’)

By default, $\LaTeX$ formulas are not rendered and cannot be correctly displayed. To fix this, the first step is to uninstall the default renderer and install $\KaTeX$ renderer.  ( $\mathrm{mathjax}$ is also an alternative, but it may fail to render some complex formulas). 

In terminal, `cd` to your hexo directory, and run the following

```shell
npm uninstall hexo-renderer-marked --save
```

and then 

```shell
npm install hexo-renderer-markdown-it-plus --save
```

To get a better view, `hexo-math` plugin (by hexo official) is recommended, which makes your math text looks better.

```shell
npm install hexo-math --save
```

After that, modify some configurations:

In ‘fluid’ theme `_config.fluid.yml`, modify the corresponding part to the following:

```yml
post:
  math:
    enable: true
    specific: true
    engine: katex
```

Note that `specific` means to only enable formula conversion when `math: true` is found in front-matter, in order to boost loading speed when no formula.

Finally, 

```shell
hexo clean && hexo generate 
```

> Reference: [link](https://wty-yy.github.io/posts/3849/index.html)

