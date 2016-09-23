import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin } from 'antd'
import Helper from '../../../common/Helper'
import styles from './Index.less'

let self
let list = []

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
    if(list.length == 0) {
      self.load()
    } else {
      self.setState({
        list: list
      })

      self.onClickMenu(list[0].id)
    }
  }

  load = function() {
    self.setState({
      isLoad: true
    })

    Helper.ajax({
      url: '/services/xzgfhPageContentML/2',
      data: {

      },
      success: function(data) {
        list = data

        self.setState({
          list: data
        })

        self.onClickMenu(self.state.list[0].id)
      },
      complete: function() {
        self.setState({
          isLoad: false
        })
      }
    })
  }

  onClickMenu(id) {
    event.preventDefault()

    this.props.socket.emit('open', id)
  }

  onClickBack() {
    event.preventDefault()

    this.props.socket.emit('back', '')

    self.props.router.goBack()
  }

  onClickLeft() {
    event.preventDefault()

    this.props.socket.emit('up', '')
  }

  onClickRight() {
    event.preventDefault()

    this.props.socket.emit('down', '')
  }

  render() {
    return (
      <Spin size="large" spinning={this.state.isLoad}>
        <div className={styles.bg}>
          <div className={styles.menu}>
            {
              this.state.list.map(function (item, index) {
                return (
                  <div key={index} className={styles.menuItem} onClick={this.onClickMenu.bind(this, item.id)}>
                    <div className={styles.ordernum}>{item.ordernum}号</div>
                    <div className={styles.personname}>{item.personname}</div>
                  </div>
                )
              }.bind(this))
            }
          </div>
          <div className={styles.back} onClick={this.onClickBack.bind(this)}></div>
        </div>
        <div className={styles.menu_0} onClick={this.onClickLeft.bind(this)}></div>
        <div className={styles.menu_1} onClick={this.onClickRight.bind(this)}></div>
      </Spin>
    )
  }
}

export default withRouter(Detail)