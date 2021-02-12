/**
 * @description 系统全局配置
 */
export default {
  AppName: '小特社区',

  BASE_API: 'https://lcen.xiaote.net',

  AUTH_API: 'https://lcapi.xiaote.net',

  JSON_API: 'https://api.npoint.io',

  /**
   * @description token key
   */
  TokenKey: 'X-LC-Session',

  UserIdKey: 'X-LC-Uid',

  /**
   * @description 请求超时时间，毫秒（默认2分钟）
   */
  timeout: 1200000,

  tokenCookieExpires: 3600 * 24 * 10,

  TeslaInviteUrl: 'https://ts.la/lnanddj59482',

  TeslaInviteCode: 'lnanddj59482',
};
