export default function en(_value: any) {
  return {
    'test': 'this is test text',
    'testParam': `Resend in ${_value.time} s`,
    'testMultiParam': _value.name + 'go to' + _value.school,
  }
}
