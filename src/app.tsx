import { Component, PropsWithChildren } from 'react'
import Taro from '@tarojs/taro'
import { i18n } from './locale/i18n'
import './app.styl'

class App extends Component<PropsWithChildren> {

  componentDidMount() {
    Taro.getSystemInfo().then(({ language }) => {
      i18n.setLocale(language)
    })
  }

  componentDidShow() {}

  componentDidHide() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
