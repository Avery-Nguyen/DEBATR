import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';

const startTime = 5;

const Room = ({ roomName, token, handleLogout, currentSocket, username, roomState, currentTestRoom }) => {
  const [room, setRoom] = useState(null);
  console.log("Room -> room", room)
  const [participants, setParticipants] = useState([]);
  // console.log("Room -> participants", participants)
  const [time, setTime] = useState(startTime);
  const [active, setActive] = useState(false)
  const [turn, setTurn] = useState(0)
  const [gameCommands, setGameCommands] = useState([])

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
          currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
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

  const muted = function (username) {
    if (true) {
      room.localParticipant.audioTracks.forEach(publication => {
        // console.log(room.localParticipant.identity,'is muted');
        publication.track.disable();
      });
    }
  }

  const unMuted = function (username) {
    if (true) {
      room.localParticipant.audioTracks.forEach(publication => {
        // console.log(room.localParticipant.identity,' is unmuted');
        publication.track.enable();
      });
    }
  }

  useEffect(() => {
    if (currentSocket) {
      currentSocket.on("gameCommand", data => {
        setGameCommands(prev => [...prev, data])
      })
      currentSocket.on("mute", data => {
        muted(data)
      })
      currentSocket.on("unMute", data => {
        unMuted(data)
      })
      
    }
  }, [currentSocket]);


  
  
  // function handleTrackDisabled(track) {
  //   console.log('track -->', track);
  //   track.on('disabled', () => {
  //     return console.log('Remote Person Muted');
  //     // return true;
  //   });
  //   return console.log('Remote Person Unmuted');
  //   // return false;
  // }
 
  //   if(room){
  //     room.participants.forEach(participant => {
  //     // console.log("Room -> participant", participant)
  //       participant.tracks.forEach(publication => {
  //       // console.log("Room -> publication", publication.isSubscribed)
  //         if (publication.isSubscribed) {
  //           // console.log("Room -> publication.track", publication.track)
  //           handleTrackDisabled(publication.track);
  //         }
  //         publication.on('subscribed', handleTrackDisabled);
  //       });
  //     });
  //   }

  const toggle = function () {
    setActive(!active);
  }

  useEffect(()=>{
   let timer = null;
   if(turn < 2){
    if (active && time >= 0) {
      timer = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if (active && time < 0) {
      setTurn(prevTurn => prevTurn + 1)
      setTime(startTime);
    } else if (!active) {
      clearTimeout(timer)
    }
   } else {
    clearTimeout(timer)
   }
   

  },[active, time, turn]);
    
 
const gameCommandList = gameCommands.map(command => (
 <h2>{command}</h2>
))

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <h3>{time}</h3>
      <h3>{turn}</h3>
      <h3>{(turn === 2 && "Debate over")}</h3>
      <h3 onClick={toggle}>On/Off</h3>
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
       {gameCommandList}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;
