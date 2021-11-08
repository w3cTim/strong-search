<p align="center">
<img src="https://w3ctim.com/strongsearch/images/logo.png" alt="strong search" width="200px" />
</p>

<p align="center">
<a href="//w3ctim.com/strongsearch/">🚀 使您的网页搜索效率提高300% ⚡️</a>
</p>

# 强悍搜索 (Strong Search)

- 一个人性化、快速选择文字多引擎搜索工具；
- 支持划词搜索、菜单分组、快速复制。
- 支持浏览器多设备同步配置；
- 默认保存多种常用搜索引擎，支持自定义，快速拖拽排序；
- 可导出、导入配置文件。

## 框选即触发，呼之即来挥之即去

![框选即触发，呼之即来挥之即去](https://w3ctim.com/strongsearch/images/strongsearch.gif)

## 引擎自定义

![引擎自定义](https://w3ctim.com/strongsearch/images/strongsearchend.webp)

## 导入、导出配置

![支持手动备份、分享配置文件](https://w3ctim.com/strongsearch/images/strongsearchend.webp)

## 支持多设备同步

![支持多设备同步](https://w3ctim.com/strongsearch/images/strongsearchend4.webp)

## 代码运行方法

使用工具：Vue 3 + Quasar BEX + Material Icons

确保您的机器上已经安装了 Node >=12.22.1 和 NPM >=6.13.4。

### 安装的依赖

```bash
yarn
```

### 启动应用程序

```bash
quasar dev
```

### 构建生产应用

```bash
quasar build
```

### 自定义配置

See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).

### quasar v2.0.0 遇到的 bug

1. 编译后 index.html 为拷贝到 www 目录，需手动移动到 www 目录，也可以参考下面解决方案

    [https://stackoverflow.com/questions/68606159/how-to-solve-error-firefox-can-t-find-the-file-at-moz-extension-when](https://stackoverflow.com/questions/68606159/how-to-solve-error-firefox-can-t-find-the-file-at-moz-extension-when)

2. 浏览器插件的 manifest.json 文件规定 `background` 参数值必须 `page` 或 `scripts`；但 quasar bex 不支持 `page`，必须使用 `scripts`，因为 quasar bex 还需要编译 `background` 指定的 `scripts`; 如果想使用 `page`，编译后再手动配置。

   ```js
   "background": {
    "page": "background.html",    // page scripts 二选一
    "scripts": [
      "www/bex-background.js",    // 编译后是 www/js/bex-background.js
      "js/background.js"
    ],
    "persistent": true
    },
    ```
