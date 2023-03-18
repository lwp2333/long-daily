<template>
  <div class="time-machine-create">
    <div class="top-tips">
      <span>时光机，祝你天天开心！</span>
      <SvgIcon name="earth" :size="88" />
    </div>
    <nut-textarea v-model="formModel.content" limit-show :max-length="120" placeholder="记录下此刻的欢喜吧～" />
    <div v-if="showType" class="type-box">
      <div class="type-item" @click="choosePhotos"><IconFont name="image" :size="12" color="#0066ff" />相册</div>
      <div class="type-item" @click="chooseVideo"><IconFont name="play-start" :size="12" color="#0066ff" />视频</div>
      <div class="type-item" @click="openRecoder"><IconFont name="microphone" :size="12" color="#0066ff" />录音</div>
    </div>
    <nut-cell-group v-if="imgCacheList.length || videoCacheList.length">
      <nut-cell title="上传到">
        <template v-slot:link>
          <div class="cell-right" @click="openSelectAlbum">
            <template v-if="albumInfo">
              <image class="mini-cover" :src="albumInfo.coverUrl" mode="aspectFill" />
              <span class="gray-text">{{ albumInfo.name }}</span>
            </template>
            <template v-else>
              <span class="gray-text">请选择</span>
            </template>
            <IconFont name="right" color="#ccc" />
          </div>
        </template>
      </nut-cell>
    </nut-cell-group>
    <div v-if="imgCacheList.length" class="upload-box">
      <nut-grid :gutter="0" :column-num="3" :border="false">
        <nut-grid-item v-for="(item, index) in imgCacheList" :key="index">
          <image :src="item.tempFilePath" mode="aspectFill" class="mini_pic" @click="handlePreview(index)" />
        </nut-grid-item>
        <nut-grid-item v-if="imgCacheList.length < 9">
          <div class="add" @click="choosePhotos">
            <IconFont name="uploader" :size="24" color="#ccc" />
          </div>
        </nut-grid-item>
      </nut-grid>
    </div>

    <div v-if="videoCacheList.length" class="video-box">
      <nut-grid :gutter="0" :column-num="3" :border="false">
        <nut-grid-item v-for="(item, index) in videoCacheList" :key="index">
          <div class="video-item" @click="handlePreviewVideo(index)">
            <!-- 视频封面 -->
            <image :src="item.thumbTempFilePath" mode="aspectFill" class="video_pic" />
            <div class="mask">
              <IconFont name="play-start" :size="12" color="#fff" />
            </div>
          </div>
        </nut-grid-item>
      </nut-grid>
    </div>

    <div v-if="audioCache" class="audio-box">
      <RecordPlay :src="audioCache.tempFilePath" />
    </div>

    <div class="action">
      <nut-button block type="info" @click="openConfirmShow">发布</nut-button>
    </div>
    <!-- 选择相册 -->
    <selectAlbum v-model="albumId" v-model:visible="selectAlbumShow" />
    <!-- 录音 -->
    <Recorder v-model:visible="recorderShow" @change="handleRecorderChange" />

    <!-- 确定保存 -->
    <nut-dialog
      content="确定发布嘛？"
      v-model:visible="confirmShow"
      footer-direction="vertical"
      @cancel="confirmShow = false"
      @ok="saveConfirm"
    />
  </div>
</template>

<script lang="ts" setup>
import { AssetTypeEnum } from '@/api/assetApi'
import plogApi, { CreateAssetsInPlogDto, CreatePlogDto } from '@/api/plogApi'
import RecordPlay from '@/components/recordPlay.vue'
import Recorder, { RecorderItem } from '@/components/recorder.vue'
import selectAlbum from '@/components/selectAlbum.vue'
import SvgIcon from '@/components/svgIcon.vue'
import useToast from '@/hooks/useToast'
import useUpload from '@/hooks/useUpload'
import { useDataStore } from '@/store/dataStore'
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { computed, reactive, ref, watchEffect } from 'vue'

const dataStore = useDataStore()
const albumList = computed(() => dataStore.albumList)

const { startUpload, startUploadMutile } = useUpload()
const { showToast, showLoading, hideLoading } = useToast()

const albumId = ref<number>(-1)
const formModel = reactive<CreatePlogDto>({
  content: '',
  address: '',
  assets: []
})

const imgCacheList = ref<Taro.chooseMedia.ChooseMedia[]>([])
const videoCacheList = ref<Taro.chooseMedia.ChooseMedia[]>([])
const audioCache = ref<RecorderItem>()

const showType = computed(() => !imgCacheList.value.length && !videoCacheList.value.length && !audioCache.value)

// 照片
const choosePhotos = async () => {
  const res = await Taro.chooseMedia({
    mediaType: ['image'],
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    count: 9 - imgCacheList.value.length
  })
  Taro.showLoading({
    title: '上传中...'
  })
  const urlList = await startUploadMutile(res.tempFiles.map(it => it.tempFilePath))
  imgCacheList.value.push(
    ...res.tempFiles.map((it, index) => {
      return {
        ...it,
        tempFilePath: urlList[index]
      }
    })
  )
  Taro.hideLoading()
}

// 预览本地缓存图
const handlePreview = (index: number) => {
  const urls = imgCacheList.value.map(it => it.tempFilePath)
  Taro.previewImage({
    current: urls[index],
    urls
  })
}
// 视频
const chooseVideo = async () => {
  const res = await Taro.chooseMedia({
    mediaType: ['video'],
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    count: 1
  })
  Taro.showLoading({
    title: '上传中...'
  })
  const urlList = await startUploadMutile(res.tempFiles.map(it => it.tempFilePath))
  const posterUrlList = await startUploadMutile(res.tempFiles.map(it => it.thumbTempFilePath))
  videoCacheList.value = res.tempFiles.map((it, index) => {
    return {
      ...it,
      tempFilePath: urlList[index],
      thumbTempFilePath: posterUrlList[index]
    }
  })
  Taro.hideLoading()
}
// 预览本地缓存视频
const handlePreviewVideo = (index: number) => {
  const url = videoCacheList.value[index].tempFilePath
  const poster = videoCacheList.value[index].thumbTempFilePath
  Taro.previewMedia({
    sources: [{ type: 'video', url, poster }]
  }).catch(error => {
    console.log(error)
  })
}
// 录音
const recorderShow = ref(false)
const openRecoder = () => {
  recorderShow.value = true
}
const handleRecorderChange = async (record: RecorderItem) => {
  showLoading('上传中...')
  const url = await startUpload(record.tempFilePath)
  record.tempFilePath = url
  audioCache.value = record
  hideLoading()
}

// 选择相册组
const selectAlbumShow = ref(false)
const albumInfo = computed(() => {
  return albumList.value.find(it => it.id === albumId.value)
})
const openSelectAlbum = () => {
  selectAlbumShow.value = true
}

watchEffect(() => {
  const allList: CreateAssetsInPlogDto[] = []
  if (imgCacheList.value.length) {
    allList.push(
      ...imgCacheList.value.map((it, index) => {
        return {
          url: it.tempFilePath,
          type: AssetTypeEnum.image,
          size: it.size,
          sort: index + 1,
          albumId: albumId.value!
        }
      })
    )
  }
  if (videoCacheList.value.length) {
    allList.push(
      ...videoCacheList.value.map((it, index) => {
        return {
          url: it.tempFilePath,
          poster: it.thumbTempFilePath, // 视频封面
          type: AssetTypeEnum.video,
          size: it.size,
          sort: index + 1,
          albumId: albumId.value!
        }
      })
    )
  }
  if (audioCache.value) {
    allList.push({
      url: audioCache.value.tempFilePath,
      type: AssetTypeEnum.audio,
      size: audioCache.value.fileSize,
      sort: 1,
      albumId: -2 // 默认录音组id为-2
    })
  }
  formModel.assets = allList
})

const confirmShow = ref(false)
const openConfirmShow = () => {
  if (!formModel.content && !formModel.assets.length) {
    showToast('请输内容或上传照片/视频/语音')
    return
  }
  confirmShow.value = true
}

// 刷新数据 可能影响到的()
const refreshDataAndBack = () => {
  dataStore.getAlbumList()
  dataStore.refreshPlogList()
  Taro.navigateBack()
}

const saveConfirm = async () => {
  showLoading('正在发布...')
  await plogApi.create(formModel)
  refreshDataAndBack()
  hideLoading()
  showToast('发布成功')
}
</script>
<style lang="scss">
.time-machine-create {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f7f8;
  padding-top: 4px;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: calc(32px + env(safe-area-inset-bottom));
  .top-tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    padding: 12px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    margin-bottom: 8px;
  }
  .type-box {
    padding: 12px;
    background-color: #fff;
    border-top: 1px solid #f6f7f8;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .type-item {
      padding: 4px 8px;
      width: 52px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10px;
      border-radius: 8px;
      background-color: #f6f7f8;
      color: rgba(0, 0, 0, 0.72);
      &:not(:last-child) {
        margin-right: 12px;
      }
    }
  }
}

.cell-right {
  display: flex;
  justify-content: center;
  align-items: center;

  .mini-cover {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    margin-right: 4px;
  }

  .gray-text {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
  }
}

.upload-box {
  padding: 12px;
  border-radius: 8px;
  background-color: #fff;
  .add {
    width: 100%;
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
  .mini_pic {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }
}

.video-box {
  margin-top: 8px;
  padding: 12px;
  background-color: #fff;
  .video-item {
    position: relative;
    width: 100%;
    line-height: 0;
    .video_pic {
      width: 100%;
      height: auto;
      aspect-ratio: 1;
    }
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.28);
    }
  }
}

.audio-box {
  padding: 12px;
  background-color: #fff;
}

.action {
  position: fixed;
  width: 100vw;
  left: 0;
  bottom: 0;
  background-color: #fff;
  padding: 16px 12vw;
}

.nut-grid-item__content {
  padding: 1px;
}

.nut-grid-item__text {
  display: none;
}

.nut-textarea {
  padding: 12px;
  font-size: 16px;
}

.nut-cell__title {
  justify-content: center;
}
</style>
