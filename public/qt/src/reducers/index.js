import {combineReducers} from 'redux'
import question from './question'
import user from './user'

const rootReducer = combineReducers({
  question,
  user
})

export default rootReducer