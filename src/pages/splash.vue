<template>
  <div class="splashPage">
    <nut-button open-type="getUserInfo" color="linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%)" @click="handleAuth">
      立即进入
    </nut-button>
    <button open-type="chooseAvatar" @chooseavatar="onChooseAvatar" class="avatar_btn">
      <img class="avatar" :src="avatar" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'

const handleAuth = async () => {
  try {
    const res = await Taro.login()

    console.log(res)
    // console.log(res.code)
    // Taro.navigateTo({
    //   url: '/pages/index'
    // })
  } catch (error) {
    console.log(error)
  }
}
const avatar = ref(
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
)

const onChooseAvatar = e => {
  console.log(e)
  avatar.value = e.detail.avatarUrl
}
</script>
<style lang="scss">
.splashPage {
  padding-top: 4px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-image: linear-gradient(135deg, #5efce8 10%, #736efe 100%);
  padding-top: calc(12px + env(safe-area-inset-top));
  padding-bottom: calc(12px + env(safe-area-inset-bottom));

  font-size: 16px;
  color: #fff;
}
.nut-button--default {
  border: none;
}

.avatar_btn {
  padding: 0;
  line-height: 0;
  border-radius: 50%;
}

.avatar {
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 50%;
}
</style>
