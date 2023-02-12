import { useOssInfoStore } from '@/store/ossInfo'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import { computed, reactive, ref } from 'vue'

const useUpload = () => {
  const ossStore = useOssInfoStore()
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
    const dayNow = dayjs().format('YYYYMMDD')
    const key = `weapp/${dayNow}/${filePath.slice(-8)}`

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
    return await uploadTask
  }

  // 多文件上传
  const multiProgress = reactive({
    success: 0,
    fail: 0,
    total: 20
  })
  const startUploadMutile = async (
    filePaths: string[]
  ): Promise<Taro.uploadFile.SuccessCallbackResult | TaroGeneral.CallbackResult[]> => {
    // 重置进度条
    multiProgress.success = 0
    multiProgress.total = filePaths.length

    return new Promise(resolve => {
      const list: Taro.uploadFile.SuccessCallbackResult | TaroGeneral.CallbackResult[] = []
      for (const filePath in filePaths) {
        const dayNow = dayjs().format('YYYYMMDD')
        const key = `weapp/${dayNow}/${filePath.slice(-8)}`
        const index = filePaths.findIndex(it => it === filePath) //文件索引
        Taro.uploadFile({
          url: ossConfig.value.host, // 开发者服务器的URL。
          filePath,
          name: 'file', // 必须填file。
          formData: {
            key,
            ...ossConfig.value
          },
          success(res) {
            list[index] = res
            multiProgress.success++
          },
          fail(err) {
            list[index] = err
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

  return {
    startUpload,
    startUploadMutile
  }
}

export default useUpload
