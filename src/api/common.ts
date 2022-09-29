import Taro from '@tarojs/taro'

export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

export const BASE_URL = process.env.NODE_ENV === 'development' ? '' : ''

export type Options = Taro.request.Option

export function setBaseUrl(options: Options) {
  let { url } = options
  if (/^https?:\/\//.test(url)) return
  if (/^\//.test(url)) options.url = BASE_URL + url
  else options.url = BASE_URL + '/' + url
}

export function setDefaultOption(options: any, key: string, def: any) {
  options[key] = options[key] ?? def
}

export function getCurrentPageUrl() {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}

export function pageToLogin() {
  let path = getCurrentPageUrl()
  if (!path?.includes('login')) {
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }
}
