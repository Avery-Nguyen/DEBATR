import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import LobbyItem from './lobbyitem'
import {useStore} from '../../Store'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    margin: '200px',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Lobby() {
  const [state, dispatch] = useStore();

  const classes = useStyles();
  const [username, setUsername] = useState(Math.random().toFixed(5).toString());
  const [roomState, setRoomState] = useState({})
  const [token, setToken] = useState(null);
  const [activeRoomState, setActiveRoomState] = useState({})
  // const [topic, setTopic] = useState("");
  // const [stance, setStance] = useState(null);
  const [currentRoomName, setCurrentRoomName] = useState("")

  // console.log('roomState', roomState)

  // ALEX CODE: Assign socket handlers
  useEffect(() => {
    if (state.currentSocket) {
      state.currentSocket.on("initialRoomList", data => {
        const rLParse = JSON.parse(data)
        // Want this to be an object of rooms
        setRoomState(prevState => ({ ...prevState, ...rLParse }))
      })

      state.currentSocket.on('startGame', data => {
        console.log('data.roomname', data.roomName)
        const connectUsername = username
        console.log("VideoChat -> connectUsername", connectUsername)

        fetch('/video/token', {
          method: 'POST',
          body: JSON.stringify({
            identity: username,
            room: data.roomName
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then((fetchData) => {
            setToken(fetchData.token)
            setActiveRoomState(roomState[data.roomName])
          })

      })

      state.currentSocket.on('currentRoomUpdate', data => {
        // data to only update the current room state. 
        setActiveRoomState(data);
      }
      )
    }
  }, [username, state.currentSocket, roomState]);

  const roomAddHandler = (testRoom) => {

    if (currentRoomName) {
      state.currentSocket.emit('leaveRoom', {
        roomName: currentRoomName,
        userName: username
      })
    }
    // const randRoomName = Math.random().toFixed(5).toString();
    // setCurrentRoomName(randRoomName);
    // // setRoomList([...roomList, testRoom])
    // state.currentSocket.emit('createRoom', {
    //   roomName: randRoomName,
    //   userName: username,
    //   topic: topic,
    //   stance: stance
    // })
  }

  const roomChangeHandler = (testRoom) => {
    if (currentRoomName) {
      state.currentSocket.emit('leaveRoom', {
        roomName: currentRoomName,
        userName: username
      })
    }
    setCurrentRoomName(testRoom)
    state.currentSocket.emit('joinRoom', {
      roomName: testRoom,
      userName: username
    })
  }

  const sendMessageHandler = (message) => {
    state.currentSocket.emit('message', {
      roomName: currentRoomName,
      userName: username,
      message: message
    })
  }

  const roomItems = Object.keys(roomState).map(room =>
    <Grid item xs={4}>
      <LobbyItem roomDetails={roomState[room]}/>
    </Grid>
  )

  function FormRow() {
    return (
      <React.Fragment>
       {roomItems}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root} >
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={3} margin='24px'>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}