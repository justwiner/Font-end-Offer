import * as ActionTypes from '../constants/ActionTypes'
import {UserService} from '../lib'

const user = UserService.user

let initialState = {
  id: '', 
  nickName: '',
  avatar: ''
}

if ( user !== null ) {
  initialState = {
    id: user.id, 
    nickName: user.nickName,
    avatar: user.avatar
  }
}

export default (state= initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN : 
      return { ...state, ...action.user }

    case ActionTypes.LOGOUT : 
      const user = { nickName: '', avatar: '', id: '' } 
      return { ...state, ...user }

    default : return state
  }
}