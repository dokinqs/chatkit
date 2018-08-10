import React, { Component } from 'react'

export default class TypingIndicator extends Component {
  render() {
    const styles = {
      div: {
        height: 40
      }
    }
    if (this.props.usersWhoAreTyping.length > 0) {
      return (
        <div style={styles.div}>
          {`${this.props.usersWhoAreTyping
            .slice(0, 2)
            .join(' and ')} is typing`}
        </div>
      )
    }
    return <div style={styles.div}/>
  }
}