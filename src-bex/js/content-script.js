// Content script content goes here or in activatedContentHooks (use activatedContentHooks if you need a variable
// accessible to both the content script and inside a hook

//  实现划词搜索功能
//  在打开页面中加载 context.js 脚本，监听鼠标 up 事件，显示动态创建的搜索菜单

const searchMenuId = "strong_search_menu_id";	// 主菜单id
let ctrlKey = false; // 是否按下ctrl键
var menuOffset = 20; // 菜单显示位置偏移量


// 创建和显示菜单
function createSearchMenu(options, x, y) {

  if (options == null || options.searchEngines.length === 0) {
    console.log("Failed to create context menu item.");
    return;
  }

  // 使用 ctrl 键的情况下，检查 ctrl 是否按下
  if (options.triggerkey && !ctrlKey) {
    return;
  }

  // 获取当前选择的文本，如果没有则不显示菜单
  var selectionText = document.getSelection().toString();
  if (selectionText.trim() == "") {
    return;
  }

  // 创建菜单div
  var searchMenu = document.createElement("div");
  searchMenu.id = searchMenuId;

  Object.assign(searchMenu.style, {
    position: "absolute",
    left: x + "px",
    top: (y + menuOffset) + "px",
    zIndex: 999999,
  })

  document.body.appendChild(searchMenu);


  const redirect = selectionText.match(/(\w+:\/\/[^/:]+)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/g);

  if (redirect != null) {
    const newOpen = document.createElement("a");
    newOpen.innerText = "在新标签页打开：" + (redirect.length > 50 ? redirect.slice(0, 50) + '...' : redirect);
    newOpen.href = (redirect[0].match(/(\w+):\/\/([^/:]+)/) == null) ? "http://" + redirect[0] : redirect[0];
    newOpen.id = "strong_search_menu_redirect"
    newOpen.target = "_blank";

    // 点击菜单项后关闭菜单
    searchMenu.appendChild(newOpen);
  }


  // 根据配置新建子菜单项
  for (let i = 0; i < options.searchEngines.length; i++) {
    let element = options.searchEngines[i];
    let group = element.group.trim();

    // 菜单是否启用
    if (!element.enable) {
      continue;
    }

    // 如果分组菜单不存在，则新建一个
    const ulID = `strong_search_menu_${group}`
    let ulMenu = document.getElementById(ulID);
    if (ulMenu === null) {
      ulMenu = document.createElement("ul");
      ulMenu.id = ulID;
      ulMenu.innerHTML = "<li>[" + group + "]</li>";
      searchMenu.appendChild(ulMenu);
    }

    // 新建菜单项
    const liMenu = document.createElement("li");
    const aItem = document.createElement("a");
    aItem.href = element.encode ? element.url.replace("%s", encodeURIComponent(selectionText)) : element.url.replace("%s", selectionText);
    aItem.innerHTML = element.name;
    aItem.target = "_blank";

    liMenu.appendChild(aItem);
    ulMenu.appendChild(liMenu);
  }

  // 创建复制按钮
  var CopyNode = document.createElement("div");
  CopyNode.id = "strong_search_menu_copy"
  CopyNode.innerHTML = "复制 " + "\"" + (selectionText.length > 50 ? selectionText.slice(0, 50) + '...' : selectionText) + "\"";
  CopyNode.addEventListener("click", function () {
    // https://www.ruanyifeng.com/blog/2021/01/clipboard-api.html
    navigator.clipboard.writeText(selectionText);
    document.body.removeChild(searchMenu);
  }, true);

  searchMenu.appendChild(CopyNode);
}

// 检查 ctrl 是否按下
document.addEventListener("keydown", function (e) {
  ctrlKey = e.ctrlKey;

  if (!ctrlKey) {
    // 有键盘其他键按下时关闭菜单
    var searchMenu = document.getElementById(searchMenuId);
    if (searchMenu) {
      document.body.removeChild(searchMenu);
    }
  }
}, true);

document.addEventListener("keyup", function (e) {
  ctrlKey = e.ctrlKey;
}, true);


// 鼠标释放，触发事件
document.addEventListener("mouseup", function (e) {
  var searchMenu = document.getElementById(searchMenuId);

  // 只处理鼠标左键，其他键按下时如果有菜单，则删除菜单
  if (e.button != 0) {
    if (searchMenu) {
      document.body.removeChild(searchMenu);
    }
    return;
  }

  // 鼠标点击坐标位置
  var x = e.pageX;
  var y = e.pageY;

  // 菜单已经显示，此时如果鼠标点击了菜单之外位置，则删除菜单，
  // 否则不做处理，继续等待超链接的点击事件。
  if (searchMenu) {
    if (x >= searchMenu.offsetLeft && x <= (searchMenu.offsetLeft + searchMenu.offsetWidth)
      && y >= searchMenu.offsetTop && y <= (searchMenu.offsetTop + searchMenu.offsetHeight)) {
      // 如果鼠标在菜单中点击，则等待click事件处理
      return;
    }
    else {
      document.body.removeChild(searchMenu);
    }
  }

  // 读取配置，创建菜单
  chrome.runtime.sendMessage({ cmd: 'get_options' }, function (opts) {
    createSearchMenu(opts, x, y);
  });



}, false);
