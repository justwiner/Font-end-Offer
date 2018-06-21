import * as ActionTypes from '../constants/ActionTypes'

export const login = (data) => {
  console.log(data)
  const user = {
    id: 1,
    nickName: 'winer',
    avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2970597459,3762914954&fm=58&bpow=705&bpoh=675',
    token: '6ONWsjip0QIZ8tyhnq'
  }
  localStorage.setItem('user', JSON.stringify(user))
  return {
    type: ActionTypes.LOGIN,
    user
  }
}

export const logout = () => {
  localStorage.removeItem('user')
  return {type: ActionTypes.LOGOUT}
}