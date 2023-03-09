import reuqest from './reuqest'

export interface AlbumEntity {
  id: number
  name: string
  desc: string
  coverUrl: string
  assetCount: string
  lastUpdateTime: string
}

export interface CreateAlbumDto {
  name: string
  desc: string
  coverUrl: string
}

const create = (data: CreateAlbumDto) => {
  return reuqest.Post<AlbumEntity>('/album/create', data)
}

const getList = () => {
  return reuqest.Get<AlbumEntity[]>('/album/list')
}

const getDetailById = (id: number) => {
  return reuqest.Get<AlbumEntity>(`/album/${id}`)
}

const updateById = (id: number, data: Partial<CreateAlbumDto>) => {
  return reuqest.Post<AlbumEntity>(`/album/${id}`, data)
}

const deleteById = (id: number) => {
  return reuqest.Delect<boolean>(`/album/${id}`)
}

export default {
  create,
  getList,
  getDetailById,
  updateById,
  deleteById
}
