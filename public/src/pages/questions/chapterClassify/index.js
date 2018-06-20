import React, {Component} from 'react'
import Classify from '../../../asset/classify.png'
import './index.scss'

class ChapterClassify extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chapter: []
    }
  }
  componentWillMount () {
    const chapter = [
      {
        title: '作用域与闭包',
        questionNum: 4,
        id: 1
      },
      {
        title: 'this关键字',
        questionNum: 4,
        id: 2
      },
      {
        title: 'JavaScript中的对象',
        questionNum: 4,
        id: 3
      },
      {
        title: '混合对象-类',
        questionNum: 4,
        id: 4
      },
      {
        title: '原型',
        questionNum: 4,
        id: 5
      },
      {
        title: '行为委托',
        questionNum: 4,
        id: 6
      },
      {
        title: '数据类型',
        questionNum: 4,
        id: 7
      },
      {
        title: '值',
        questionNum: 4,
        id: 8
      },
      {
        title: '原生函数',
        questionNum: 4,
        id: 9
      },
      {
        title: '类型转换',
        questionNum: 4,
        id: 10
      },
      {
        title: '基本语法',
        questionNum: 4,
        id: 11
      },
      {
        title: '异步',
        questionNum: 4,
        id: 12
      },
      {
        title: '程序性能',
        questionNum: 4,
        id: 13
      }
    ]
    this.setState({chapter})
  }
  chapterOnClick (id) {
    console.log(id)
  }
  render () {
    const { chapter } = this.state
    return (
      <section className="question-chapterClassify">
        <article className="question-title"><img src={Classify} alt="分类" />分类</article>
        <ul className="question-chapters">
          {
            chapter.map((item, index) => {
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