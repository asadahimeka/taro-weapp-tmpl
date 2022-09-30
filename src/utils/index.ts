/**
 * Determines whether `val` is null or undefined or empty string.
 * @param {*} val
 */
export function isBlank(val: any) {
  if (typeof val === 'string') val = val.trim()
  return val == null || val === ''
}

/**
 * Determines whether `n` is numeric.
 * @param {string} n number string
 */
export function isNumeric(n: any) {
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(parseFloat(n)) && isFinite(n)
}

/**
 * Determines whether `fields` is fulfilled.
 * @param {any[]} fields the fields to check
 * @param {object} ctx use this when `fields` is a string array
 */
export function notFulfill(fields: any[], ctx?: object) {
  return fields.some(e => isBlank(ctx ? ctx[e] : e))
}

function formatNumber(n: number) {
  let ns = n.toString()
  return ns[1] ? ns : '0' + ns
}

export function formatTime(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function padLeftZero(str: string) {
  return ('00' + str).substr(str.length)
}

export function formatDate(date: any, fmt = 'YYYY-MM-DD hh:mm:ss') {
  if (arguments.length === 0) {
    return ''
  }
  if (date === '' || date == null) {
    return ''
  }
  if ((typeof date === 'string') && (/^[0-9]+$/.test(date))) {
    date = parseInt(date)
  }
  if ((typeof date === 'number') && (date.toString().length === 10)) {
    date = date * 1000
  }
  date = new Date(date)
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

export function cloneObj(obj: object) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Promise.allSettled
 * @param {Promise[]} promises
 */
export function allSettled(promises: Promise<any>[]) {
  return Promise.all(promises.map(function (promise) {
    return promise.then(function (value) {
      return { status: 'fulfilled', value: value }
    }).catch(function (reason) {
      return { status: 'rejected', reason: reason }
    })
  }))
}

/**
 * Returns the human readable format of the given number of milliseconds.
 * @param {number} ms
 */
export function formatDuration(ms: number) {
  if (ms < 0) ms = -ms
  const time = {
    天: Math.floor(ms / 86400000),
    小时: Math.floor(ms / 3600000) % 24,
    分: Math.floor(ms / 60000) % 60,
    秒: Math.floor(ms / 1000) % 60,
    毫秒: Math.floor(ms) % 1000
  }
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}`)
    .join(', ')
}

/**
 * Generates an array with the given amount of items, using the given function.
 * @param {number} n
 * @param {Function} fn
 */
export function generateItems(n: number, fn: Function) {
  return Array.from({ length: n }, (_, i) => fn(i))
}

export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt(((1 + Math.random()) * 65536) + '') + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Returns a random string with the specified length.
 * @param {number} length the length of result string
 */
export function randomAlphaNumeric(length: number) {
  let s = ''
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2)
    return s.length >= length
  })
  return s.slice(0, length)
}

/**
 * Chunks an array into smaller arrays of a specified size.
 * If the original array can't be split evenly,
 * the final chunk will contain the remaining elements.
 * @param {[]} arr
 * @param {number} size
 */
export function chunk(arr: any[], size: number) {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size)
  )
}

/**
 * Chunks an array into n smaller arrays.
 * If the original array can't be split evenly,
 * the final chunk will contain the remaining elements.
 * @param {[]} arr
 * @param {number} n
 */
export function chunkIntoN(arr: any[], n: number) {
  const size = Math.ceil(arr.length / n)
  return Array.from({ length: n }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )
}

export function isEmail(s: string) {
  return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

export function isMobile(s: string) {
  return /^1[0-9]{10}$/.test(s)
}

export function isPhone(s: string) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

export function isURL(s: string) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 身份证号合法性验证
 * 支持15位和18位身份证号
 * 支持地址编码、出生日期、校验位验证
 * @param {string} code 身份证号
 */
export function validateIdCard(code: string) {
  let city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外 ' }
  let row = true

  // 身份证号格式错误
  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
    row = false
  // 身份证号地址编码错误
  } else if (!city[code.substr(0, 2)]) {
    row = false
  } else {
    // 18位身份证需要验证最后一位校验位
    if (code.length === 18) {
      let _code = code.split('')
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      // 校验位
      let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      let sum = 0
      let ai = 0
      let wi = 0
      for (let i = 0; i < 17; i++) {
        ai = +_code[i]
        wi = factor[i]
        sum += ai * wi
      }
      // 身份证号校验位错误
      // eslint-disable-next-line eqeqeq
      if (parity[sum % 11] != _code[17].toUpperCase()) {
        row = false
      }
    }
  }
  return row
}
