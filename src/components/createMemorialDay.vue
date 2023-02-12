<template>
  <nut-popup
    title="添加纪念日"
    :visible="show"
    :style="{ height: '48vh' }"
    :lock-scroll="true"
    closeable
    round
    position="bottom"
  >
    <div class="content">
      <div class="form-item">
        <div class="control">
          <nut-input
            v-model="createState.name"
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
          <nut-radio-group v-model="createState.iconName" direction="horizontal">
            <nut-radio shape="button" label="dangao">
              <svgIcon name="dangao" :size="24" />
            </nut-radio>
            <nut-radio shape="button" label="shengri">
              <svgIcon name="shengri" :size="24" />
            </nut-radio>
            <nut-radio shape="button" label="love">
              <svgIcon name="love" :size="24" />
            </nut-radio>
          </nut-radio-group>
        </div>
      </div>
      <div class="form-item">
        <div class="label">
          <nut-radio-group v-model="createState.type" direction="horizontal">
            <nut-radio shape="button" label="solar">公历</nut-radio>
            <nut-radio shape="button" label="lunar">农历</nut-radio>
          </nut-radio-group>
        </div>
        <div class="control" @click="openSelectDate">
          {{ createState.date || '选择日期' }}
          <IconFont name="arrow-right" :size="14" />
        </div>
      </div>
      <div class="form-item">
        <div class="label">显示方式</div>
        <div class="control">
          <nut-radio-group v-model="createState.iconName" direction="horizontal">
            <nut-radio shape="button" label="countdown">倒计日</nut-radio>
            <nut-radio shape="button" label="cumulative">累计日</nut-radio>
          </nut-radio-group>
        </div>
      </div>

      <div class="action"><nut-button block type="info" @click="show = false">完成</nut-button></div>
    </div>
  </nut-popup>

  <nut-popup position="bottom" v-model:visible="showDatePopup">
    <nut-date-picker
      v-model="currentDate"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="popupConfirm"
      :is-show-chinese="true"
    />
  </nut-popup>
</template>

<script lang="ts" setup>
import { IconFont } from '@nutui/icons-vue-taro'
import { reactive, computed, ref, toRefs } from 'vue'
interface Props {
  visible?: boolean
}
interface State {
  name: string
  iconName: string
  date: string
  type: 'solar' | 'lunar' // 公历 农历
}

const props = defineProps<Props>()
const emit = defineEmits(['change', 'update:visible'])

const { visible } = toRefs(props)
const show = computed({
  get: () => visible?.value || false,
  set: (val: boolean) => {
    emit('update:visible', val)
  }
})

const createState = reactive<State>({
  name: '',
  date: '1996-11-16',
  iconName: '',
  type: 'solar'
})

const showDatePopup = ref(false)
const minDate = new Date(1900, 1, 1)
const maxDate = new Date(2100, 12, 30)
const currentDate = ref(new Date())

const openSelectDate = () => {
  showDatePopup.value = true
}

const popupConfirm = ({ selectedOptions }) => {
  createState.date = selectedOptions.map((val: any) => val.text).join('')
  showDatePopup.value = false
}
</script>

<style lang="less">
.content {
  padding-top: 32px;
  padding-left: 4px;
  padding-right: 4px;
}
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
.nut-input {
  padding: 4px;
}
</style>
