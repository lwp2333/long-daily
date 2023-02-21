import { defineStore } from 'pinia'

export const useAppInfoStore = defineStore('appStore', {
  state: () => {
    return { appName: 'long-darily-app', count: 0 }
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
