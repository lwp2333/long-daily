import reuqest from './reuqest'

export enum MemorialDayTypeEnum {
  conutdown,
  cumulative
}

export interface MemorialDayEntity {
  id: number
  name: string
  type: MemorialDayTypeEnum
  date: string
  lastUpdateTime: string
}

export interface CreateMemorialDayDto {
  name: MemorialDayTypeEnum
  icon: string
  type: string
  date: number
}

const create = (data: CreateMemorialDayDto) => {
  return reuqest.Post<MemorialDayEntity>('/memorial-day/create', data)
}

const getAllList = () => {
  return reuqest.Get<MemorialDayEntity[]>('/memorial-day/allList')
}

const getDetailById = (id: number) => {
  return reuqest.Get<MemorialDayEntity>(`/memorial-day/${id}`)
}

const updateById = (id: number, data: Partial<CreateMemorialDayDto>) => {
  return reuqest.Post<MemorialDayEntity>(`/memorial-day/${id}`, data)
}
const deleteById = (id: number) => {
  return reuqest.Delect<boolean>(`/memorial-day/${id}`)
}

export default {
  create,
  getAllList,
  getDetailById,
  updateById,
  deleteById
}
