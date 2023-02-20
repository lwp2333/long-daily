import reuqest from './reuqest'

export interface OssEntity {
  accessKeyId: string
  signature: string
  policy: string
}

const getToken = () => {
  return reuqest.Get<OssEntity>('/oss/token')
}

export default {
  getToken
}
