import reuqest from './reuqest'

export enum LifeInventoryStatusEnum {
  unFinish,
  finish
}

export interface MemorialDayEntity {
  id: number
  name: string
  status: LifeInventoryStatusEnum
  color: string
  fontSize: number
  lastUpdateTime: string
}

export interface CreateLifeInventoryDto {
  name: string
  status: LifeInventoryStatusEnum
  color: string
  fontSize: number
}

const create = (data: CreateLifeInventoryDto) => {
  return reuqest.Post<MemorialDayEntity>('/life-inventory/create', data)
}

const getAllList = () => {
  return reuqest.Get<MemorialDayEntity[]>('/life-inventory/list')
}

const getDetailById = (id: number) => {
  return reuqest.Get<MemorialDayEntity>(`/life-inventory/${id}`)
}

const updateById = (id: number, data: Partial<CreateLifeInventoryDto>) => {
  return reuqest.Post<MemorialDayEntity>(`/life-inventory/${id}`, data)
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
