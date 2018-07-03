import * as ActionTypes from '../constants/ActionTypes'
import {Cookie,Config} from '../lib'

export const login = (data) => {
  const {token, user} = data
  Cookie.set('user', JSON.stringify(user), Config.cookies.userInfo)
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

export const modifyUser = (nickName, avatar) => {
  const oldUser = JSON.parse(Cookie.get('user'))
  const user = {
    nickName,
    avatar: `${avatar}?${Math.random()}`,
    eMail: oldUser.eMail
  }
  Cookie.set('user', JSON.stringify(user), Config.cookies.userInfo)
  return {type: ActionTypes.MODIFYUSER, user}
}