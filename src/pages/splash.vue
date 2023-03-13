<template>
  <div class="splashPage">
    <div class="action">
      <nut-button open-type="getUserInfo" type="info" @click="handleAuth"> 立即进入 </nut-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import userApi from '@/api/userApi'
import { useDataStore } from '@/store/dataStore'
import Taro from '@tarojs/taro'

const dataStore = useDataStore()

const handleAuth = async () => {
  try {
    const res = await Taro.login()
    await userApi.loginByCode(res.code)
    await dataStore.initData()
    Taro.switchTab({
      url: '/pages/index'
    })
  } catch (error) {
    console.log(error)
  }
}
</script>
<style lang="scss">
.splashPage {
  position: fixed;
  width: 100%;
  min-height: 100vh;
  background-image: url('https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/h5-splash02.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(12px);
}

.action {
  padding: 8vw;
  position: fixed;
  width: 100vw;
  left: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
