import React, { useState } from 'react';

const TestRoom = ({ currentTestRoom, exRoomName, objProps, setRoomName, sendMessageHandler }) => {

  const [ message, setMessage ] = useState('')
  // ObjProps: name,host,contender,spectators,topic,
  // hostArg,contenderArg,status,hostPoints,contenderPoints,messages
  // console.log(`ObjProps: ${Object.keys(objProps)}`)
  const totalSpots = () => {
    let i = 0;
    if (objProps.host) {
      i++
    }
    if (objProps.contender) {
      i++
    }
    return i
  }
  totalSpots();


  const messages = objProps.messages.map(message => {
    return (<p>Message from {message.fromUser} - {message.message} </p>)
  })

  let render;
  if (currentTestRoom === exRoomName) {
    render = (
      <div>
        You are in room {currentTestRoom} - Topic is {objProps.topic} {objProps.hostArg}. Currently {totalSpots()} person in room.
        {messages}
        <input
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={(event) => {
          sendMessageHandler(message)
        }}>
          Send Message
          </button>
      </div>
    )
  } else {
    render = (
      <div onClick={event => setRoomName(exRoomName)}>
        <button>
          {exRoomName} - {totalSpots()}/2
        </button>
      </div>
    )
  }
  return render;
}

export default TestRoom