<template>
  <div class="index-page">
    <div class="user-info">
      <image class="avatar" mode="aspectFill" src="https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/chun.png" />
      <div class="desc">
        <span class="label">入驻已经</span>
        <span class="days-num">
          132
          <span class="unit">天</span>
        </span>
      </div>
    </div>

    <div class="pet-box" :style="petStyle">
      <nut-animate type="float" :loop="true">
        <img v-if="direct === 'left'" id="popid" class="gif" :src="currentGif" @click="dialogShow = true" />
        <img v-else class="gif to-right" id="popid" :src="currentGif" @click="dialogShow = true" />
      </nut-animate>
    </div>
    <nut-popover v-model:visible="dialogShow" targetId="popid" location="top-start" custom-class="customClass">
      <template #content>
        <div class="dialog">
          <div class="message">点我干啥呢?</div>
          <div class="options">
            <span @click="switchGif(gitSad)">
              <svgIcon name="chuizi" :size="16" />
              打一顿
            </span>
            <span @click="switchGif(gitEat)">
              <svgIcon name="lingshi" :size="16" />
              喂零食
            </span>
          </div>
        </div>
      </template>
    </nut-popover>
    <div class="app-list">
      <div class="app-item" style="margin-bottom: -12px" @click="navTo('/pages/album')">
        <svgIcon name="tupian" :size="36" />
        <div class="name">相册</div>
        <div class="desc">3个</div>
      </div>
      <div class="app-item" style="margin-bottom: 12px" @click="navTo('/pages/memorial-day')">
        <svgIcon name="rili" :size="36" />
        <div class="name">纪念日</div>
        <div class="desc">{{ memorialDayList.length }}个</div>
      </div>
      <div class="app-item" style="margin-bottom: -12px" @click="navTo('/pages/life-inventory')">
        <svgIcon name="list" :size="36" />
        <div class="name">人生清单</div>
        <div class="desc">12个</div>
      </div>
    </div>

    <div class="bottom-round"></div>
  </div>
</template>

<script lang="ts" setup>
import useAsset from '@/hooks/useAsset'
import { useDataStore } from '@/store/dataStore'
import Taro from '@tarojs/taro'
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue'

const navTo = (url: string) => {
  Taro.navigateTo({
    url
  })
}

const gitEat = useAsset('long-eat', 'gif')
const gitSad = useAsset('long-sad', 'gif')
const gitWalk = useAsset('long-walk', 'gif')

const currentGif = ref(gitWalk.value)
let timer: number
const switchGif = (url: string) => {
  currentGif.value = url
  dialogShow.value = false
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    currentGif.value = gitWalk.value
  }, 1000 * 3)
}

const dialogShow = ref(false)
const direct = ref<'left' | 'right'>('right')
const petStyle = reactive({
  left: '-40px',
  bottom: '18vh'
})

let walkInter: number

const runPet = () => {
  walkInter && clearInterval(walkInter)
  walkInter = setInterval(() => {
    const curNum = Number(petStyle.left.replace('px', ''))
    if (curNum > 320) {
      direct.value = 'left'
    }
    if (curNum < 0) {
      direct.value = 'right'
    }
    if (direct.value === 'left') {
      petStyle.left = curNum - 8 + 'px'
    } else {
      petStyle.left = curNum + 8 + 'px'
    }
  }, 160)
}

watch(dialogShow, () => {
  if (dialogShow.value) {
    walkInter && clearInterval(walkInter)
  }
})

watch(currentGif, () => {
  if (currentGif.value === gitWalk.value) {
    runPet()
  }
})

onMounted(() => {
  runPet()
})
const dataStore = useDataStore()
watchEffect(async () => {
  await dataStore.getMemorialDayData()
})
const memorialDayList = computed(() => dataStore.memorialDayList)
</script>
<style lang="scss">
.index-page {
  position: fixed;
  width: 100%;
  min-height: 100vh;
  // background-image: linear-gradient(to top, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);
  background-image: url('https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: calc(48px + env(safe-area-inset-top));
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}

.user-info {
  position: fixed;
  width: 42vw;
  height: 72px;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.36);
  backdrop-filter: blur(16px);
  border-top-right-radius: 36px;
  border-bottom-right-radius: 36px;

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid #ee609c;
  }
  .desc {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .label {
      font-size: 14px;
      color: #222;
    }
    .days-num {
      font-size: 16px;
      font-weight: 500;
      color: #000;
      .unit {
        display: inline-block;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
}

.pet-box {
  position: fixed;
  .gif {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
  .to-right {
    transform: rotateY(180deg);
  }
}

.app-list {
  position: fixed;
  left: 0;
  bottom: 12px;
  width: 100vw;
  height: 100px;
  z-index: 999;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .app-item {
    width: 96px;
    height: 96px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:active {
      border: 2px solid #4965f2;
    }
    &:not(:last-child) {
      margin-right: 16px;
    }
    .icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }

    .name {
      font-size: 14px;
      font-weight: 400;
      color: #000;
    }
    .desc {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.54);
    }
  }
}

.bottom-round {
  position: fixed;
  left: -50vw;
  bottom: -186vw;
  width: 200vw;
  height: auto;
  aspect-ratio: 1;
  background-color: #fff;
  border-radius: 72%;
}

.dialog {
  padding: 8px;
  width: 140px;
  min-height: 32px;
  max-height: 72px;

  .message {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.72);
  }
  .options {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      display: inline-flex;
      align-items: center;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.64);
    }
  }
}
</style>
