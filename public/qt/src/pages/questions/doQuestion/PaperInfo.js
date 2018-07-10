import React, {Component} from 'react'

class PaperInfo extends Component {
  render () {
    const { paperInfo, questionLength, difficultyLevels } = this.props
    let difficultStyle = {}
    if (paperInfo !== null) {
      switch (paperInfo.difficultyLevel) {
        case 1: difficultStyle = { color: '#73d13d' } ;break;
        case 2: difficultStyle = { color: '#1890ff' } ;break;
        case 3: difficultStyle = { color: '#ff4d4f' } ;break;
      }
    }
    return paperInfo !== null ? (
      <section className="doQuestions-papersInfo">
        <div><img src={paperInfo.createBy.avatar} alt="贡献者头像" /></div>
        <div>
          <article>{paperInfo.title}</article>
          <p>
            <label>贡献者</label>:
            <font>{paperInfo.createBy.nickName}</font>
          </p>
          <p>
            <label>创建时间</label>:
            <font>{paperInfo.createAt}</font>
          </p>
          <p>
            <label>题目数</label>:
            <font>{questionLength}</font>
          </p>
          <p>
            <label>难度</label>:
            <font style={difficultStyle}>{difficultyLevels[difficultyLevels.findIndex(e => e.id === paperInfo.difficultyLevel)].title}</font>
          </p>
        </div>
      </section>
    ) : <section></section>
  }
}

export default PaperInfo