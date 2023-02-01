import { defineStore } from 'pinia'

export const useAppInfoStore = defineStore('appInfo', {
  state: () => {
    return { appName: 'long-darily-app', count: 0 }
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
