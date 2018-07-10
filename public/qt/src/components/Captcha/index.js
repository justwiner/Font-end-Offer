import React, { Component } from 'react'

class Captcha extends Component {
  render () {
    const { className, captcha } = this.props
    const background = 'grey',
        fontSize = '1.5vw',
        textDecoration = 'line-through',
        padding = '.5vw 2vw',
        letterSpacing = '.5vw',
        userSelect = 'none'

    let style = {
      background,
      fontSize,
      textDecoration,
      padding,
      letterSpacing,
      userSelect
    }
    return (
      <div className={ className }>
        <div style={style}>
          { 
            captcha.split("").map((item, index) => {
              return <span key={index}>{item}</span>
            })
          }
        </div>
      </div>
    )
  }
}

export default Captcha