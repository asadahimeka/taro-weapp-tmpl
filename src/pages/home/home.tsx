import type { FC } from 'react'
import { View } from '@tarojs/components'
import { useReady } from '@tarojs/taro'
import './home.styl'

const Home: FC = () => {
  useReady(() => {})

  return (
    <View className='home-page'>
      <View>HOME</View>
    </View>
  )
}

export default Home
