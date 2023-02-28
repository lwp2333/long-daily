import ossApi from '@/api/ossApi'
import { defineStore } from 'pinia'

export const useOssInfoStore = defineStore('ossStore', {
  state: () => ({
    host: 'https://cdn200.oss-cn-hangzhou.aliyuncs.com',
    OSSAccessKeyId: '',
    signature: '',
    policy: ''
  }),
  actions: {
    async freshToken() {
      if (this.signature) {
        return
      }
      try {
        const res = await ossApi.getToken()
        this.OSSAccessKeyId = res.accessKeyId
        this.signature = res.signature
        this.policy = res.policy
      } catch (error) {
        console.log('getOssToken', error)
      }
    }
  }
})
