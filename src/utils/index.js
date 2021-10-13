/*
 * @Author: your name
 * @Date: 2021-10-13 09:33:42
 * @LastEditTime: 2021-10-13 09:57:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /strong-search/src/utils/index.js
 */
export const setStorageLocal = async (items) => {
  let result = await new Promise((resolve) => {
    chrome.storage.local.set(items, () => {
      // 通知保存完成。
      console.log('保存成功', items);
      resolve(items);
    });
  });
  return result;
};

export const getStorageLocal = async (keys) => {
  return await new Promise((resolve) => {
    chrome.storage.local.get(keys, (items) => {
      console.log('获取成功', items);
      resolve(items);
    });
  });
};

export const removeStorageLocal = async (keys) => {
  return await new Promise((resolve) => {
    chrome.storage.local.remove(keys, () => {
      console.log('删除成功', keys);
      resolve(keys);
    });
  });
};

const clearStorageLocal = async () => {
  return await new Promise((resolve) => {
    chrome.storage.local.clear(() => {
      console.log('清空成功');
      resolve(true);
    });
  });
};

