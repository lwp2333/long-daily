import albumApi, { AlbumEntity } from '@/api/albumApi'
import { LifeInventoryEntity } from '@/api/lifeInventory'
import memorialDayApi, { MemorialDayEntity } from '@/api/memorialDayApi'
import userApi, { GenderEnum, UserEntity } from '@/api/userApi'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

interface State {
  allInit: boolean
  memorialDayList: MemorialDayEntity[]
  albumList: AlbumEntity[]
  lifeInventory: LifeInventoryEntity[]
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
      allInit: false,
      memorialDayList: [],
      lifeInventory: [],
      albumList: [],
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
    async initData() {
      if (this.allInit) return
      await this.getUserInfo()
      await this.getAlbumList()
      await this.getMemorialDayData()
      this.allInit = true
    },
    async getUserInfo() {
      const res = await userApi.getUserInfo()
      this.userInfo = {
        ...res,
        birthday: dayjs(res.birthday).format('YYYY-MM-DD')
      }
    },
    async getAlbumList() {
      const res = await albumApi.getList()
      this.albumList = res.map(it => {
        return {
          ...it,
          lastUpdateTime: dayjs(it.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')
        }
      })
    },
    async getMemorialDayData() {
      const res = await memorialDayApi.getAllList()
      this.memorialDayList = res.map(it => {
        return {
          ...it,
          date: dayjs(it.date).format('YYYY-MM-DD')
        }
      })
    }
  }
})
