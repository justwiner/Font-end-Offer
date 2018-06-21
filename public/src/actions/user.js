import * as ActionTypes from '../constants/ActionTypes'

export const login = () => {
  const user = {
    nickName: 'winer',
    avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2970597459,3762914954&fm=58&bpow=705&bpoh=675'
  }
  return {
    type: ActionTypes.login,
    user
  }
}