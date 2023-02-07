<template>
  <div class="albumCreatePage">
    <div class="cover" @click="handleChangeCover">
      <template v-if="createState.cover">
        <image :src="createState.cover" mode="aspectFill" class="coverImg" />
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
            v-model="createState.name"
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
            v-model="createState.desc"
            :autosize="{
              maxHeight: 72,
              minHeight: 54
            }"
            :max-length="48"
            limit-show
            placeholder="请填写相册描述"
          />
        </div>
      </div>
    </div>
    <div class="action"><nut-button block type="info">创建</nut-button></div>
  </div>
</template>

<script lang="ts" setup>
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { reactive } from 'vue'

const createState = reactive({
  cover: '',
  name: '',
  desc: ''
})

const handleChangeCover = () => {
  Taro.chooseImage({
    count: 1,
    sourceType: ['album', 'camera'],
    success(res) {
      createState.cover = res.tempFilePaths[0]
    }
  })
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
}
</style>
