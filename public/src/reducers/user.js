import * as ActionTypes from '../constants/ActionTypes'
import {Cookie} from '../lib'

let user = {}
const strUser = Cookie.get('user')
if(strUser !== ""){user = JSON.parse(strUser)}

let initialState = {
  id: '', 
  nickName: '',
  avatar: '',
  token: null
}

if ( user !== {} ) {
  initialState = {
    id: user.id, 
    nickName: user.nickName,
    avatar: user.avatar,
    token: user.token
  }
}

export default (state= initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN : 
      return { ...state, ...action.user }

    case ActionTypes.LOGOUT : 
      const user = { nickName: '', avatar: '', token: null, id: '' } 
      return { ...state, ...user }

    default : return state
  }
}