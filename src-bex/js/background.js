// 使用浏览器间同步的方式保存配置
const storage = chrome.storage.sync;

const defaultOption = { "triggerkey": false, "engines": [{ "id": "6a1a7800-c4b9-4bc6-add1-15cef3fb4e62", "group": "常用", "name": "Google", "url": "https://www.google.com.tw/search?q=%s", "encode": false, "isnew": true, "enable": true }, { "id": "b313d6ad-4d1e-434d-b6b2-c2dfb94f64e1", "group": "常用", "name": "百度", "url": "http://www.baidu.com/s?wd=%s", "encode": false, "isnew": true, "enable": true }, { "id": "0c2023a9-34d3-4f40-9693-2945c900ed4a", "group": "常用", "name": "豆瓣", "url": "http://www.douban.com/search?q=%s", "encode": false, "isnew": true, "enable": true }, { "id": "275356a9-b24d-4b10-8be4-60c289c19ace", "group": "常用", "name": "知乎", "url": "https://www.zhihu.com/search?type=content&q=%s", "encode": false, "isnew": true, "enable": true }, { "id": "d0af0c9b-ddae-4092-84f8-881d2a88215b", "group": "常用", "name": "淘宝", "url": "http://s.taobao.com/search?q=%s&sort=sale-desc", "encode": false, "isnew": true, "enable": true }, { "id": "5526d768-0325-4e0a-b53b-130abdbcb05a", "group": "常用", "name": "bilibili", "url": "https://search.bilibili.com/all?keyword=%s", "encode": false, "isnew": true, "enable": true }, { "id": "afddc6c4-d801-48b3-a4bf-09f19e041625", "group": "常用", "name": "地图", "url": "https://map.baidu.com/search/%s", "encode": false, "isnew": true, "enable": true }, { "id": "9a9b4c0f-210e-4e16-9ae9-7be692a603cd", "group": "常用", "name": "wiki", "url": "https://zh.wikipedia.org/wiki/%s", "encode": false, "isnew": true, "enable": true }, { "id": "fe1007c2-a70e-498f-919a-9db36a5529e5", "group": "常用", "name": "微博", "url": "https://s.weibo.com/weibo/%s", "encode": false, "isnew": true, "enable": true }, { "id": "bde6a7b7-c357-433a-b76c-3cb849938af8", "group": "常用", "name": "MDN", "url": "https://developer.mozilla.org/zh-CN/search?q=%s", "encode": false, "isnew": true, "enable": false }, { "id": "e4dfa241-2a83-4e1f-84f6-6f7dae95a632", "group": "购物", "name": "值得买", "url": "https://search.smzdm.com/?s=%s", "encode": false, "isnew": true, "enable": true }, { "id": "6bd19564-0d23-4445-807b-34f0d57fb166", "group": "购物", "name": "京东", "url": "https://search.jd.com/Search?keyword=%s", "encode": false, "isnew": true, "enable": true }, { "id": "af0a4106-c09f-42b6-b25a-5b1d213ef341", "group": "购物", "name": "亚马逊", "url": "http://www.amazon.cn/keywords=%s", "encode": false, "isnew": true, "enable": true }, { "id": "c0ac5dae-7958-48d8-ae78-b0e98ac9d1dd", "group": "搜索", "name": "必应", "url": "https://cn.bing.com/search?q=%s", "encode": false, "isnew": true, "enable": true }, { "id": "19136e65-14e9-486b-9576-bc97b4240aef", "group": "搜索", "name": "Google图片", "url": "https://www.google.com/search?tbm=isch&q=%s", "encode": false, "isnew": true, "enable": false }, { "id": "3fe0ed2d-2316-430d-b22d-079082cc0f1b", "group": "搜索", "name": "百度百科", "url": "https://baike.baidu.com/item/%s", "encode": false, "isnew": true, "enable": false }, { "id": "43126b72-c725-48f7-8b36-d33b5361f74e", "group": "影音", "name": "豆瓣电影", "url": "https://search.douban.com/movie/subject_search?search_text=%s", "encode": false, "isnew": true, "enable": true }, { "id": "d9b2bbd2-f2eb-4432-9eba-cfa831e5d8ee", "group": "影音", "name": "YouTube", "url": "https://www.youtube.com/results?search_query=%s", "encode": false, "isnew": true, "enable": true }, { "id": "a5689041-c760-4552-b0b6-3fe0bae10da9", "group": "影音", "name": "网易音乐", "url": "http://music.163.com/#/search/m/?s=%s", "encode": false, "isnew": true, "enable": true }, { "id": "a075db15-ed14-4a75-ba2c-d82ceb8c7daf", "group": "影音", "name": "QQ音乐", "url": "https://y.qq.com/n/ryqq/search?w=%s", "encode": false, "isnew": true, "enable": true }, { "id": "731b7ac8-55ee-4761-b146-f13d68d095cb", "group": "影音", "name": "IMDb", "url": "https://www.imdb.com/find?q=dog", "encode": false, "isnew": true, "enable": true }, { "id": "59876895-aed1-4119-9504-8866a08f6502", "group": "影音", "name": "腾讯视频", "url": "https://v.qq.com/x/search/?q=%s", "encode": false, "isnew": true, "enable": false }, { "id": "b37136f3-c084-4477-88cd-ec8612a48b2f", "group": "影音", "name": "西瓜", "url": "https://www.ixigua.com/search/%s", "encode": false, "isnew": true, "enable": false }, { "id": "22609fa3-9665-4bae-97f4-f49f0ffe68bc", "group": "影音", "name": "优酷", "url": "https://so.youku.com/search_video/q_%s", "encode": false, "isnew": true, "enable": true }, { "id": "eb98e46c-68cb-48fb-8627-a09ba4294384", "group": "购物", "name": "1688", "url": "https://s.1688.com/selloffer/offer_search.htm?keywords=%s", "encode": false, "isnew": true, "enable": true }, { "id": "b534a6ad-0a33-49ef-80a7-ac3bd40ae7e9", "group": "影音", "name": "爱艺奇", "url": "https://so.iqiyi.com/so/q_%s?source=input", "encode": false, "isnew": true, "enable": false }, { "id": "8438ec2e-f50a-49c8-a4d6-4fe20875dfde", "group": "购物", "name": "当当", "url": "https://search.dangdang.com/?key=%s", "encode": false, "isnew": true, "enable": false }, { "id": "3c2da449-e786-4536-8e0f-f98e820773bf", "group": "购物", "name": "网易严选", "url": "https://you.163.com/search?keyword=%s", "encode": false, "isnew": true, "enable": true }, { "id": "660d2bba-c519-4d1e-93dd-82670724de55", "group": "购物", "name": "小米有品", "url": "https://www.xiaomiyoupin.com/search?keyword=%s", "encode": false, "isnew": true, "enable": true }, { "id": "2f047ca5-2d7f-4080-908c-c679c78c92fa", "group": "购物", "name": "唯品会", "url": "https://category.vip.com/suggest.php?keyword=%s", "encode": false, "isnew": true, "enable": true }, { "id": "48eeb6a6-aea7-4eb7-af0c-95ddebde849a", "group": "常用", "name": "Github", "url": "https://github.com/search?q=%s", "encode": false, "isnew": true, "enable": false }, { "id": "7dfa4db1-ed01-41b8-ab4b-24a45ea7605d", "group": "常用", "name": "翻译", "url": "https://fanyi.baidu.com/#en/zh/%s", "encode": false, "isnew": true, "enable": true }, { "id": "f1b1d116-a2d2-4492-baf8-5ea0128236c9", "group": "搜索", "name": "DuckGo", "url": "https://duckduckgo.com/?q=%s", "encode": false, "isnew": true, "enable": true }, { "id": "097e78c4-e583-46d8-89b7-50148985b829", "group": "搜索", "name": "ASK", "url": "https://www.ask.com/web?q=%s", "encode": false, "isnew": true, "enable": true }, { "id": "036cb39a-a8a2-49b9-8cba-640f6e6d33de", "group": "搜索", "name": "搜狗", "url": "https://www.sogou.com/web?query=%s", "encode": false, "isnew": true, "enable": true }, { "id": "927d48ff-4620-48d3-a0c0-f1852cf2b6a6", "group": "搜索", "name": "yahoo", "url": "https://search.yahoo.com/search?p=%s", "encode": false, "isnew": true, "enable": true }, { "id": "30f04aa2-b279-4308-93fd-22a05941b7d4", "group": "搜索", "name": "贴吧", "url": "https://tieba.baidu.com/f/search/res?qw=%s", "encode": false, "isnew": true, "enable": true }, { "id": "51670b0a-7a2d-480e-a3eb-3c6bbdf6c00c", "group": "翻译", "name": "汉典", "url": "https://www.zdic.net/hans/%s", "encode": false, "isnew": true, "enable": true }, { "id": "7eec0c20-e404-41c0-91ef-87624e2bf11f", "group": "翻译", "name": "海词", "url": "https://www.dict.cn/%s", "encode": false, "isnew": true, "enable": true }], "name": "其他引擎搜索 \"%s\"" }

// 监听 content.js 请求事件
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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
    case 'copy_clipboard':
      var clipboard = document.getElementById("clipboard");
      clipboard.value = request.text;
      clipboard.select();
      document.execCommand("Copy");
      sendResponse();
    default:
      console.log("Recieve request: " + request.cmd);
      break;
  }

  // 如有异步操作，必须返回 true
  return true;
});

~(function () {
  // 数据初始化
  getOptions(() => { });
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
}


/**
 * 从 Storage 读取配置
 *
 * @param {*} cb
 */
function getOptions(cb) {
  // 传入 null 获取所有数据
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
      cb(JSON.parse(opts));
    }
  });
}





// chrome.browserAction.onClicked.addListener((/* tab */) => {
//   // Opens our extension in a new browser window.
//   // Only if a popup isn't defined in the manifest.
//   chrome.tabs.create({
//     url: chrome.extension.getURL('www/index.html#/options')
//   }, (/* newTab */) => {
//     // Tab opened.
//   })
// })
