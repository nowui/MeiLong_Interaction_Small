import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styles from './Detail.less'

let self

class Detail extends Component {

  constructor(props) {
    super(props)

    self = this
  }

  componentDidMount() {
    this.props.socket.emit('open', {
      id: self.props.params.id,
      index: 0
    })
  }

  onClickMenu(index) {
    event.preventDefault()

    this.props.socket.emit('open', {
      id: self.props.params.id,
      index: index
    })
  }

  onClickBack() {
    event.preventDefault()

    //this.props.socket.emit('back', '')

    self.props.router.goBack()
  }

  render() {
    return (
      <div className={styles.bg}>
        <div className={styles.menu_0} onClick={this.onClickMenu.bind(this, 0)}></div>
        <div className={styles.menu_1} onClick={this.onClickMenu.bind(this, 1)}></div>
        <div className={styles.menu_2} onClick={this.onClickMenu.bind(this, 2)}></div>
        <div className={styles.menu_3} onClick={this.onClickMenu.bind(this, 3)}></div>
        <div className={styles.menu_4} onClick={this.onClickMenu.bind(this, 4)}></div>
        <div className={styles.menu_5} onClick={this.onClickMenu.bind(this, 5)}></div>
        <div className={styles.menu_6} onClick={this.onClickMenu.bind(this, 6)}></div>
        <div className={styles.menu_7} onClick={this.onClickMenu.bind(this, 7)}></div>
        <div className={styles.menu_8} onClick={this.onClickMenu.bind(this, 8)}></div>
        <div className={styles.menu_9} onClick={this.onClickMenu.bind(this, 9)}></div>
        <div className={styles.menu_10} onClick={this.onClickMenu.bind(this, 10)}></div>
        <div className={styles.menu_11} onClick={this.onClickMenu.bind(this, 11)}></div>
        <div className={styles.menu_12} onClick={this.onClickMenu.bind(this, 12)}></div>
        <div className={styles.menu_13} onClick={this.onClickMenu.bind(this, 13)}></div>
        <div className={styles.back} onClick={this.onClickBack.bind(this)}></div>
      </div>
    )
  }
}

export default withRouter(Detail)