import store from './store';
global.browser = require('webextension-polyfill');

// alert(`Hello ${store.getters.foo}!`);

console.log(`Hello ${store.getters.foo}!`);

const NEW_POST_NOTICE_CONFIG_KEY = 'newPostNotice';
const LATEST_POST_ID = 'latestPostId';
var latestObjectId = '';
var intervalId = null;
var lastCheckTime = null;

function autoCheck() {
  const now = new Date().getTime();
  console.log('正在执行新帖子检测...., 间隔时间：' + (now / 1000 - lastCheckTime / 1000));
  lastCheckTime = now;

  fetch('https://lcen.xiaote.net/api/v1/communities?page_index=1&page_size=10')
    .then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then(function(data) {
        const first = data[0];
        if (latestObjectId === first.objectId) {
          console.log('当前没有新帖子，最新的ID：' + first.objectId);
        } else {
          latestObjectId = first.objectId;
          const message = first.user.nickname + ': ' + first.content;
          chrome.notifications.create(first.objectId, { type: 'basic', iconUrl: './icons/icon_128.png', title: '小特社区有新帖子了!', message: message }, () => {});
        }
      });
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function init() {
  console.log('初始化后台事件....');
  chrome.storage.sync.get(NEW_POST_NOTICE_CONFIG_KEY, config => {
    if (config.newPostNotice) {
      const openNewPostNitice = config.newPostNotice.openNewPostNitice;
      const newPostNiticeDeltaMinute = config.newPostNotice.newPostNiticeDeltaMinute;
      setIntervalNewPostNotice(openNewPostNitice, parseFloat(newPostNiticeDeltaMinute));
    }
  });

  newPostNoticeConfigListener();
}

function setIntervalNewPostNotice(isOpen, deltaMinute) {
  if (!isOpen) {
    console.log('当前没有开启最新帖子通知功能！');
    return;
  }
  autoCheck();
  const microTime = deltaMinute * 60 * 1000;
  intervalId = setInterval(autoCheck, microTime);
}

function newPostNoticeConfigListener() {
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let key in changes) {
      console.log('监测到 key 变动', key);

      const storageChange = changes[key];
      if (key === NEW_POST_NOTICE_CONFIG_KEY) {
        const openNewPostNitice = storageChange.newValue.openNewPostNitice;
        const newPostNiticeDeltaMinute = storageChange.newValue.newPostNiticeDeltaMinute;
        clearInterval(intervalId);
        setIntervalNewPostNotice(openNewPostNitice, parseFloat(newPostNiticeDeltaMinute));
        continue;
      }
      if (key === LATEST_POST_ID) {
        latestObjectId = storageChange.newValue;
      }
    }
  });
}

init();
