import React,{ Component } from 'react'
import {Link} from 'react-router-dom'

class ChooseType extends Component {
  render () {
    return (
      <section>
        <Link to="/upload/question">上传一个问题</Link>
        <Link to="/upload/paper">上传一张试卷</Link>
      </section>
    )
  }
}

export default ChooseType