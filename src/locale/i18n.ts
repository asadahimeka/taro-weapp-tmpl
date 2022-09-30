import locales from './locales'

export const i18n = {
  _locale: 'zh',
  setLocale(locale: string) {
    i18n._locale = locale
  },
  t
}

export function t(key: string, value: string) {
  let locale = i18n._locale
  if (locale === 'zh' || !locale) return key
  let text = locales(value)?.[locale]?.[key]
  return text || key
}
