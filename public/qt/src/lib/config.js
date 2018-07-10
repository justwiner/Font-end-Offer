let config = {
  url: 'http://localhost:2222/api/qt',
  timeOut: 12000,
  cookies: {
    userInfo: 60*60,
    token: 60*60
  },
  frontFamily: {
    minPaperQuestionNum: 10,
    maxPaperQuestionNum: 30
  }
}

export default config