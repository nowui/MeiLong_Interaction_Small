import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin } from 'antd'
import Helper from '../../../common/Helper'
import styles from './Index.less'

let self
let list = []
let count

class Detail extends Component {

  constructor(props) {
    super(props)

    self = this

    this.state = {
      isLoad: false,
      list: []
    }

    count = -1
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
      url: '/services/xzgfhPageContentML/4',
      data: {

      },
      success: function(data) {
        list = data

        self.setState({
          list: data
        })

        self.onClickMenu(data[0].id)
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

  render() {
    return (
      <Spin size="large" spinning={this.state.isLoad}>
	      <div className={styles.bg}>
	      	<div className={styles.menu}>
	      		{
	            this.state.list.map(function (item, index) {
	            	if(index % 11 == 0) {
	            		count++
	            	}
	              return (
	              	<div key={index} >
	              	{
					            count % 2 == 0 ?
			              	<div className={styles.menuItem0}>
			              			<div className={styles.menuItemFont0} onClick={this.onClickMenu.bind(this, item.id)}>{item.personname}</div>
			              	</div>
			              	:
			              	<div className={styles.menuItem1}>
			              			<div className={styles.menuItemFont1} onClick={this.onClickMenu.bind(this, item.id)}>{item.personname}</div>
			              	</div>
					        }
					        </div>
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