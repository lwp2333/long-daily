import reuqest from './reuqest'

export enum LifeInventoryStatusEnum {
  unFinish = 'unFinish',
  finish = 'finish'
}

export enum FontSizeEnum {
  small = 'small',
  default = 'default',
  middle = 'middle',
  large = 'large'
}

export interface LifeInventoryEntity {
  id: number
  name: string
  status: LifeInventoryStatusEnum
  fontSize: FontSizeEnum
  color: string
  lastUpdateTime: string
}

export interface CreateLifeInventoryDto {
  name: string
  status: LifeInventoryStatusEnum
  color: string
  fontSize: FontSizeEnum
}

const create = (data: CreateLifeInventoryDto) => {
  return reuqest.Post<LifeInventoryEntity>('/life-inventory/create', data)
}

const getAllList = () => {
  return reuqest.Get<LifeInventoryEntity[]>('/life-inventory/allList')
}

const getDetailById = (id: number) => {
  return reuqest.Get<LifeInventoryEntity>(`/life-inventory/${id}`)
}

const updateById = (id: number, data: Partial<CreateLifeInventoryDto>) => {
  return reuqest.Post<LifeInventoryEntity>(`/life-inventory/${id}`, data)
}

const deleteById = (id: number) => {
  return reuqest.Delect<boolean>(`/life-inventory/${id}`)
}

export default {
  create,
  getAllList,
  getDetailById,
  updateById,
  deleteById
}
