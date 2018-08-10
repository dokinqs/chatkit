import React, { Component } from 'react'
import Message from './Message'

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
          {this.props.messages.map((message, index) => {
            return (
              <Message key={index} 
                      styles={styles}
                      username={message.senderId} 
                      text={message.text} />
            )
          })}
        </ul>
      </div>
    )
  }
}