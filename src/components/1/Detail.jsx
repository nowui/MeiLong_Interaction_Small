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
      object: {
        sonlist: []
      }
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
      url: '/services/djxmhPageContentML/' + self.props.params.id,
      data: {

      },
      success: function(data) {
        self.setState({
          object: data
        })

        if(data.sonlist.length > 0) {
          self.onClickSubMenu(data.sonlist[0].id)
        }
      },
      complete: function() {
        self.setState({
          isLoad: false
        })
      }
    })
  }

  onClickSubMenu(id) {
    console.log({
      id: self.props.params.id,
      sId: id,
      page: 1,
      limit: 2
    })

    this.props.socket.emit('open', {
      id: self.props.params.id,
      sId: id,
      page: 1,
      limit: 2
    })

    self.setState({
      isSelect: true
    })
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
            <img src={Helper.host + this.state.object.picture} className={styles.image} />
          </div>
          <div className={styles.title}>
            {this.state.object.name}
          </div>
          <div className={styles.list}>
            {
              this.state.object.sonlist.map(function (item, index) {
                return (
                  <div key={index} className={styles.listItem} onClick={this.onClickSubMenu.bind(this, item.id)}>{item.name}</div>
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

export default withRouter(Detail)