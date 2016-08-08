import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styles from './Index.less'

let self

class Index extends Component {

  constructor(props) {
    super(props)

    self = this
  }

  componentDidMount() {

  }

  onClickMenu(index) {
    event.preventDefault()

    let url = '/3/' + index + '/index'

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
      <div className={styles.bg}>
        <div className={styles.menu_0} onClick={this.onClickMenu.bind(this, 0)}></div>
        <div className={styles.menu_1} onClick={this.onClickMenu.bind(this, 1)}></div>
        <div className={styles.menu_2} onClick={this.onClickMenu.bind(this, 2)}></div>
        <div className={styles.back} onClick={this.onClickBack.bind(this)}></div>
      </div>
    )
  }
}

export default withRouter(Index)