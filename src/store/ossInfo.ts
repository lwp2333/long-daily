import { defineStore } from 'pinia'

export const useOssInfoStore = defineStore('appInfo', {
  state: () => ({
    host: 'https://cdn200.oss-cn-hangzhou.aliyuncs.com',
    OSSAccessKeyId: '',
    signature: '',
    policy: ''
  }),
  actions: {
    freshToken() {}
  }
})
