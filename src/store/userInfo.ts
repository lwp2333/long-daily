import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('appInfo', {
  state: () => ({
    token: 'valid',
    openid: 'oqy5602kT2ptTR4NmbbbM-xkP3ZA',
    avatar: 'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/chun.png',
    nickName: '五边形的男人',
    birthday: '1996-11-16',
    signature: '集中一点 登峰造极!',
    gender: 'female'
  }),
  actions: {
    getUserInfo() {}
  }
})
