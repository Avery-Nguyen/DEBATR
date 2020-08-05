import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Avatar from '@material-ui/core/Avatar';
import LobbyItem from './lobbyitem'
import {useStore} from '../../Store'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    margin: '20px',
    // marginTop: "150px"
  },
  paper: {
    padding: "15px",
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Lobby({roomState}) {
  const [state] = useStore();

  const classes = useStyles();
  const [username] = useState(Math.random().toFixed(5).toString());
  // const [topic, setTopic] = useState("");
  // const [stance, setStance] = useState(null);
  const [currentRoomName, setCurrentRoomName] = useState("")

  // console.log('roomState', roomState)

  // ALEX CODE: Assign socket handlers
  useEffect(() => {
    

      // state.currentSocket.on('startGame', data => {
      //   console.log('data.roomname', data.roomName)
      //   const connectUsername = username
      //   console.log("VideoChat -> connectUsername", connectUsername)

      //   fetch('/video/token', {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       identity: state.username,
      //       room: state.currentRoom
      //     }),
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   }).then(res => res.json())
      //     .then((fetchData) => {
      //       dispatch('SET_TOKEN', fetchData.token)
      //       // setActiveRoomState(roomState[data.roomName])
      //     })
      // })

      // state.currentSocket.on('currentRoomUpdate', data => {
      //   // data to only update the current room state. 
      //   setActiveRoomState(data);
      // }
      // )
    }, []);

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

  const roomItems = Object.keys(roomState).filter(room => room).map(room =>
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
      <Grid container spacing={2} style={{marginTop: "25px"}}>
        <Grid container item xs={12} spacing={3} margin='24px' style={{display: "flex"}}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}