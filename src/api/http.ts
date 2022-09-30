import Taro from '@tarojs/taro'
import interceptors from './interceptors'
import { type Options, setBaseUrl, setDefaultOption } from './common'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

class HttpRequest {
  request(options: Options) {
    setBaseUrl(options)
    setDefaultOption(options, 'method', 'GET')
    setDefaultOption(options.header, 'content-type', 'application/json')
    // setDefaultOption(options.header, 'Authorization', Taro.getStorageSync('Authorization'))
    return Taro.request(options)
  }

  get(url: string, data?: any, options?: Options): any {
    return this.request({ url, data, ...options })
  }

  post(url: string, data?: any, options?: Options): any {
    return this.request({ method: 'POST', url, data, ...options })
  }

  put(url: string, data?: any, options?: Options): any {
    return this.request({ method: 'PUT', url, data, ...options })
  }

  delete(url: string, data?: any, options?: Options): any {
    return this.request({ method: 'DELETE', url, data, ...options })
  }
}

const http = new HttpRequest()
export default http
