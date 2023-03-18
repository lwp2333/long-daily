import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './app.scss'
import Taro from '@tarojs/taro'
const store = createPinia()

Taro.loadFontFace({
  global: true,
  family: 'si-yuan',
  source: 'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/font/font.woff'
})
const App = createApp({
  onShow(options: any) {
    console.log('app:onShow', options)
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  }
})

App.use(store)

export default App
