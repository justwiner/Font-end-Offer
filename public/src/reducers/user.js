import * as ActionTypes from '../constants/ActionTypes'

let initialState = {
  nickName: '',
  avatar: '',
  token: null
}

export default (state= initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN : 
      return { ...state, ...action.user }

    case ActionTypes.LOGOUT : 
      const user = { nickName: '', avatar: '', token: null } 
      return { ...state, ...user }

    default : return state
  }
}