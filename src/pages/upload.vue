<template>
  <div class="uploadPage">
    <nut-textarea v-model="formModel.content" limit-show :max-length="120" placeholder="记下此刻的欢喜～" />
    <nut-cell-group>
      <nut-cell title="上传到">
        <template v-slot:link>
          <div class="cell-right">
            <image
              class="mini-cover"
              src="https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky4.jpg?x-oss-process=style/images_convert"
              mode="aspectFill"
            />
            <span class="gray-text">默认相册</span>
            <IconFont name="right" color="#ccc" />
          </div>
        </template>
      </nut-cell>
    </nut-cell-group>
    <div class="upload-box">
      <div class="add">
        <IconFont name="image" :size="20" />
      </div>
    </div>
    <div class="action"><nut-button block type="info">发布</nut-button></div>
  </div>
</template>

<script lang="ts" setup>
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import { reactive, ref } from 'vue'

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

.gray-text {
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
}

.nut-cell__title {
  justify-content: center;
}
.cell-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mini-cover {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  margin-right: 4px;
}

.upload-box {
  padding: 12px;
  border-radius: 8px;
  background-color: #fff;
  .add {
    width: calc((100vw - 36px) / 3);
    height: auto;
    aspect-ratio: 1;
    border-radius: 4px;
    background-color: #f6f7f8;
    display: flex;
    justify-content: center;
    align-items: center;
    &:not(:last-child) {
      margin-right: 2px;
    }
  }
}

.action {
  position: fixed;
  width: 100vw;
  left: 0;
  bottom: 0;
  background-color: #fff;
  padding: 16px 12vw;
}
</style>
