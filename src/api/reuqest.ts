import { useDataStore } from '@/store/dataStore'
import Taro from '@tarojs/taro'

// const baseUrl = 'http://wx.ikun.js.cn'
const baseUrl = 'http://192.168.31.250:3000'
// const baseUrl = 'http://localhost:3000'

interface ResType<T> {
  data: T
  error: boolean
  message: ''
  statusCode: number
}

const Get = async <T>(url: string, data?: unknown) => {
  const { token } = useDataStore()
  const res = await Taro.request<ResType<T>>({
    url: baseUrl + url,
    method: 'GET',
    timeout: 3200,
    header: {
      token
    },
    data
  })
  return res.data.data
}

const Post = async <T>(url: string, data?: unknown) => {
  const { token } = useDataStore()
  const res = await Taro.request<ResType<T>>({
    url: baseUrl + url,
    method: 'POST',
    timeout: 3200,
    header: {
      token
    },
    data
  })

  return res.data.data
}

const Delect = async <T>(url: string, data?: unknown) => {
  const { token } = useDataStore()
  const res = await Taro.request<ResType<T>>({
    url: baseUrl + url,
    method: 'DELETE',
    timeout: 3200,
    header: {
      token
    },
    data
  })
  return res.data.data
}

export default {
  Get,
  Post,
  Delect
}
