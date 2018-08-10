import React, { Component } from 'react'

export default class MessageList extends Component {
  render() {
    const styles = {
      container: {
        overflowY: 'scroll',
        flex: 1
      },
      ul: {
        listStyle: 'none'
      },
      li: {
        marginTop: 13,
        marginBottom: 13
      },
      senderUsername: {
        fontWeight: 'bold'
      },
      message: { 
        fontSize: 15 
      }
    }
    return (
      <div style={styles.container}>
        <ul style={styles.ul}>
          {this.props.messages.map((message, index) => (
            <li key={index} style={styles.li}>
              <div style={styles.senderUsername}>
                {message.senderId}
              </div>
              <p style={styles.message}>
                {message.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}