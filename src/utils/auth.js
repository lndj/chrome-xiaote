import Cookies from 'js-cookie';
import Config from '../config';
import store from '../store';

const TokenKey = Config.TokenKey;
const UserIdKey = Config.UserIdKey;

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUserId() {
  return Cookies.get(UserIdKey);
}

export function setUserId(userId) {
  return Cookies.set(UserIdKey, userId, { expires: Config.tokenCookieExpires });
}

export function removeUserId() {
  return Cookies.remove(UserIdKey);
}

export function checkLogin() {
  const loginUser = store.getters.loginUser;
  const token = getToken();
  if (!loginUser || !loginUser.objectId || !token) {
    store.dispatch('ToggleLoginPage', true);
    return false;
  }
  return true;
}
