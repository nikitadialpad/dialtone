# Installation

A quick start guide to adding Dialtone to your project.

## Adding Dialtone To Your Project

To take advantage of Dialtone's customizations, classes, and variables in your project, you will want to install Dialtone via
<a href="https://www.npmjs.com/" class="d-link" target="_blank">npm</a>

```bash
npm install @dialpad/dialtone
```

Add the following line in your Less file:

```bash
@import "your/path/to/dialtone.less";
```

If you only need access to Dialtone's variables and customizations to build a file and don't need the whole library exported, use this line instead in your Less file:

```bash
@import (reference) "your/path/to/dialtone.less";
```

## Theming

[comment]: <> (<h2 class="d-mt64">Theming</h2>)

To customize your Dialtone installation, create a new Less file in the

<code class="d-py2 d-px4 d-bar2 d-bgc-purple-100 d-bgo50 d-fc-purple d-fs14">/lib/build/less/themes/</code>

folder. By default this will compile during build, which can be added as an additional CSS file in your page

<code class="d-py2 d-px4 d-bar2 d-bgc-purple-100 d-bgo50 d-fc-purple d-fs14">head</code>

```bash
@import "your/path/to/dialtone.less";
```

If you only need access to Dialtone's variables and customizations to build a file and don't need the whole library exported, use this line instead in your Less file:
```bash
@import (reference) "your/path/to/dialtone.less";
```
