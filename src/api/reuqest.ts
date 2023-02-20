import Taro from '@tarojs/taro'

const baseUrl = 'http://localhost:3000'

const Get = <T>(url: string, data?: unknown) => {
  return Taro.request<T>({
    url: baseUrl + url,
    method: 'GET',
    timeout: 3200,
    data
  }).then(res => res.data)
}

const Post = <T>(url: string, data?: unknown) => {
  return Taro.request<T>({
    url: baseUrl + url,
    method: 'POST',
    timeout: 3200,
    data
  }).then(res => res.data)
}

const Delect = <T>(url: string, data?: unknown) => {
  return Taro.request<T>({
    url: baseUrl + url,
    method: 'DELETE',
    timeout: 3200,
    data
  }).then(res => res.data)
}

export default {
  Get,
  Post,
  Delect
}
