import React, {Component} from 'react'
import Classify from '../../../asset/classify.png'
import {QuestionService} from '../../../lib'
import './index.scss'

class ChapterClassify extends Component {
  constructor (props) {
    super(props)
  }
  async componentWillMount () {
    const chapter = (await QuestionService.getChaptersN()).data.chapters
    this.props.actions.setChapters(chapter)
  }
  chapterOnClick (id) {
    console.log(id)
  }
  render () {
    const { chapters } = this.props
    return (
      <section className="question-chapterClassify">
        <article className="question-title"><img src={Classify} alt="分类" />分类</article>
        <ul className="question-chapters">
          {
            chapters.map((item, index) => {
              return (
              <li key={index} onClick={this.chapterOnClick.bind(this, item.id)}>
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