import React, { useState } from 'react';
import { useStore } from '../../Store'
import CreateRoom from '../create-room/createRoom'
import SignUp from '../sign-up/signUp.jsx'
import SignIn from '../sign-in/signIn'
import Dashboard from '../dashboard/dashboard'

//material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
// import MenuIcon from '@material-ui/icons/Menu';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NavBar(props) {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  // console.log(state.username);

  //sign-up open/close logic
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  //sign-in open/close logic
  // const [openSignIn, setOpenSignIn] = useState(false);
  const handleClickOpenSignIn = () => {
    dispatch({ type: 'SET_OPEN_SIGN_IN', payload: true })
    // setOpenSignIn(true);
  };
  
  
  const handleCloseSignIn = () => {
    dispatch({ type: 'SET_OPEN_SIGN_IN', payload: false })
    // setOpenSignIn(false);
  };

  //stats open/close logic
  const [openStats, setStats] = useState(false);
  const handleStatsOpen = () => {
    setStats(true);
  };
  const handleCloseStats = () => {
    setStats(false);
  };
  //create stage logic
  const [openCreateRoom, setCreateRoom] = useState(false);
  const handleCreateRoomOpen = () => {
    setCreateRoom(true);
  };
  const handleCloseCreateRoom = () => {
    setCreateRoom(false);
  };

  const handleLogout = () => {
    if(state.visualMode !== 'LOBBY' && state.visualMode !== 'SPECTATOR' ) {
      dispatch({ type: 'SET_VISUAL_MODE', payload: 'LOBBY' })
      dispatch({ type: 'SET_TOKEN', payload: null })
      state.currentSocket.emit('leaveRoom', {
        roomName : state.currentRoom,
        userName : state.username
      })
    } else if (state.visualMode !== 'LOBBY' && state.visualMode === 'SPECTATOR') {
      dispatch({ type: 'SET_VISUAL_MODE', payload: 'LOBBY' })
      state.currentSocket.emit('leaveRoomSpectator', {
        roomName : state.currentRoom,
        userName : state.username
      })
    }

    axios.get('/api/logout', {})
      .then((res) => {
        // console.log('response from logout', res)
        if (res.data === 'success') {
          dispatch({ type: 'SET_USERNAME', payload: null })
          dispatch({ type: 'SET_USER_ID', payload: null })
        }

        // This is cheap but it works
        window.location.reload();
        return true
      })
      .catch((error) => {
        console.error(error, "error from axios request")
      })
  }

    return (
      <div className={classes.root}>
        <AppBar position="fixed" style={{ justifyContent: "spaceBetween"}}>
          <Toolbar>
            <Link href={'/'}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trophy" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
                <line x1="7" y1="4" x2="17" y2="4" />
                <path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
                <circle cx="5" cy="9" r="2" />
                <circle cx="19" cy="9" r="2" />
              </svg>
            </Link>
            <Link href={'/'} style={{ color: 'white', textDecoration: 'none' }}>
              <h1 style={{ color: 'white', textDecoration: 'none' }}> DebatR </h1>
            </Link>
            <Typography variant="h6" className={classes.title}>
            </Typography>
            
            <Button color="inherit" onClick={handleStatsOpen}>Statistics</Button>
              <Dialog fullScreen open={openStats} onClose={handleCloseStats} TransitionComponent={Transition}>
                <IconButton edge="start" color="inherit" onClick={handleCloseStats} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Dashboard />
              </Dialog>

              {state.username ? 
            <div style={{display:'flex', alignContent:'center', alignItems: 'baseline'}}>
              {state.visualMode !== 'ACTIVE' && state.visualMode !== 'WAITING' && <Button
                style={{
                  color: "rgb(64,81,182)",
                  backgroundColor: "white",
                  border: "rgb(64,81,182) solid 1px",
                  borderRadius: "30px",
                  marginTop: '5px',
                  width: "200px",
                  paddingRight: '15px'
                }}
                onClick={handleCreateRoomOpen}
              >
                Create Stage
          </Button>}
              <Dialog
                open={openCreateRoom}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseCreateRoom}
              >
                <CreateRoom
                  handleCloseCreateRoom={handleCloseCreateRoom}
                />
              </Dialog>
              <Typography variant="h7" className={classes.title} color="black">
                Logged in as: {state.username}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </div>
: 
            <div>
              <Button color="inherit" onClick={handleClickOpenSignIn}>Login</Button>
              <Dialog
                open={state.openSignIn}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseSignIn}
              >
                <SignIn
                  handleCloseSignIn={handleCloseSignIn}
                />
              </Dialog>
              <Button color="inherit" onClick={handleClickOpen}>Sign Up</Button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
              >
                <SignUp
                  handleClose={handleClose}
                />
              </Dialog>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}