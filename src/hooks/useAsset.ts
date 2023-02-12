import { computed, isRef } from 'vue'
import type { ComputedRef, Ref } from 'vue'

import useRemoteConfig from './useRemoteConfig'

const useAsset = (name: string | Ref<string>, type = 'svg'): ComputedRef<string> => {
  const { svgPrefix, cdnPrefix } = useRemoteConfig()
  return computed(() => `${type === 'svg' ? svgPrefix : cdnPrefix}/${isRef(name) ? name.value : name}.${type}`)
}

export default useAsset
