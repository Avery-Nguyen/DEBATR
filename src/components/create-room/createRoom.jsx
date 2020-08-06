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
import TextField from '@material-ui/core/TextField';


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
  const [topicID, setTopicID] = useState("")
  const [stance, setStance] = useState(true)
  const [options, setOptions] = useState([])
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [createdTopic, setCreatedTopic] = useState('')
  const [categoryID, setCategoryID] = useState(null)
  console.log("CreateRoom -> categoryID", categoryID)

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const submitCreateRoom = (vals) => {
    //put validation of form here

    if (topic) {

      const randRoomName = Math.random().toFixed(5).toString();
      dispatch({ type: 'SET_CURRENT_ROOM', payload: randRoomName });
      dispatch({ type: 'SET_VISUAL_MODE', payload: "WAITING" });

      // setRoomList([...roomList, testRoom])
      console.log('Sending topic and stance and topicID: ', topic, stance, topicID)
      state.currentSocket.emit('createRoom', {
        roomName: randRoomName,
        userName: state.username,
        userID: state.userID,
        topicID,
        topic,
        stance
      })
      handleCloseCreateRoom();
      
    } else if (createdTopic) {
      console.log(categoryID)
      axios.post('/api/topics', {
        question: createdTopic,
        category_id: parseInt(categoryID)
      }) 
      .then((res) => {
      console.log("submitCreateRoom -> res", res.data[0])
      // res.data[0]
        
        const randRoomName = Math.random().toFixed(5).toString();
        dispatch({ type: 'SET_CURRENT_ROOM', payload: randRoomName });
        dispatch({ type: 'SET_VISUAL_MODE', payload: "WAITING" });

        
      // setRoomList([...roomList, testRoom])
      // console.log('Sending topic and stance and topicID: ', topic, stance, topicID)
      state.currentSocket.emit('createRoom', {
        roomName: randRoomName,
        userName: state.username,
        userID: state.userID,
        topicID: res.data[0].id,
        topic: res.data[0].question,
        stance
      })
      })
      handleCloseCreateRoom();
    }
    
  }

  useEffect(() => {
    axios.get('/api/topics')
      .then((data) => {
        setOptions(data.data.topics)
      });
  }, [])

  useEffect(() => {
    axios.get('/api/categories')
      .then((data) => {
      console.log("CreateRoom -> data", data.data.topics)
      setCategoriesOptions(data.data.topics);
      });
  }, [])

  const categoryOptions = categoriesOptions.map(category => {
    return <option value={category.id}>{category.name}</option>
  })

  const topicOptions = options.map(topic =>{
    return <option value={topic.id}>{topic.question}</option>
  })


  const handleChangeTopic = function(id) {
    const question = options.find((option) => option.id === parseInt(id))
    setTopic(question.question)
    setTopicID(parseInt(id))
  }

 
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box mt={2}>
      </Box>
      <div className={classes.paper}>
        {/* <img alt="angry face" style={{borderRadius: "50%"}}src="https://i.imgur.com/2E7lUT0.jpg"/> */}
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trophy" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4051B6" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <line x1="7" y1="4" x2="17" y2="4" />
          <path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
          <circle cx="5" cy="9" r="2" />
          <circle cx="19" cy="9" r="2" />
        </svg>
        <InputLabel htmlFor="grouped-native-select"
            variant="outlined"
            // margin="normal"
            fullWidth
            autoFocus
            required
          >Categories</InputLabel>
          <Select native defaultValue="" id="grouped-native-select" onChange={event => setCategoryID(event.target.value)}>
           <option aria-label="None" value="" />
            {/* loops through categories */}
            {categoryOptions}
            
          </Select>
        <TextField
            // onChange={event => setEmail(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Create a Topic"
            name="createTopic"
            onChange={event => setCreatedTopic(event.target.value)}
          />
        <FormControl className={classes.formControl} style={{
          marginTop: '15px',
        }}>
        
          <InputLabel htmlFor="grouped-native-select"
            variant="outlined"
            // margin="normal"
            fullWidth
            autoFocus
            required
          >Choose a Topic</InputLabel>
          <Select native defaultValue="" id="grouped-native-select" onChange={(event, a,b,c) => {
            // debugger;
            return handleChangeTopic(event.target.value)}}>
           
           {/* TODO: Add topic_ids when we render with map! */}
           <option aria-label="None" value="" />
            {topicOptions}
          </Select>
        </FormControl>
        <FormControl required className={classes.formControl} style={{ width: "100px", marginTop: '15px', }}>
          <InputLabel htmlFor="grouped-select">Stance</InputLabel>
          <Select defaultValue={true} id="grouped-select" onChange={event => setStance(event.target.value)}>
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
            borderRadius: "30px",
          }}
        >Create Stage
      </Button>
      </div>
      <Box mt={2}>
      </Box>
    </Container>
  );
}