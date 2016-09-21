import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin } from 'antd'
import Helper from '../../../common/Helper'
import styles from './Index.less'

let self
let page = 1
const limit = 8
let list = []

class Detail extends Component {

  constructor(props) {
    super(props)

    self = this

    this.state = {
      isLoad: false,
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
      url: '/services/xzgfhPageContentML/4',
      data: {

      },
      success: function(data) {
        list = data

        self.count()

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

  count() {
    let array = []

    let start = (page - 1) * limit
    let end = start + limit

    for(let i = 0; i < list.length; i++) {
      if(i >= start && i < end) {
        array.push(list[i])
      }
    }

    self.setState({
      sonlist: array
    })
  }

  onClickUp() {
    event.preventDefault()

    if(page > 1) {
      page--

      this.count()
    }
  }

  onClickDown() {
    event.preventDefault()

    if(page < Math.ceil(list.length / limit)) {
      page++

      this.count()
    }
  }

  onClickLeft() {
    event.preventDefault()

    this.props.socket.emit('up', '')
  }

  onClickRight() {
    event.preventDefault()

    this.props.socket.emit('down', '')
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

  render() {
    return (
      <Spin size="large" spinning={this.state.isLoad}>
	      <div className={styles.bg}>
	      	<div className={styles.list}>
	      		{
	            this.state.sonlist.map(function (item, index) {
	              return (
	              	<div key={index} className={styles.listItem} onClick={this.onClickMenu.bind(this, item.id)}>
                    {item.personname}
					        </div>
	              )
	            }.bind(this))
	          }
	      	</div>
	        <div className={styles.back} onClick={this.onClickBack.bind(this)}></div>
	      </div>
        <div className={styles.button}>
          <div className={styles.button_0} onClick={this.onClickUp.bind(this)}></div>
          <div className={styles.button_1} onClick={this.onClickDown.bind(this)}></div>
        </div>
        <div className={styles.menu_0} onClick={this.onClickLeft.bind(this)}></div>
        <div className={styles.menu_1} onClick={this.onClickRight.bind(this)}></div>
      </Spin>
    )
  }
}

export default withRouter(Detail)