import memorialDayApi, { MemorialDayEntity } from '@/api/memorialDayApi'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

interface State {
  memorialDayList: MemorialDayEntity[]
}

export const useDataStore = defineStore('dataStore', {
  state: (): State => {
    return {
      memorialDayList: []
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
    }
  }
})
