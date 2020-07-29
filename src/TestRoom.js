import React from 'react';

const TestRoom = ({ currentTestRoom, exRoomName, setRoomName }) => {

  let render;
  if (currentTestRoom === exRoomName) {
    render = (
      <div>
        You are in room {currentTestRoom}
      </div>
    )
  } else {
    render = (
      <div onClick={event => setRoomName(exRoomName)}>
        <button>
          {exRoomName}
        </button>
      </div>
    )
  }
  return render;
}

export default TestRoom