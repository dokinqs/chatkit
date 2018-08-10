import React, { Component } from 'react'

export default class SendMessageForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this._onChange = this._onChange.bind(this)
    this._onSubmit = this._onSubmit.bind(this)
  }

  _onChange(e) {
    this.setState({
      text: e.target.value
    })
    // 
    if (this.props.onChange) {
      this.props.onChange()
    }
  }

  _onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.text)
    //
    this.setState({
      text: ''
    })
  }

  render() {
    const styles = {
      container: {
        paddingTop: 20,
        borderTop: '1px #557788 solid'
      },
      form: {
        display: 'flex'
      },
      input: {
        flex: 1,
        fontSize: 16,
        color: 'inherit',
        background: 'none',
        outline: '4px solid #A7BFE8',
        border: 'none',
        padding: 20
      }
    }
    return (
      <div style={styles.container}>
        <div>
          <form onSubmit={this._onSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Type message and hit Enter"
              onChange={this._onChange}
              style={styles.input}
              value={this.state.text}
            />
          </form>
        </div>
      </div>
    )
  }
}
