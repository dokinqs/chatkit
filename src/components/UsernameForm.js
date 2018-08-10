import React, { Component } from 'react'

export default class UsernameForm extends Component {
 constructor(props) {
   super(props)
   this.state = {
     username: ''
   }
   this._onChange = this._onChange.bind(this)
   this._onSubmit = this._onSubmit.bind(this)
 }

  _onChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  _onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  render() {
    const styles = {
      div: {
        textAlign: 'center',
        background: '#A7BFE8',
        color: 'white',
        margin: '30px 10vw',
        padding: '10vw'
      },
      h2: {
        fontSize: 36,
        fontFamily: 'Roboto',
        textAlign: 'center'
      },
      input: {
        padding: 10,
        margin: 10,
        fontSize: 20
      },
      button: {
        color: 'white',
        background: '#6190E8',
        padding: 10,
        margin: 10,
        fontSize: '20px'
      }
    }
    return (
      <div style={styles.div}>
        <h2 style={styles.h2}>Join Chat</h2>
        <form onSubmit={this._onSubmit}>
          <input
            type="text"
            placeholder="username"
            onChange={this._onChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
    )
  }
}