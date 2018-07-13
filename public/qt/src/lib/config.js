let config = {
  url: 'http://localhost:2222/api/qt',
  timeOut: 12000,
  cookies: {
    userInfo: 60*60*24*30,
    token: 60*60*24*30
  },
  frontFamily: {
    minPaperQuestionNum: 10,
    maxPaperQuestionNum: 30
  }
}

export default config