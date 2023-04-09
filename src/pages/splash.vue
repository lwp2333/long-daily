<template>
  <div class="splashPage">
    <div class="action">
      <nut-animate type="ripple" :loop="true">
        <nut-button open-type="getUserInfo" type="info" @click="handleAuth"> 立即进入 </nut-button>
      </nut-animate>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useToast from '@/hooks/useToast'
import { useDataStore } from '@/store/dataStore'
import Taro, { nextTick } from '@tarojs/taro'
import { onBeforeMount, ref } from 'vue'

const dataStore = useDataStore()
const { showLoading, hideLoading } = useToast()

const navHome = () => {
  dataStore.initData()
  Taro.switchTab({
    url: '/pages/index'
  })
}

const reLogin = ref(false)

onBeforeMount(async () => {
  try {
    await Taro.checkSession()
  } catch (error) {
    console.log('checkSession error', error)
    reLogin.value = true
  }
})

const handleAuth = async () => {
  try {
    showLoading('正在进入...')
    if (reLogin.value) {
      const res = await Taro.login()
      await dataStore.login(res.code)
    }
    hideLoading()
    nextTick(() => {
      navHome()
    })
  } catch (error) {
    console.log('login error', error)
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
