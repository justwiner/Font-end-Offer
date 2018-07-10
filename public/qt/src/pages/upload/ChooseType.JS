import React,{ Component } from 'react'
import {Link} from 'react-router-dom'

class ChooseType extends Component {
  render () {
    return (
      <section className="upload-choose">
        <Link to="/upload/question">
          <article>上传问题</article>
          <div>
            你将上传试题到题库，它会被所有用户所共享,，Front Family 非常感谢你对此做出的贡献！<br/>
            <font>注：请上传具有真正价值的题目，一经检测为无效题目，立即从题库中删除。</font>
          </div>
          <div>
            <label>支持题型：</label>
            <span>选择题(单选、多选)</span>
          </div>
        </Link>
      </section>
    )
  }
}

export default ChooseType