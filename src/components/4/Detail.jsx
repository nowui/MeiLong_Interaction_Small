import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin } from 'antd'
import Helper from '../../common/Helper'
import styles from './Detail.less'

let self
let fatherId

class Detail extends Component {

  constructor(props) {
    super(props)

    self = this

    this.state = {
      isLoad: false,
      isSelect: false,
      list: [],
      sonlist: []
    }
  }

  componentDidMount() {
    self.load()
  }

  load = function() {
    self.setState({
      isLoad: true
    })

    Helper.ajax({
      url: '/services/zggkhPageContentML/' + self.props.params.id,
      data: {

      },
      success: function(data) {
        self.setState({
          list: data
        })

        self.onClickMenu(0)

        self.onClickSubMenu(data[0].sonlist[0].id)
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

    fatherId = self.state.list[index].id

    self.setState({
      sonlist: self.state.list[index].sonlist
    })
  }

  onClickSubMenu(id) {
    event.preventDefault()

    this.props.socket.emit('open', {
      id: self.props.params.id,
      fatherId: fatherId,
      sonId: id,
      page: 1,
      limit: 2
    })

    self.setState({
      isSelect: true
    })
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
                <div key={item.id} className={styles.menuItem} onClick={this.onClickMenu.bind(this, index)}><span className={styles.menuItemFont}>{item.name}</span></div>
              )
            }.bind(this))
          }
          </div>
          <div className={styles.subMenu}>
          {
            this.state.sonlist.map(function (item, index) {
              return (
                <div key={item.id} className={styles.subMenuItem} onClick={this.onClickSubMenu.bind(this, item.id)}><span className={styles.subMenuItemFont}>{item.name}</span></div>
              )
            }.bind(this))
          }
          </div>
          {
            this.state.isSelect ?
            <div className={styles.left} onClick={this.onClickLeft.bind(this)}></div>
            :
            ''
          }
          <div className={styles.back} onClick={this.onClickBack.bind(this)}></div>
          {
            this.state.isSelect ?
            <div className={styles.right} onClick={this.onClickRight.bind(this)}></div>
            :
            ''
          }
        </div>
      </Spin>
    )
  }
}

export default withRouter(Detail)