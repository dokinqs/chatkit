import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'
export default class ChatScreen extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.sendTypingEvent = this.sendTypingEvent.bind(this)
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({
        roomId: this.state.currentRoom.id
      })
      .catch(error => console.log('error: ', error))
  }

  //
  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    })
  }

  componentDidMount () {
      const chatManager = new Chatkit.ChatManager({
        instanceLocator: 'v1:us1:8ef7f197-95d7-41db-9981-3e492b421d50',
        userId: this.props.currentUsername,
        tokenProvider: new Chatkit.TokenProvider({
          url: 'http://localhost:3001/authenticate',
        }),
      })
    
      chatManager
        .connect()
        .then(currentUser => {
          this.setState({ currentUser })
          return currentUser.subscribeToRoom({
            roomId: 13476711,
            messageLimit: 100,
            hooks: {
              onNewMessage: message => {
                this.setState({
                  messages: [...this.state.messages, message],
                })
              },
              onUserStartedTyping: user => {
                this.setState({
                  usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]                  
                })
              },
              onUserStoppedTyping: user => {
                this.setState({
                  usersWhoAreTyping: this.state.usersWhoAreTyping.filter( username => username!== user.name)
                })
              }
            },
            onUserCameOnline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate()
          })
        })
        .then(currentRoom => {
          this.setState({ currentRoom })
        })
        .catch(error => console.error('error', error))
    }
    
  render() {
    const styles = {
      container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      },
      chatContainer: {
        display: 'flex',
        flex: 1
      },
      whosOnlineListContainer: {
        flex: 'none',
        height: '100vh',
        overflowY: 'scroll',
        width: '180px',
        fontSize: '16px',
        padding: 20,
        backgroundColor: '#2c303b',
        color: 'white'
      },
      chatListContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        width: '85%'
      }
    }
    return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <h2>Users</h2>
            <br />
            <WhosOnlineList 
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
            />
          </aside>
          <section style={styles.chatListContainer}>
            <h1>Messages</h1>
            <MessageList
              messages={this.state.messages}
              style={styles.chatList}
            />        
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
            <SendMessageForm onSubmit={this.sendMessage} />
          </section>
        </div>
      </div>
    )
  }
}