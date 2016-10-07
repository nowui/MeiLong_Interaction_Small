import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styles from './Index.less'

let self

class Detail extends Component {

  constructor(props) {
    super(props)

    self = this
  }

  componentDidMount() {

  }

  onClickMenu(index) {
    event.preventDefault()

    //this.props.socket.emit('open', index)
  }

  onClickBack() {
    event.preventDefault()

    //this.props.socket.emit('back', '')

    this.props.socket.emit('push', '/3/index')

    self.props.router.goBack()
  }

  render() {
    return (
      <div className={styles.bg}>
        <div className={styles.back} onClick={this.onClickBack.bind(this)}></div>
        <div className={styles.menu_0} onClick={this.onClickMenu.bind(this, 0)}></div>
        <div className={styles.menu_1} onClick={this.onClickMenu.bind(this, 1)}></div>
      </div>
    )
  }
}

export default withRouter(Detail)