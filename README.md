<p align="center">
<img src="https://w3ctim.com/strongsearch/images/logo.png" alt="strong search" width="200px" />
</p>

<p align="center">
<a href="//w3ctim.com/strongsearch/">ð ä½¿æ¨çç½é¡µæç´¢æçæé«300% â¡ï¸</a>
</p>

# å¼ºææç´¢ (Strong Search)

- ä¸ä¸ªäººæ§åãå¿«ééæ©æå­å¤å¼ææç´¢å·¥å·ï¼
- æ¯æåè¯æç´¢ãèååç»ãå¿«éå¤å¶ã
- æ¯ææµè§å¨å¤è®¾å¤åæ­¥éç½®ï¼
- é»è®¤ä¿å­å¤ç§å¸¸ç¨æç´¢å¼æï¼æ¯æèªå®ä¹ï¼å¿«éææ½æåºï¼
- å¯å¯¼åºãå¯¼å¥éç½®æä»¶ã

## æ¡éå³è§¦åï¼å¼ä¹å³æ¥æ¥ä¹å³å»

![æ¡éå³è§¦åï¼å¼ä¹å³æ¥æ¥ä¹å³å»](https://w3ctim.com/strongsearch/images/strongsearch.gif)

## å¼æèªå®ä¹

![å¼æèªå®ä¹](https://w3ctim.com/strongsearch/images/strongsearchend.webp)

## å¯¼å¥ãå¯¼åºéç½®

![æ¯ææå¨å¤ä»½ãåäº«éç½®æä»¶](https://w3ctim.com/strongsearch/images/strongsearchend.webp)

## æ¯æå¤è®¾å¤åæ­¥

![æ¯æå¤è®¾å¤åæ­¥](https://w3ctim.com/strongsearch/images/strongsearchend4.webp)

## ä»£ç è¿è¡æ¹æ³

ä½¿ç¨å·¥å·ï¼Vue 3 + Quasar BEX + Material Icons

ç¡®ä¿æ¨çæºå¨ä¸å·²ç»å®è£äº Node >=12.22.1 å NPM >=6.13.4ã

### å®è£çä¾èµ

```bash
yarn
```

### å¯å¨åºç¨ç¨åº

```bash
quasar dev
```

### æå»ºçäº§åºç¨

```bash
quasar build
```

### èªå®ä¹éç½®

See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).

### Quasar BEX v2.0.0 éå°ç bug

1. ç¼è¯å index.html æªæ·è´å° www ç®å½ï¼éæå¨ç§»å¨å° www ç®å½ï¼ä¹å¯ä»¥åèä¸é¢è§£å³æ¹æ¡

    [https://stackoverflow.com/questions/68606159/how-to-solve-error-firefox-can-t-find-the-file-at-moz-extension-when](https://stackoverflow.com/questions/68606159/how-to-solve-error-firefox-can-t-find-the-file-at-moz-extension-when)

2. æµè§å¨æä»¶ç manifest.json æä»¶è§å® `background` åæ°å¼å¿é¡» `page` æ `scripts`ï¼ä½ Quasar BEX ä¸æ¯æ `page`ï¼å¿é¡»ä½¿ç¨ `scripts`ï¼å ä¸ºè¿éè¦ç¼è¯ `background` æå®ç `scripts`; å¦ææ³ä½¿ç¨ `page`ï¼ç¼è¯ååæå¨éç½®ã

   ```js
   "background": {
    "page": "background.html",    // page scripts äºéä¸
    "scripts": [
      "www/bex-background.js",    // ç¼è¯åæ¯ www/js/bex-background.js
      "js/background.js"
    ],
    "persistent": true
    },
    ```
