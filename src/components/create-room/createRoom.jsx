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


const useStyles = makeStyles({
  root: {
    minWidth: 300,
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
  }
});

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
    <Card className={classes.root} variant="outlined" style={{border: "solid black 1px", width: "25px"}}>
      <CardContent>
        <Typography className={classes.title} color="black" gutterBottom>
          Create a stage?
        </Typography>
        <div className={classes.topicStance}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Topic</InputLabel>
        <Select native defaultValue="" id="grouped-native-select" onChange={(event) => setTopic(event.target.value)}>
          <option aria-label="None" value={topic} />
            <option value={"Nudity API"}>Nudity API</option>
            <option value={"Andy Lindsay"}>Andy Lindsay</option>
            <option value={"Oranges"}>Oranges</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} style={{width: "75px"}}>
        <InputLabel htmlFor="grouped-select">Stance</InputLabel>
        <Select defaultValue="" id="grouped-select" onChange={event => setStance(event.target.value)}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={true} >For</MenuItem>
          <MenuItem value={false} >Against</MenuItem>
        </Select>
      </FormControl>
    </div>
      </CardContent>
      <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            backgroundColor='black'
            className={classes.submit}
            Create Stage
            onClick={submitCreateRoom}
          />
    </Card>
  );
}