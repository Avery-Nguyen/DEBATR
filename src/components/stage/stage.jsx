import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Participant from '../../Participant'
import TextField from '@material-ui/core/TextField';
import { useStore } from '../../Store'
import Video from 'twilio-video';
import './stage.css';
import ScrollableFeed from 'react-scrollable-feed'

export default function Stage({ activeRoomState }) {
  const [state, dispatch] = useStore();
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(false)
  const [gameCommands, setGameCommands] = useState(`Welcome to the Debate. ${activeRoomState.host} goes first.`)
  const [readyState, setReadyState] = useState(false)
  const [gameState, setGameState] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [mutedUsers, setMutedUsers] = useState([])
  // console.log("Stage -> mutedUsers", mutedUsers)

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
        state.currentSocket.emit('leaveRoom', {
          roomName: state.currentRoom,
          userName: state.username
        })
        disableMedia()
      })

      state.currentSocket.on("mute", data => {
        if (room) {
          let newArr = [...mutedUsers]
          
          newArr.push(data)
          setMutedUsers(newArr)
          if (state.username === data) {
            room.localParticipant.audioTracks.forEach(publication => {
              // console.log(room.localParticipant.identity,'is muted');
              publication.track.disable();
            });
          }
        }

      })
      state.currentSocket.on("unMute", data => {
        // console.log('Room UNmute request', data)
        if (room) {
          setMutedUsers(prev => {
            const newArr = [...prev]
            // console.log('mutedUsers', newArr.filter(user => user !== data))
  
            const newMutedUsers = newArr.filter(user => user !== data)
            if (state.username === data) {
              room.localParticipant.audioTracks.forEach(publication => {
                // console.log(room.localParticipant.identity,' is unmuted');
                publication.track.enable();
              });
            }

            return newMutedUsers
          })
        }
      })

      state.currentSocket.on('setTimer', data => {
           // Start Timer
            setActive(true)
            setTime(data);
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

  }, [state.currentSocket, state.currentRoom, state.username, room, dispatch, mutedUsers]);

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
        setTime((time - 1))
      }, 1000);
    } else if (time <= 0) {

      // console.log('calling clearTimeout')
      clearTimeout(timer)

    }

    return () => clearTimeout(timer);
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
    return <div>
      <strong>{message.fromUser}</strong>: {message.message}
    </div>
  })

  return (
   
        <div class="w3-content" id='stage' style={{ height: '100%', width: '98%' }}>
          
            <h1 class="w3-xlarge topic-header debate-topic">Debate Topic - {activeRoomState.topic}</h1>
            <h2 style={{ color: 'black' }}>{gameCommands}</h2>
            <div id="button-div">
            {!readyState && <Button color="black" style={{ border: '2px solid black', justifySelf: 'center', backgroundColor:'green', color: 'white', width: '200px' }} onClick={readyUp}>Ready</Button>}
                {!gameState && readyState && <Button color="black" style={{ border: '2px solid black', justifySelf: 'left', backgroundColor:'yellow', color: 'black', width: '200px' }}>Waiting for Opponent...</Button>}
            </div>
       
          <div class="w3-row-padding w3-grayscale">
            {/* BACKGROUND FOR STAGE */}
            <div class="w3-half" style={{ backgroundColor: "white", width: "100%", display: 'flex', justifyContent: 'center' }}>
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
                <div class='userAndStance' style={{ display: 'flex', justifyContent: 'center'}}>
                  {/* <p style={{ color: 'white', justifySelf: 'right' }}>{state.username}</p> */}
                  <p style={{ color: 'black', fontSize: '3rem' }}>{(state.username === activeRoomState.host) ? "Agree" : "Disagree"}</p>
                </div>
              </div>
              <div id='stage-details' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                {gameState && readyState && <div class="timer-box">
                <h4 class="timer" style={{ color: 'black' }}>Time Remaining: </h4>
                <h1 class="timer" style={{ color: 'black' }}>{time}</h1>
                </div>
                }
              </div>
              <div class='participants'>
                {remoteParticipants}
                <div class='userAndStance' style={{ display: 'flex', justifyContent: 'center'}}>
                  <p style={{ color: 'black', fontSize: '3rem' }}>{(state.username === activeRoomState.host) ? "Disagree" : "Agree"}</p>
                </div>
              </div>
            </div>
            <article id="viewers-watching">
              <h5 style={{ color: 'black' }}>Viewers Watching: {participants.length - 1}</h5>
              <Button color="black" style={{ border: '1 px solid black', justifySelf: 'left', backgroundColor: 'red', color: 'white' }} onClick={handleLogout}>Rage Quit?</Button>
            </article>
            <section id="full-chatbox">
              <article id="outlined-basic" class="info-box game-log">
                <ScrollableFeed forceScroll="true">
                <span><b>'Welcome to the Chatroom.'</b> Click 'Ready' when you're good to go!</span>
                {messageList}
                {/* <div ref={messagesEndRef} /> */}
              </ScrollableFeed>
              </article>
              <form>
                <div class="chat-message-box">
                  <TextField id="outlined-basic" label="Start Chatting" variant="outlined" value={messageText} onChange={event => setMessageText(event.target.value)}  onKeyPress={(e) => {
                    if (e.key === 'Enter'){
                      e.preventDefault();
                      sendMessage()
                      return setMessageText('')
                    } 
                    return null;
                    }}/>
                  <Button color="black" style={{ border: '2px solid black', justifySelf: 'bottom', backgroundColor: 'white' }} onClick={sendMessage}>Send</Button>
                </div>
              </form>
              </section>
            </div>
          </div>
   
  );
}