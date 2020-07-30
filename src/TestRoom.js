import React from 'react';

const TestRoom = ({ currentTestRoom, exRoomName, objProps, setRoomName }) => {

  // ObjProps: name,host,contender,spectators,topic,
  // hostArg,contenderArg,status,hostPoints,contenderPoints,messages
  console.log(`ObjProps: ${Object.keys(objProps)}`)
  const totalSpots = () => {
    let i = 0;
    if (objProps.host) {
      console.log('there is a host')
      i++
    }
    if (objProps.contender) {
      i++
    }
    return i
  }
  totalSpots();

  let render;
  if (currentTestRoom === exRoomName) {
    render = (
      <div>
        You are in room {currentTestRoom} - Topic is {objProps.topic} {objProps.hostArg}. Currently {totalSpots()} person in room.
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