import Taro from '@tarojs/taro'
import { defineStore } from 'pinia'

export enum MediaTypeEnum {}

interface PreviewStoreState {
  imageList: string[]
}

export const usePreviewStore = defineStore<'previewStore', PreviewStoreState>('previewStore', {
  state: () => {
    return {
      imageList: [
        'https://cdn200.oss-cn-hangzhou.aliyuncs.com/weapp/20230106/2c38.jpg',
        'https://cdn200.oss-cn-hangzhou.aliyuncs.com/weapp/20230106/2c38.jpg',
        'https://cdn200.oss-cn-hangzhou.aliyuncs.com/weapp/20230106/2c38.jpg',
        'https://cdn200.oss-cn-hangzhou.aliyuncs.com/weapp/20230106/2c38.jpg'
      ]
    }
  },
  actions: {
    openPreviewImage(list: string[]) {
      this.sourceList = list
      Taro.navigateTo({
        url: '/pages/preview-page'
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
