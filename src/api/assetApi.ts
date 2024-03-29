import reuqest from './reuqest'

export enum AssetTypeEnum {
  unknown = 'unknown',
  image = 'image',
  video = 'video',
  audio = 'audio'
}

export interface AssetEntity {
  id: number
  url: string
  type: AssetTypeEnum
  size: number
  sort: number
  poster: string
  albumId: number
  plodId: number
  userOpenid: string
  lastUpdateTime: string
}

export interface CreateAssetDto {
  url: string
  type: AssetTypeEnum
  albumId: number
  sort?: number
  size?: number
  poster?: string
  plodId?: number
}

export interface AssetTypeCountEntity {
  imageCount: number
  videoCount: number
  audioCount: number
}

const getTypeCount = () => {
  return reuqest.Get<AssetTypeCountEntity>(`/asset/getTypeCount`)
}

const create = (data: CreateAssetDto) => {
  return reuqest.Post<AssetEntity>('/asset/create', data)
}

const deleteById = (id: number) => {
  return reuqest.Delect<boolean>(`/asset/${id}`)
}

export default {
  getTypeCount,
  create,
  deleteById
}
