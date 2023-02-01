<template>
  <div class="uploadPage">
    <nut-textarea v-model="formModel.content" placeholder="为你的照片加点描述吧！" />
    <nut-cell-group>
      <nut-cell title="上传到">
        <template v-slot:link>
          <span class="gray_text"> xxx相册 </span>
          <IconFont name="right" color="#ccc" />
        </template>
      </nut-cell>
    </nut-cell-group>

    <div class="submit">
      <nut-button type="primary" block @click="selectFile"> 选择文件 </nut-button>
      <nut-button type="primary" block @click="startSave"> 保存 </nut-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import { reactive } from 'vue'

interface FormModel {
  content: string
  fileList: { url: string; uid: string }[]
}
const formModel = reactive<FormModel>({
  content: '',
  fileList: []
})

const host = 'https://cdn200.oss-cn-hangzhou.aliyuncs.com'
const OSSAccessKeyId = 'LTAI4G28JoEuRLnfBEUffNrc'
const signature = 'Y5iC6A9pfRg6QT4Aa/cm3ua7dJQ='
const policy =
  'eyJleHBpcmF0aW9uIjoiMjAyMy0wMS0wNlQxMDowNDowOS4zNDZaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwXV19'
const selectFile = () => {
  Taro.chooseMedia({
    count: 9,
    mediaType: ['image', 'video'],
    sourceType: ['album', 'camera'],
    maxDuration: 30,
    camera: 'back',
    async success(res) {
      for (const file of res.tempFiles) {
        const dayNow = dayjs().format('YYYYMMDD')
        const key = `weapp/${dayNow}/${file.tempFilePath.slice(-8)}`
        const filePath = file.tempFilePath // 待上传文件的文件路径。

        console.log(key, filePath)
        await Taro.uploadFile({
          url: host, // 开发者服务器的URL。
          filePath: filePath,
          name: 'file', // 必须填file。
          formData: {
            key,
            policy,
            OSSAccessKeyId,
            signature
          }
        })
      }
      Taro.showToast({
        title: '上传成功'
      })
    }
  })
}

const startSave = () => {
  // console.log(formModel.fileList)
  // formModel.fileList.forEach(it => {
  //   ossUpload(it.uid, it.url)
  // })
}
</script>
<style lang="scss">
.uploadPage {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f7f8;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}

.gray_text {
  color: #ccc;
}

.uploader-card {
  padding: 10px 0px 10px 10px;
  background-color: #fff;
  min-height: 220px;
}

.submit {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 64px;
}

.nut-uploader__upload,
.nut-uploader__preview-img {
  width: calc((100vw - 58px) / 4);
  height: calc((100vw - 58px) / 4);
}
</style>
