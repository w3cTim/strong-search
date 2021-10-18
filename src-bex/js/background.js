// 使用浏览器间同步的方式保存配置
const storage = chrome.storage.sync;

const defaultOption = {
  "name": "其他引擎搜索 \"%s\"", "triggerkey": false,
  "searchEngines": [
    { "id": "6a1a7800-c4b9-4bc6-add1-15cef3fb4e62", "group": "常用", "name": "Google", "url": "https://www.google.com.tw/search?q=%s", "encode": false, "enable": true },
    { "id": "b313d6ad-4d1e-434d-b6b2-c2dfb94f64e1", "group": "常用", "name": "百度", "url": "http://www.baidu.com/s?wd=%s", "encode": false, "enable": true },
    { "id": "0c2023a9-34d3-4f40-9693-2945c900ed4a", "group": "常用", "name": "豆瓣", "url": "http://www.douban.com/search?q=%s", "encode": false, "enable": true },
    { "id": "275356a9-b24d-4b10-8be4-60c289c19ace", "group": "常用", "name": "知乎", "url": "https://www.zhihu.com/search?type=content&q=%s", "encode": false, "enable": true },
    { "id": "d0af0c9b-ddae-4092-84f8-881d2a88215b", "group": "购物", "name": "淘宝", "url": "http://s.taobao.com/search?q=%s&sort=sale-desc", "encode": false, "enable": true },
    { "id": "af0a4106-c09f-42b6-b25a-5b1d213ef341", "group": "购物", "name": "亚马逊", "url": "http://www.amazon.cn/keywords=%s", "encode": false, "enable": true }]
}

~(function () {
  storage.clear()
})()

/**
 * 保存配置到 Storage，超过 chrome.storage.sync.QUOTA_BYTES_PER_ITEM 需要进行分片保存。
 * QUOTA_BYTES_PER_ITEM：chrome.storage.sync 存储的单个项目的最大尺寸（8192 字节）
 * @param {*} opts
 * @param {*} cb
 */
function setOptions(opts, cb) {
  const optionStr = JSON.stringify(opts);
  let length = optionStr.length;
  var sliceLength = storage.QUOTA_BYTES_PER_ITEM / 2;
  const optionSlices = {}; // 保存分片数据
  let i = 0; // 分片序号

  // 分片保存数据
  while (length > 0) {
    optionSlices["ss_options_" + i] = optionStr.substr(i * sliceLength, sliceLength);
    length -= sliceLength;
    i++;
  }

  // 保存分片数量
  optionSlices["ss_options_num"] = i;

  // 写入 Storage
  storage.set(optionSlices, cb);

  // console.log(optionSlices);
}


/**
 * 从 Storage 读取配置
 *
 * @param {*} cb
 */
function getOptions(cb) {
  storage.get(null, function (items) {

    // 新建菜单
    if (!items.ss_options_num || items.ss_options_num == 0) {
      // 保存默认配置
      setOptions(defaultOption);

      cb(defaultOption);
    }
    else {
      let opts = "";
      // 把分片数据组成字符串
      for (let i = 0; i < items.ss_options_num; i++) {
        opts += items["ss_options_" + i];
      }

      console.log(opts);

      cb(JSON.parse(opts));
    }
  });
}



// 监听 content.js 请求事件
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  // console.log("Recieve request: " + request.cmd);

  switch (request.cmd) {
    case 'get_options':
      getOptions(function (opts) {
        sendResponse(opts);
      });
      break;
    case 'set_options':
      setOptions(request.opts, function () {
        sendResponse();
      });
      break;
    default:
      console.log("Recieve request: " + request.cmd);
      break;
  }

  // 如有异步操作，必须返回 true
  return true;
});



chrome.browserAction.onClicked.addListener((/* tab */) => {
  // Opens our extension in a new browser window.
  // Only if a popup isn't defined in the manifest.
  chrome.tabs.create({
    url: chrome.extension.getURL('www/index.html#/')
  }, (/* newTab */) => {
    // Tab opened.
  })
})
