import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin } from 'antd'
import Helper from '../../common/Helper'
import styles from './Detail.less'

let self

class Detail extends Component {

  constructor(props) {
    super(props)

    self = this

    this.state = {
      isLoad: false,
      list: []
    }
  }

  componentDidMount() {

  }

  onClickMenu(index) {
    event.preventDefault()

    let action = index == 0 ? 'up' : 'down'

    this.props.socket.emit(action, '')
  }

  onClickBack() {
    event.preventDefault()

    this.props.socket.emit('back', '')

    self.props.router.goBack()
  }

  render() {
    return (
      <Spin size="large" spinning={this.state.isLoad}>
        <div className={styles.bg}>
          <div className={styles.menu}>
            <img src={Helper.host + self.props.params.image} className={styles.image} />
          </div>
          <div className={styles.menu_0} onClick={this.onClickMenu.bind(this, 0)}></div>
          <div className={styles.menu_1} onClick={this.onClickMenu.bind(this, 1)}></div>
          <div className={styles.back} onClick={this.onClickBack.bind(this)}></div>
        </div>
      </Spin>
    )
  }
}

export default withRouter(Detail)