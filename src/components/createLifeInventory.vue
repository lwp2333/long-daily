<template>
  <nut-popup
    title="添加清单"
    :visible="show"
    :style="{ height: '52vh' }"
    round
    lock-scroll
    destroyOnClose
    close-on-click-overlay
    position="bottom"
    @clickOverlay="hanldeClose"
  >
    <div class="create-life-inventory">
      <div class="form-item">
        <div class="control">
          <nut-input
            v-model="formModel.name"
            type="text"
            :max-length="12"
            show-word-limit
            :border="false"
            placeholder="请输入名称"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="label">完成状态</div>
        <div class="control">
          <nut-radio-group v-model="formModel.status" direction="horizontal">
            <nut-radio shape="button" :label="LifeInventoryStatusEnum.unFinish"> 未完成 </nut-radio>
            <nut-radio shape="button" :label="LifeInventoryStatusEnum.finish"> 已完成 </nut-radio>
          </nut-radio-group>
        </div>
      </div>
      <div class="form-item">
        <div class="label">显示大小</div>
        <div class="control">
          <nut-rate v-model="fontSize" :count="4" />
        </div>
      </div>

      <div class="form-item">
        <div class="label">颜色</div>
        <div class="control">
          <nut-radio-group v-model="formModel.color" direction="horizontal">
            <!-- <nut-radio label="color-1">
              <div class="color-bar color-1"></div>
            </nut-radio> -->
            <nut-radio label="color-2">
              <div class="color-bar color-2"></div>
            </nut-radio>
            <nut-radio label="color-3">
              <div class="color-bar color-3"></div>
            </nut-radio>
            <nut-radio label="color-4">
              <div class="color-bar color-4"></div>
            </nut-radio>
            <nut-radio label="color-5">
              <div class="color-bar color-5"></div>
            </nut-radio>
          </nut-radio-group>
        </div>
      </div>
      <div class="action">
        <nut-button block type="info" @click="saveConfirm"> 保存 </nut-button>
      </div>
    </div>
  </nut-popup>
</template>

<script lang="ts" setup>
import lifeInventoryApi, { CreateLifeInventoryDto, FontSizeEnum, LifeInventoryStatusEnum } from '@/api/lifeInventoryApi'
import { useDataStore } from '@/store/dataStore'
import Taro from '@tarojs/taro'
import { computed, reactive, ref, toRefs, watch } from 'vue'

interface Props {
  visible?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['change', 'update:visible'])

const { visible } = toRefs(props)

const dataStore = useDataStore()

const show = computed({
  get: () => visible?.value || false,
  set: (val: boolean) => emit('update:visible', val)
})

const fontSize = ref<number>(1)
const formModel = reactive<CreateLifeInventoryDto>({
  name: '',
  status: LifeInventoryStatusEnum.unFinish,
  fontSize: FontSizeEnum.small,
  color: ''
})

watch(
  () => fontSize.value,
  val => {
    switch (val) {
      case 1:
        formModel.fontSize = FontSizeEnum.small
        break
      case 2:
        formModel.fontSize = FontSizeEnum.default
        break
      case 3:
        formModel.fontSize = FontSizeEnum.middle
        break
      case 4:
        formModel.fontSize = FontSizeEnum.large
        break
      default:
        formModel.fontSize = FontSizeEnum.small
        break
    }
  }
)

const saveConfirm = async () => {
  try {
    await lifeInventoryApi.create(formModel)
    show.value = false
    Taro.showToast({
      title: '保存成功'
    })
    dataStore.getLifeInventory()
  } catch (error) {
    Taro.showToast({
      title: '保存失败'
    })
  }
}
const hanldeClose = () => {
  show.value = false
}
</script>

<style lang="scss">
.create-life-inventory {
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
  .color-bar {
    width: 32px;
    height: 12px;
    border-radius: 6px;
  }
}
.nut-input {
  padding: 4px;
}
</style>
