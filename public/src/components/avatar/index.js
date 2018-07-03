import React, { Component } from 'react'
import {Icon} from 'antd'
import './index.scss'

class Avatar extends Component {
  handleChange = (e) => {
    const file = document.getElementById('getFileValue')
    const reader = new FileReader();
    reader.readAsDataURL(file.files[0]);
    reader.onload = (e) => {
      this.returnVaule(e.target.result)
    }
  }
  returnVaule = (value) => {
    const {onChange} = this.props
    onChange(value)
  }
  render () {
    const { url, style, className, size, border } = this.props
    let imgStyle = {
      width: size
    }
    let delayStyle = {
      width: size,
      height: size
    }
    let contentStyle = {
      width: size,
      height: size
    }
    if ( border ) {
      imgStyle = Object.assign({}, {border: '1px solid #eee'}, imgStyle)
    }
    contentStyle = Object.assign({}, style, contentStyle)
    return (
      <p className={`${className} avatar-content`} style={contentStyle}>
        <img className="avatar" style={imgStyle} src={url} alt="用户头像" />
        <input style={{display: 'none'}} type="file" id="getFileValue" onChange={this.handleChange} accept="image/*" />
        <div style={delayStyle} className="avatar-delay" onClick={() => document.getElementById('getFileValue').click()}>
          <Icon type="upload" style={{fontSize: size}}/>
        </div>
      </p>
    )
  }
}

export default Avatar