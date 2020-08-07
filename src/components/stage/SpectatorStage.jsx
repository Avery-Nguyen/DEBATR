import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Participant from '../../Participant'
import { useStore } from '../../Store'
import Video from 'twilio-video';

const startTime = 5.0;

export default function SpectatorStage({ activeRoomState }) {
  const [state, dispatch] = useStore();
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  // console.log("SpectatorStage -> participants state", participants)
  const [time, setTime] = useState(startTime);
  const [active, setActive] = useState(false)
  const [gameCommands, setGameCommands] = useState([])


  // GameCommand / mute / unmute listeners
  useEffect(() => {
    if (state.currentSocket) {
      state.currentSocket.on("gameCommand", data => {
        setGameCommands(data)
      })

      state.currentSocket.on("gameOver", data => {

        state.currentSocket.emit('leaveRoomSpectator', {
          roomName : state.currentRoom,
          userName : state.username
        })

        dispatch({ type: 'SET_TOKEN', payload: null })
        dispatch({ type: 'SET_VISUAL_MODE', payload: "LOBBY" })
        dispatch({ type: 'SET_CURRENT_ROOM', payload: null })
        disableMedia()
      })

      state.currentSocket.on("disconnect", data => {
        dispatch({ type: 'SET_TOKEN', payload: null })
        dispatch({ type: 'SET_VISUAL_MODE', payload: "CONNECTION_ERROR" })
        dispatch({ type: 'SET_CURRENT_ROOM', payload: null })
        disableMedia()
      })

      state.currentSocket.on("mute", data => {
        // console.log('Room mute request', room)
        if (room) {
          // Start Timer
          if (!data.intermission) {
            setActive(true)
            setTime(data.timer);
          } else {
            setTime(data.timer)
          }
        }
      })
    }

    return (() => {
      if (state.currentSocket) {
        state.currentSocket.off("mute")
        state.currentSocket.off("unMute")
        state.currentSocket.off("disconnect")
        state.currentSocket.off("gameOver")
        state.currentSocket.off("leaveStage")
      }
    })

  }, [state.currentSocket, state.currentRoom, state.username, room]);

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    }
      ;
    Video.connect(state.token, {
      name: state.currentRoom,
      audio: false,
      video: false
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.participants.forEach(participantConnected);
      room.on('participantDisconnected', participantDisconnected);
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

  // console.log("SpectatorStage -> activeRoomState.host", activeRoomState.host)
  // console.log("SpectatorStage -> activeRoomState.contender", activeRoomState.contender)

  const remoteParticipants = participants.filter(p => ((p.identity === activeRoomState.host) || (p.identity === activeRoomState.contender))).map((participant) => {
    return (<Participant key={participant.sid} participant={participant} />)
  });

  let participant1;
  let participant2;
  if (remoteParticipants.length > 1) {
    participant1 = remoteParticipants[0].identity
    participant2 = remoteParticipants[1].identity
  }

  // console.log("from sepectator stage ---> rendered components", remoteParticipants);
  function disableMedia() {

    if (room) {
      room.on('disconnected', room => {
        // Detach the local media elements
        room.localParticipant.tracks.forEach(publication => {
          const attachedElements = publication.track.detach();
          attachedElements.forEach(element => element.remove());
        });
      });
      // To disconnect from a Room
      room.disconnect();
    }


  }

  const handleLogout = function () {
    state.currentSocket.emit('leaveRoomSpectator', {
      roomName: state.currentRoom,
      userName: state.username
    })

    disableMedia()

    dispatch({ type: 'SET_TOKEN', payload: null })
    dispatch({ type: 'SET_VISUAL_MODE', payload: "LOBBY" })
    dispatch({ type: 'SET_CURRENT_ROOM', payload: null })
  }

  useEffect(() => {
    let timer = null;
    if (active && time > 0) {
      timer = setTimeout(() => {
        setTime((time - 0.1).toFixed(1))
      }, 100);
    } else if (time <= 0) {

      console.log('calling clearTimeout and setActive false')
      clearTimeout(timer)

    }
  }, [active, time]);


  return (
    <main>
      <body id='stage' style={{ height: '100%', zIndex: '1' }}>
        <div class="w3-content" >
          <header class="w3-panel w3-center w3-opacity" style={{ backgroundColor: "rgb(64,81,182)" }}>
            <h1 class="w3-xlarge">Debate Topic - {activeRoomState.topic}</h1>
          </header>
          <div class="w3-row-padding w3-grayscale">
            <div class="w3-half" style={{ backgroundColor: "rgb(64,81,182)", width: "100%", display: 'flex', justifyContent: 'space-between' }}>
              <div class='participants'>
                {/* LOCAL PARTICIPANT - DON'T RENDER */}
                {room ? (
                  remoteParticipants[0]
                ) : (
                    ''
                  )}
                <div class='userAndStance' style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: 'white', justifySelf: 'right' }}>{participant1}</p>
                  <p style={{ color: 'white' }}>{(participant1 === activeRoomState.host) ? "Agree" : "Disagree"}</p>
                </div>
              </div>
              <div id='stage-details' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <h1 style={{ color: 'white' }}>{gameCommands}</h1>
                <h4 style={{ color: 'white' }}>Time Remaining: {time}</h4>
                <h5 style={{ color: 'white' }}>'BatRs watching': {participants.length - 1}</h5>
                
              </div>
              <div class='participants'>
                {remoteParticipants[1]}
                <div class='userAndStance' style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: 'white' }}>{(participant1 === activeRoomState.host) ? "Disagree" : "Agree"}</p>
                  <p style={{ color: 'white' }}>{participant2}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>

          </div>
          <div id="game-log" class="info-box">
          <span><b>Welcome to the Chatroom!</b> Debate starts soon.</span>

          </div>


          <footer style={{ backgroundColor: "rgb(64,81,182)", display: 'flex' }}>
            <Button color="black" style={{ border: '2px solid white', justifySelf: 'left', backgroundColor: 'red', color: 'white' }} onClick={handleLogout}>Return To Lobby</Button>
          </footer>
        </div>
      </body>
    </main>
  );
}