import Taro from '@tarojs/taro'
import { defineStore } from 'pinia'

export enum MediaTypeEnum {}

interface State {
  imageList: string[]
  index: number
}

export const usePreviewStore = defineStore('previewStore', {
  state: (): State => {
    return {
      imageList: [],
      index: 0
    }
  },
  actions: {
    openPreviewImage(list: string[], index: number = 0) {
      this.imageList = list
      this.index = index
      Taro.navigateTo({
        url: '/pages/preview'
      })
    },
    openVideo(url: string) {
      Taro.previewMedia({
        sources: [
          {
            type: 'video',
            url
          }
        ]
      })
    }
  }
})
