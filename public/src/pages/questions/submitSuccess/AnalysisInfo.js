import React, { Component } from 'react'
import {PaperService} from '../../../lib'
import {Icon, message} from 'antd'

class AnalysisInfo extends Component {
  state = {
    likeIcon: 'smile-o',
    dislikeIcon: 'frown-o',
    likeNum: 0,
    dislikeNum: 0
  }
  async componentWillMount () {
    const {paperInfo} = this.props
    if (paperInfo === null) {
      return
    }
    let results = await Promise.all([
      PaperService.getLike(paperInfo._id),
      PaperService.getDislike(paperInfo._id)
    ])
    this.setState({
      likeNum: results[0].data.likes.length,
      dislikeNum: results[1].data.dislikes.length
    })
  }
  componentWillReceiveProps (nextProps) {
    const {like, dislike} = nextProps.paperInfo
    this.setState({
      likeNum: like.length,
      dislikeNum: dislike.length
    })
  }
  setScore = async (type, id) => {
    const { user } = this.props
    if (user.avatar === '') {
      message.warn('请先登录~')
      return
    }
    let result = {}
    switch (type) {
      case 0: result = await this.likeIt(id); break;
      case 1: result = await this.dislikeIt(id); break;
      default : return;
    }
    if ( result.success ) {
      this.props.changePaperInfo(type)
      message.success(result.message)
    } else {
      message.warn(result.message)
    }
  }
  likeIt = async (id) => {
    this.setState({ likeIcon: 'loading' })
    const result = (await PaperService.likeIt(id)).data
    this.setState({ likeIcon: 'smile-o' })
    return result
  }
  dislikeIt = async (id) => {
    this.setState({ dislikeIcon: 'loading' })
    const result = (await PaperService.dislikeIt(id)).data
    this.setState({ dislikeIcon: 'frown-o' })
    return result
  }
  render () {
    const { mark, paperInfo, difficultyLevels, time } = this.props
    const {likeIcon, dislikeIcon, likeNum, dislikeNum} = this.state
    let difficultStyle = {}
    if (paperInfo !== null) {
      switch (paperInfo.difficultyLevel) {
        case 1: difficultStyle = { color: '#73d13d' } ;break;
        case 2: difficultStyle = { color: '#1890ff' } ;break;
        case 3: difficultStyle = { color: '#ff4d4f' } ;break;
      }
    }
    return (
      <section className="doQuestions-analysis-report">
        <article>
          <Icon type="pie-chart" />
          <font>分数 : { mark.mark }</font>
        </article>
        {
          paperInfo !== null ? (
            <p>
              <label>试卷</label>:
              <font>{paperInfo.title}</font>
            </p>
          ) : <p />
        }
        {
          paperInfo !== null ? (
            <p>
              <label>难度</label>:
              <font style={difficultStyle}>{difficultyLevels.find(e => e.id === paperInfo.difficultyLevel).title}</font>
            </p>
          ) : <p />
        }
        <p>
          <label>正确数</label>:
          <font>
            <span style={{color: '#52c41a'}}>{mark.trueNum}</span>
            /
            <span>{mark.total}</span>
          </font>
        </p>
        <p>
          <label>得分</label>:
          <font style={{color: '#ff7875'}}>{mark.mark}</font>
        </p>
        <p>
          <label>用时</label>:
          <font style={{color: '#52c41a'}}>{time}</font>
        </p>
        {
          paperInfo !== null ? (
            <p>
              <label onClick={() => this.setScore(0, paperInfo._id)}>
                <Icon type={likeIcon}/>
                <font>{ likeNum }</font>
              </label>
              <span></span>
              <label onClick={() => this.setScore(1, paperInfo._id)}>
                <Icon type={dislikeIcon}/>
                <font>{ dislikeNum }</font>
              </label>
            </p>
          ) : <p></p>
        }
      </section>
    )
  }
}

export default AnalysisInfo