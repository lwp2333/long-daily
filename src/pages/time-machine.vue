<template>
  <div class="time-machine-page">
    <nut-swiper :init-page="swiperState.page" :pagination-visible="true" pagination-color="#426543" auto-play="3000">
      <nut-swiper-item v-for="item in swiperState.bannerList" :key="item">
        <image :src="item" mode="aspectFill" class="banner" />
      </nut-swiper-item>
    </nut-swiper>
    <div class="content">
      <div class="plog-card" v-for="item in [1, 2, 3, 4]" :key="item">
        <div class="top">
          <nut-avatar size="32">
            <img src="https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/chun.png" />
          </nut-avatar>
          <div class="infoBox">
            <div class="name">五边形的男人</div>
            <div class="time">2022-12-06 17:32</div>
          </div>
          <IconFont name="more-s" :size="18" @click="openAction" />
        </div>
        <div class="middle">
          该生学习态度端正,学习认真,已经过国家英语四级,有较强的思维本事和动手本事。吃苦耐劳朴实大方,
          思想上要求提高,进取向党组织靠拢,学习勤奋努力喜欢体育运...
        </div>
        <div class="asset">
          <nut-grid :gutter="0" :column-num="3" :border="false">
            <nut-grid-item v-for="(item, index) in imgList" :key="index" @click="openPreview(imgList, index)">
              <image :src="item" mode="aspectFill" class="mini_pic" />
            </nut-grid-item>
          </nut-grid>
        </div>
      </div>
    </div>
  </div>
  <nut-action-sheet
    v-model:visible="actionState.show"
    :menu-items="(actionState.menuItems as any)"
    cancel-txt="取消"
    @choose="selected"
  >
  </nut-action-sheet>

  <nut-popup v-model:visible="recordState.show" pop-class="popclass" position="bottom" :z-index="1000">
    <recordCard v-if="false" />
  </nut-popup>
</template>

<script lang="ts" setup>
import { IconFont } from '@nutui/icons-vue-taro'
import recordCard from '@/components/recordCard.vue'
import Taro from '@tarojs/taro'
import { onMounted, reactive, ref } from 'vue'
// import useAsset from '@/hooks/useAsset'
interface SwiperState {
  page: number
  bannerList: string[]
}
const swiperState = reactive<SwiperState>({
  page: 1,
  bannerList: [] as string[]
})
onMounted(() => {
  setTimeout(() => {
    swiperState.bannerList = [
      'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/banner1.jpg',
      'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/banner2.jpg',
      'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/banner3.jpg'
    ]
  }, 320)
})

// const uploadIcon = useAsset('upload')
// const picIcon = useAsset('icon10')
// const switchIcon = useAsset('switch')
// const recordIcon = useAsset('record')

const imgList = ref([
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky1.webp?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky2.jpg?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky3.jpg?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky4.jpg?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky5.jpg?x-oss-process=style/images_convert',
  'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/sky8.jpg?x-oss-process=style/images_convert'
])

const openPreview = (images: string[], index: number) => {
  const urls = images.map(it => it.replace('?x-oss-process=style/images_convert', ''))
  Taro.previewImage({
    current: urls[index],
    urls
  })
}

const actionState = reactive({
  show: false,
  menuItems: [
    {
      id: 'Edit',
      name: '编辑'
    },
    {
      id: 'Del',
      name: '删除',
      color: 'red'
    }
  ]
})

const openAction = () => {
  actionState.show = true
}

const selected = (item: unknown) => {
  console.log(item)
  Taro.vibrateLong()
}

const recordState = reactive({
  show: false
})
</script>
<style lang="scss">
.time-machine-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f7f8;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}

.nut-swiper-item {
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.banner {
  width: calc(100% - 8px);
  height: 200px;
  border-radius: 12px;
}
.content {
  padding: 8px;
  width: 100%;
}

.plog-card {
  width: 100%;
  // min-height: 220px;
  padding: 12px;
  border-radius: 12px;
  background-color: #fff;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
  .top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .infoBox {
      flex: 1;
      margin-left: 8px;
      .name {
        font-size: 13px;
        font-weight: 500;
        color: #000;
      }
      .time {
        font-size: 11px;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  .middle {
    margin-top: 12px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
  }
}

.mini_pic {
  width: 100%;
  height: 100px;
  border-radius: 4px;
}
.nut-grid-item__content {
  padding: 1px;
}

.nut-grid-item__text {
  display: none;
}

.popclass {
  padding-bottom: 36px;
}
</style>
