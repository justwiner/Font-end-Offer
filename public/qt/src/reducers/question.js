import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  chapters: [],
  difficultyLevels: [
    {
      id:0,
      title: '所有'
    },
    {
      id:1,
      title: '简单'
    },{
      id:2,
      title: '中等'
    },
    {
      id:3,
      title: '困难'
    }
  ],
  sortBy: [
    {
      id:0,
      title: '综合'
    },
    {
      id:1,
      title: '最新'
    },
    {
      id:2,
      title: '最热'
    }
  ]
}

export default function (state = initialState, action) {
  switch ( action.type ) {

    case ActionTypes.SET_CHAPTER : return Object.assign({}, state, { chapters: action.data });

    default: return state
    
  }
}