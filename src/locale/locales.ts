import en from './en'

export default function locales(value: any = {}): any {
  return {
    // en 和 zh 是语言类型,可以新增语言或重命名
    'en': en(value),
  }
}
