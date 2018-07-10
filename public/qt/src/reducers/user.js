import * as ActionTypes from '../constants/ActionTypes'
import {UserService} from '../lib'

const user = UserService.user

let initialState = {
  eMail: '', 
  nickName: '',
  avatar: ''
}

if ( user !== null ) {
  initialState = {
    eMail: user.eMail, 
    nickName: user.nickName,
    avatar: user.avatar
  }
}

export default (state= initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN : 
      return { ...state, ...action.user }

    case ActionTypes.LOGOUT : 
      const user = { nickName: '', avatar: '', eMail: '' } 
      return { ...state, ...user }

    case ActionTypes.MODIFYUSER : 
      return { ...state, ...action.user }

    default : return state
  }
}