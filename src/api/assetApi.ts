import reuqest from './reuqest'

export enum AssetTypeEnum {
  unknown,
  image,
  video,
  audio
}

export interface AssetEntity {
  id: number
  url: string
  type: AssetTypeEnum
  size: number
  sort: number
  albumId: number
  plodId: number
  userOpenid: string
  lastUpdateTime: string
}

export interface CreateAssetDto {
  url: string
  type: AssetTypeEnum
  size: number
  sort: number
  albumId: number
  plodId: number
}

const create = (data: CreateAssetDto) => {
  return reuqest.Post<AssetEntity>('/asset/create', data)
}

const deleteById = (id: number) => {
  return reuqest.Delect<boolean>(`/asset/${id}`)
}

export default {
  create,
  deleteById
}
