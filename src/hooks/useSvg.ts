import { computed, isRef } from 'vue'
import type { ComputedRef, Ref } from 'vue'

import useRemoteConfig from './useRemoteConfig'

const useSvg = (name: string | Ref<string>): ComputedRef<string> => {
  const { svgPrefix } = useRemoteConfig()
  return computed(() => `${svgPrefix}/${isRef(name) ? name.value : name}.svg`)
}

export default useSvg
