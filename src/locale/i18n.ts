import locales from './locales'

export const i18n = {
  _locale: 'zh',
  setLocale(locale: string) {
    let l = locale.toLowerCase().split(/[_-]/)[0]
    i18n._locale = l || 'zh'
  },
  t
}

export function t(key: string, value?: string) {
  let locale = i18n._locale
  if (locale === 'zh' || !locale) return key
  let text = locales(value)?.[locale]?.[key]
  return text || key
}
