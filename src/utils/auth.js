// import Cookies from 'js-cookie'
import Config from '../config';

const TokenKey = Config.TokenKey;

export function getToken() {
  // return Cookies.get(TokenKey)
  return '';
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return '';
    // return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else {
    // return Cookies.set(TokenKey, token)
  }
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
}
