import Taro from '@tarojs/taro'

const baseUrl = 'http://wx.ikun.js.cn'

const Get = async <T>(url: string, data?: unknown) => {
  const res = await Taro.request<T>({
    url: baseUrl + url,
    method: 'GET',
    timeout: 3200,
    data
  })
  return res.data
}

const Post = async <T>(url: string, data?: unknown) => {
  const res = await Taro.request<T>({
    url: baseUrl + url,
    method: 'POST',
    timeout: 3200,
    data
  })
  return res.data
}

const Delect = async <T>(url: string, data?: unknown) => {
  const res = await Taro.request<T>({
    url: baseUrl + url,
    method: 'DELETE',
    timeout: 3200,
    data
  })
  return res.data
}

export default {
  Get,
  Post,
  Delect
}
