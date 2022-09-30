import Taro from '@tarojs/taro'
import storage from 'src/utils/storage'
import tip from 'src/utils/tip'
import http from './http'
import { BASE_URL } from './common'

export async function wxLogin() {
  try {
    const { code } = await Taro.login()
    const res = await http.post('codeToTokenUrl', code)
    if (res.success) {
      storage.set('Token', res.result)
      return res
    } else {
      throw res.message
    }
  } catch (error) {
    throw error
  }
}

export function getPhoneNumber(event: any) {
  const { errMsg } = event.detail
  if (errMsg === 'getPhoneNumber:ok') {
    return event.detail
  }
  return null
}

export async function uploadOneImage() {
  try {
    const { tempFilePaths } = await Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera']
    })
    tip.showLoading('上传中')
    let { data } = await Taro.uploadFile({
      url: BASE_URL + 'uploadUrl',
      filePath: tempFilePaths[0],
      name: 'file',
      header: {
        // 'X-Access-Token': storage.get('Token', '')
      }
    })
    let res = JSON.parse(data)
    tip.hideLoading()
    if (res.success) {
      tip.success('上传成功')
      return res.result
    } else {
      tip.error(res.message)
      throw res.message
    }
  } catch (error) {
    tip.hideLoading()
    if (error.errMsg !== 'chooseImage:fail cancel') {
      tip.error('上传图片出错：' + error.errMsg || error)
    }
    throw error.errMsg || error
  }
}

export function previewImage(urls: string[] = [], current: string) {
  if (!Array.isArray(urls)) return
  urls = urls.map(e => dealAvatar(e))
  if (current) current = dealAvatar(current)
  Taro.previewImage({
    urls,
    current,
    fail: err => {
      tip.error('预览图片出错：' + err.errMsg)
    }
  })
}

export function dealAvatar(url: string) {
  if (!url || url.indexOf('http') > -1) {
    return url
  }
  return BASE_URL + '/sys/common/static/' + url
}

export function notLogin() {
  // return !storage.get('Token') || storage.get('role') !== 'normal'
  return false
}

export function logout() {
  // if (!storage.get('Token')) return
  // http.post('/sys/logout')
  // setTimeout(() => {
  //   storage.remove('Token')
  //   storage.remove('role')
  //   storage.remove('user')
  // }, 200)
}
