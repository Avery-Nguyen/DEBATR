import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useStore} from '../../Store'

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    borderRadius: "50%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  topicStance: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '30px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateRoom() {
  const [state, dispatch] = useStore();
  const [topic, setTopic] = useState("")
  const [stance, setStance] = useState("")


  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  
  const submitCreateRoom = (vals) => {
    console.log('submitCreateRoom values', vals.target)
    // if (state.currentRoomName) {
    //   state.currentSocket.emit('leaveRoom', {
    //     roomName : state.currentRoomName,
    //     userName : state.username
    //   })
    // }
    const randRoomName = Math.random().toFixed(5).toString();
    dispatch({type: 'SET_CURRENT_ROOM', payload: randRoomName});

    // setRoomList([...roomList, testRoom])
    console.log('Sending topic and stance: ', topic, stance)
    state.currentSocket.emit('createRoom', {
      roomName: randRoomName,
      userName: state.username,
      topic: topic,
      stance: stance
    })


  }

  return (
    <Container component="main" maxWidth="xs" style={{border:'solid black 3px', borderRadius: "30px"}}>
      <CssBaseline />
      <Box mt={2}>
      </Box>
      <div className={classes.paper}>
         <img style={{borderRadius: "50%"}}src="https://i.imgur.com/2E7lUT0.jpg"
        />
        <Typography component="h1" variant="h5">
          Will you be the next master?
      </Typography>
        <FormControl className={classes.formControl} style={{
              marginTop:'15px',
            }}>
          <InputLabel htmlFor="grouped-native-select"
            variant="outlined"
            // margin="normal"
            fullWidth
            autoFocus
            >Topic</InputLabel>
          <Select native defaultValue="" id="grouped-native-select" onChange={(event) => setTopic(event.target.value)}>
            {/* TODO: Add topic_ids when we render with map! */}
            <option aria-label="None" value="" />
            <option value={"Nudity API"}>Nudity API</option>
            <option value={"Andy Lindsay"}>Andy Lindsay</option>
            <option value={"Oranges"}>Oranges</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} style={{ width: "100px", marginTop:'15px', }}>
          <InputLabel htmlFor="grouped-select">Stance</InputLabel>
          <Select defaultValue="" id="grouped-select" onChange={event => setStance(event.target.value)}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={true}>For</MenuItem>
            <MenuItem value={false}>Against</MenuItem>
          </Select>
        </FormControl>
        <Button
          // onClick={handleClickOpen}
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "rgb(64,81,182)",
            marginTop:'25px',
            borderRadius: "30px"
          }}
        >Create Stage
      </Button>
      </div>
      <Box mt={2}>
      </Box>
    </Container>
  );
}