import { useDataStore } from '@/store/dataStore'
import { useOssInfoStore } from '@/store/ossStore'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import { computed, reactive, ref, watchEffect } from 'vue'

const getFileKey = (filePath: string, openid: string) => {
  const dayNow = dayjs().format('YYYYMMDD')
  return `weapp/${openid}/${dayNow}/${filePath.slice(-12)}`
}

const useUpload = () => {
  const ossStore = useOssInfoStore()
  const dataStore = useDataStore()
  const openid = computed(() => dataStore.userInfo.openid)
  const ossConfig = computed(() => {
    const { host, policy, OSSAccessKeyId, signature } = ossStore
    return {
      host,
      policy,
      OSSAccessKeyId,
      signature
    }
  })
  //单文件上传
  const singleProgress = ref(0)
  const startUpload = async (filePath: string) => {
    // 重置进度条
    singleProgress.value = 0
    const key = getFileKey(filePath, openid.value)
    const uploadTask = Taro.uploadFile({
      url: ossConfig.value.host, // 开发者服务器的URL。
      filePath,
      name: 'file', // 必须填file。
      formData: {
        key,
        ...ossConfig.value
      }
    })
    uploadTask.onProgressUpdate(res => {
      singleProgress.value = res.progress
    })
    try {
      await uploadTask
      return Promise.resolve(`${ossConfig.value.host}/${key}`) // 自己拼完整url
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // 多文件上传
  const multiProgress = reactive({
    success: 0,
    fail: 0,
    total: 20
  })
  const startUploadMutile = async (filePaths: string[]): Promise<string[]> => {
    // 重置进度条
    multiProgress.success = 0
    multiProgress.total = filePaths.length

    return new Promise(resolve => {
      const list: string[] = []
      for (const filePath of filePaths) {
        const key = getFileKey(filePath, openid.value)
        const index = filePaths.findIndex(it => it === filePath) //文件索引
        Taro.uploadFile({
          url: ossConfig.value.host, // 开发者服务器的URL。
          filePath,
          name: 'file', // 必须填file。
          formData: {
            key,
            ...ossConfig.value
          },
          success() {
            list[index] = `${ossConfig.value.host}/${key}`
            multiProgress.success++
          },
          fail() {
            list[index] = `${ossConfig.value.host}/${key}`
            multiProgress.fail++
          },
          complete() {
            const num = multiProgress.fail + multiProgress.success
            if (num === multiProgress.total) {
              resolve(list)
            }
          }
        })
      }
    })
  }

  watchEffect(() => {
    // 刷新token先
    ossStore.freshToken()
  })

  return {
    startUpload,
    singleProgress,
    startUploadMutile,
    multiProgress
  }
}

export default useUpload
