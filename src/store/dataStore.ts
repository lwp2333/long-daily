import albumApi, { AlbumEntity } from '@/api/albumApi'
import lifeInventoryApi, { LifeInventoryEntity } from '@/api/lifeInventoryApi'
import memorialDayApi, { MemorialDayEntity } from '@/api/memorialDayApi'
import plogApi, { PlogEntity } from '@/api/plogApi'
import userApi, { GenderEnum, UserEntity } from '@/api/userApi'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

interface State {
  allInit: boolean
  token: string
  userInfo: UserEntity
  plogList: PlogEntity[]
  plogTotal: number
  albumList: AlbumEntity[]
  memorialDayList: MemorialDayEntity[]
  lifeInventoryList: LifeInventoryEntity[]
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
      token: '',
      userInfo: {
        openid: 'oqy5602kT2ptTR4NmbbbM-xkP3ZA',
        nickName: '',
        avatar: '',
        gender: GenderEnum.unknown,
        birthday: '',
        signature: ''
      },
      plogList: [],
      plogTotal: 0,
      albumList: [],
      memorialDayList: [],
      lifeInventoryList: []
    }
  },
  actions: {
    async login(code: string) {
      const res = await userApi.loginByCode(code)
      const { token, ...userInfo } = res
      this.token = res.token
      this.userInfo = userInfo
    },
    async initData() {
      if (this.allInit) return
      await Promise.all([
        // this.getUserInfo(),
        this.getPlogList(),
        this.getAlbumList(),
        this.getMemorialDayData(),
        this.getLifeInventory()
      ])
      this.allInit = true
    },
    async getUserInfo() {
      const res = await userApi.getUserInfo()
      this.userInfo = {
        ...res,
        birthday: dayjs(res.birthday).format('YYYY-MM-DD')
      }
    },
    async getPlogList(pageIndex = 1, pageSize = 20) {
      const res = await plogApi.getListByPage(pageIndex, pageSize)
      this.plogTotal = res.total
      const list = res.list.map(it => {
        return {
          ...it,
          lastUpdateTime: dayjs(it.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')
        }
      })
      if (list.length) {
        this.plogList.concat(...list)
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
    },
    async getLifeInventory() {
      const res = await lifeInventoryApi.getAllList()
      this.lifeInventoryList = res.map(it => {
        return {
          ...it,
          lastUpdateTime: dayjs(it.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')
        }
      })
    }
  }
})
