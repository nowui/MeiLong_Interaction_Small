import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin } from 'antd'
import Helper from '../../common/Helper'
import styles from './Index.less'

let self
let page = 1
const limit = 4
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
      url: '/services/whytXpml/5-' + page + '-' + limit,
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

  onClickUp() {
    event.preventDefault()

    if(page > 1) {
      page--

      this.load()
    }
  }

  onClickDown() {
    event.preventDefault()

    console.log(Math.ceil(list.length / limit))

    if(list.length == limit) {
      page++

      this.load()
    }
  }

  onClickBack() {
    event.preventDefault()

    //this.props.socket.emit('back', '')

    this.props.socket.emit('push', '/index')

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
          <div className={styles.button}>
            <div className={styles.button_0} onClick={this.onClickUp.bind(this)}></div>
            <div className={styles.button_1} onClick={this.onClickDown.bind(this)}></div>
          </div>
          <div className={styles.back} onClick={this.onClickBack.bind(this)}></div>
        </div>
      </Spin>
    )
  }
}

export default withRouter(Index)