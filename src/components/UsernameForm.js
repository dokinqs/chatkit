import React, { Component } from 'react'

class UsernameForm extends Component {
 constructor(props) {
   super(props)
   this.state = {
     username: ''
   }
   this.onChange = this.onChange.bind(this)
   this._onSubmit = this._onSubmit.bind(this)
 }

  onChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  _onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  render() {
    return (
      <div>
        <h2>Enter Username</h2>
        <form onSubmit={this._onSubmit}>
          <input
            type="text"
            placeholder="username"
            onChange={this.onChange}
          />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

 export default UsernameForm