import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import io from "socket.io-client/socket.io"

let self
let socket

class Main extends Component {

  constructor(props) {
    super(props)

    self = this

    socket = io('http://www.herigbit.com:3000',{jsonp: false})

    socket.emit('login', 'small')
  }

  componentDidMount() {
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
        socket: socket
     })
    )
    return (
      <div>{childrenWithProps}</div>
    )
  }
}

export default withRouter(Main)