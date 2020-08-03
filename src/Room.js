import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';


const Room = ({ roomName, token, handleLogout, currentSocket, username, roomState, currentTestRoom }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  // console.log("Room -> active", active)
  // const [turn, setTurn] = useState(0)

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    console.log('RoomName before video.connect', roomName)
    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  useEffect(() => {
    if (currentSocket) {
      currentSocket.on("gameCommand", data => {
        setGameCommands(data)
      })
      currentSocket.on("mute", data => {
        // console.log('Room mute request', room)
        if (room) {
          if (username === data.mute) {
            room.localParticipant.audioTracks.forEach(publication => {
              console.log(room.localParticipant.identity,'is muted');
              publication.track.disable();
            });
          }

          // Start Timer
          if (!data.intermission) {
            setActive(true)
            setTime(data.timer);
          } else {
            // setTime(data.timer)
          }
        }

      })
      currentSocket.on("unMute", data => {
        // console.log('Room UNmute request', room)
        if (room) {
          if(username === data){
            room.localParticipant.audioTracks.forEach(publication => {
              console.log(room.localParticipant.identity,' is unmuted');
              publication.track.enable();
            });
          }
          
        }
      })
    }
  }, [currentSocket, room, username]);



  // const toggle = function () {
  //   setActive(!active);
  // }

  useEffect(() => {
    let timer = null;
      if (active && time > 0) {
        timer = setTimeout(() => {
          setTime((time - 0.1).toFixed(1))
        }, 100);
      } else if (time <= 0) {
        // console.log('time below 0')
        // // setTurn(prevTurn => prevTurn + 1)
        // setActive(false);
        console.log('calling clearTimeout and setActive false')
        clearTimeout(timer)
        // setActive(false);
        // setTime(startTime);
      }
    } , [active, time]);


  // const gameCommandList = gameCommands.map(command => (
  //   <h2>{command}</h2>
  // ))

  return (
    <div className="room" style={{width: "100%", display:'flex'}}>
      <h2>Room: {roomName}</h2>
      <h3>{time}</h3>
     
      {/* <h3>{message}</h3> */}
      <button onClick={handleLogout}>Log out</button>
      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
            ''
          )}
      </div>
      <div>
        {gameCommands}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants" style={{width: "40%"}}>{remoteParticipants}</div>
    </div>
  );
};

export default Room;
