<template>
  <div class="albumCreatePage">
    <div class="cover" @click="handleChangeCover">
      <template v-if="form.coverUrl">
        <image :src="form.coverUrl" mode="aspectFill" class="coverImg" />
      </template>
      <template v-else>
        <IconFont name="photograph" :size="36" color="#fff" />
        <span>选一张照片作为封面</span>
      </template>
    </div>
    <div class="form">
      <div class="form-item">
        <div class="label">相册名称</div>
        <div class="control">
          <nut-input
            v-model.trim="form.name"
            type="text"
            :max-length="8"
            show-word-limit
            :border="false"
            placeholder="请填写相册名称"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="label">相册描述</div>
        <div class="control">
          <nut-textarea
            v-model="form.desc"
            :autosize="{
              maxHeight: 72,
              minHeight: 54
            }"
            :max-length="32"
            limit-show
            placeholder="请填写相册描述"
          />
        </div>
      </div>
    </div>
    <div class="action">
      <nut-button block type="info" @click="handleConfirmSave">保存</nut-button>
    </div>
    <!-- <div class="back-icon" @click="handleBack"><IconFont name="left" />返回</div> -->
  </div>
</template>

<script lang="ts" setup>
import albumApi, { CreateAlbumDto } from '@/api/albumApi'
import useToast from '@/hooks/useToast'
import useUpload from '@/hooks/useUpload'
import { useDataStore } from '@/store/dataStore'
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { reactive } from 'vue'

const form = reactive<CreateAlbumDto>({
  name: '',
  desc: '',
  coverUrl: ''
})
const dataStore = useDataStore()
const { showToast, showLoading, hideLoading } = useToast()
const { startUpload } = useUpload()

const handleChangeCover = () => {
  Taro.chooseImage({
    count: 1,
    sourceType: ['album', 'camera'],
    async success(res) {
      const cropInfo = await Taro.cropImage({
        src: res.tempFilePaths[0],
        cropScale: '1:1'
      })
      const url = await startUpload(cropInfo.tempFilePath)
      console.log('url', url)
      form.coverUrl = url
    }
  })
}

const handleConfirmSave = async () => {
  try {
    showLoading()
    albumApi.create(form)
    showToast('保存成功！')
    await dataStore.getAlbumList()
    handleBack()
  } catch (error) {
    showToast('保存失败！')
  } finally {
    hideLoading()
  }
}

const handleBack = () => {
  Taro.navigateBack()
}
</script>
<style lang="scss">
.albumCreatePage {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  .cover {
    width: 100vw;
    height: auto;
    aspect-ratio: 1;
    background-image: url('https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/user_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      margin-top: 12px;
      font-size: 16px;
      color: #fff;
    }
    .coverImg {
      width: 100%;
      height: 100%;
    }
  }
}

.form {
  .form-item {
    padding-top: 12px;
    .label {
      margin-left: 24px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.4);
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
  box-shadow: 0 6px 15px rgb(0 0 0 / 16%);
}

.back-icon {
  position: fixed;
  left: 12px;
  top: calc(12px + env(safe-area-inset-top));
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.64);
  font-size: 16px;
}
</style>
