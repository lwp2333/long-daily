import reuqest from './reuqest'

export enum GenderEnum {
  unknown,
  female,
  male
}
export interface LoginEntity {
  token: string
}
export interface UserEntity {
  openid: string
  nickName: string
  avatar: string
  gender: GenderEnum
  birthday: string
  signature: string
}
export interface UpdateUserDto {
  nickName?: string
  avatar?: string
  gender?: GenderEnum
  birthday?: string
  signature?: string
}

const loginByCode = (code: string) => {
  return reuqest.Get<LoginEntity>('/user/loginByCode', { code })
}

const checkAuth = () => {
  return reuqest.Get<boolean>('/user/checkAuth')
}

const getUserInfo = () => {
  return reuqest.Get<UserEntity>('/user/userInfo')
}

const updateUserInfo = (data: UpdateUserDto) => {
  return reuqest.Post<boolean>('/user/userInfo', data)
}

export default {
  loginByCode,
  checkAuth,
  getUserInfo,
  updateUserInfo
}
