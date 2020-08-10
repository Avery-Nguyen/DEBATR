import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
// import { makeStyles } from '@material-ui/core/styles';
<<<<<<< HEAD
import { useStore } from '../../Store';
=======
import { useStore } from '../../Store'
>>>>>>> 9b98300a64921fee4a1f0efeb575a32e1ef706c2
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import UserCard from '../user-card/userCard.jsx';


import Avatar from '@material-ui/core/Avatar';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   paper: {
//     marginRight: theme.spacing(2),
//   },
// }));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NavMenu() {
  const [state, dispatch] = useStore();
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openUsercard, setOpenUsercard] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleLogout = () => {
    if (state.visualMode !== 'LOBBY' && state.visualMode !== 'SPECTATOR') {
      dispatch({ type: 'SET_VISUAL_MODE', payload: 'LOBBY' })
      dispatch({ type: 'SET_TOKEN', payload: null })
      state.currentSocket.emit('leaveRoom', {
        roomName: state.currentRoom,
        userName: state.username
      })
    } else if (state.visualMode !== 'LOBBY' && state.visualMode === 'SPECTATOR') {
      dispatch({ type: 'SET_VISUAL_MODE', payload: 'LOBBY' })
      state.currentSocket.emit('leaveRoomSpectator', {
        roomName: state.currentRoom,
        userName: state.username
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

  const [usercard, setUsercard] = useState({});
  // console.log('roomState', roomState)
  // console.log(props)

  const handleClickOpenUsercard = () => {
    setOpenUsercard(true);
  };
  const handleCloseUsercard = () => {
    setOpenUsercard(false);
  };

  const getUsercard = (username) => {
    axios.post('/api/usercardByName', {
      username
    })
      .then((res) => {
        console.log(res)
        // console.log(data.data[0], 'sql response')
        setUsercard(prev => ({ ...prev, ...res.data[0] }));
        handleClickOpenUsercard();

      });
  }


  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  console.log(state)
  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        style={{
          color: 'white'
        }}
      >

        {state.userAvatarUrl && <Avatar alt={state.username} src="https://robohash.org/facilisquiaquo.jpg?size=50x50&set=set1" />}
        {!state.userAvatarUrl && <Avatar alt={state.userAvatarUrl} />}

      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {/* //put logic here */}
                  <MenuItem onClick={() => getUsercard(state.username)}>{state.username}</MenuItem>
                  <Dialog
                    open={openUsercard}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseUsercard}
                  >
                    <UserCard hostUsercard={usercard} />
                  </Dialog>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}