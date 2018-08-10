import React from 'react'

export default function Message (props) {
    return (
      <li style={props.styles.li}>
        <div style={props.styles.senderUsername}>
          {props.username}
        </div>
        <p style={props.styles.message}>
          {props.text}
        </p>
      </li> 
    )
}
