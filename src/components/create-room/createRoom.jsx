import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStore } from '../../Store'

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "300",
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

export default function CreateRoom({ handleCloseCreateRoom }) {
  const [state, dispatch] = useStore();
  const [topic, setTopic] = useState("")
  const [stance, setStance] = useState("")
  const [options, setOptions] = useState([])



  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const submitCreateRoom = (vals) => {
    const randRoomName = Math.random().toFixed(5).toString();
    dispatch({ type: 'SET_CURRENT_ROOM', payload: randRoomName });
    dispatch({ type: 'SET_VISUAL_MODE', payload: "WAITING" });

    // setRoomList([...roomList, testRoom])
    console.log('Sending topic and stance: ', topic, stance)
    state.currentSocket.emit('createRoom', {
      roomName: randRoomName,
      userName: state.username,
      topic: topic,
      stance: stance
    })

    handleCloseCreateRoom();
  }

  useEffect(() => {
    axios.get('/api/topics')
      .then((data) => {
        setOptions(data.data.topics)
      });
  }, [])

  const topicOptions = options.map(topic =>
    <option value={topic.question}>{topic.question}</option>
  )

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box mt={2}>
      </Box>
      <div className={classes.paper}>
         {/* <img alt="angry face" style={{borderRadius: "50%"}}src="https://i.imgur.com/2E7lUT0.jpg"/> */}
         <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trophy" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4051B6" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <line x1="7" y1="4" x2="17" y2="4" />
            <path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
            <circle cx="5" cy="9" r="2" />
            <circle cx="19" cy="9" r="2" />
          </svg>
        <FormControl className={classes.formControl} style={{
          marginTop: '15px',
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
            {topicOptions}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} style={{ width: "100px", marginTop: '15px', }}>
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
          onClick={submitCreateRoom}
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "rgb(64,81,182)",
            marginTop: '25px',
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