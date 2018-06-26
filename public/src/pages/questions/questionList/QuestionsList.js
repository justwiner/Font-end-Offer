import React, {Component} from 'react'
import { Input, message, Pagination } from 'antd'
import {QuestionService,DateParse} from '../../../lib'
const Search = Input.Search;

class QuestionsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questions: [],
      key: '',
      total: 0,
      page: 1,
      size: 10
    }
  }
  componentWillMount () {
    const {key, page, size} = this.state,
      data = this.setParama(key, page, size)
    this.searchFromDB(data)
  }
  componentWillReceiveProps (nextProps) {
    const {key, size} = this.state,
      data = this.setParama(key, 1, size, nextProps)
    this.searchFromDB(data)
    this.setState({ page: 1 })
  }
  search = value => {
    this.setState({ key: value })
    const { size } = this.state,
      data = this.setParama(value, 1, size)
    this.searchFromDB(data)
    this.setState({ page: 1 })
  }
  searchFromDB = async data => {
    const hide = message.loading('正在获取试题..', 0);
    const result = (await QuestionService.getQuestions(data)).data
    hide()
    if ( result.success ) {
      this.setState({ questions: result.questions, total: result.total })
    } else {
      message.error(`试题获取失败，${result.message}`)
    }
  }
  setParama = (key, page, size, props = this.props) => {
    const { currentChapter, currentDifficults, currentSortBy } = props,
      data = Object.assign({}, {key, page, size}, { currentChapter, currentDifficults, currentSortBy })
    return data
  }
  onChange = (page, pageSize) => {
    this.setState({
      page,
      size: pageSize
    })
    const {key} = this.state,
      data = this.setParama(key, page, pageSize)
    this.searchFromDB(data)
  }
  onShowSizeChange = (current, size) => {
    this.setState({
      page: current,
      size
    })
    const {key} = this.state,
      data = this.setParama(key, current, size)
    this.searchFromDB(data)
  }
  doQuestion = question => {
    const { user } = this.props
    if ( user.avatar === "" ) {
      message.warn('请先登录！', 2)
      return
    }
    console.log(question)
  }
  render () {
    const { questions, total, page, size } = this.state,
      { chapters, difficultyLevels } = this.props.question;
    return (
      <section>
        <Search size="large" style={{letterSpacing: 'normal', marginBottom: '2vw'}} enterButton placeholder="关键字搜索" onSearch={value => this.search(value)}/>
        
        <section className="question-list-detail">
          {
            questions.length !== 0 
              ? (
              <div className="question-list-found">
                <table>
                  <thead>
                    <tr>
                      <th style={{width:'40%'}}>题目</th>
                      <th className="table-clo-center" style={{width:'10%'}}>知识点</th>
                      <th className="table-clo-center" style={{width:'10%'}}>来自</th>
                      <th className="table-clo-center" style={{width:'10%'}}>难度</th>
                      <th className="table-clo-center" style={{width:'20%'}}>创建时间</th>
                      <th className="table-clo-center" style={{width:'10%'}}>热度</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      questions.map((item, index) => {
                        let style = {}
                        const difficultyLevel = item.difficultyLevel
                        switch (difficultyLevel) {
                          case 1: style = { color: '#73d13d' } ;break;
                          case 2: style = { color: '#1890ff' } ;break;
                          case 3: style = { color: '#ff4d4f' } ;break;
                        }
                        return (
                          <tr onClick={() => this.doQuestion(item)} key= {index}>
                            <td>{item.title}</td>
                            <td className="table-clo-center" style={{fontSize: '.7vw'}}>{chapters.find(e => e.id === item.chapter).title}</td>
                            <td className="table-clo-center" style={{fontSize: '.7vw'}}>{item.createBy.nickName}</td>
                            <td className="table-clo-center" style={style}>{difficultyLevels.find(e => e.id === difficultyLevel).title}</td>
                            <td className="table-clo-center" style={{color: 'lightgrey'}}>{DateParse.fromNow(item.createAt)}</td>
                            <td className="table-clo-center" style={{color: '#9254de'}}>{item.like.length}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              ) 
              : (<div className="question-list-notFound">暂无此类型的题目，也许你可以上传一个！</div>)
          }
        </section>
        
        <Pagination 
          style={{letterSpacing: 'normal', marginTop: '2vw'}}
          current={page}
          pageSize={size}
          size="small"
          total={total} 
          showSizeChanger
          showQuickJumper
          onChange = {this.onChange}
          onShowSizeChange = {this.onShowSizeChange}/>
      </section>
    )
  }
}

export default QuestionsList