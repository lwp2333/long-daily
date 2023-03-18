<template>
  <nut-popup
    title="添加纪念日"
    :visible="show"
    :style="{ height: '52vh' }"
    round
    lock-scroll
    destroyOnClose
    close-on-click-overlay
    position="bottom"
    @clickOverlay="hanldeClose"
  >
    <div class="create-memorial-day">
      <div class="form-item">
        <div class="control">
          <nut-input
            v-model="formModel.name"
            type="text"
            :max-length="8"
            show-word-limit
            :border="false"
            placeholder="请输入纪念日名称"
          />
        </div>
      </div>

      <div class="form-item">
        <div class="label">图标</div>
        <div class="control">
          <nut-radio-group v-model="formModel.icon" direction="horizontal" class="icon-list">
            <nut-radio v-for="item in iconOptions" shape="button" :label="item">
              <svgIcon :name="item" :size="24" />
            </nut-radio>
          </nut-radio-group>
        </div>
      </div>
      <div class="form-item">
        <div class="label">
          <nut-radio-group v-model="formModel.dateType" direction="horizontal">
            <nut-radio shape="button" :label="DateTypeEnum.solar">公历</nut-radio>
            <nut-radio shape="button" :label="DateTypeEnum.lunar">农历</nut-radio>
          </nut-radio-group>
        </div>
        <div class="control" @click="openSelectDate">
          {{ formModel.date || '选择日期' }}
          <IconFont name="arrow-right" :size="14" />
        </div>
      </div>
      <div class="form-item">
        <div class="label">显示方式</div>
        <div class="control">
          <nut-radio-group v-model="formModel.type" direction="horizontal">
            <nut-radio shape="button" :label="MemorialDayTypeEnum.countdown">倒计日</nut-radio>
            <nut-radio shape="button" :label="MemorialDayTypeEnum.cumulative">累计日</nut-radio>
          </nut-radio-group>
        </div>
      </div>

      <div class="action">
        <nut-button block type="info" @click="saveConfirm">
          {{ id ? '更新' : '保存' }}
        </nut-button>
      </div>
    </div>
  </nut-popup>

  <nut-popup position="bottom" v-model:visible="showDatePopup">
    <nut-date-picker
      v-if="showDatePopup"
      v-model="currentDate"
      :min-date="minDate"
      :max-date="maxDate"
      :is-show-chinese="false"
      @confirm="popupConfirm"
      @cancel="showDatePopup = false"
    />
  </nut-popup>
</template>

<script lang="ts" setup>
import memorialDayApi, { CreateMemorialDayDto, DateTypeEnum, MemorialDayTypeEnum } from '@/api/memorialDayApi'
import { useDataStore } from '@/store/dataStore'
import { IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import { computed, reactive, ref, toRefs, watchEffect } from 'vue'
interface Props {
  id?: number
  visible?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['change', 'update:visible'])

const { visible, id } = toRefs(props)
const show = computed({
  get: () => visible?.value || false,
  set: (val: boolean) => {
    emit('update:visible', val)
  }
})

const iconOptions = ref([
  'dangao',
  'shengri',
  'love',
  'shuimitao',
  'lizhi',
  'danta',
  'qiaokeli',
  'tizi',
  'xiangjiao',
  'chelizi'
])

const formModel = reactive<CreateMemorialDayDto>({
  name: '',
  date: '',
  icon: iconOptions.value[0],
  dateType: DateTypeEnum.solar,
  type: MemorialDayTypeEnum.countdown
})

watchEffect(async () => {
  if (id?.value) {
    const res = await memorialDayApi.getDetailById(id.value)
    formModel.name = res.name
    formModel.icon = res.icon
    formModel.date = dayjs(res.date).format('YYYY-MM-DD')
    formModel.dateType = res.dateType
    formModel.type = res.type
  }
})

const showDatePopup = ref(false)
const minDate = new Date(1900, 1, 1)
const maxDate = new Date()
const currentDate = ref(new Date())

const openSelectDate = () => {
  showDatePopup.value = true
  currentDate.value = formModel.date ? dayjs(formModel.date).toDate() : new Date()
}

const popupConfirm = ({ selectedOptions }) => {
  formModel.date = selectedOptions.map((val: any) => val.text).join('-')
  showDatePopup.value = false
}

const dataStore = useDataStore()

const saveConfirm = async () => {
  try {
    if (id?.value) {
      await memorialDayApi.updateById(id.value, formModel)
    } else {
      await memorialDayApi.create(formModel)
    }
    show.value = false
    Taro.showToast({
      title: '操作成功'
    })
    dataStore.getMemorialDayData()
  } catch (error) {
    Taro.showToast({
      title: '操作失败'
    })
  }
}
const hanldeClose = () => {
  show.value = false
  formModel.name = ''
  formModel.date = ''
  formModel.icon = iconOptions.value[0]
}
</script>

<style lang="less">
.create-memorial-day {
  padding-top: 32px;
  padding-left: 4px;
  padding-right: 4px;
  .form-item {
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);

    .label {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.64);
    }
    .control {
      flex: 1;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.42);
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .action {
    margin-top: 32px;
    padding: 0 28vw;
  }

  .icon-list {
    display: inline-flex;
    width: 72vw;
    overflow: auto;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .nut-input {
    padding: 4px;
  }
}
</style>
