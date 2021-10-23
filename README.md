# 强悍搜索 (Strong Search)

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).

### 坑

- 编译后 index.html 味道 www 目录，需手动移动到 www 目录，也可以参考下面解决方案

    https://stackoverflow.com/questions/68606159/how-to-solve-error-firefox-can-t-find-the-file-at-moz-extension-when

- manifest.json 的 `background` 参数只能 `page` 与 `scripts` 只能选一个；但 quasar bex manifest.json 的 `background` 参数不支持 `page`，必须使用 `scripts`，因为 quasar 还需要编译 `background` 指定的 `scripts`; 如果想使用 `page`，编译后再手动配置。

   ```js
   "background": {
    "page": "background.html",
    "scripts": [
      "www/bex-background.js",      // 编译后是 www/js/bex-background.js
      "js/background.js"
    ],
    "persistent": true
  },
   ```
