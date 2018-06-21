import * as ActionTypes from '../constants/ActionTypes'

let initialState = {
  chapters: []
}

export default function (state = initialState, action) {
  switch ( action.type ) {

    case ActionTypes.GET_CHAPTER : return state.chapters;

    default: return state
    
  }
}