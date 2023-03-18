import albumApi, { AlbumEntity } from '@/api/albumApi'
import lifeInventoryApi, { LifeInventoryEntity } from '@/api/lifeInventoryApi'
import memorialDayApi, { MemorialDayEntity } from '@/api/memorialDayApi'
import plogApi, { PlogEntity } from '@/api/plogApi'
import userApi, { GenderEnum, UserEntity } from '@/api/userApi'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

interface State {
  allInit: boolean
  token: string
  userInfo: UserEntity
  plogList: PlogEntity[]
  plogTotal: number
  pageIndex: number
  pageSize: number
  loadLock: boolean
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
        openid: '',
        nickName: '',
        avatar: '',
        gender: GenderEnum.unknown,
        birthday: '',
        registerTime: '',
        lastUpdateTime: '',
        signature: '',
        bannerList: []
      },
      plogList: [],
      plogTotal: 0,
      pageIndex: 1,
      pageSize: 20,
      loadLock: false,
      albumList: [],
      memorialDayList: [],
      lifeInventoryList: []
    }
  },
  actions: {
    async login(code: string) {
      const res = await userApi.loginByCode(code)
      this.token = res.token
      // 存入token
      Taro.setStorageSync('token', res.token)
    },
    async initData() {
      if (this.allInit) return
      await Promise.all([
        this.getUserInfo(),
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
        birthday: dayjs(res.birthday).format('YYYY-MM-DD'),
        registerTime: dayjs(dayjs().format('YYYY-MM-DD')).diff(dayjs(res.registerTime).format('YYYY-MM-DD'), 'days') + 1
      }
    },
    async getPlogList() {
      const res = await plogApi.getListByPage(this.pageIndex, this.pageSize)
      this.plogTotal = res.total
      const list = res.list.map(it => {
        return {
          ...it,
          lastUpdateTime: dayjs(it.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')
        }
      })
      if (list.length) {
        this.plogList.push(...list)
      } else {
        this.pageIndex--
      }
    },
    async refreshPlogList() {
      this.pageIndex = 1
      this.pageSize = 20
      this.plogTotal = 0
      this.plogList = []
      this.loadLock = false
      this.getPlogList()
    },

    async delPlogById(id: number) {
      const index = this.plogList.findIndex(it => it.id === id)
      this.plogList.splice(index, 1)
      this.plogTotal--
    },
    async loadMorePlogList() {
      if (this.loadLock) {
        // 加锁
        return
      }
      this.pageIndex++
      try {
        this.loadLock = true
        await this.getPlogList()
      } finally {
        this.loadLock = false
      }
    },

    async getAlbumList() {
      const res = await albumApi.getList()
      this.albumList = res
        .filter(it => it.id !== -2)
        .map(it => {
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
