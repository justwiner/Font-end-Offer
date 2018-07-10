import React, { Component } from 'react'
import {Icon} from 'antd'

class Timer extends Component {
  static defaultProps = {
    showButton: false
  }
  state = {
    hours: 0,
    minute: 0,
    second: 0,
    iconStatus: 'pause-circle-o'
  }
  componentDidMount () {
    this.start()
  }
  componentWillUnmount() {
    this.stop()
  }
  stop = () => {
    let {hours, minute, second} = this.state
    clearInterval(this.interval);
    this.setState({ iconStatus: 'play-circle-o' })
    return `${hours < 10 ? '0' + hours : hours}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
  }
  start = () => {
    this.interval = setInterval(() => this.addSecond(), 1000)
    this.setState({ iconStatus: 'pause-circle-o' })
  }
  addSecond = () => {
    let {hours, minute, second} = this.state,
      currentSecond = second + 1
    if ( currentSecond === 60 ) {
      currentSecond = 0
      let currentMinute = minute + 1
      if ( currentMinute === 60 ) {
        currentMinute = 0
        let currentHours = hours + 1
        if ( currentHours === 24 ) {
          currentHours = 0
        }
        this.setState({ hours: currentHours })
      }
      this.setState({ minute: currentMinute })
    }
    this.setState({ second: currentSecond })
  }
  handleClick =() => {
    const {iconStatus, hours, minute, second} = this.state
    const { onChange } = this.props
    if (iconStatus === 'pause-circle-o') {
      this.stop()
      this.setState({ iconStatus: 'play-circle-o' })
    } else {
      this.start()
      this.setState({ iconStatus: 'pause-circle-o' })
    }
    if ( typeof onChange === 'function' ) {
      onChange({ hours, minute, second })
    }
  }
  render () {
    const {hours, minute, second, iconStatus} = this.state
    const { style, className, showButton } = this.props
    return (
      <section style={style} className={className}>
        {
          showButton ? <Icon style={{marginRight:'.5vw',cursor:'pointer'}} onClick={this.handleClick} type={iconStatus} /> : null
        }
        <span>{hours < 10 ? '0' + hours : hours}:</span>
        <span>{minute < 10 ? '0' + minute : minute}:</span>
        <span>{second < 10 ? '0' + second : second}</span>
      </section>
    )
  }
}

export default Timer