import store from './store';
global.browser = require('webextension-polyfill');

// alert(`Hello ${store.getters.foo}!`);

console.log(`Hello ${store.getters.foo}!`);


var latestObjectId = '';

function autoCheck () {
  fetch('https://lcen.xiaote.net/api/v1/communities?page_index=1&page_size=10')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      response.json().then(function(data) {
        const first = data[0];
        if (latestObjectId === first.objectId) {
          console.log('当前没有新帖子，最新的ID：' + first.objectId);
        } else {
          latestObjectId = first.objectId;
          chrome.notifications.create(first.objectId, {type: 'basic', iconUrl:'./icons/icon_128.png',title: '小特社区有新帖子了!', message: '快快点击去查看吧'}, ()=>{});
        }
      });
    }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  
}

function init() {
	autoCheck();
	// 2min 执行一次
	setInterval(autoCheck, 120000);
}

init();
