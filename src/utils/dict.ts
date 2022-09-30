const DICTS: Record<string, Record<number | string, string>> = {
  sex: {
    1: '男', 2: '女'
  },
}

export function transDict(value: number | string, code: string) {
  const dict = DICTS[code]
  if (!dict) return value
  return dict[value]
}

export default DICTS
