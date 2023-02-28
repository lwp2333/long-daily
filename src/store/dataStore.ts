import memorialDayApi, { MemorialDayEntity } from '@/api/memorialDayApi'
import userApi, { GenderEnum, UserEntity } from '@/api/userApi'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

interface State {
  memorialDayList: MemorialDayEntity[]
  userInfo: UserEntity
}

export const mapGender = {
  [GenderEnum.unknown]: '未知',
  [GenderEnum.male]: '男',
  [GenderEnum.female]: '女'
}

export const useDataStore = defineStore('dataStore', {
  state: (): State => {
    return {
      memorialDayList: [],
      userInfo: {
        openid: 'oqy5602kT2ptTR4NmbbbM-xkP3ZA',
        nickName: '',
        avatar: '',
        gender: GenderEnum.unknown,
        birthday: '',
        signature: ''
      }
    }
  },
  actions: {
    async getMemorialDayData() {
      const res = await memorialDayApi.getAllList()
      this.memorialDayList = res.map(it => {
        return {
          ...it,
          date: dayjs(it.date).format('YYYY-MM-DD')
        }
      })
    },
    async getUserInfo() {
      const res = await userApi.getUserInfo()
      this.userInfo = {
        ...res,
        birthday: dayjs(res.birthday).format('YYYY-MM-DD')
      }
    }
  }
})
