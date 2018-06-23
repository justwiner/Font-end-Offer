import React, {Component} from 'react'

const initQuestions = {
  title: '',
  options: [],
  answers: []
}

class CreateQuestions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questions: [
        initQuestions
      ]
    }
  }

  render () {
    const {questions} = this.state
    return (
      <section className="createQuestion">
        <article>创建问题</article>
        <section className="createQuestion-tip">
          <p>1. 上传的题目应属于
            <font className="createQuestion-tip-stress">JavaScript</font>
            的范畴。
          </p>
          <p>2. 题目内容不包含
            <font className="createQuestion-tip-stress">敏感词汇</font>
            与
            <font className="createQuestion-tip-stress">不良思想</font>
            。
          </p>
          <p>3. 题目所属分类应确切
            <font className="createQuestion-tip-stress">认真</font>
            地选择。
          </p>
          <p>4. 若被检测出题目不属于
            <font className="createQuestion-tip-stress">JavaScript</font>
            的相关问题，或题目是被人
            <font className="createQuestion-tip-stress">恶意创建</font>
            ，或社区用户
            <font className="createQuestion-tip-stress">均反感与不喜欢</font>
            此问题，管理员将
            <font className="createQuestion-tip-stress">永久删除</font>
            此问题，并
            <font className="createQuestion-tip-stress">扣除</font>
            此用户的
            <font className="createQuestion-tip-stress">信誉值</font>
            。
          </p>
          <p>希望大家共同营造良好的 Front Family 社区，大家共同进步！</p>
        </section>
        
      </section>
    )
  }
}

export default CreateQuestions