import * as ActionTypes from '../constants/ActionTypes'
import {Cookie,Config} from '../lib'

export const login = (data) => {
  const { nickName, avatar, eMail } = data.user,
    token = data.token,
    user = {
      nickName,
      avatar,
      token,
      eMail
    }
  Cookie.set('user', JSON.stringify({nickName, avatar, eMail}), Config.cookies.userInfo)
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