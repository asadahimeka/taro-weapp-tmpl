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
    ???: Math.floor(ms / 86400000),
    ??????: Math.floor(ms / 3600000) % 24,
    ???: Math.floor(ms / 60000) % 60,
    ???: Math.floor(ms / 1000) % 60,
    ??????: Math.floor(ms) % 1000
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
 * ???????????????????????????
 * ??????15??????18???????????????
 * ???????????????????????????????????????????????????
 * @param {string} code ????????????
 */
export function validateIdCard(code: string) {
  let city = { 11: '??????', 12: '??????', 13: '??????', 14: '??????', 15: '?????????', 21: '??????', 22: '??????', 23: '????????? ', 31: '??????', 32: '??????', 33: '??????', 34: '??????', 35: '??????', 36: '??????', 37: '??????', 41: '??????', 42: '?????? ', 43: '??????', 44: '??????', 45: '??????', 46: '??????', 50: '??????', 51: '??????', 52: '??????', 53: '??????', 54: '?????? ', 61: '??????', 62: '??????', 63: '??????', 64: '??????', 65: '??????', 71: '??????', 81: '??????', 82: '??????', 91: '?????? ' }
  let row = true

  // ????????????????????????
  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
    row = false
  // ??????????????????????????????
  } else if (!city[code.substr(0, 2)]) {
    row = false
  } else {
    // 18?????????????????????????????????????????????
    if (code.length === 18) {
      let _code = code.split('')
      // ???(ai??Wi)(mod 11)
      // ????????????
      let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      // ?????????
      let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      let sum = 0
      let ai = 0
      let wi = 0
      for (let i = 0; i < 17; i++) {
        ai = +_code[i]
        wi = factor[i]
        sum += ai * wi
      }
      // ???????????????????????????
      // eslint-disable-next-line eqeqeq
      if (parity[sum % 11] != _code[17].toUpperCase()) {
        row = false
      }
    }
  }
  return row
}
