import Taro from '@tarojs/taro'

const prefix = 'VcKB_'
const rememberData = {}
const storage = {
  set(key: string, data: any, expire = 0) {
    key = prefix + key
    if (!data) return false
    rememberData[key] = data
    try {
      Taro.setStorageSync(key, data)
      if (expire > 0) {
        const time = parseInt(new Date().getTime() / 1000 + '')
        this.set(key + '-expire', time + expire)
      }
    } catch (e) {
      console.log('storage error: ', e)
    }
  },
  get(key: string, _default?: string | null) {
    key = prefix + key
    let expire = null
    try {
      expire = Taro.getStorageSync(key + '-expire')
    } catch (e) {
      expire = null
    }
    if (expire) {
      let now = parseInt(new Date().getTime() / 1000 + '')
      if (now > expire) {
        this.remove(key)
        return _default
      }
    }

    if (!rememberData[key]) {
      let data: typeof _default = null
      try {
        data = Taro.getStorageSync(key)
      } catch (e) {
        data = _default
      }
      if (!data) {
        data = _default
      }
      rememberData[key] = data
    }

    const d = rememberData[key]
    return typeof d == 'object' ? JSON.parse(JSON.stringify(d)) : d
  },
  remove(key: string) {
    key = prefix + key
    delete rememberData[key]
    try {
      Taro.removeStorageSync(key)
      if (rememberData[key + '-expire']) {
        Taro.removeStorageSync(key + '-expire')
      }
    } catch (e) {
      console.log('storage error:', e)
    }
  }
}

export default storage
