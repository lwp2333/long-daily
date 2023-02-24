import reuqest from './reuqest'

export enum MemorialDayTypeEnum {
  /** 倒计时 */
  countdown = 'countdown',
  /** 累计 */
  cumulative = 'cumulative'
}

export enum DateTypeEnum {
  /** 公历 */
  solar = 'solar',
  /** 农历 */
  lunar = 'lunar'
}

export interface MemorialDayEntity {
  id: number
  name: string
  icon: string
  dateType: DateTypeEnum
  date: string
  type: MemorialDayTypeEnum
  lastUpdateTime: string
}

export interface CreateMemorialDayDto {
  name: string
  icon: string
  dateType: DateTypeEnum
  date: string
  type: MemorialDayTypeEnum
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
