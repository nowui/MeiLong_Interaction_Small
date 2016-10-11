import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin } from 'antd'
import Helper from '../../../common/Helper'
import styles from './Index.less'

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
    this.load()
  }

  load = function() {
    self.setState({
      isLoad: true
    })

    Helper.ajax({
      url: '/services/djlhsgkML',
      data: {

      },
      success: function(data) {
        self.setState({
          list: data
        })

        if(data.length > 0) {
          self.onClickMenu(data[0].id)
        }
      },
      complete: function() {
        self.setState({
          isLoad: false
        })
      }
    })
  }

  onClickMenu(index) {
    event.preventDefault()

    this.props.socket.emit('open', index)
  }

  onClickBack() {
    event.preventDefault()

    //this.props.socket.emit('back', '')

    this.props.socket.emit('push', '/3/index')

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
	        <div className={styles.back} onClick={this.onClickBack.bind(this)}></div>
          <div className={styles.list}>
            {
              this.state.list.map(function (item, index) {
                return (
                  <div key={index} className={styles.menu} onClick={this.onClickMenu.bind(this, item.id)}>{item.title}</div>
                )
              }.bind(this))
            }
          </div>
	        <div className={styles.tese}></div>
          <div className={styles.menu_0} onClick={this.onClickLeft.bind(this)}></div>
          <div className={styles.menu_1} onClick={this.onClickRight.bind(this)}></div>
	      </div>
      </Spin>
    )
  }
}

export default withRouter(Detail)