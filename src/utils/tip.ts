import Taro from '@tarojs/taro'

const tip = {
  error(msg: string, duration = 2000) {
    return this.toast(msg, 'none', duration)
  },

  success(msg: string, duration = 2000) {
    return this.toast(msg, 'success', duration)
  },

  toast(msg: string, icon: Taro.showToast.Option['icon'] = 'none', duration = 2000) {
    return new Promise((resolve) => {
      Taro.showToast({
        title: msg,
        icon: icon,
        duration: duration,
        success() {
          setTimeout(() => {
            resolve(true)
          }, duration)
        },
        fail() {
          resolve(false)
        }
      })
    })
  },

  showLoading(title = '') {
    Taro.showLoading({
      title: title
    })
  },

  hideLoading() {
    Taro.hideLoading()
  },

  /**
   * 弹出确认窗口
   */
  modal(text: string, title = '提示') {
    return new Promise((resolve) => {
      Taro.showModal({
        title: title,
        content: text,
        showCancel: false,
        success(res) {
          if (!res.cancel) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        fail() {
          resolve(false)
        }
      })
    })
  },

  /**
   * 弹出确认窗口
   */
  confirm(text: string, title = '提示') {
    return new Promise((resolve) => {
      Taro.showModal({
        title: title,
        content: text,
        showCancel: true,
        success(res) {
          if (!res.cancel) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        fail() {
          resolve(false)
        }
      })
    })
  }
}

export default tip
