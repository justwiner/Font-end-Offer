import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  chapters: []
}

export default function (state = initialState, action) {
  switch ( action.type ) {

    case ActionTypes.SET_CHAPTER : return Object.assign({}, state, { chapters: action.data });

    default: return state
    
  }
}