import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
// import ThumbUpIcon from '@material-ui/icons/ThumbUp';
// import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import UserCard from '../user-card/userCard.jsx'
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import {useStore} from '../../Store';
import './lobbyItem.css';

import Stage from '../stage/stage'

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    minwidth: "345px",
    display: "block"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'red[500]',
    padding: '2px',
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function LobbyItem({roomDetails}) {
  // console.log(roomDetails);
  const classes = useStyles();
  // const [expanded, setExpanded] = React.useState(false);


  const [open, setOpen] = React.useState(false);
  const [state, dispatch] = useStore();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Expandable arrow
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };


  const [openStage, setOpenStage] = React.useState(false);

  const handleClickOpenStage = () => {
    // Set the current room (socket emit)
    dispatch({ type: 'SET_CURRENT_ROOM', payload: roomDetails.name })
    dispatch({type: 'SET_VISUAL_MODE', payload: "WAITING"});


    state.currentSocket.emit('joinRoom', {
      roomName : roomDetails.name,
      userName : state.username,
      userID : state.userID
    })
    // setOpenStage(true);
  };

  const handleClickOpenSpectate = () => {
    // Set the current room (socket emit)
    dispatch({ type: 'SET_CURRENT_ROOM', payload: roomDetails.name })
    fetch('/video/token', {
      method: 'POST',
      body: JSON.stringify({
        identity: state.username,
        room: state.currentRoom
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then((fetchData) => {
        dispatch({ type: 'SET_VISUAL_MODE', payload: "SPECTATOR" });
        dispatch({ type: 'SET_TOKEN', payload: fetchData.token })
      })


    state.currentSocket.emit('joinRoomSpectator', {
      roomName : roomDetails.name,
      userName : state.username
    })
    // setOpenStage(true);
    
  };

  const handleCloseStage = () => {
    setOpenStage(false);
  };

  if (roomDetails) {
    return (
      <Card className={classes.root} style={{
        border: "solid rgb(0,238,40) 3px", 
        backgroundColor: "rgb(241,241,241)", 
        borderRadius: "30px"
        }}>
        <CardHeader
          avatar={
            <div>
              <Avatar onClick={handleClickOpen} />
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
              >
                <UserCard />
              </Dialog>
            </div>
          }
          title={roomDetails.topic}
          subheader={roomDetails.host ? `${roomDetails.host} Agrees` : `${roomDetails.contender} Disagrees`}
        />

        <CardActions disableSpacing>
          {roomDetails.host && roomDetails.contender && <Button
            variant="contained" 
            style={{ 
              color: "black", 
              backgroundColor: "rgb(252, 232, 76)",
              borderRadius: "30px"
              }} 
            onClick={handleClickOpenSpectate}>Spectate Stage
            </Button>}
          {(((roomDetails.host && !roomDetails.contender) || (!roomDetails.host && roomDetails.contender))) && <Button 
            variant="contained" 
            style={{ 
              color: "white", 
              backgroundColor: "rgb(64,81,182)",
              borderRadius: "30px"
              }} 
            onClick={handleClickOpenStage}>Enter Stage
            </Button>}
            
          
          
          <Dialog fullScreen open={openStage} TransitionComponent={Transition}>
            <Stage />
            <IconButton edge="start" color="inherit" onClick={handleCloseStage} aria-label="close">
                <CloseIcon />
              </IconButton>
          </Dialog>
          
        </CardActions>
      </Card>
    );
  } else {
    return null
  }
}



{/* <Button color="inherit" onClick={handleStatsOpen}>Statistics</Button>
<Dialog fullScreen open={openStats} onClose={handleCloseStats} TransitionComponent={Transition}>
  <IconButton edge="start" color="inherit" onClick={handleCloseStats} aria-label="close">
    <CloseIcon />
  </IconButton>
  <Dashboard />
</Dialog> */}
