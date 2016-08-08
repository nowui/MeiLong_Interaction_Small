import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin } from 'antd'
import Helper from '../../common/Helper'
import styles from './Index.less'

let self
let list = []

class Index extends Component {

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
    }
  }

  load = function() {
    self.setState({
      isLoad: true
    })

    Helper.ajax({
      url: '/services/whytXpml/5',
      data: {

      },
      success: function(data) {
        list = data

        self.setState({
          list: data
        })
      },
      complete: function() {
        self.setState({
          isLoad: false
        })
      }
    })
  }

  onClickMenu(item) {
    event.preventDefault()

    let url = '/4/detail/' + item.id

    this.props.socket.emit('push', url)

    self.props.router.push({
      pathname: url,
      query: {

      }
    })
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
          {
            this.state.list.map(function (item, index) {
              return (
                <img key={item.id} src={Helper.host + item.picture} className={styles.image} onClick={this.onClickMenu.bind(this, item)} />
              )
            }.bind(this))
          }
          </div>
          <div className={styles.back} onClick={this.onClickBack.bind(this)}></div>
        </div>
      </Spin>
    )
  }
}

export default withRouter(Index)