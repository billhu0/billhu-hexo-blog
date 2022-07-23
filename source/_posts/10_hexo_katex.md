---
title: How to make hexo render LaTeX formulas correctly
date: 2022-01-16 18:38:00
description: Inserting LaTeX formulas in your hexo blog (theme 'fluid') and render it correctly, using KaTeX renderer.
math: true
categories: 
- hexo
tags:
- hexo
- LaTeX
---

## How to render $\LaTeX$ formulas in hexo blog (theme ‘fluid’)

By default, $\LaTeX$ formulas are not rendered and cannot be correctly displayed. To fix this, the first step is to uninstall the default renderer and install $\KaTeX$ renderer.  ( $\mathrm{mathjax}$ is also an alternative, but it has some render problems in my tries, and I don’t know why). 

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

In `_config.yml`, modify the corresponding part to the following:

```yml
math:
  engine: katex
  katex:
    css: https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css
    js: https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.js
    config:
      # KaTeX config
      throwOnError: false
      errorColor: "#cc0000"
```

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

