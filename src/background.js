import store from './store';
global.browser = require('webextension-polyfill');

// alert(`Hello ${store.getters.foo}!`);

console.log(`Hello ${store.getters.foo}!`);
