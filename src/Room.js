import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';

const startTime = 5;

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  // console.log("Room -> room", room)
  const [participants, setParticipants] = useState([]);
  // console.log("Room -> participants", participants)
  const [time, setTime] = useState(startTime);
  const [active, setActive] = useState(false)

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

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

  const toggleMute = function () {
    // console.log(room.localParticipant);
    room.localParticipant.audioTracks.forEach(publication => {
      if (publication.track.isEnabled) {
        //set
        // console.log('muted');
        return publication.track.disable();
      } else {
        // console.log('unmuted');
        return publication.track.enable();
      }
    });
  }

  function handleTrackDisabled(track) {
    console.log('track -->', track);
    track.on('disabled', () => {
      return console.log('Remote Person Muted');
      // return true;
    });
    return console.log('Remote Person Unmuted');
    // return false;
  }
 
    if(room){
      room.participants.forEach(participant => {
      // console.log("Room -> participant", participant)
        participant.tracks.forEach(publication => {
        // console.log("Room -> publication", publication.isSubscribed)
          if (publication.isSubscribed) {
            // console.log("Room -> publication.track", publication.track)
            handleTrackDisabled(publication.track);
          }
          publication.on('subscribed', handleTrackDisabled);
        });
      });
    }

  const toggle = function () {
    setActive(!active);
  }

  useEffect(()=>{
    if(active && time >= 0) {
      setTimeout(()=>{
        setTime(time - 1);
      }, 1000)
    } else {
      setTime(startTime);
    };
  },[active, time]);
    
 
      




  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <h3>{time}</h3>
      <h3 onClick={toggle}>On/Off</h3>
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
      <div onClick={() => toggleMute()}>mute</div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;
