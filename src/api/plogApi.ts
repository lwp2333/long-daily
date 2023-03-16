import reuqest from './reuqest'
import { AssetEntity, CreateAssetDto } from './assetApi'

export interface PlogEntity {
  id: number
  content: string
  address: string
  assets: AssetEntity[]
  lastUpdateTime: string
  userOpenid: string
}

export interface CreateAssetsInPlogDto extends Omit<CreateAssetDto, 'plodId'> {}

export interface CreatePlogDto {
  content: string
  address: string
  assets: CreateAssetsInPlogDto[]
}

const create = (data: CreatePlogDto) => {
  return reuqest.Post<PlogEntity>('/plog/create', data)
}
const getListByPage = (pageIndex: number, pageSize: number) => {
  return reuqest.Post<{ total: number; list: PlogEntity[] }>('/plog/getListByPage', { pageIndex, pageSize })
}
const getDetailById = (id: number) => {
  return reuqest.Get<PlogEntity>(`/plog/${id}`)
}
const updateById = (id: number, data: Partial<CreatePlogDto>) => {
  return reuqest.Post<PlogEntity>(`/plog/${id}`, data)
}
const delectById = (id: number) => {
  return reuqest.Delect<boolean>(`/plog/${id}`)
}

export default {
  create,
  getListByPage,
  getDetailById,
  updateById,
  delectById
}
