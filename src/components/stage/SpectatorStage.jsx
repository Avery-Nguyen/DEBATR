import React, { useState, useEffect } from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Participant from '../../Participant'
import { useStore } from '../../Store'
import Video from 'twilio-video';
import './stage.css';
import ScrollableFeed from 'react-scrollable-feed'



export default function SpectatorStage({ activeRoomState }) {
  const [state, dispatch] = useStore();
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  // console.log("SpectatorStage -> participants state", participants)
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(false)
  const [gameCommands, setGameCommands] = useState(`Welcome to the Debate. ${activeRoomState.host} goes first.`)
  const [messageText, setMessageText] = useState("")
  const [mutedUsers, setMutedUsers] = useState([])



  // GameCommand / mute / unmute listeners
  useEffect(() => {
    if (state.currentSocket) {
      state.currentSocket.on("gameCommand", data => {
        setGameCommands(data)
      })

      state.currentSocket.on("gameOver", data => {
        state.currentSocket.emit('leaveRoomSpectator', {
          roomName: state.currentRoom,
          userName: state.username
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
        state.currentSocket.emit('leaveRoomSpectator', {
          roomName: state.currentRoom,
          userName: state.username
        })
        disableMedia()
      })

      state.currentSocket.on("mute", data => {
        // console.log('Room mute request', room)
        if (room) {
          let newArr = [...mutedUsers]
          newArr.push(data)
          setMutedUsers(newArr)
          // console.log("SpectatorStage -> mutedUsers", mutedUsers)
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
                // console.log(room.localParticipant.identity, ' is unmuted');
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
    return (<Participant
      key={participant.sid}
      participant={participant}
      mutedUsers={mutedUsers}
    />)
  });

  let participant1;
  // let participant2;
  if (remoteParticipants.length > 1) {
    participant1 = remoteParticipants[0].identity
    // participant2 = remoteParticipants[1].identity
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
        setTime((time - 1))
      }, 1000);
    } else if (time <= 0) {

      // console.log('calling clearTimeout')
      clearTimeout(timer)

    }

    return () => clearTimeout(timer);
    // clearTimeout(timer)
  }, [active, time]);

  const sendMessage = () => {
    state.currentSocket.emit('message', {
      userName: state.username ? state.username : state.sessionID,
      message: messageText,
      roomName: state.currentRoom
    })
    setMessageText('')
  }

  const messageList = activeRoomState.messages.map(message => {
    return <div>
      <strong>{message.fromUser}</strong>: {message.message}
    </div>
  })



  return (

    <div class="w3-content" id='stage' style={{ height: '100%', width: '98%' }}>

      <h1 class="w3-xlarge topic-header debate-topic">Spectating Debate - {activeRoomState.topic}</h1>
      <h2 style={{ color: 'black' }}>{gameCommands}</h2>

      <div class="w3-row-padding w3-grayscale">
        <div class="w3-half" style={{ backgroundColor: "white", width: "100%", display: 'flex', justifyContent: 'center' }}>
          <div class='participants'>
            {/* LOCAL PARTICIPANT - DON'T RENDER */}
            {room ? (
              remoteParticipants[0]
            ) : (
                ''
              )}
            <div class='userAndStance' style={{ display: 'flex', justifyContent: 'center' }}>
              {/* <p style={{ color: 'white', justifySelf: 'right' }}>{participant1}</p> */}
              <p style={{ color: 'black', fontSize: '3rem' }}>{(participant1 === activeRoomState.host) ? "Disagree" : "Agree"}</p>
            </div>
          </div>
          <div id='stage-details' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <div class="timer-box">
              <h4 class="timer" style={{ color: 'black' }}>Time Remaining: </h4>
              <h1 class="timer" style={{ color: 'black' }}>{time}</h1>
            </div>
          </div>
          <div class='participants'>
            {remoteParticipants[1]}
            <div class='userAndStance' style={{ display: 'flex', justifyContent: 'center' }}>
              <p style={{ color: 'black', fontSize: '3rem' }}>{(participant1 === activeRoomState.host) ? "Agree" : "Disagree"}</p>
            </div>
          </div>
        </div>
      </div>

      <article id="viewers-watching">
        <h5 style={{ color: 'black' }}>Viewers Watching: {participants.length - 1}</h5>
        <Button color="black" style={{ border: '2px solid white', justifySelf: 'left', backgroundColor: 'red', color: 'white' }} onClick={handleLogout}>Return to Lobby</Button>
      </article>

      <section id="full-chatbox">
        <article id="outlined-basic" class="info-box game-log">
        <ScrollableFeed forceScroll="true">
          <span><b>Welcome to the Chatroom.</b> Please wait for Debate to start...</span>
          {messageList}
          </ScrollableFeed>
        </article>
        <form>
          <div class="chat-message-box">
            <TextField id="outlined-basic" label="Start Chatting" variant="outlined" value={messageText} onChange={event => setMessageText(event.target.value)} onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage()
                return setMessageText('')
              }
              return null;
            }} />
            <Button color="black" style={{ border: '2px solid black', justifySelf: 'bottom', backgroundColor: 'white' }} onClick={sendMessage}>Send</Button>
          </div>
        </form>
      </section>
    </div>

  );
}