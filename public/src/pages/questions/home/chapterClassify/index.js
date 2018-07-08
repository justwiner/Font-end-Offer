import React, {Component} from 'react'
import Classify from '../../../../asset/classify.png'
import {message} from 'antd'
import {QuestionService} from '../../../../lib'
import './index.scss'

class ChapterClassify extends Component {
  constructor (props) {
    super(props)
  }
  async componentWillMount () {
    document.title = '题库'
    let {chapters} = this.props.question
    if ( chapters .length === 0 ) {
      const hide = message.loading('正在获取分类..', 0);
      chapters = (await QuestionService.getChaptersN()).data.chapters
      hide()
    }
    this.props.actions.setChapters(chapters)
  }
  render () {
    const { chapters } = this.props.question
    return (
      <section className="question-chapterClassify">
        <article className="question-title"><img src={Classify} alt="分类" />分类</article>
        <ul className="question-chapters">
          {
            chapters.map((item, index) => {
              return (
              <li key={index}>
                <font>{item.title}</font>
                <font>共 <font>{item.questionNum}</font> 道题目</font>
              </li>
            )
            })
          }
        </ul>
      </section>
    )
  }
}

export default ChapterClassify