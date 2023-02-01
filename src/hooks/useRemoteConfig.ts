interface RemoteConfig {
  cdnPrefix: string
  svgPrefix: string
  imgPrefix: string
}

const useRemoteConfig = (): RemoteConfig => {
  return {
    cdnPrefix: 'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily',
    svgPrefix: 'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/svgIcon',
    imgPrefix: 'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/imgIcon'
  }
}

export default useRemoteConfig
