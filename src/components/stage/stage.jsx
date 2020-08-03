import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import VideoChat from '../../VideoChat.js';
import Button from '@material-ui/core/Button';
import Participant from '../../Participant'
import {useStore} from '../../Store'
import Video from 'twilio-video';

export default function Stage() {
  const [state, dispatch] = useStore();
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  console.log("Stage -> participants", participants)

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    Video.connect(state.token, {
      name: state.currentRoom
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
  }, [state.currentRoom, state.token]);


  const remoteParticipants = participants.map(participant => (
    
    <Participant key={participant.sid} participant={participant} />
  ));

  const handleLogout = function () {
    dispatch({type: 'SET_TOKEN', payload: null})
  }
  return (
    <body id='stage' style={{height: '100%', zIndex:'1'}}>
      <div class="w3-content" >
        <header class="w3-panel w3-center w3-opacity" style={{ backgroundColor: "rgb(64,81,182)" }}>
          <h1 class="w3-xlarge">Debate Topic - Nudity API</h1>
        </header>
        <div class="w3-row-padding w3-grayscale">
          <div class="w3-half" style={{ backgroundColor: "rgb(64,81,182)", width: "100%", display: 'flex', justifyContent: 'space-between' }}>
            <div class='participants'>
            {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
            ''
          )}
            <div class='userAndStance' style={{display: 'flex', justifyContent:'space-between'}}>
            <p style={{ color: 'white', justifySelf: 'right' }}>User1</p>
            <p style={{ color: 'white'}}>Against</p>
            </div>
            </div>
            <div id='stage-details' style={{ display: 'flex', flexDirection:'column', justifyContent: 'space-around' }}>
              <h1 style={{ color: 'white' }}>User1 Speaking</h1>
              <h4 style={{ color: 'white' }}>Time Remaining: 45 seconds</h4>
              <br />
              <Button color="black" style={{ border: '2px solid black', justifySelf: 'bottom', backgroundColor: 'white' }}>Good Point!</Button>
            </div>
            <div class='participants'>
            {remoteParticipants}
            <div class='userAndStance' style={{display: 'flex', justifyContent:'space-between'}}>
            <p style={{ color: 'white'}}>For</p>
            <p style={{ color: 'white'}}>Andy Lindsay</p>
            </div>
            </div>
          </div>
        </div>
        <footer style={{ backgroundColor: "rgb(64,81,182)", display:'flex' }}>
        <Button color="black" style={{ border: '2px solid white', justifySelf: 'left', backgroundColor: 'red', color: 'white' }} onClick={handleLogout}>Leave Stage?</Button>
        </footer>
      </div>
    </body>
  );
}