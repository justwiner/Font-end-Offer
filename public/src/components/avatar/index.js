import React, { Component } from 'react'

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
      borderRadius: '50%',
      width: size
    }
    if ( border ) {
      imgStyle = Object.assign({}, {border: '1px solid #eee'}, imgStyle)
    }
    return (
      <span className={className} style={style}>
        <img style={imgStyle} src={url} alt="用户头像" />
        <input type="file" id="getFileValue" onChange={this.handleChange} accept="image/*" />
      </span>
    )
  }
}

export default Avatar