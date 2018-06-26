import React, {Component} from 'react'
import { Input } from 'antd'
const Search = Input.Search;

class QuestionsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questions: [],
      key: ''
    }
  }
  componentWillMount () {
    const {key} = this.state,
      data = Object.assign({}, {key}, this.props);
    this.searchFromDB(data)
  }
  componentWillReceiveProps (nextProps) {
    const {key} = this.state,
      data = Object.assign({}, {key}, nextProps);
    this.searchFromDB(data)
  }
  search = value => {
    this.setState({ key: value })
    const data = Object.assign({}, {key: value}, this.props)
    this.searchFromDB(data)
  }
  searchFromDB = data => {
    console.log(data)
  }
  render () {
    const { currentChapter, currentDifficults, currentSortBy } = this.props
    return (
      <section>
        <Search enterButton placeholder="关键字搜索" onSearch={value => this.search(value)}/>
        <p>当前选择分类</p>
        {
          currentChapter.map((item, index) => <span key={index}>{item},</span>)
        }
        <p>当前选择难度</p>
        {
          currentDifficults.map((item, index) => <span key={index}>{item},</span>)
        }
        <p>当前排序方式</p>
        <span>{currentSortBy}</span>
      </section>
    )
  }
}

export default QuestionsList