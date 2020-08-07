import React, { useState, useEffect } from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Participant from '../../Participant'
import TextField from '@material-ui/core/TextField';
import { useStore } from '../../Store'
import Video from 'twilio-video';
import './stage.css';

const startTime = 5.0;

export default function Stage({ activeRoomState }) {
  const [state, dispatch] = useStore();
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  // console.log("Debater Stage -> state participants", participants)
  const [time, setTime] = useState(startTime);
  const [active, setActive] = useState(false)
  const [gameCommands, setGameCommands] = useState("Welcome to the Debate")
  const [readyState, setReadyState] = useState(false)
  const [gameState, setGameState] = useState(false)
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState("")
  const [mutedUsers, setMutedUsers] = useState([])
  console.log("Stage -> mutedUsers", mutedUsers)


  // GameCommand / mute / unmute listeners
  useEffect(() => {
    if (state.currentSocket) {
      state.currentSocket.on("gameCommand", data => {
        setGameCommands(data)
      })
      state.currentSocket.on("bothReady", data => {
        setGameState(true)
      })

      state.currentSocket.on("gameOver", data => {

        state.currentSocket.emit('leaveRoom', {
          roomName: state.currentRoom,
          userName: state.username
        })

        dispatch({ type: 'SET_TOKEN', payload: null })
        dispatch({ type: 'SET_VISUAL_MODE', payload: "GAME_OVER" })
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
          let newArr = [...mutedUsers]
          console.log("Stage -> newArr", newArr)
          
          newArr.push(data.mute)
          setMutedUsers(newArr)
          if (state.username === data.mute) {
            room.localParticipant.audioTracks.forEach(publication => {
              // console.log(room.localParticipant.identity,'is muted');
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
      state.currentSocket.on("unMute", data => {
        console.log('Room UNmute request', data)
        if (room) {
          setMutedUsers(prev => {
            const newArr = [...prev]
            // console.log('mutedUsers', newArr.filter(user => user !== data))
  
            const newMutedUsers = newArr.filter(user => user !== data)
            if (state.username === data) {
              room.localParticipant.audioTracks.forEach(publication => {
                console.log(room.localParticipant.identity,' is unmuted');
                publication.track.enable();
              });
            }

            return newMutedUsers
          })
        }
      })
    }

    return (() => {
      if (state.currentSocket) {
        state.currentSocket.off("mute")
        state.currentSocket.off("unMute")
        state.currentSocket.off("disconnect")
        state.currentSocket.off("gameOver")
        state.currentSocket.off("gameCommand")
        state.currentSocket.off("bothReady")
        state.currentSocket.off("leaveStage")
      }
    })

  }, [state.currentSocket, state.currentRoom, state.username, room, dispatch, mutedUsers, disableMedia]);

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
        name: state.currentRoom,
        
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


  const remoteParticipants = participants.filter(p => ((p.identity === activeRoomState.host) || (p.identity === activeRoomState.contender))).map((participant) => {
    // console.log("this participant is being rendered",participant);

    return (<Participant key={participant.sid} participant={participant} mutedUsers={mutedUsers}/>)
  });

  function disableMedia() {
    if (room) {
      room.on('disconnected', room => {
        // Detach the local media elements
        room.localParticipant.tracks.forEach(publication => {
          const attachedElements = publication.track.detach();
          attachedElements.forEach(element => element.remove());
        });
      });
      room.disconnect();
    }

    // To disconnect from a Room

  }

  const handleLogout = function () {
    state.currentSocket.emit('leaveRoom', {
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

    return () => clearTimeout(timer);
    // clearTimeout(timer)
  }, [active, time]);

  const sendMessage = () => {
    state.currentSocket.emit('message', {
      userName: state.username,
      message: messageText,
      roomName: state.currentRoom
    })
    setMessageText('')
  }

  const readyUp = () => {
    state.currentSocket.emit('ready', {
      userName: state.username,
      roomName: state.currentRoom
    })

    setReadyState(true);

  }

  const messageList = activeRoomState.messages.map(message => {
    return <span>
      {message.fromUser} - {message.message}
    </span>
  })


  // console.log('Remote Participants from Debater Stage: ', remoteParticipants);

  return (
    <main>
      <body id='stage' style={{ height: '100%', zIndex: '1' }}>
        <div class="w3-content" >
          <header class="w3-panel w3-center w3-opacity" style={{ backgroundColor: "rgb(64,81,182)" }}>
            <h1 class="w3-xlarge">Debate Topic - {activeRoomState.topic}</h1>
            <h2 style={{ color: 'white' }}>{gameCommands}</h2>
          </header>
          <div class="w3-row-padding w3-grayscale">
            <div class="w3-half" style={{ backgroundColor: "rgb(64,81,182)", width: "100%", display: 'flex', justifyContent: 'space-between' }}>
              <div class='participants'>
                {room ? (
                  <Participant
                    key={room.localParticipant.sid}
                    participant={room.localParticipant}
                    mutedUsers={mutedUsers}
                  />
                ) : (
                    ''
                  )}
                <div class='userAndStance' style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: 'white', justifySelf: 'right' }}>{state.username}</p>
                  <p style={{ color: 'white' }}>{(state.username === activeRoomState.host) ? "Agree" : "Disagree"}</p>
                </div>
              </div>
              <div id='stage-details' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                {!readyState && <Button color="black" style={{ border: '2px solid black', justifySelf: 'left', backgroundColor:'green', color: 'white' }} onClick={readyUp}>Ready</Button>}
                {!gameState && readyState && <Button color="black" style={{ border: '2px solid black', justifySelf: 'left', backgroundColor:'yellow', color: 'black' }}>Waiting for Opponent...</Button>}
                {gameState && readyState && <div class="timer-box">
                <h4 class="timer" style={{ color: 'white' }}>Time Remaining: </h4>
                <h1 class="timer" style={{ color: 'white' }}>{time}</h1>
                </div>
                }
                
                {/* <br />
              <Button color="black" style={{ border: '2px solid black', justifySelf: 'bottom', backgroundColor: 'white' }}>Good Point!</Button> */}
              </div>
              <div class='participants'>
                {remoteParticipants}
                <div class='userAndStance' style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ color: 'white' }}>{(state.username === activeRoomState.host) ? "Disagree" : "Agree"}</p>
                  <p style={{ color: 'white' }}>{(state.username === activeRoomState.host) ? activeRoomState.contender : activeRoomState.host}</p>
                </div>
              </div>
            </div>
              <article id="game-log" class="info-box">
                <span><b>'Welcome to the Chatroom.'</b> Click 'Ready' when you're good to go!</span>
                {messageList}
              </article>
              <form>
                <div class="chat-message-box">
                  <TextField id="outlined-basic" label="Outlined" variant="outlined" value={messageText} onChange={event => setMessageText(event.target.value)}  onKeyPress={(e) => {
                    if (e.key === 'Enter'){
                      e.preventDefault();
                      sendMessage()
                      return setMessageText('')
                    } 
                    return null;
                    
                    // return e.key === 'Enter' ? sendMessage() : null;
                    }}/>
                  <Button color="black" style={{ border: '2px solid black', justifySelf: 'bottom', backgroundColor: 'white' }} onClick={sendMessage}>Send</Button>
                </div>
              </form>

            </div>

            <footer style={{ backgroundColor: "rgb(64,81,182)", display: 'flex' }}>
              <Button color="black" style={{ border: '2px solid white', justifySelf: 'left', backgroundColor: 'red', color: 'white' }} onClick={handleLogout}>Rage Quit?</Button>
              <h5 style={{ color: 'white' }}>'Viewers Watching': {participants.length - 1}</h5>

            </footer>
          </div>
      </body>
    </main>
  );
}