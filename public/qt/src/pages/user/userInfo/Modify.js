import React,{Component} from 'react'
import { message, Button, Input, Select, Radio, Cascader  } from 'antd'
import moment from 'moment'
import {UserService} from '../../../lib'
import schoolList from '../../../asset/chinaUniversityList'

const Option = Select.Option;
const RadioGroup = Radio.Group;
const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

class Modify extends Component {
  state = {
    nickName: '',
    gender: null,
    address: '',
    education: null,
    school: [],
    expecteCompany: '',
    graduateTime: null
  }
  componentWillMount () {
    this.resetState(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.resetState(nextProps)
  }
  setSchoolCascader = () => {
    let schoolCascader = []
    schoolList.forEach(item => {
      let city = {
        value: item.id,
        label: item.name,
        children: this.setCitySchool(item.school)
      }
      schoolCascader.push(city)
    })
    return schoolCascader
  }
  setCitySchool = schools => {
    let citySchool = []
    schools.forEach(e => {
      citySchool.push({
        value: e.id,
        label: e.name
      })
    })
    return citySchool
  }
  resetState = props => {
    const {nickName, gender, address, education, school, expecteCompany, graduateTime} = props._user
    this.setState({nickName, gender, address, education, school, expecteCompany, graduateTime})
  }
  checkNickName = () => {
    const {nickName} = this.state
    if (nickName === '') {
      return {success: false, message: '请输入你的昵称！'}
    }
    if ( regCn.test(nickName) || regEn.test(nickName) ) {
      return {success: false, message: '昵称不应该包含特殊字符！'}
    }
    return {success: true, message: '昵称验证成功！'}
  }
  onChangeNickName = e => this.setState({ nickName: e.target.value })
  onChangeAddress = e => this.setState({ address: e.target.value })
  onChangeGender = e => this.setState({ gender: e.target.value })
  onChangeExpecteCompany = e => this.setState({ expecteCompany: e.target.value })
  onChangeEducation = value => this.setState({ education: value })
  onChangeGraduateTime = value => this.setState({ graduateTime: value })
  onChangeSchool = value => this.setState({ school: value })
  getGraduateTimeArr = () => {
    const currentYear = (new Date()).getFullYear()
    const maxYear = currentYear + 4
    const minYear = 1981
    let yearArr = []
    for (let i = minYear; i <= maxYear; i++) {
      yearArr.push(i)
    }
    return yearArr
  }
  handleSave = () => {
    document.getElementById('showUserInfo').style.display = 'block'
    document.getElementById('modifyUserInfo').style.display = 'none'
  }
  handleSubmit = async () => {
    const checkRes = this.checkNickName()
    if (checkRes.success) {
      const {nickName, gender, address, education, school, expecteCompany, graduateTime} = this.state
      const newUser = {nickName, gender, address, education, school, expecteCompany, graduateTime}
      const loading = message.loading('正在提交你的数据...', 0)
      const result = (await UserService.modify(newUser)).data
      loading()
      if ( result.success ) {
        message.success(result.message)
        this.props.modifyUser(newUser)
        const oldReduxUser = this.props.user
        if ( oldReduxUser.nickName !== nickName ) {
          this.props.actions.modifyUser( nickName, oldReduxUser.avatar )
        }
        this.handleSave()
      } else {
        message.error(result.message)
      }
    } else {
      message.warn(checkRes.message)
    }
  }
  render () {
    const {nickName, gender, address, education, graduateTime, school, expecteCompany} = this.state
    console.log(education)
    const {_user} = this.props
    return (
      <section id="modifyUserInfo" className="userInfo-right-info-content userInfo-right-info-modify">
        <dl>
          <dt>我的昵称</dt>
          <dd>
            <Input style={{width: '10vw'}} onChange={this.onChangeNickName} value={nickName} placeholder="请输入昵称"/>
          </dd>
        </dl>
        <dl>
          <dt>我的邮箱</dt>
          <dd>{_user.eMail}</dd>
        </dl>
        <dl>
          <dt>加入日期</dt>
          <dd>{moment(_user.createAt).format('YYYY-MM-DD HH:mm:ss')}</dd>
        </dl>
        <dl>
          <dt>我的性别</dt>
          <dd>
            <RadioGroup style={{width: '10vw'}} onChange = {this.onChangeGender} value={gender}>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </RadioGroup>
          </dd>
        </dl>
        <dl>
          <dt>居住地</dt>
          <dd><Input style={{width: '10vw'}} onChange={this.onChangeAddress} value={address} placeholder="请输入居住地地址"/></dd>
        </dl>
        <dl>
          <dt>学历</dt>
          <dd>
            <Select
              showSearch
              style={{width: '10vw'}}
              placeholder="请选择学历"
              optionFilterProp="children"
              value={education}
              onChange={this.onChangeEducation}>
              <Option value={8}>博士后</Option>
              <Option value={7}>博士</Option>
              <Option value={6}>硕士</Option>
              <Option value={5}>本科</Option>
              <Option value={4}>专科</Option>
              <Option value={3}>高中</Option>
              <Option value={2}>初中</Option>
              <Option value={1}>小学</Option>
            </Select>
          </dd>
        </dl>
        <dl>
          <dt>毕业年份</dt>
          <dd>
            <Select
              showSearch
              style={{width: '10vw'}}
              placeholder="请选择毕业年份"
              optionFilterProp="children"
              value={graduateTime}
              onChange={this.onChangeGraduateTime}>
              {
                this.getGraduateTimeArr().map((e, index) => <Option key={index} value={e}>{e}</Option>)
              }
            </Select>
          </dd>
        </dl>
        <dl>
          <dt>我的学校</dt>
          <dd>
            <Cascader 
              value={school} 
              style={{width: '10vw'}}
              options={this.setSchoolCascader()}
              placeholder="请选择你的大学"
              onChange={this.onChangeSchool} />
          </dd>
        </dl>
        <dl>
          <dt>我的目标公司</dt>
          <dd><Input style={{width: '10vw'}} onChange={this.onChangeExpecteCompany} value={expecteCompany} placeholder="请输入你想去的公司"/></dd>
        </dl>
        <dl>
          <div className="modify-userInfo-button">
            <Button onClick={this.handleSave}>取消</Button>
            <Button type="primary" onClick={this.handleSubmit}>保存</Button>
          </div>
        </dl>
      </section>
    )
  }
}

export default Modify