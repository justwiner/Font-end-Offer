import * as ActionTypes from '../constants/ActionTypes'
import {Cookie,Config} from '../lib'

export const login = (data) => {
  console.log(data)
  const { nickName, avatar, eMail } = data.user
  const id = data.user._id
  const token = data.token
  const user = {
    id,
    nickName,
    avatar,
    token
  }
  Cookie.set('user', JSON.stringify({id,nickName,avatar}), Config.cookies.userInfo)
  Cookie.set('token', token, Config.cookies.token)
  return {
    type: ActionTypes.LOGIN,
    user
  }
}

export const logout = () => {
  Cookie.delete('user')
  Cookie.delete('token')
  return {type: ActionTypes.LOGOUT}
}